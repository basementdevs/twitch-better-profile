import { ChatMutationObserver } from "./observer"

const CHAT_LIST = ".chat-list--default,.chat-list--other,.chat-list"

const appLoader = () => {
  console.log("TBP: Loading Twitch Better Profile...")

  let hasWelcomeMessageOnBody = document.body.querySelector(
    'div[data-a-target="chat-welcome-message"]'
  )

  if (!hasWelcomeMessageOnBody) {
    console.log("TBP: Welcome message not found, waiting...")
    return setTimeout(appLoader, 1000)
  }

  let chatElements = document.querySelector(CHAT_LIST)
  if (!chatElements) {
    return setTimeout(appLoader, 3000)
  }

  let chat = chatElements as Node
  console.log(chat)
  console.log("TBP: Loaded! Starting to listen to new messages...")

  let observer = new ChatMutationObserver()
  observer.start(chat, {
    childList: true,
    subtree: true,
    characterData: true
  })
}

export { appLoader }