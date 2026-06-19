import { NavLinks, NavLinkStyled } from "./NavigationStyled";

export const Navigation = () => {
  return (
    <NavLinks>
      <li>
        <NavLinkStyled to="spendMoney">Витрати</NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to="getMoney">Дохід</NavLinkStyled>
      </li>
    </NavLinks>
  );
};
