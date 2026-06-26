import { Error, InputStyled, Label, Text } from "./InputStyled";

interface InputProps {
  handleChange: any;
  values: string;
  errors: string | undefined;
  touched: any | undefined;
  type: string;
  placeholder: string;
  label: string;
}

export const Input = ({
  handleChange,
  values,
  errors,
  touched,
  type,
  placeholder,
  label,
}: InputProps) => {
  return (
    <Label>
      <Text>{label}</Text>
      <InputStyled
        type={type}
        name={type}
        onChange={handleChange}
        value={values}
        placeholder={placeholder}
      />
      <Error>{errors && touched && errors}</Error>
    </Label>
  );
};
