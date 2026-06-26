import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAppSelector } from "../../redux/store";
import { selectNotes } from "../../redux/money/selectors";
import { useLocation } from "react-router-dom";
import { Text, Wrapper } from "./ChartStyled";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels,
);

interface Month {
  year: number;
  month: number;
}

interface ExpensesChartProps {
  currentCategory: string;
  currentDate: Month;
}

export const ExpensesChart = ({
  currentCategory,
  currentDate,
}: ExpensesChartProps) => {
  const notes = useAppSelector((state) => selectNotes(state.money));
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 703);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 703);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const array = notes
    .filter(({ type }) => {
      if (location.pathname === "/categories/getMoney") {
        return type === "+";
      } else if (location.pathname === "/categories/spendMoney") {
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
    })
    .filter(({ category }: { category: string }) => {
      return category === currentCategory;
    })
    .sort(
      (
        { amount: amountA }: { amount: number },
        { amount: amountB }: { amount: number },
      ) => amountB - amountA,
    );

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: isMobile ? "y" : "x",
    layout: {
      padding: isMobile
        ? { top: 20, right: 85, left: 10, bottom: 10 }
        : { top: 10, right: 0, left: 0, bottom: 0 },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        anchor: "end",
        align: isMobile ? "right" : "end",
        offset: isMobile ? 8 : 4,
        padding: isMobile ? { bottom: 24 } : { bottom: 0 },
        font: {
          size: 12,
          family: "sans-serif",
        },
        color: "#52555F",
        formatter: (value: number) => `${value.toLocaleString("uk-UA")} грн`,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { display: !isMobile },
        suggestedMax:
          isMobile && array.length > 0 ? array[0].amount * 1.15 : undefined,
      },
      y: {
        grid: {
          display: !isMobile,
          color: "#F5F6FB",
        },
        border: { display: false },
        ticks: {
          display: isMobile,
          mirror: true,
          align: "start",
          labelOffset: -22,
          color: "#52555F",
          font: {
            size: 12,
            family: "sans-serif",
          },
        },
      },
    },
  };

  const backgroundColors = array.map((_, index) => {
    return index % 3 === 0 ? "#FF751D" : "#FFDAC0";
  });

  const data: ChartData<"bar"> = {
    labels: array.map(({ desc }) => desc),
    datasets: [
      {
        data: array.map(({ amount }) => amount),
        backgroundColor: backgroundColors,
        borderRadius: 10,
        barThickness: isMobile ? 15 : 38,
      },
    ],
  };

  return (
    <Wrapper
      style={{
        height: isMobile ? `${Math.max(array.length * 80, 160)}px` : "422px",
      }}
    >
      {array.length === 0 ? (
        <Text>Немає даних за цей період</Text>
      ) : (
        <Bar data={data} options={options} />
      )}
    </Wrapper>
  );
};
