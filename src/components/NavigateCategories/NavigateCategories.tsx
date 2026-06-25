import { useLocation } from "react-router-dom";
import { Icon, LinkStyled, Text } from "./NavigateCategoriesStyled";

export const NavigateCategories = () => {
  const location = useLocation();

  return (
    <LinkStyled
      to={`/categories/${location.pathname === "/getMoney" ? "getMoney" : "spendMoney"}`}
    >
      <Text>Перейти до розрахунків</Text>
      <Icon width="24" height="24">
        <use href="#chart"></use>
      </Icon>
    </LinkStyled>
  );
};
