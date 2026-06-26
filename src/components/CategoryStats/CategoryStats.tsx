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
import type { CategoryId } from "../../constants/categories";
import { getDefaultCategory, getTransactionType } from "../../utils/routes";

interface Month {
  year: number;
  month: number;
}

interface CategoriesStatesProps {
  currentDate: Month;
  currentCategory: CategoryId | null;
  setCurrentCategory: React.Dispatch<React.SetStateAction<CategoryId | null>>;
}

export const CategoryStats = ({
  currentDate,
  setCurrentCategory,
  currentCategory,
}: CategoriesStatesProps) => {
  const location = useLocation();
  const { pathname } = location;
  const transactionType = getTransactionType(pathname);
  const notes = useAppSelector((state) => selectNotes(state.money));

  useEffect(() => {
    setCurrentCategory(getDefaultCategory(pathname));
  }, [pathname, setCurrentCategory]);

  const array = notes
    .filter(({ type }) => {
      return transactionType !== null && type === transactionType;
    })
    .filter(({ date }: { date: string }) => {
      return (
        new Date(date).getMonth() + 1 === currentDate?.month &&
        new Date(date).getFullYear() === currentDate?.year
      );
    });

  const getSum = (myCategory: CategoryId) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(
        array
          .filter(({ category }) => category === myCategory)
          .reduce(
            (sum: number, { amount }: { amount: number }) => sum + amount,
            0,
          ),
      )
      .replace(/,/g, " ");
  };

  return (
    <List>
      {transactionType === "+" ? (
        <>
          {dataG.map(({ id }) => (
            <li key={id}>
              <Btn onClick={() => setCurrentCategory(id)}>
                <Sum>{getSum(id)}</Sum>
                <Wrapper>
                  <Block
                    style={{
                      backgroundColor:
                        currentCategory === id ? "#FFDAC0" : "#F5F6FB",
                    }}
                  ></Block>
                  <Icon
                    style={{
                      fill: currentCategory === id ? "#FF751D" : "#071F41",
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
      ) : transactionType === "-" ? (
        <>
          {dataS.map(({ id }) => (
            <li key={id}>
              <Btn onClick={() => setCurrentCategory(id)}>
                <Sum>{getSum(id)}</Sum>
                <Wrapper>
                  <Block
                    style={{
                      backgroundColor:
                        currentCategory === id ? "#FFDAC0" : "#F5F6FB",
                    }}
                  ></Block>
                  <Icon
                    style={{
                      fill: currentCategory === id ? "#FF751D" : "#071F41",
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
