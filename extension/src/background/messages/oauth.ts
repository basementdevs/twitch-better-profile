import type { PlasmoMessaging } from "@plasmohq/messaging"
import { browser } from "webextension-polyfill-ts"


import type { TwitchUser } from "~types/types"

// @ts-ignore
const CLIENT_ID = process.env.PLASMO_PUBLIC_TWITCH_CLIENT_ID
// @ts-ignore
const TWITCH_API_URL = process.env.PLASMO_PUBLIC_TWITCH_API_URL

// @ts-ignore
const REDIRECT_URI = browser.identity.getRedirectURL()

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Redirect URI")
  console.log(REDIRECT_URI)
  const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user:read:email`

  const redirectURL = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL
  })

  console.log("tamo aqui: "  +redirectURL)

  let urlParams = new URLSearchParams(redirectURL)
  let accessToken = urlParams.entries().next().value[1]
  console.log("token:" + accessToken);

  await browser.storage.local.set({ accessToken })
  console.log("Twitch API URL: " + TWITCH_API_URL);
  let authenticatedUser = await fetch(TWITCH_API_URL + "/users", {
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${accessToken}`
    }
  })
  let user = await authenticatedUser.json()
  console.log(user);
  user = user.data[0] as TwitchUser
  user.id = parseInt(user.id)

  await browser.storage.local.set({ user })

  res.send({
    auth: true,
    user: user
  })
}

export default handler
