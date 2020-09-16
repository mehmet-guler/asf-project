import React,{useState} from 'react';
 
const FieldEditor = ({ value, onChange, id }) => {
  const handleChange = event => {
    const text = event.target.value;
    onChange(id, text);
  };

  return (
    <div className="field-editor">
      <input onChange={handleChange} value={value} />
    </div>
  );
};

const FormEditor = props => {
  const [values, setValues] = useState({});
  const handleFieldChange = (fieldId, value) => {
    setValues({ ...values, [fieldId]: value });
  };

  const fields = props.fields.map(field => (
    <FieldEditor
      key={field}
      id={field}
      onChange={handleFieldChange}
      value={values[field]}
    />
  ));

  return (
    <div>
      {fields}
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

// To add abillity to dynamically add/remove fields keep the list in state
const Test = () => {
  const fields = ["field1", "field2", "anotherField"];

  return <FormEditor fields={fields} />;
};
export default Test;