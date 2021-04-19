/* eslint-disable node/no-extraneous-import */
import PropTypes from "prop-types";
import {
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput
} from "react-admin";

const PostTitle = ({ record }) => <span>Post {record ? `"${record.title}"` : ""}</span>;

PostTitle.propTypes = {
  record: PropTypes.object
};

const ProductEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
