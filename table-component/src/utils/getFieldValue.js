export default (field, item) => {
  const { customValue = x => x } = field;
  console.log(field);
  console.log(item);
  if (field.$referencePath) {
    return customValue(field.$referenceMapper(item));
  }

  return customValue(item[field.value]);
};
