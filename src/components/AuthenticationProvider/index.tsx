import { AxiosRequestConfig } from "axios";
import { User, WebStorageStateStore } from "oidc-client-ts";
import React, { useEffect, useState } from "react";
import { AuthProvider, hasAuthParams, useAuth } from "react-oidc-context";
import { OidcProcessEnvs, loadEnv } from "../../utils/env";

type Props = {
  children: React.ReactNode;
  processEnv: OidcProcessEnvs;
};

let env: OidcProcessEnvs;

export const getUser = () => {
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

export const AuthenticationProvider = ({ children, processEnv }: Props) => {
  env = loadEnv(processEnv)

  const oidcConfig = {
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

  return (
    <AuthProvider {...oidcConfig}>
      <AutoSignIn>
        {children}
      </AutoSignIn>
    </AuthProvider>
  );
};
