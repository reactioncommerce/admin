/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import PropTypes from "prop-types";
import { AuthenticationProvider, OidcSecure } from "@axa-fr/react-oidc-context";
import "./App.css";
import { Admin } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { getOidcProps } from "./lib/authentication";

/**
 * Initial setup of react-admin home.
 * @returns {Component} react-admin for boilerplate
 */
function App() {
  // Create OIDC props to be used on the AuthenticationProvider
  const authenticationProviderProps = getOidcProps(
    "open-commerce-admin",
    "http://localhost:4444",
    "http://localhost:4080"
  );
  const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
  return (
    <div id="app">
      <AuthenticationProvider {...authenticationProviderProps}>
        <OidcSecure>
          <Admin dataProvider={dataProvider} />
        </OidcSecure>
      </AuthenticationProvider>
    </div>
  );
}

App.propTypes = {
  authenticationProviderProps: PropTypes.object
};

export default App;
