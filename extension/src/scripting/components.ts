import { t } from "~utils/i18nUtils";

const API_URL: string = process.env.PLASMO_PUBLIC_API_URL;

const enhanceChatMessage = async (messageEl: HTMLElement) => {
	console.log(messageEl.textContent);
	const usernameEl = messageEl.querySelector(".chat-line__username");
	let badgesEl = messageEl.querySelector(".chat-line__username-container");

	if (!badgesEl) {
		return;
	}
	badgesEl = badgesEl.childNodes[0] as Element;

	if (!usernameEl) {
		return;
	}

	const username = usernameEl.textContent;
	const uri = `${API_URL}/settings/${username}`;
	const req = await fetch(uri);

	if (!req.ok) {
		return;
	}

	const res = await req.json();

	const child = usernameEl.firstChild;

	const pronouns = res.pronouns.replace("/", "");
	const i18nPronouns = t(`pronouns${pronouns}`);
	const pronounsElement = document.createElement("span");
	pronounsElement.textContent = `(${i18nPronouns})`;
	pronounsElement.style.color = "gray";
	pronounsElement.style.marginLeft = "4px";

	if (child) {
		usernameEl.appendChild(pronounsElement);
		badgesEl.appendChild(buildBadge(res.occupation));
	}
};

const buildBadge = (_badge) => {
	// Create a div element
	const badgeContainer = document.createElement("div");
	badgeContainer.className = "InjectLayout-sc-1i43xsx-0 jbmPmA";

	// Create an img element
	const img = document.createElement("img");
	img.alt = "Just a thing";
	img.width = 18;
	img.setAttribute("aria-label", "Just a thing");
	img.className = "chat-badge";
	img.src = `${API_URL}/static/icons/mod.png`;
	img.srcset = `${API_URL}/static/icons/mod.png 1x,${API_URL}/static/icons/mod.png 2x,${API_URL}/static/icons/mod.png 4x`;

	// Append the img to the div
	badgeContainer.appendChild(img);

	return badgeContainer;
};

export { enhanceChatMessage };
