import { Balance } from "../../components/Balance/Balance";
import { Container } from "../../components/Container/Container";
import { Notification } from "../../components/Notification/Notification";
import { NavigateHome } from "../../components/NavigateHome/NavigateHome";
import { MonthsSlider } from "../../components/MonthsSlider/MonthsSlider";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { selectNotes } from "../../redux/money/selectors";
import { useEffect, useMemo, useState } from "react";
import { Stats } from "../../components/Stats/Stats";
import { Types } from "../../components/Types/Types";
import { CategoryStats } from "../../components/CategoryStats/CategoryStats";
import { ExpensesChart } from "../../components/Chart/Chart";
import {
  GreyBg,
  Section,
  Top,
  TopIcon,
  Two,
  Wrap,
  Wrapper,
} from "./CategoriesStyled";
import two from "../../imgs/tablet/tablet-two.png";
import top from "../../imgs/desktop/desktop-top.png";

export const Categories = () => {
  const location = useLocation();
  const notes = useAppSelector((state) => selectNotes(state.money));
  const months: { month: number; year: number }[] = [];
  if (notes.length > 0) {
    const firstDate = new Date(notes[0].date);
    const endDate = new Date();
    const cur = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);

    while (
      cur.getFullYear() < endDate.getFullYear() ||
      (cur.getFullYear() === endDate.getFullYear() &&
        cur.getMonth() <= endDate.getMonth())
    ) {
      months.push({ month: cur.getMonth() + 1, year: cur.getFullYear() });
      cur.setMonth(cur.getMonth() + 1);
    }
  }

  const sortedMonths = useMemo(() => {
    return months.sort(
      (
        { year: yearA, month: monthA }: { year: number; month: number },
        { year: yearB, month: monthB }: { year: number; month: number },
      ) => {
        if (yearB !== yearA) {
          return yearB - yearA;
        }
        return monthB - monthA;
      },
    );
  }, [months]);

  const [currentDate, setCurrentDate] = useState<{
    month: number;
    year: number;
  }>({ month: 0, year: 0 });

  const [currentCategory, setCurrentCategory] = useState<string>(
    location.pathname === "/categories/getMoney"
      ? "salary"
      : location.pathname === "/categories/spendMoney"
        ? "products"
        : "",
  );

  useEffect(() => {
    if (!sortedMonths[0]) return;

    setCurrentDate((prev) => {
      const next = sortedMonths[0];

      if (prev.month === next.month && prev.year === next.year) {
        return prev;
      }

      return next;
    });
  }, [sortedMonths]);

  return (
    <Section>
      <GreyBg></GreyBg>
      <Container>
        <Two src={two} alt="Two" />
        <TopIcon src={top} alt="Top" />
        <Top>
          <NavigateHome />
          <Wrap>
            <Balance />
            <Notification />
          </Wrap>
          <MonthsSlider setCurrentDate={setCurrentDate} months={sortedMonths} />
        </Top>
        <Stats currentDate={currentDate} />
        <Wrapper>
          <Types />
          <CategoryStats
            setCurrentCategory={setCurrentCategory}
            currentDate={currentDate}
            currentCategory={currentCategory}
          />
        </Wrapper>
        <ExpensesChart
          currentDate={currentDate}
          currentCategory={currentCategory}
        />
      </Container>
    </Section>
  );
};
