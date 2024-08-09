import { t } from "~utils/i18nUtils";

const API_URL: string = process.env.PLASMO_PUBLIC_API_URL;

const TWITCH_BADGES_CONTAINER = ".chat-line__username-container";
const SEVEN_TV_BADGES_CONTAINER = ".seventv-chat-user-badge-list";

const TWITCH_USERNAME_CONTAINER = ".chat-line__username";
const SEVEN_TV_USERNAME_CONTAINER = ".seventv-chat-user-username";
const USERNAME_CONTAINER = `${TWITCH_USERNAME_CONTAINER},${SEVEN_TV_USERNAME_CONTAINER}`;

const enhanceChatMessage = async (messageEl: HTMLElement) => {
  const usernameEl = messageEl.querySelector(USERNAME_CONTAINER);

  /**
   * TODO: make adapters based on which plugins the user has installed (compatibility mode)
   * Restructure the code to make it more modular and easy to maintain (Goal: 1.0.0)
   **/
  let badgesEl: Element;
  badgesEl = messageEl.querySelector(TWITCH_BADGES_CONTAINER);
  if (badgesEl) {
    badgesEl = badgesEl.childNodes[0] as Element;
  } else {
    badgesEl = messageEl.querySelector(SEVEN_TV_BADGES_CONTAINER);
  }

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

const buildBadge = (occupation) => {
  // Create a div element
  const badgeContainer = document.createElement("div");
  badgeContainer.className =
    "InjectLayout-sc-1i43xsx-0 jbmPmA seventv-chat-badge";
  // SevenTV Stuff
  badgeContainer.setAttributeNode(document.createAttribute("data-v-9f956e7d"));

  // Create an img element
  const img = document.createElement("img");
  img.alt = "Just a thing";
  img.width = 18;
  img.setAttribute("aria-label", "Just a thing");
  img.className = "chat-badge";
  const badgeUrl = `${API_URL}/static/icons/${occupation}.png`;
  img.src = badgeUrl;
  img.srcset = `${badgeUrl} 1x,${badgeUrl} 2x,${badgeUrl} 4x`;

  // Append the img to the div
  badgeContainer.appendChild(img);

  return badgeContainer;
};

function createOccupationContainer() {
  const occupationContainer = document.createElement("div");
  occupationContainer.className = "occupation-job";
  occupationContainer.innerHTML = `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 312.461 312.461" xml:space="preserve" width="17px" height="17px" fill="#000000">
      <g id="SVGRepo_bgCarrier" stroke-width="0"/>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.624922"/>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path style="fill:#ffffff;" d="M304.96,174.82v94.97c0,5.52-4.48,10-10,10H17.5c-5.52,0-10-4.48-10-10v-94.97h117.48v22.05h62.5 v-22.05H304.96z"/>
          <path style="fill:#ffffff;" d="M304.96,79.85v94.97H187.48v-22.05h-62.5v22.05H7.5V79.85c0-5.52,4.48-10,10-10h277.46 C300.48,69.85,304.96,74.33,304.96,79.85z"/>
          <rect x="124.98" y="152.771" style="fill:#ffffff;" width="62.5" height="44.1"/>
          <path style="fill:#ffffff;" d="M294.961,62.35h-68.199V32.67c0-4.142-3.358-7.5-7.5-7.5H93.199c-4.142,0-7.5,3.358-7.5,7.5v29.68 H17.5C7.851,62.35,0,70.201,0,79.85c0,8.345,0,181.61,0,189.94c0,9.649,7.851,17.5,17.5,17.5h277.461c9.649,0,17.5-7.851,17.5-17.5 c0-8.323,0-181.588,0-189.94C312.461,70.201,304.61,62.35,294.961,62.35z M100.699,40.17h111.063v22.179H100.699V40.17z M15,79.85 c0-1.379,1.122-2.5,2.5-2.5h277.461c1.379,0,2.5,1.121,2.5,2.5v87.47H194.98v-14.55c0-4.143-3.357-7.5-7.5-7.5h-62.5 c-4.142,0-7.5,3.357-7.5,7.5v14.55H15V79.85z M132.48,174.82v-14.55h47.5v14.55v14.55h-47.5V174.82z M297.461,269.79 c0,1.379-1.121,2.5-2.5,2.5H17.5c-1.378,0-2.5-1.121-2.5-2.5v-87.47h102.48v14.55c0,4.143,3.358,7.5,7.5,7.5h62.5 c4.143,0,7.5-3.357,7.5-7.5v-14.55h102.481V269.79z"/>
        </g>
      </g>
    </svg>
    <span>Front-end Engineer</span>
  `;
  return occupationContainer;
}

function handleMutations(mutations) {
  mutations.forEach((mutation) => {
    const cardLoaded = mutation.target.querySelector("#VIEWER_CARD_ID");
    if (
      cardLoaded &&
      mutation.type === "childList" &&
      mutation.addedNodes.length > 0
    ) {
      const containerNameCard = mutation.target.querySelector(
        ".CoreText-sc-1txzju1-0"
      );
      const containerDetailsCard = mutation.target.querySelector(
        ".viewer-card-header__display-name"
      );

      if (containerNameCard) {
        containerNameCard.innerHTML +=
          '<span class="pronouns-card">(Ele/dele)</span>';
      }

      if (containerDetailsCard) {
        const occupationContainer = createOccupationContainer();
        containerDetailsCard.appendChild(occupationContainer);
      }
    }
  });
}

const cardLayer = document.querySelector(".viewer-card-layer");
const observer = new MutationObserver(handleMutations);
observer.observe(cardLayer, { childList: true, subtree: true });

const style = document.createElement("style");
style.textContent = `
.job-container {
  display: flex;
  align-items: center;
  margin-top: 2px;
  gap: 9px;
}

.pronouns-card {
  margin-left: 4px;
  font-size: 14px;
  font-weight: 300; /* font-light */
}
`;
document.head.appendChild(style);

export { enhanceChatMessage };
