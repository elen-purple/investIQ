import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { selectIsLoading, selectNotes } from "../../redux/money/selectors";
import { Item, Month, Sum, Title, Wrapper } from "./ReductionStyled";

export const Reduction = () => {
  const location = useLocation();
  const notes = useAppSelector((state) => selectNotes(state.money));
  const isLoading = useAppSelector((state) => selectIsLoading(state.money));
  const now = new Date();

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);

    return {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  });

  const array = months?.map((month: { month: number; year: number }) => {
    return {
      month: month.month,
      year: month.year,
      sum: notes
        ?.filter((note) => {
          if (!note) return false;
          const { type } = note;

          if (location.pathname === "/getMoney") {
            return type === "+";
          } else if (location.pathname === "/spendMoney") {
            return type === "-";
          } else {
            return false;
          }
        })
        .filter(({ date }: { date: string }) => {
          return (
            new Date(date).getMonth() + 1 === month.month &&
            new Date(date).getFullYear() === month.year
          );
        })
        .reduce(
          (sum: number, { amount }: { amount: number }) => sum + amount,
          0,
        ),
    };
  });

  return (
    <Wrapper>
      <Title>Зведення</Title>
      {isLoading ? (
        <p>Завантаження</p>
      ) : (
        <ul>
          {array.map(
            ({
              month,
              sum,
              year,
            }: {
              month: number;
              sum: number;
              year: number;
            }) => (
              <Item key={month + "/" + year}>
                <Month>
                  {month === 1
                    ? "Січень"
                    : month === 2
                      ? "Лютий"
                      : month === 3
                        ? "Березень"
                        : month === 4
                          ? "Квітень"
                          : month === 5
                            ? "Травень"
                            : month === 6
                              ? "Червень"
                              : month === 7
                                ? "Липень"
                                : month === 8
                                  ? "Серпень"
                                  : month === 9
                                    ? "Вересень"
                                    : month === 10
                                      ? "Жовтень"
                                      : month === 11
                                        ? "Листопад"
                                        : month === 12
                                          ? "Грудень"
                                          : ""}
                </Month>
                <Sum>
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                    .format(sum)
                    .replace(/,/g, " ")}
                </Sum>
              </Item>
            ),
          )}
        </ul>
      )}
    </Wrapper>
  );
};
