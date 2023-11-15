import { User, WebStorageStateStore } from 'oidc-client-ts';
import { env } from './utils/env';

export const oidcConfig = {
  authority: `${env.VITE_KEYCLOAK_URL}/realms/${
    env.VITE_KEYCLOAK_REALM
  }`,
  client_id: env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: env.VITE_KEYCLOAK_REDIRECT_URI,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
