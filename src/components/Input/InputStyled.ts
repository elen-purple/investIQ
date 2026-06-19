import styled from "styled-components";

export const Label = styled.label`
  position: relative;
  margin-bottom: 30px;
  display: block;
  &:last-child {
    margin-bottom: 40px;
  }
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${(props: any) => props.theme.colors.primaryColor};
  margin-bottom: 10px;
`;

export const InputStyled = styled.input`
  border-radius: 30px;
  width: 100%;
  height: 52px;
  background-color: ${(props: any) => props.theme.colors.secondaryBg};
  border: none;
  padding: 0 20px;

  &::placeholder {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.04em;
    color: #a6abb9;
  }
`;

export const Error = styled.p`
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 0.04em;
  color: ${(props: any) => props.theme.colors.errorColor};
  position: absolute;
  top: 80px;
  left: 0;
`;
