/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { oidcLog } from "@axa-fr/react-oidc-context";

const makeAbsolute = (relativeUrl: string, rootUrl: string) => {
  const url = new URL(relativeUrl, rootUrl); // eslint-disable-line node/no-unsupported-features/node-builtins
  return url.href;
};

/**
 * Generate props for the Oidc AuthenticationProvider
 * @param {String} oidcClientId OIDC client id
 * @param {String} oidcUrl OIDC url
 * @param {String} rootUrl Webapp root url
 * @returns {Object} An object containing props for the Oidc AuthenticationProvider
 */
export function getOidcProps(oidcClientId: string, oidcUrl: string, rootUrl: string, ...otherProps: any[]) {
  /* eslint-disable camelcase */
  const oidcConfiguration = {
    client_id: oidcClientId,
    redirect_uri: makeAbsolute("/authentication/callback", rootUrl),
    response_type: "code",
    post_logout_redirect_uri: rootUrl,
    scope: "openid",
    authority: oidcUrl,
    silent_redirect_uri: makeAbsolute("/authentication/silent_callback", rootUrl),
    automaticSilentRenew: true,
    loadUserInfo: true,
    triggerAuthFlow: true
  };
<<<<<<< HEAD
  console.log("oidcConfiguration", oidcConfiguration);
=======
>>>>>>> 96ac46e90be9b9d81b8cd79cd42932a19c2818cd
  /* eslint-enable camelcase */

  return {
    configuration: oidcConfiguration,
    // NONE, ERROR, WARN, INFO, DEBUG
    // Change to DEBUG temporarily if you're debugging an issue with login/logout/auth
<<<<<<< HEAD
    loggerLevel: oidcLog.DEBUG,
=======
    loggerLevel: oidcLog.NONE,
>>>>>>> 96ac46e90be9b9d81b8cd79cd42932a19c2818cd
    // These are components for which the @axa-fr/react-oidc-context package shows
    // default text if we don't override these. We don't really need them since in
    // our situation they're only shown for a second.
    authenticating: () => null,
    callbackComponentOverride: () => null,
    notAuthenticated: () => null,
    notAuthorized: () => null,
    sessionLostComponent: () => null,
    ...otherProps
  };
}
