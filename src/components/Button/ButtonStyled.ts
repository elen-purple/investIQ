import styled from "styled-components";

export const Btn = styled.button`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 13px 0;
  border-radius: 16px;
  width: 125px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
