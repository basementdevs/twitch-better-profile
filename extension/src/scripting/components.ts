import {t} from "~utils/i18nUtils";

const API_URL: string = process.env.PLASMO_PUBLIC_API_URL

const enhanceChatMessage = (messageEl: HTMLElement) => {
    let usernameEl = messageEl.querySelector(".chat-line__username")
    let badgesEl = messageEl.querySelector(".chat-line__username-container")
        .childNodes[0]

    if (!usernameEl) {
        return
    }

    let username = usernameEl.textContent
    console.log(username)
    let uri = `${API_URL}/settings/${username}`

    fetch(uri)
        .then(async (response) => {
            if (!response.ok) {
                return
            }

            let res = await response.json()
            const child = usernameEl.firstChild

            let pronouns = res.pronouns.replace("/", "")
            let i18nPronouns = t("pronouns" + pronouns)
            const pronounsElement = document.createElement("span")
            pronounsElement.textContent = `(${i18nPronouns})`
            pronounsElement.style.color = "gray"
            pronounsElement.style.marginLeft = "4px"

            if (child) {
                usernameEl.appendChild(pronounsElement)
                badgesEl.appendChild(buildBadge(res.occupation))
            }
        })
        .catch((err) => {

        })
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
    img.src = `${API_URL}/static/icons/mod.png`
    img.srcset = `${API_URL}/static/icons/mod.png 1x,${API_URL}/static/icons/mod.png 2x,${API_URL}/static/icons/mod.png 4x`

    // Append the img to the div
    badgeContainer.appendChild(img)

    return badgeContainer
}

export {enhanceChatMessage}