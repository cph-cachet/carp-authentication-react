import { User, WebStorageStateStore } from 'oidc-client-ts';
export declare const oidcConfig: {
    authority: string;
    client_id: string;
    redirect_uri: string;
    userStore: WebStorageStateStore;
    onSigninCallback: (_user: User | void) => void;
};
