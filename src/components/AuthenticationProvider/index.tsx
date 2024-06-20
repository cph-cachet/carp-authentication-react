import { AxiosRequestConfig } from "axios";
import { User, WebStorageStateStore } from "oidc-client-ts";
import React, { useEffect, useState } from "react";
import { AuthProvider, AuthProviderProps, hasAuthParams, useAuth } from "react-oidc-context";

type Props = {
  children: React.ReactNode;
  config: AuthProviderProps;
};

let authConfig: AuthProviderProps;

export const getUser = () => {
  const localStorageKey = `oidc.user:${authConfig.authority}:${
    authConfig.client_id
  }`;
  const oidcStorage = localStorage.getItem(localStorageKey);

  if (!oidcStorage) {
    return null;
  }
  return User.fromStorageString(oidcStorage);
};

export const getConfig = () => {
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

const AutoSignIn = ({ children } : { children: React.ReactNode}) => {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  return <>{children}</>;
};

export const AuthenticationProvider = ({ children, config }: Props) => {
  authConfig = config;
  const oidcConfig = {
    ...config,
    userStore: config.userStore ?? new WebStorageStateStore({ store: window.localStorage }),
    onSigninCallback: config.onSigninCallback ?? ((_user: User | void): void => {
      window.history.replaceState({}, document.title, window.location.pathname);
    }),
  };
  
  return (
    <AuthProvider {...oidcConfig}>
      <AutoSignIn>
        {children}
      </AutoSignIn>
    </AuthProvider>
  );
};
