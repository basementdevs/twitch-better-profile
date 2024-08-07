import { enhanceChatMessage } from "@Scripting/components";

export default class MessageQueue {
  messages: HTMLElement[] = [];
  processing = false;

  constructor() {
    this.messages = [];
    this.processing = false;
  }

  addMessage(message: HTMLElement) {
    this.messages.push(message);

    if (!this.isProcessing()) {
      this.processNext();
    }
  }

  processNextMessage() {
    if (this.isEmpty()) return null;

    return this.messages.shift();
  }

  isProcessing() {
    return this.processing;
  }

  async processNext() {
    if (this.isProcessing()) {
      console.log("TBP: Already processing, waiting...");
      return;
    }
    if (this.isEmpty()) {
      console.log("TBP: Queue is empty");
      this.processing = false;
      return;
    }

    this.processing = true;
    const item = this.processNextMessage();
    console.log("TBP: Processing next message...");

    // Simulate async processing
    try {
      // Simulate async processing
      await this.processItem(item);
    } catch (error) {
      console.error("Error processing item:", error);
    } finally {
      this.processing = false;
      await this.processNext();
    }
  }

  async processItem(item: HTMLElement | null) {
    if (!item) return;

    return new Promise((resolve, reject) => {
      try {
        //console.log(`Processing item: ${item}`);
        enhanceChatMessage(item);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  private isEmpty() {
    return this.messages.length === 0;
  }
}

