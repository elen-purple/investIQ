import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkStyled = styled(Link)`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

export const Text = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.balanceText};
  padding-top: 7px;
`;

export const Icon = styled.svg`
  fill: ${({ theme }) => theme.colors.secondaryText};
`;
