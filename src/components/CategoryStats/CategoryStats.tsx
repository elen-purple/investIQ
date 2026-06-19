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
          ? "products"
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
            .filter(({ category }: any) => category === myCategory)
            .reduce((sum: any, { amount }: any) => sum + amount, 0),
        ),
      )
      .replace(/,/g, " ");
  };

  return (
    <List>
      {location.pathname === "/categories/getMoney" ? (
        <>
          <li>
            <Btn onClick={() => setCurrentCategory("salary")}>
              <Sum>{getSum("salary")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "salary" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill: currentCategory === "salary" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#salary"></use>
                </Icon>
              </Wrapper>
              <Title>ЗП</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("addition")}>
              <Sum>{getSum("addition")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "addition" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill:
                      currentCategory === "addition" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#addition"></use>
                </Icon>
              </Wrapper>

              <Title>Дод. прибуток</Title>
            </Btn>
          </li>
        </>
      ) : location.pathname === "/categories/spendMoney" ? (
        <>
          <li>
            <Btn onClick={() => setCurrentCategory("products")}>
              <Sum>{getSum("products")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "products" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill:
                      currentCategory === "products" ? "#FF751D" : "#071F41",
                  }}
                  width="65"
                  height="56"
                >
                  <use href="#products"></use>
                </Icon>
              </Wrapper>

              <Title>Продукти</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("alcohole")}>
              <Sum>{getSum("alcohole")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "alcohole" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill:
                      currentCategory === "alcohole" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#alcohole"></use>
                </Icon>
              </Wrapper>

              <Title>Алкоголь</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("entertaining")}>
              <Sum>{getSum("entertaining")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "entertaining"
                        ? "#FFDAC0"
                        : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill:
                      currentCategory === "entertaining"
                        ? "#FF751D"
                        : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#entertaining"></use>
                </Icon>
              </Wrapper>

              <Title>розваги</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("health")}>
              <Sum>{getSum("health")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "health" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill: currentCategory === "health" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#health"></use>
                </Icon>
              </Wrapper>

              <Title>здоров’я</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("transport")}>
              <Sum>{getSum("transport")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "transport" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill:
                      currentCategory === "transport" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#transport"></use>
                </Icon>
              </Wrapper>

              <Title>Транспорт</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("home")}>
              <Sum>{getSum("home")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "home" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill: currentCategory === "home" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#home"></use>
                </Icon>
              </Wrapper>

              <Title>все для дому</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("technic")}>
              <Sum>{getSum("technic")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "technic" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill: currentCategory === "technic" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#technic"></use>
                </Icon>
              </Wrapper>

              <Title>техніка</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("connection")}>
              <Sum>{getSum("connection")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "connection" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill:
                      currentCategory === "connection" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#connection"></use>
                </Icon>
              </Wrapper>

              <Title>комуналка, зв’язок</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("sport")}>
              <Sum>{getSum("sport")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "sport" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill: currentCategory === "sport" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#sport"></use>
                </Icon>
              </Wrapper>

              <Title>спорт, хобі</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("education")}>
              <Sum>{getSum("education")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "education" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill:
                      currentCategory === "education" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#education"></use>
                </Icon>
              </Wrapper>

              <Title>навчання</Title>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => setCurrentCategory("other")}>
              <Sum>{getSum("other")}</Sum>
              <Wrapper>
                <Block
                  style={{
                    backgroundColor:
                      currentCategory === "other" ? "#FFDAC0" : "#F5F6FB",
                  }}
                ></Block>
                <Icon
                  style={{
                    fill: currentCategory === "other" ? "#FF751D" : "#071F41",
                  }}
                  width="56"
                  height="56"
                >
                  <use href="#other"></use>
                </Icon>
              </Wrapper>

              <Title>інше</Title>
            </Btn>
          </li>
        </>
      ) : (
        <></>
      )}
    </List>
  );
};
