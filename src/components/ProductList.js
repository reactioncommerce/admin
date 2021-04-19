import * as React from "react";
import {
  ShowButton,
  List,
  Datagrid,
  ReferenceField,
  TextField,
  EditButton
} from "react-admin";
import ProductFilter from "./ProductFilter";

export default class ProductList extends React.Component {
  render() {
    return (
      <List {...this.props} filters={<ProductFilter />}>
        <Datagrid>
          <TextField source="id" />
          <ReferenceField label="User" source="userId" reference="Users">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="title" />
          <EditButton />
          <ShowButton />
        </Datagrid>
      </List>);
  }
}
