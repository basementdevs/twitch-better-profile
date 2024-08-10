import { ZodError, z } from "zod";

const raw_env = {
  PLASMO_PUBLIC_TWITCH_CLIENT_ID: process.env.PLASMO_PUBLIC_TWITCH_CLIENT_ID,
  PLASMO_PUBLIC_TWITCH_API_URL: process.env.PLASMO_PUBLIC_TWITCH_API_URL,
  PLASMO_PUBLIC_API_URL: process.env.PLASMO_PUBLIC_API_URL,
  APP_ENVIRONMENT: process.env.PLASMO_PUBLIC_ENVIRONMENT,
  APP_STAGE: process.env.PLASMO_PUBLIC_STAGE,
};

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
    .min(1, "PLASMO_PUBLIC_API_URL is missing or empty"),
  APP_ENVIRONMENT: z
      .string()
      .trim()
      .min(1, "PLASMO_PUBLIC_ENVIRONMENT is missing or empty"),
  APP_STAGE: z
      .string()
      .trim()
      .min(1, "PLASMO_PUBLIC_STAGE is missing or empty"),
});

const mapZodErrorMessages = (zodError: ZodError): string[] => {
  return zodError.errors.map((error) => {
    const path = error.path.length ? error.path.join(".") : "root";
    return `Invalid value at ${path}: ${error.message}`;
  });
};

const env = envSchema.safeParse(raw_env);

if (!env.success) {
  if (env.error instanceof ZodError) {
    const issues = mapZodErrorMessages(env.error);
    console.error(
      "Invalid environment variables:",
      JSON.stringify(issues, null, 2),
    );
  }
  throw new Error("Invalid environment variables");
}

export { env };
