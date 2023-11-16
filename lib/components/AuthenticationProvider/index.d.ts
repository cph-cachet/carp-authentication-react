import { AxiosRequestConfig } from "axios";
import { User } from "oidc-client-ts";
import React from "react";
type Props = {
    children: React.ReactNode;
};
interface AuthenticationContextType {
    getUser: () => User | null;
    getConfig: () => AxiosRequestConfig;
}
export declare const AuthenticationContext: import("react").Context<AuthenticationContextType>;
export declare const useAuthentication: () => AuthenticationContextType;
export declare const AuthenticationProvider: ({ children }: Props) => JSX.Element;
export {};
