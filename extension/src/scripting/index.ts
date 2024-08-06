import { ChatMutationObserver } from "./observer";

const CHAT_LIST = ".chat-list--default,.chat-list--other,.chat-list";

const appLoader = () => {
  console.log("TBP: Loading Twitch Better Profile...");


  const chatElements = document.querySelector(CHAT_LIST);
  if (!chatElements) {
    return setTimeout(appLoader, 50);
  }

  const chat = chatElements as Node;
  console.log(chat);
  console.log("TBP: Loaded! Starting to listen to new messages...");

  const observer = new ChatMutationObserver();
  observer.start(chat, {
    childList: true,
    subtree: true,
    characterData: true,
  });
};

export { appLoader };
