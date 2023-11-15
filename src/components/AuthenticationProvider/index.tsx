import { AxiosRequestConfig } from "axios";
import { User } from "oidc-client-ts";
import { createContext, useContext } from "react";
import { env } from "../../utils/env";
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "../../authenticator";
import React from "react";

type Props = {
  children: React.ReactNode;
};

interface AuthenticationContextType {
  getUser: () => User | null,
  getConfig: () => AxiosRequestConfig,
}

export const AuthenticationContext = createContext({} as AuthenticationContextType)

export const useAuthentication = (): AuthenticationContextType => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }: Props) => {
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

  return (
    <AuthenticationContext.Provider
      value={{
        getUser,
        getConfig,
      }}>
        <AuthProvider {...oidcConfig}>
          {children}
        </AuthProvider>
    </AuthenticationContext.Provider>
  );
};
