import { useLocation } from "react-router-dom";
import { Icon, LinkStyled, Text } from "./NavigationHomeStyled";
import { getTransactionSection } from "../../utils/routes";

export const NavigateHome = () => {
  const location = useLocation();
  const section = getTransactionSection(location.pathname) ?? "spendMoney";
  return (
    <LinkStyled to={`/${section}`}>
      <Icon width="24" height="24">
        <use href="#backarrow"></use>
      </Icon>
      <Text>Повернутись на головну</Text>
    </LinkStyled>
  );
};
