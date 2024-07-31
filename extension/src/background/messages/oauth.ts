import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { TwitchUser } from "~types/types"

const CLIENT_ID = "vfir3y164p9aiv3v6nkbsjg0wdx4za"
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

  let authenticatedUser = await fetch("https://api.twitch.tv/helix/users", {
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
