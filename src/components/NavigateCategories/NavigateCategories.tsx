import { useLocation } from "react-router-dom";
import { Icon, LinkStyled, Text } from "./NavigateCategoriesStyled";
import { getTransactionSection } from "../../utils/routes";

export const NavigateCategories = () => {
  const location = useLocation();
  const section = getTransactionSection(location.pathname) ?? "spendMoney";

  return (
    <LinkStyled to={`/categories/${section}`}>
      <Text>Перейти до розрахунків</Text>
      <Icon width="24" height="24">
        <use href="#chart"></use>
      </Icon>
    </LinkStyled>
  );
};
