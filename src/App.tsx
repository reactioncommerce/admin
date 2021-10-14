import React, { Component } from "react";
import { Admin, Resource } from "react-admin";
import "./App.css";
import dataProviderFactory from "./lib/dataProvider";
import authProvider from "./authProvider";
import { ProductList } from "./components/ProductList";
import { ProductView as ProductShow } from "./components/ProductView";

type LegacyDataProvider = (
  type: string,
  resource: string,
  params: unknown
) => Promise<unknown>;

class App extends Component<
  Record<string, unknown>,
  { dataProvider: LegacyDataProvider; ready: boolean }
> {
  constructor(props: Record<string, unknown> | Readonly<Record<string, unknown>>) {
    super(props);
    this.state = {
      dataProvider: () => Promise.resolve(),
      ready: false
    };
  }

  async componentDidMount() {
    dataProviderFactory()
      .then((data: LegacyDataProvider) =>
        this.setState({ dataProvider: data, ready: true }))
      .catch((err: string) => {
        throw new Error(err);
      });
  }

  render() {
    const { dataProvider, ready } = this.state;

    if (!ready) {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      );
    }

    return (
      <div id="app">
        <Admin
          dataProvider={dataProvider}
          authProvider={authProvider}
        >
          <Resource name="Products" list={ProductList} show={ProductShow} />
        </Admin>
      </div>
    );
  }
}

export default App;
