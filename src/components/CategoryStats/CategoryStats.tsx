import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { selectNotes } from "../../redux/money/selectors";
import { useEffect } from "react";
import {
  Block,
  Btn,
  Icon,
  List,
  Sum,
  Title,
  Wrapper,
} from "./CategoryStatsStyled";
import { dataS, dataG } from "../Entering/data";

interface Month {
  year: number;
  month: number;
}

interface CategoriesStatesProps {
  currentDate: Month;
  currentCategory: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryStats = ({
  currentDate,
  setCurrentCategory,
  currentCategory,
}: CategoriesStatesProps) => {
  const location = useLocation();
  const notes = useAppSelector((state) => selectNotes(state.money));

  useEffect(() => {
    setCurrentCategory(
      location.pathname === "/categories/getMoney"
        ? "salary"
        : location.pathname === "/categories/spendMoney"
          ? "transport"
          : "",
    );
  }, [location]);

  const array = notes
    .filter(({ type }) => {
      if (location.pathname === "/categories/getMoney") {
        return type === "+";
      } else if (location.pathname === "/categories/spendMoney") {
        return type === "-";
      } else {
        return;
      }
    })
    .filter(({ date }: { date: string }) => {
      return (
        new Date(date).getMonth() + 1 === currentDate?.month &&
        new Date(date).getFullYear() === currentDate?.year
      );
    });

  const getSum = (myCategory: string) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(
        Number.parseFloat(
          array
            .filter(
              ({ category }: { category: string }) => category === myCategory,
            )
            .reduce(
              (sum: any, { amount }: { amount: number }) => sum + amount,
              0,
            ),
        ),
      )
      .replace(/,/g, " ");
  };

  return (
    <List>
      {location.pathname === "/categories/getMoney" ? (
        <>
          {dataG.map(({ label, id }: { label: string; id: string }) => (
            <li key={id}>
              <Btn onClick={() => setCurrentCategory(`${id}`)}>
                <Sum>{getSum(`${id}`)}</Sum>
                <Wrapper>
                  <Block
                    style={{
                      backgroundColor:
                        currentCategory === `${id}` ? "#FFDAC0" : "#F5F6FB",
                    }}
                  ></Block>
                  <Icon
                    style={{
                      fill: currentCategory === `${id}` ? "#FF751D" : "#071F41",
                    }}
                    width="56"
                    height="56"
                  >
                    <use href={`#${id}`}></use>
                  </Icon>
                </Wrapper>
                <Title>{label}</Title>
              </Btn>
            </li>
          ))}
        </>
      ) : location.pathname === "/categories/spendMoney" ? (
        <>
          {dataS.map(({ label, id }: { label: string; id: string }) => (
            <li key={id}>
              <Btn onClick={() => setCurrentCategory(`${id}`)}>
                <Sum>{getSum(`${id}`)}</Sum>
                <Wrapper>
                  <Block
                    style={{
                      backgroundColor:
                        currentCategory === `${id}` ? "#FFDAC0" : "#F5F6FB",
                    }}
                  ></Block>
                  <Icon
                    style={{
                      fill: currentCategory === `${id}` ? "#FF751D" : "#071F41",
                    }}
                    width="56"
                    height="56"
                  >
                    <use href={`#${id}`}></use>
                  </Icon>
                </Wrapper>
                <Title>{label}</Title>
              </Btn>
            </li>
          ))}
        </>
      ) : (
        <></>
      )}
    </List>
  );
};
