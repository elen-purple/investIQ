import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Content, Date, Title } from "./MonthsSliderStyled";

interface Month {
  year: number;
  month: number;
}

interface MonthsSliderProps {
  months: Month[];
  setCurrentDate: (date: Month) => void;
}

const MONTH_NAMES = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export const MonthsSlider = ({ months, setCurrentDate }: MonthsSliderProps) => {
  return (
    <div className="slider-container">
      <style>{`
        .slider-container {
          max-width: 300px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          margin-bottom: 16px;
          margin-top: 10px;

          @media screen and (min-width: 703px) {
          margin-bottom: 32px;
          margin-top: 24px;
          }

          @media screen and (min-width: 1098px) {
            margin: 0;
            margin-left: auto;
          }
        }

        .mySwiper {
          --swiper-navigation-color: #FF751D; 
          padding: 0;
          width: 134px;
        }

        .mySwiper .swiper-button-next,
        .mySwiper .swiper-button-prev {
          top: 60%;
          width: 6px;
        }

        .mySwiper .swiper-button-next::after,
        .mySwiper .swiper-button-prev::after {
          font-size: 18px; 
          font-weight: bold;
        }
      `}</style>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        onSlideChange={(swiper) => {
          const activeIndex = swiper.activeIndex;
          const currentActiveMonth = months[activeIndex];

          if (currentActiveMonth) {
            setCurrentDate({
              month: currentActiveMonth.month,
              year: currentActiveMonth.year,
            });
          }
        }}
        className="mySwiper"
      >
        {months.map(({ month, year }: Month) => (
          <SwiperSlide key={`${month}-${year}`}>
            <Content className="slide-content">
              <Title className="slider-title">Поточний період</Title>
              <Date className="slider-date">
                {MONTH_NAMES[month - 1] || ""}
                <br />
                {year}
              </Date>
            </Content>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
