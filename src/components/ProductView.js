import * as React from "react";
import {
  Show,
  TextField,
  SimpleShowLayout,
  BooleanField
} from "react-admin";

// eslint-disable-next-line react/prop-types
const ProductTitle = ({ record }) => <span>{record.title}</span>;

/**
 * Displays single product.
 * @param {object} props Product data.
 * @returns {Component} Component listing one product.
 */
export function ProductView(props) {
  return (
    <Show title={<ProductTitle/>} {...props}>
      <SimpleShowLayout>
        <TextField source="title" lable="Product"/>
        <TextField source="slug" label="Permalink"/>
        <TextField source="pageTitle" label="Subtitle"/>
        <TextField source="vendor" />
        <TextField source="description" />
        <TextField source="originCountry" label="Origin Country"/>
        <BooleanField source="shouldAppearInSitemap" label="Included in sitemap?"/>
      </SimpleShowLayout>
    </Show>
  );
}

