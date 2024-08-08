const watchablePages = [
  /^https:\/\/dashboard\.twitch\.tv\/u\/[^\/]+\/stream-manager$/,
  /^https:\/\/www\.twitch\.tv\/embed\/[^\/]+\/chat.*$/,
  /^https:\/\/www\.twitch\.tv\/[^\/]+$/,
];

export enum PageWatcherState {
  MATCHED = 0,
  REFRESHED = 1,
  STANDBY = 2,
}

export default class PageWatcher {
  private currentPath: string;
  public pageState: PageWatcherState;
  public observerRunning: boolean;

  init() {
    console.log("TBP: PageWatcher initialized");
    this.pageState = PageWatcherState.STANDBY;
    this.observerRunning = false;
    setInterval(() => this.trackPathChanges(), 50);
  }

  public matches() {
    return this.pageState === PageWatcherState.MATCHED;
  }

  public refresh() {
    return this.pageState === PageWatcherState.REFRESHED;
  }

  private trackPathChanges() {
    if (this.currentPath === window.location.href) {
      return;
    }
    console.log("TBP: Path changed");
    this.currentPath = window.location.href;

    const isWatchableUrl = watchablePages.some((pattern) =>
      pattern.test(this.currentPath),
    );

    if (!isWatchableUrl) {
      console.log("TBP: Ignoring page change");
      this.pageState = PageWatcherState.STANDBY;
      return;
    }

    if (this.pageState === PageWatcherState.MATCHED) {
      this.pageState = PageWatcherState.REFRESHED;
      console.log("TBP: Detected page refresh");
      return;
    }

    this.pageState = PageWatcherState.MATCHED;
    console.log("TBP: Detected page change");
  }
}
