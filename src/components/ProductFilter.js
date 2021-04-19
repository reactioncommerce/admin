import {
  ReferenceInput,
  SelectInput,
  TextInput,
  Filter
} from "react-admin";

const ProductFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export default ProductFilter;
