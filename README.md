# CARP Authenticator React

A library for CACHET Research Platform (CARP) application for easier authentication.

## Technical Overview
The project uses [oidc-client-ts](https://github.com/authts/oidc-client-ts) and [react-oidc-context](https://github.com/authts/react-oidc-context) packages to make a custom authentication context.

## Folder Structure
Source code is found under [src](src), components are found in [components/](src/components/) and each component should have it's own folder. Utility functions should reside inside [utils/](src/utils/) folder.

## Publishing
In order to publish the client as an npm package in Github packages, follow the following steps:
- Install the node modules if they don't exist, using `npm i`
- Build the package using `npm run build`
- Publish the package using either `npm run publish-patch`, `npm run publish-minor` or `npm run publish-major` (depending the scope of the change) ONLY FOR PRODUCTION builds and `npm run publish-dev` for test builds.
    > **Note**<br/>
    > Publish scripts will automaticly increment the version, push them to the repository and publish the package.
    
    > **Note**<br/>
    > If you don't want to update the "latest" version and simply want to publish the client to test on another application such as the dashboard, you can edit the version to something like `1.0.0-dev-branchname`, than publish it with `npm publish`. Then in the application you can test in, you can run `npm install @cph-cachet/carp.authentication@1.0.0-dev-branchname` to install the version you published.
