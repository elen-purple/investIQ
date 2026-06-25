import { selectNotes } from "../../redux/money/selectors";
import { useAppSelector } from "../../redux/store";
import { Green, Line, Red, Title, Wrap, Wrapper } from "./StatsStyled";

interface StatsProps {
  month: number;
  year: number;
}

export const Stats = ({ currentDate }: { currentDate: StatsProps }) => {
  const notes = useAppSelector((state) => selectNotes(state.money));

  return (
    <Wrapper>
      <Wrap>
        <Title>Витрати: </Title>
        <Red>
          -{" "}
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
            .format(
              notes
                .filter(({ type }: { type: "+" | "-" | "" }) => {
                  return type === "-";
                })
                .filter(({ date }: { date: string }) => {
                  return (
                    new Date(date).getMonth() + 1 === currentDate?.month &&
                    new Date(date).getFullYear() === currentDate?.year
                  );
                })
                .reduce(
                  (sum: number, { amount }: { amount: number }) => sum + amount,
                  0,
                ),
            )
            .replace(/,/g, " ")}{" "}
          грн.
        </Red>
      </Wrap>
      <Line></Line>
      <Wrap>
        <Title>Доходи: </Title>
        <Green>
          +{" "}
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
            .format(
              notes
                .filter(({ type }: { type: "+" | "-" | "" }) => {
                  return type === "+";
                })
                .filter(({ date }: { date: string }) => {
                  return (
                    new Date(date).getMonth() + 1 === currentDate?.month &&
                    new Date(date).getFullYear() === currentDate?.year
                  );
                })
                .reduce(
                  (sum: number, { amount }: { amount: number }) => sum + amount,
                  0,
                ),
            )
            .replace(/,/g, " ")}{" "}
          грн.
        </Green>
      </Wrap>
    </Wrapper>
  );
};
