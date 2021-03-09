import * as React from "react";
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const AdminHome = () => <Admin dataProvider={dataProvider} />;

export default AdminHome;