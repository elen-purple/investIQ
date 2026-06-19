import { useLocation } from "react-router-dom";
import { Icon, LinkStyled, Text } from "./NavigationHomeStyled";

export const NavigateHome = () => {
  const location = useLocation();
  return (
    <LinkStyled to={`/${location.pathname.split("/")[2]}`}>
      <Icon width="24" height="24">
        <use href="#backarrow"></use>
      </Icon>
      <Text>Повернутись на головну</Text>
    </LinkStyled>
  );
};
