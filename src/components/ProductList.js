import * as React from "react";
import {
  ShowButton,
  List,
  Datagrid,
  BooleanField,
  TextField,
  EditButton
} from "react-admin";

/**
 * List of all products.
 * @param {object} props Products data.
 * @returns {Component} Component listing all products.
 */
export function ProductList(props) {
  return (
    <List {...props} >
      <Datagrid>
        <TextField source="title" lable="Product"/>
        <TextField source="description" />
        <TextField source="pricing.displayPrice" label="Price"/>
        <BooleanField source="isVisible" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>);
}

