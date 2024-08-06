import { ChatMutation } from './observer';


const CHAT_ELEMENTS = ".chat-list, .chat-list--default, .chat-list--other"

const appLoader = () => {
    console.log("TBP: Loading Twitch Better Profile...")
    let chat = document.querySelectorAll(CHAT_ELEMENTS)

    if (!chat) {
        return setTimeout(appLoader, 3000)
    }

    console.log("TBP: Loaded! Starting to listen to new messages...")
    const mutationConfig = {
        childList: true,
        subtree: true,
        characterData: true
    }

    ChatMutation.observe(chat.item(0), mutationConfig)
}