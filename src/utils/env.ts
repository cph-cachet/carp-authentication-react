import { z } from "zod";

const envSchema = z.object({
  VITE_KEYCLOAK_URL: z.string(),
  VITE_KEYCLOAK_REALM: z.string(),
  VITE_KEYCLOAK_CLIENT_ID: z.string(),
  VITE_KEYCLOAK_REDIRECT_URI: z.string(),
});

export const loadEnv = (processEnv: any) => envSchema.parse(processEnv);