import * as React from "react";
import {
  Show,
  TextField,
  SimpleShowLayout,
  BooleanField
} from "react-admin";

// eslint-disable-next-line react/prop-types
const ProductTitle = ({ record }) => <span>{record.title}</span>;

export class ProductView extends React.Component {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    return (
      <Show title={<ProductTitle/>} {...this.props}>
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
}
