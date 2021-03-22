/* eslint-disable */
import "./App.css";
import { Admin } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import React from "react";

/**
 * Initial setup of react-admin home.
 * @returns {Component} react-admin for boilerplate
 */

function App() {
  const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
  return (
    <div className="App">
      <Admin dataProvider={dataProvider} />
    </div>
  );
}

export default App;
