import ChatMutationObserver from "@Scripting/observers/chat-observer";
import PageWatcher, {
  PageWatcherState,
} from "@Scripting/watchers/page-watcher";
import PopoverMutationObserver from "@Scripting/observers/popover-observer";

const TWITCH_CHAT_LIST = ".chat-list--default,.chat-list--other,.chat-list";
const SEVEN_TV_CHAT_LIST = ".seventv-chat-list";
const CHAT_LIST = `${TWITCH_CHAT_LIST},${SEVEN_TV_CHAT_LIST}`;
const POPOVER_ELEMENT = ".viewer-card-layer";

export default class Kernel {
  // Core components
  private chatObserver: ChatMutationObserver;
  private pageWatcher: PageWatcher;
  private popoverObserver: PopoverMutationObserver;

  constructor() {
    this.chatObserver = new ChatMutationObserver();
    this.popoverObserver = new PopoverMutationObserver()
    this.pageWatcher = new PageWatcher();
    this.pageWatcher.init();
  }

  init = () => {
    setInterval(() => {
      if (this.pageWatcher.matches() && !this.pageWatcher.observerRunning) {
        console.log(
          "TBP: PageWatcher matched, starting to listen to Twitch DOM...",
        );
        this.listenToTwitchDOM();
      } else if (
        !this.pageWatcher.matches() &&
        this.pageWatcher.observerRunning
      ) {
        console.log("TBP: PageWatcher didn't match, stopping observer...");
        this.stop();
      } else if (this.pageWatcher.refresh()) {
        this.stop();
        this.listenToTwitchDOM();
      } else if (
        !this.pageWatcher.matches() &&
        !this.pageWatcher.observerRunning
      ) {
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
    const popover = document.querySelector(POPOVER_ELEMENT) as Node;
    console.log("TBP: Loaded! Starting to listen to new messages...");

    this.chatObserver.start(chat, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    this.popoverObserver.start(popover, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    this.pageWatcher.observerRunning = true;
    this.pageWatcher.pageState = PageWatcherState.MATCHED;
  }

  stop = () => {
    this.pageWatcher.observerRunning = false;
    this.chatObserver.stop();
    this.popoverObserver.stop();
  };
}
