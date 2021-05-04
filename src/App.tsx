/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  params: any
) => Promise<any>;

class App extends Component<Record<string, any>, { dataProvider: LegacyDataProvider | any, ready: boolean }> {
  constructor(props: Record<string, any> | Readonly<Record<string, any>>) {
    super(props);
    this.state = {
      dataProvider: (type: string, resource: string, params: any) => Promise.resolve(),
      ready: false
    };
  }

  async componentDidMount() {
    const dataProvider = await dataProviderFactory();
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ dataProvider, ready: true });
  }

  render() {
    const { dataProvider, ready } = this.state;

    // Create OIDC props to be used on the AuthenticationProvider
    const authenticationProviderProps = getOidcProps(
      "open-commerce-admin",
      "http://localhost:4444",
      "http://localhost:4080"
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
