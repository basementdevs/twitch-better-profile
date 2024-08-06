import type { PlasmoCSConfig } from "plasmo"
import browser from "webextension-polyfill"

import { ChatMutationObserver } from "~scripting/observer"

export {}

const CHAT_LIST = ".chat-list--default,.chat-list--other,.chat-list"

export const config: PlasmoCSConfig = {
  matches: [
    "https://dashboard.twitch.tv/u/*/stream-manager",
    "https://www.twitch.tv/embed/*/chat*",
    "https://www.twitch.tv/*"
  ],
  exclude_matches: [
    "*://*.twitch.tv/*.html",
    "*://*.twitch.tv/*.html?*",
    "*://*.twitch.tv/*.htm",
    "*://*.twitch.tv/*.htm?*"
  ],
  all_frames: true
}

// @ts-ignore

const appLoader = () => {
  console.log("TBP: Loading Twitch Better Profile...")

  let hasWelcomeMessageOnBody = document.body.querySelector(
    'div[data-a-target="chat-welcome-message"]'
  )

  if (!hasWelcomeMessageOnBody) {
    console.log("TBP: Welcome message not found, waiting...")
    return setTimeout(appLoader, 3000)
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

appLoader()
