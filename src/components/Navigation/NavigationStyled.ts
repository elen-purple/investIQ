import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavLinks = styled.ul`
  display: flex;
`;

export const NavLinkStyled = styled(NavLink)`
  width: 141px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors.primaryBg};
  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.secondaryBg};

  &.active {
    color: ${({ theme }) => theme.colors.accentBg};
  }

  @media screen and (min-width: 703px) {
    width: 138px;
    background-color: #fafbfd;
    border-radius: 20px 20px 0 0;
    border: none;
    &.active {
      color: ${({ theme }) => theme.colors.accentBg};
      background-color: ${({ theme }) => theme.colors.primaryBg};
    }
  }
`;
