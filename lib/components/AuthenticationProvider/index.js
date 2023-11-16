"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationProvider = exports.useAuthentication = exports.AuthenticationContext = void 0;
const oidc_client_ts_1 = require("oidc-client-ts");
const react_1 = require("react");
const env_1 = require("../../utils/env");
const react_oidc_context_1 = require("react-oidc-context");
const authenticator_1 = require("../../authenticator");
const react_2 = require("react");
exports.AuthenticationContext = (0, react_1.createContext)({});
const useAuthentication = () => {
    return (0, react_1.useContext)(exports.AuthenticationContext);
};
exports.useAuthentication = useAuthentication;
const AuthenticationProvider = ({ children }) => {
    const getUser = () => {
        const localStorageKey = `oidc.user:${env_1.env.VITE_KEYCLOAK_URL}/realms/${env_1.env.VITE_KEYCLOAK_REALM}:${env_1.env.VITE_KEYCLOAK_CLIENT_ID}`;
        const oidcStorage = localStorage.getItem(localStorageKey);
        if (!oidcStorage) {
            return null;
        }
        return oidc_client_ts_1.User.fromStorageString(oidcStorage);
    };
    const getConfig = () => {
        var _a;
        const token = (_a = getUser()) === null || _a === void 0 ? void 0 : _a.access_token;
        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (token) {
            config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
        }
        return config;
    };
    return (<exports.AuthenticationContext.Provider value={{
            getUser,
            getConfig,
        }}>
        <react_oidc_context_1.AuthProvider {...authenticator_1.oidcConfig}>
          {children}
        </react_oidc_context_1.AuthProvider>
    </exports.AuthenticationContext.Provider>);
};
exports.AuthenticationProvider = AuthenticationProvider;
