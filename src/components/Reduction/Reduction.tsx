import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { selectIsLoading, selectNotes } from "../../redux/money/selectors";
import { Item, Month, Sum, Title, Wrapper } from "./ReductionStyled";

export const Reduction = () => {
  const location = useLocation();
  const notes = useAppSelector((state) => selectNotes(state.money));
  const isLoading = useAppSelector((state) => selectIsLoading(state.money));
  const months: any[] = [];

  for (let i = 0; i < 6; i += 1) {
    if (new Date().getMonth() + 1 <= i) {
      months.push({
        month: 12 + (new Date().getMonth() + 1 - i),
        year: new Date().getFullYear() - 1,
      });
    } else {
      months.push({
        month: new Date().getMonth() + 1 - i,
        year: new Date().getFullYear(),
      });
    }
  }

  const array = months?.map((month: any) => {
    return {
      month: month.month,
      year: month.year,
      sum: notes
        .filter(({ type }: { type: "+" | "-" | "" }) => {
          if (location.pathname === "/getMoney") {
            return type === "+";
          } else if (location.pathname === "/spendMoney") {
            return type === "-";
          } else {
            return;
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
        <p>{isLoading}</p>
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
