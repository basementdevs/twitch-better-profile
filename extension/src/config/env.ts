import { z, ZodError } from "zod"

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
  PLASMO_PUBLIC_API_URL: z
    .string()
    .trim()
    .min(1, "PLASMO_PUBLIC_API_URL is missing or empty")
})

const mapZodErrorMessages = (zodError: ZodError): string[] => {
  return zodError.errors.map((error) => {
    const path = error.path.length ? error.path.join(".") : "root"
    return `Invalid value at ${path}: ${error.message}`
  })
}

const env = envSchema.safeParse(envVariables)

if (!env.success) {
  if (env.error instanceof ZodError) {
    const issues = mapZodErrorMessages(env.error)
    console.error(
      "Invalid environment variables:",
      JSON.stringify(issues, null, 2)
    )
  }
  throw new Error("Invalid environment variables")
}

export default env.data
