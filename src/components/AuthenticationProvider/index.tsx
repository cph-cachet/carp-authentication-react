import { AxiosRequestConfig } from "axios";
import { User, WebStorageStateStore } from "oidc-client-ts";
import { createContext, useContext } from "react";
import { loadEnv } from "../../utils/env";
import { AuthProvider } from "react-oidc-context";
import React from "react";

type Props = {
  children: React.ReactNode;
  processEnv: any;
};

interface AuthenticationContextType {
  getUser: () => User | null,
  getConfig: () => AxiosRequestConfig,
}

export const AuthenticationContext = createContext({} as AuthenticationContextType)

export const useAuthentication = (): AuthenticationContextType => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children, processEnv }: Props) => {
  const env = loadEnv(processEnv)
  const getUser = () => {
    const localStorageKey = `oidc.user:${
      env.VITE_KEYCLOAK_URL
    }/realms/${env.VITE_KEYCLOAK_REALM}:${
      env.VITE_KEYCLOAK_CLIENT_ID
    }`;
    const oidcStorage = localStorage.getItem(localStorageKey);
  
    if (!oidcStorage) {
      return null;
    }
    return User.fromStorageString(oidcStorage);
  };
  
  const getConfig = () => {
    const token = getUser()?.access_token;
    let config: AxiosRequestConfig = {
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

  const getOidcConfig = () => {
    return {
    authority: `${env.VITE_KEYCLOAK_URL}/realms/${
      env.VITE_KEYCLOAK_REALM
    }`,
    client_id: env.VITE_KEYCLOAK_CLIENT_ID,
    redirect_uri: env.VITE_KEYCLOAK_REDIRECT_URI,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    onSigninCallback: (_user: User | void): void => {
      window.history.replaceState({}, document.title, window.location.pathname);
    },
  };}

  return (
    <AuthenticationContext.Provider
      value={{
        getUser,
        getConfig,
      }}>
        <AuthProvider {...getOidcConfig()}>
          {children}
        </AuthProvider>
    </AuthenticationContext.Provider>
  );
};
