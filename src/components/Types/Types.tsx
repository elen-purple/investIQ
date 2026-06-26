import { NavLink, useLocation } from "react-router-dom";
import { Arrow, Slider, Text } from "./TypesStyled";

export const Types = () => {
  const location = useLocation();
  const type = location.pathname.split("/")[2];

  const targetType =
    type === "getMoney"
      ? "spendMoney"
      : type === "spendMoney"
        ? "getMoney"
        : "";

  return (
    <Slider>
      <NavLink to={targetType}>
        <Arrow width="16" height="10">
          <use href="#arrow"></use>
        </Arrow>
      </NavLink>
      <Text>
        {type === "getMoney"
          ? "Доходи"
          : type === "spendMoney"
            ? "Витрати"
            : ""}
      </Text>
      <NavLink to={targetType}>
        <Arrow width="16" height="10">
          <use href="#arrow"></use>
        </Arrow>
      </NavLink>
    </Slider>
  );
};
