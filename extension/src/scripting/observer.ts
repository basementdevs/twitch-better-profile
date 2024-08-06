import { MessageQueue } from "~scripting/queue";

class ChatMutationObserver {
	private observer: MutationObserver;

	private queue: MessageQueue;
	private messagesBatch: Node[];
	private debounceTimer: number;
	private processedNodes: Set<HTMLElement> = new Set();
	private readonly debounceInterval: number;

	constructor() {
		this.queue = new MessageQueue();
		this.messagesBatch = [];
		this.debounceInterval = 5;

		this.processMutation = this.processMutation.bind(this);
	}

	public start(node: Node, config: MutationObserverInit) {
		this.observer = new MutationObserver(this.processMutation);
		this.observer.observe(node, config);
	}

	private debounceProcessedNodes() {
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
		}

		this.debounceTimer = window.setTimeout(() => {
			this.processedNodes.clear();
		}, this.debounceInterval * 10);
	}

	private debounceProcessBatch() {
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
		}

		this.debounceTimer = window.setTimeout(() => {
			this.processBatch();
		}, this.debounceInterval); // Adjust the delay as needed
	}

	private processBatch() {
		if (this.messagesBatch.length === 0) {
			return;
		}

		this.messagesBatch.forEach(this.queue.addMessage);
		this.messagesBatch = [];
	}

	private processMutation(mutations: MutationRecord[]) {
		// Check if the first mutation's previous sibling is a span element
		// @ts-ignore
		if (mutations[0].previousSibling?.localName === "span") {
			return;
		}

		for (const mutation of mutations) {
			if (mutation.type !== "childList") {
				//console.log("Not a childList mutation")
				continue;
			}

			// biome-ignore lint/complexity/noForEach: There are that many nodes, so there is no performance penalty here
			mutation.addedNodes.forEach((addedNode) => {
				if (!(addedNode instanceof HTMLElement)) {
					return;
				}

				if (this.processedNodes.has(addedNode)) {
					return; // Skip already processed nodes
				}

				if (addedNode.classList.contains("chat-line__message")) {
					this.messagesBatch.push(addedNode);
					this.processedNodes.add(addedNode);
				}
			});
		}

		this.debounceProcessBatch();
	}
}

export { ChatMutationObserver };
