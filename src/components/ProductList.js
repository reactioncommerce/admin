import * as React from "react";
import {
  ShowButton,
  List,
  Datagrid,
  BooleanField,
  TextField,
  EditButton
} from "react-admin";
import ProductFilter from "./ProductFilter";

export default class ProductList extends React.Component {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    return (
      <List {...this.props} filters={<ProductFilter />}>
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
}
