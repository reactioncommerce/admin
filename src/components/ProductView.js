export default PostShow = (props) => (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="title" />
        <TextField source="teaser" />
        <RichTextField source="body" />
        <DateField label="Publication date" source="created_at" />
      </SimpleShowLayout>
    </Show>
  );
  