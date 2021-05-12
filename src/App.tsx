import React, { Component } from "react";
import { AuthenticationProvider, OidcSecure } from "@axa-fr/react-oidc-context";
import { Admin, Resource } from "react-admin";
import { getOidcProps } from "./lib/authentication";
import "./App.css";
import dataProviderFactory from "./lib/dataProvider";
import ProductCreate from "./components/ProductCreate";
import ProductList from "./components/ProductList";
import { ProductView as ProductShow } from "./components/ProductView";

type LegacyDataProvider = (
  type: string,
  resource: string,
  params: unknown
) => Promise<unknown>;

class App extends Component<Record<string, unknown>, { dataProvider: LegacyDataProvider, ready: boolean }> {
  constructor(props: Record<string, unknown> | Readonly<Record<string, unknown>>) {
    super(props);
    this.state = {
      dataProvider: () => Promise.resolve(),
      ready: false
    };
  }

  async componentDidMount() {
    dataProviderFactory().then((data: LegacyDataProvider) => this.setState({ dataProvider: data, ready: true })).catch((err: string) => {
      throw new Error(err);
    });
  }

  render() {
    const { dataProvider, ready } = this.state;

    // Create OIDC props to be used on the AuthenticationProvider
    const authenticationProviderProps = getOidcProps(
      process.env.PUBLIC_OIDC_CLIENT_ID ? process.env.PUBLIC_OIDC_CLIENT_ID : "open-commerce-admin",
      process.env.PUBLIC_OIDC_URL ? process.env.PUBLIC_OIDC_URL : "http://localhost:4444",
      process.env.PUBLIC_ROOT_URL ? process.env.PUBLIC_ROOT_URL : "http://localhost:4080"
    );

    if (!ready) {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      );
    }

    return (
      <div id="app">
        <AuthenticationProvider {...authenticationProviderProps}>
          <OidcSecure>
            <Admin dataProvider={dataProvider}>
              <Resource name="Products" list={ProductList} show={ProductShow}
                create={ProductCreate}
              />
            </Admin>
          </OidcSecure>
        </AuthenticationProvider>
      </div>
    );
  }
}

export default App;
