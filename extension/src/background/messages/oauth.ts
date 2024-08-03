import browser from "webextension-polyfill"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { TwitchUser } from "~types/types"

const CLIENT_ID = process.env.PLASMO_PUBLIC_TWITCH_CLIENT_ID
const TWITCH_API_URL = process.env.PLASMO_PUBLIC_TWITCH_API_URL

const REDIRECT_URI = browser.identity.getRedirectURL()

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Redirect URI")
  console.log(REDIRECT_URI)
  const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user:read:email`

  const redirectURL = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL
  })

  let urlParams = new URLSearchParams(redirectURL)
  let accessToken = urlParams.entries().next().value[1]

  await browser.storage.local.set({ accessToken })

  let authenticatedUser = await fetch(TWITCH_API_URL + "/users", {
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${accessToken}`
    }
  })
  let user = await authenticatedUser.json()
  user = user.data[0] as TwitchUser
  user.id = parseInt(user.id)

  await browser.storage.local.set({ user })

  res.send({
    auth: true,
    user: user
  })
}

export default handler
