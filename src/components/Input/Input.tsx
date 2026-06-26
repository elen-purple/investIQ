import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { Error, InputStyled, Label, Text } from "./InputStyled";

interface InputProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  values: string;
  errors: string | null | undefined;
  touched: boolean | undefined;
  type: HTMLInputTypeAttribute;
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
9;
