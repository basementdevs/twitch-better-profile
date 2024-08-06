import { ChatMutationObserver } from "./observer";

const CHAT_LIST = ".chat-list--default,.chat-list--other,.chat-list";

const appLoader = () => {
	console.log("TBP: Loading Twitch Better Profile...");

	const hasWelcomeMessageOnBody = document.body.querySelector(
		'div[data-a-target="chat-welcome-message"]',
	);

	if (!hasWelcomeMessageOnBody) {
		console.log("TBP: Welcome message not found, waiting...");
		return setTimeout(appLoader, 1000);
	}

	const chatElements = document.querySelector(CHAT_LIST);
	if (!chatElements) {
		return setTimeout(appLoader, 3000);
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
