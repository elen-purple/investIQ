import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;

  @media screen and (min-width: 1098px) {
    margin-right: 144px;
  }
`;

export const Icon = styled.svg`
  fill: ${({ theme }) => theme.colors.accentBg};
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.balanceText};
  display: none;

  @media screen and (min-width: 703px) {
    display: block;
  }
`;
