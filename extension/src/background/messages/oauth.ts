import browser from "webextension-polyfill";

import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

import type { ColorChatUser, TwitchUser, UserSettings } from "~types/types";

const CLIENT_ID = process.env.PLASMO_PUBLIC_TWITCH_CLIENT_ID;
const TWITCH_API_URL = process.env.PLASMO_PUBLIC_TWITCH_API_URL;
const API_URL: string = process.env.PLASMO_PUBLIC_API_URL;

const REDIRECT_URI = browser.identity.getRedirectURL();

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const storage = new Storage();
  const accessToken = await authenticateWithTwitch();
  await storage.set("accessToken", accessToken);

  const user = await getTwitchUserByAccessToken(accessToken);
  await storage.set("user", user);

  const settings = await getUserDataByUsername(user.login);
  await storage.set("settings", settings);

  const color = await getUserChatColor(accessToken, user.id);
  await storage.set("color", color);

  if (settings) {
    await storage.set("pronouns", settings.pronouns);
    await storage.set("occupation", settings.occupation);
  }

  res.send({
    auth: true,
    user: user,
  });
};

async function getUserDataByUsername(
  username: string,
): Promise<UserSettings | null> {
  const settings = await fetch(`${API_URL}/settings/${username}`, {
    headers: {
      "Client-ID": CLIENT_ID,
    },
  });

  if (settings.ok) {
    return (await settings.json()) as UserSettings;
  }
  return null;
}

async function getUserChatColor(
  accessToken: string,
  userId: number,
): Promise<string | null> {
  const usernameColorRequest = await fetch(
    `${TWITCH_API_URL}/chat/color?user_id=${userId}`,
    {
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (usernameColorRequest.ok) {
    const response: ColorChatUser = await usernameColorRequest.json();
    return response.data[0].color;
  }
  return "gray";
}

async function getTwitchUserByAccessToken(
  accessToken: string,
): Promise<TwitchUser> {
  const authenticatedUser = await fetch(`${TWITCH_API_URL}/users`, {
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let user = await authenticatedUser.json();
  user = user.data[0] as TwitchUser;
  user.id = Number.parseInt(user.id);
  return user;
}

/**
 * Authenticate with Twitch using OAuth2
 *
 * @returns string - Access Token
 */
async function authenticateWithTwitch() {
  const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user:read:email`;

  const redirectURL = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url: AUTH_URL,
  });

  const urlParams = new URLSearchParams(redirectURL);
  return urlParams.entries().next().value[1];
}

export default handler;
