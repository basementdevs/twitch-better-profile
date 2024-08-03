import browser from "webextension-polyfill"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

import type { TwitchUser, UserSettings } from "~types/types"

const CLIENT_ID = process.env.PLASMO_PUBLIC_TWITCH_CLIENT_ID
const TWITCH_API_URL = process.env.PLASMO_PUBLIC_TWITCH_API_URL
const API_URL: string = process.env.PLASMO_PUBLIC_API_URL

const REDIRECT_URI = browser.identity.getRedirectURL()

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = new Storage()
  let accessToken = await authenticateWithTwitch()
  await storage.set("accessToken", accessToken)

  let user = await getTwitchUserByAccessToken(accessToken)
  await storage.set("user", user)

  let settings = await getUserDataByUsername(user.login)
  await storage.set("settings", settings)

  if (settings) {
    await storage.set("pronouns", settings.pronouns)
    await storage.set("occupation", settings.occupation)
  }


  res.send({
    auth: true,
    user: user
  })
}

async function getUserDataByUsername(
  username: string
): Promise<UserSettings | null> {
  let settings = await fetch(API_URL + `/settings/${username}`, {
    headers: {
      "Client-ID": CLIENT_ID
    }
  })

  if (settings.ok) {
    return (await settings.json()) as UserSettings
  }
  return null
}

async function getTwitchUserByAccessToken(
  accessToken: string
): Promise<TwitchUser> {
  let authenticatedUser = await fetch(TWITCH_API_URL + "/users", {
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${accessToken}`
    }
  })
  let user = await authenticatedUser.json()
  user = user.data[0] as TwitchUser
  user.id = parseInt(user.id)
  return user
}

/**
 * Authenticate with Twitch using OAuth2
 *
 * @returns string - Access Token
 */
async function authenticateWithTwitch() {
  const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user:read:email`

  const redirectURL = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL
  })

  let urlParams = new URLSearchParams(redirectURL)
  return urlParams.entries().next().value[1]
}

export default handler
