"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oidcConfig = void 0;
const oidc_client_ts_1 = require("oidc-client-ts");
const env_1 = require("./utils/env");
exports.oidcConfig = {
    authority: `${env_1.env.VITE_KEYCLOAK_URL}/realms/${env_1.env.VITE_KEYCLOAK_REALM}`,
    client_id: env_1.env.VITE_KEYCLOAK_CLIENT_ID,
    redirect_uri: env_1.env.VITE_KEYCLOAK_REDIRECT_URI,
    userStore: new oidc_client_ts_1.WebStorageStateStore({ store: window.localStorage }),
    onSigninCallback: (_user) => {
        window.history.replaceState({}, document.title, window.location.pathname);
    },
};
