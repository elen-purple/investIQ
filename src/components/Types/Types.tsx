import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Arrow, Slider, Text } from "./TypesStyled";

export const Types = () => {
  const location = useLocation();
  const [type, setType] = useState<string>(location.pathname.split("/")[2]);

  useEffect(() => {
    setType(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <Slider>
      <NavLink
        to={
          type === "getMoney"
            ? "spendMoney"
            : type === "spendMoney"
              ? "getMoney"
              : ""
        }
      >
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
      <NavLink
        to={
          type === "getMoney"
            ? "spendMoney"
            : type === "spendMoney"
              ? "getMoney"
              : ""
        }
      >
        <Arrow width="16" height="10">
          <use href="#arrow"></use>
        </Arrow>
      </NavLink>
    </Slider>
  );
};
