import { z } from "zod";

export interface OidcProcessEnvs {
  readonly VITE_KEYCLOAK_URL: string;
  readonly VITE_KEYCLOAK_REALM: string;
  readonly VITE_KEYCLOAK_CLIENT_ID: string;
  readonly VITE_KEYCLOAK_REDIRECT_URI: string;
}

const envSchema = z.object({
  VITE_KEYCLOAK_URL: z.string(),
  VITE_KEYCLOAK_REALM: z.string(),
  VITE_KEYCLOAK_CLIENT_ID: z.string(),
  VITE_KEYCLOAK_REDIRECT_URI: z.string(),
});

export const loadEnv = (processEnv: OidcProcessEnvs) => envSchema.parse(processEnv);
