import ChatMutationObserver from "@Scripting/observer";
import PageWatcher, {
  PageWatcherState,
} from "@Scripting/watchers/page-watcher";

const CHAT_LIST = ".chat-list--default,.chat-list--other,.chat-list";

export default class Kernel {
  // Core components
  private observer: ChatMutationObserver;
  private pageWatcher: PageWatcher;

  constructor() {
    this.observer = new ChatMutationObserver();
    this.pageWatcher = new PageWatcher();
    this.pageWatcher.init();
  }

  init = () => {
    setInterval(() => {
      if (this.pageWatcher.matches() && !this.pageWatcher.observerRunning) {
        console.log("TBP: PageWatcher matched, starting to listen to Twitch DOM...");
        this.listenToTwitchDOM();
      } else if (!this.pageWatcher.matches() && this.pageWatcher.observerRunning) {
        console.log("TBP: PageWatcher didn't match, stopping observer...");
        this.stop();
      } else if (this.pageWatcher.refresh()) {
        this.stop();
        this.listenToTwitchDOM();
      } else if (!this.pageWatcher.matches() && !this.pageWatcher.observerRunning) {
        //console.log("TBP: Not on a watchable page...");
      } else {
        //console.log("TBP: Waiting...");
      }
    }, 25);
  };

  private listenToTwitchDOM() {
    console.log("TBP: Loading Twitch Better Profile...");

    const chatElements = document.querySelector(CHAT_LIST);
    if (!chatElements) {
      return setTimeout(this.init, 50);
    }

    const chat = chatElements as Node;
    console.log("TBP: Loaded! Starting to listen to new messages...");

    this.observer.start(chat, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    this.pageWatcher.observerRunning = true;
    this.pageWatcher.pageState = PageWatcherState.MATCHED;

  }

  stop = () => {
    this.pageWatcher.observerRunning = false;
    this.observer.stop();
  };
}

