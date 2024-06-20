# CARP Authenticator React

A wrapper for [oidc-client-ts](https://github.com/authts/oidc-client-ts) and [react-oidc-context](https://github.com/authts/react-oidc-context) for shared authentication config and logic across CARP react projects

## Installation
```sh
bun i @carp-dk/authentication-react
```

## Usage
```tsx
// src/index.tsx
import { AuthenticationProvider } from '@carp-dk/authentication-react';
import App from './pages/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <AuthenticationProvider
        config={{
            authority: "<your authority>",
            client_id: "<your client id>",
            redirect_uri: "<your redirect uri>",
        }}
    >
        <App />
    </AuthenticationProvider>
);
```

## Folder Structure
Source code is found under [src](src), components are found in [components/](src/components/) and each component should have it's own folder. Utility functions should reside inside [utils/](src/utils/) folder.
