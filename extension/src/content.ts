import type { PlasmoCSConfig } from "plasmo"

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

const buildBadge = (_badge) => {
  // Create a div element
  const badgeContainer = document.createElement("div")
  badgeContainer.className = "InjectLayout-sc-1i43xsx-0 jbmPmA"

  // Create an img element
  const img = document.createElement("img")
  img.alt = "Just a thing"
  img.width = 18
  img.setAttribute("aria-label", "Just a thing")
  img.className = "chat-badge"
  img.src = "https://twitch-extension.danielheart.dev/static/icons/mod.png"
  img.srcset =
    "https://twitch-extension.danielheart.dev/static/icons/mod.png 1x,https://twitch-extension.danielheart.dev/static/icons/mod.png 2x,https://twitch-extension.danielheart.dev/static/icons/mod.png 4x"

  // Append the img to the div
  badgeContainer.appendChild(img)

  return badgeContainer
}

let mutation = new MutationObserver((mutations) => {
  if (mutations[0].previousSibling.localName === "span") {
    return
  }

  console.log(mutations)
  let messageEl = null
  for (let mutation of mutations) {
    let isChildList = mutation.type === "childList"

    if (!isChildList) {
      console.log("Not a childList mutation")
      continue
    }

    const addedNode = mutation.addedNodes[0]
    if (!(addedNode instanceof HTMLElement)) {
      continue
    }

    const isMessageEl = addedNode.classList.contains("chat-line__message")
    if (!isMessageEl) {
      continue
    }

    messageEl = addedNode
    break
  }

  if (messageEl === null) {
    return
  }

  let usernameEl = messageEl.querySelector(".chat-line__username")
  let badgesEl = messageEl.querySelector(".chat-line__username-container")
    .childNodes[0]

  console.log(badgesEl)

  if (!usernameEl) {
    return
  }

  let username = usernameEl.textContent
  console.log(username)
  let uri = `https://twitch-extension.danielheart.dev/settings/${username}`

  fetch(uri)
    .then(async (response) => {
      if (!response.ok) {
        return
      }

      let res = await response.json()
      console.log(res)

      const child = usernameEl.firstChild

      const pronouns = res.pronouns
      const pronounsElement = document.createElement("span")
      pronounsElement.textContent = `(${pronouns})`
      pronounsElement.style.color = "gray"
      pronounsElement.style.marginLeft = "4px"
      if (child) {
        usernameEl.appendChild(pronounsElement)
        badgesEl.appendChild(buildBadge(res.occupation), badgesEl.firstChild)
      }
    })
    .catch((err) => console.error(err))

  messageEl = null
})

const appLoader = () => {
  console.log("TBP: Loading Twitch Better Profile...")
  let chat = document.querySelector(".chat-list--default")
  if (!chat) {
    return setTimeout(appLoader, 3000)
  }

  console.log("TBP: Loaded! Starting to listen to new messages...")
  const mutationConfig = {
    childList: true,
    subtree: true,
    characterData: true
  }
  mutation.observe(chat, mutationConfig)
}

setTimeout(appLoader, 3000)
