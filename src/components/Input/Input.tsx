import { Error, InputStyled, Label, Text } from "./InputStyled";

export const Input = ({
  handleChange,
  values,
  errors,
  touched,
  type,
  placeholder,
  label,
}: any) => {
  return (
    <Label>
      <Text>{label}</Text>
      <InputStyled
        type="text"
        name={type}
        onChange={handleChange}
        value={values}
        placeholder={placeholder}
      />
      <Error>{errors && touched && errors}</Error>
    </Label>
  );
};
