import * as z from "zod"

const envVariables = {
  PLASMO_PUBLIC_TWITCH_CLIENT_ID: process.env.PLASMO_PUBLIC_TWITCH_CLIENT_ID,
  PLASMO_PUBLIC_TWITCH_API_URL: process.env.PLASMO_PUBLIC_TWITCH_API_URL,
  PLASMO_PUBLIC_API_URL: process.env.PLASMO_PUBLIC_API_URL
}

const envSchema = z.object({
  PLASMO_PUBLIC_TWITCH_CLIENT_ID: z
    .string()
    .trim()
    .min(1, "PLASMO_PUBLIC_TWITCH_CLIENT_ID is missing or empty"),
  PLASMO_PUBLIC_TWITCH_API_URL: z
    .string()
    .trim()
    .min(1, "PLASMO_PUBLIC_TWITCH_API_URL is missing or empty"),
  PLASMO_PUBLIC_API_URL: z.string()
})

const env = envSchema.safeParse(envVariables)

if (!env.success) {
  console.error(
    "Invalid environment variables:",
    JSON.stringify(env.error.format(), null, 2)
  )
  throw new Error("Invalid environment variables")
}

export default env.data
