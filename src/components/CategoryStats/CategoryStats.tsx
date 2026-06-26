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
import { getCategoryLabel } from "../../constants/categories";

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
  const { pathname } = location;
  const notes = useAppSelector((state) => selectNotes(state.money));

  useEffect(() => {
    setCurrentCategory(
      pathname === "/categories/getMoney"
        ? "salary"
        : pathname === "/categories/spendMoney"
          ? "transport"
          : "",
    );
  }, [pathname, setCurrentCategory]);

  const array = notes
    .filter(({ type }) => {
      if (pathname === "/categories/getMoney") {
        return type === "+";
      } else if (pathname === "/categories/spendMoney") {
        return type === "-";
      } else {
        return false;
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
        array
          .filter(
            ({ category }: { category: string }) => category === myCategory,
          )
          .reduce(
            (sum: number, { amount }: { amount: number }) => sum + amount,
            0,
          ),
      )
      .replace(/,/g, " ");
  };

  return (
    <List>
      {pathname === "/categories/getMoney" ? (
        <>
          {dataG.map(({ id }: { id: string }) => (
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
                <Title>{getCategoryLabel(id)}</Title>
              </Btn>
            </li>
          ))}
        </>
      ) : pathname === "/categories/spendMoney" ? (
        <>
          {dataS.map(({ id }: { id: string }) => (
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
                <Title>{getCategoryLabel(id)}</Title>
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
