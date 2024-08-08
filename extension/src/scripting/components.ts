import { t } from "~utils/i18nUtils";
import type { Settings } from "./types";

const API_URL: string = process.env.PLASMO_PUBLIC_API_URL;

const enhanceChatMessage = async (messageEl: HTMLElement) => {
  const usernameEl = messageEl.querySelector(".chat-line__username");
  let badgesEl = messageEl.querySelector(".chat-line__username-container");

  if (!badgesEl) return;

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

  const user_settings = (await req.json()) as Settings;
  const child = usernameEl.firstChild;

  const pronouns = user_settings?.pronouns.replace("/", "");
  const i18nPronouns = t(`pronouns${pronouns}`);
  const pronounsElement = document.createElement("span");
  // TODO: We should discuss this further in: https://github.com/basementdevs/twitch-addon-scylladb-rs/issues/27
  pronounsElement.textContent = `(${i18nPronouns ?? "N/D"})`;
  pronounsElement.style.color = "gray";
  pronounsElement.style.marginLeft = "4px";

  if (child) {
    usernameEl.appendChild(pronounsElement);
    badgesEl.appendChild(
      badgeTemplate("TODO: Currently unused", user_settings.occupation),
    );
  }
};

const badgeTemplate = (_url: string, description: string) => {
  const badgeContainer = document.createElement("div");
  badgeContainer.classList.add(
    "tbp-tooltip-wrapper",
    "tbp-chat-badge-container",
    "InjectLayout-sc-1i43xsx-0",
    "jbmPmA",
  );

  const image = new Image();
  image.src = `${API_URL}/static/icons/mod.png`;
  image.srcset = `${API_URL}/static/icons/mod.png 1x,${API_URL}/static/icons/mod.png 2x,${API_URL}/static/icons/mod.png 4x`;
  image.alt = description;
  image.width = 18;
  image.height = 18;
  // image.classList.add("chat-badge", "tbp-chat-badge");
  image.classList.add("chat-badge");
  image.setAttribute("data-a-target", "chat-badge");
  badgeContainer.appendChild(image);

  const tooltip = document.createElement("div");
  tooltip.classList.add("tbp-tooltip", "tbp-tooltip--up", "text-red");
  tooltip.style.marginBottom = "0.9rem";
  tooltip.innerText = description;
  badgeContainer.appendChild(tooltip);

  return badgeContainer;
};

const buildBadge = (_badge) => {
  // Create a div element
  const badgeContainer = document.createElement("div");
  badgeContainer.className = "InjectLayout-sc-1i43xsx-0 jbmPmA";

  // Parent button
  const button = document.createElement("button");
  button.setAttribute("data-a-target", "chat-badge");

  // Create an img element
  const img = document.createElement("img");
  img.alt = "Just a thing";
  img.width = 18;
  img.setAttribute("aria-label", "Just a thing");
  img.setAttribute("data-a-target", "chat-badge");
  img.className = "chat-badge";
  img.src = `${API_URL}/static/icons/mod.png`;
  img.srcset = `${API_URL}/static/icons/mod.png 1x,${API_URL}/static/icons/mod.png 2x,${API_URL}/static/icons/mod.png 4x`;

  button.appendChild(img);
  badgeContainer.appendChild(button);

  return badgeContainer;
};

export { enhanceChatMessage };
