import MessageQueue from "~scripting/queue";
import {enhanceTwitchPopover} from "~scripting/components";

const POPOVER_ELEMENT = '.viewer-card-layer';

export default class PopoverMutationObserver {
    private observer: MutationObserver;

    private queue: MessageQueue;
    private messagesBatch: HTMLElement[];
    private debounceMessageTimer: number;
    private debounceProcessedNodesTimer: number;
    private processedNodes: Set<HTMLElement> = new Set();
    private readonly debounceInterval: number;

    constructor() {
        this.queue = new MessageQueue();
        this.messagesBatch = [];
        this.debounceInterval = 5; // 5 milliseconds

        this.processMutation = this.processMutation.bind(this);
    }

    public start(node: Node, config: MutationObserverInit) {
        this.observer = new MutationObserver(this.processMutation);
        this.observer.observe(node, config);
    }

    public stop() {
        this.observer.disconnect();
    }

    /** Stops  */
    private debounceProcessedNodes() {
        if (this.debounceProcessedNodesTimer) {
            clearTimeout(this.debounceProcessedNodesTimer);
        }

        this.debounceProcessedNodesTimer = window.setTimeout(() => {
            this.processedNodes.clear();
        }, this.debounceInterval * 20);
    }

    private debounceProcessBatch() {
        if (this.debounceMessageTimer) {
            clearTimeout(this.debounceMessageTimer);
        }

        this.debounceMessageTimer = window.setTimeout(() => {
            this.processBatch();
            this.debounceProcessedNodes();
        }, this.debounceInterval); // Adjust the delay as needed
    }

    private processBatch() {
        if (this.messagesBatch.length === 0) {
            return;
        }

        for (const message of this.messagesBatch) {
            this.queue.addMessage(message);
        }
        this.messagesBatch = [];
    }

    private processMutation(mutations: MutationRecord[]) {
        mutations.forEach((mutation) => {

            const cardLoaded = mutation.target.querySelector("#VIEWER_CARD_ID");
            if (
                cardLoaded &&
                mutation.type === "childList" &&
                mutation.addedNodes.length > 0
            ) {
                console.log(mutation.addedNodes[0].outerHTML);
                const containerNameCard = mutation.target.querySelector(
                    ".CoreText-sc-1txzju1-0"
                );
                const containerDetailsCard = mutation.target.querySelector(
                    ".viewer-card-header__display-name"
                );

                if (containerNameCard && containerDetailsCard) {
                    enhanceTwitchPopover(containerNameCard, containerDetailsCard);
                }
            }
        });

        this.debounceProcessBatch();
    }
}
