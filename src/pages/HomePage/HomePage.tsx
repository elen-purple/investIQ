import { Outlet, useLocation } from "react-router-dom";
import { Entering } from "../../components/Entering/Entering";
import { Modal } from "../../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Navigation } from "../../components/Navigation/Navigation";
import { Reduction } from "../../components/Reduction/Reduction";
import { Notification } from "../../components/Notification/Notification";
import { addMoney, deleteMoney } from "../../redux/money/operations";
import { Balance } from "../../components/Balance/Balance";
import { selectBalance } from "../../redux/balance/selectors";
import { updateBalance } from "../../redux/balance/operations";
import { NavigateCategories } from "../../components/NavigateCategories/NavigateCategories";
import { Container } from "../../components/Container/Container";
import { dataG, dataS } from "../../components/Entering/data";
import {
  Div,
  DivWrapper,
  GreyBg,
  Section,
  TopIcon,
  Two,
  Wrap,
  Wrapper,
} from "./HomePageStyled";
import two from "../../imgs/tablet/tablet-two.png";
import top from "../../imgs/desktop/desktop-top.png";
import {
  ArrowBtn,
  ArrowDown,
  ArrowIcon,
  Block,
  Btn,
  BtnItem,
  BtnList,
  CalculatorIcon,
  GreyBgInput,
  Input,
  ModalStyled,
  NumberInput,
  NumberLabel,
  WrapperBtn,
  WrapperInput,
} from "../../components/Entering/EnteringStyled";
import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Button } from "../../components/Button/Button";

interface FormValues {
  desc: string;
  amount: string;
  category:
    | "default"
    | "transport"
    | "products"
    | "health"
    | "alcohole"
    | "entertaining"
    | "home"
    | "technic"
    | "connection"
    | "sport"
    | "education"
    | "other"
    | "salary"
    | "addition";
}

interface FormErrors {
  desc?: string;
  amount?: string;
  category?: string;
}

const HomePage = ({
  isOpenD,
  closeModalD,
  deletedElementId,
  deletedElementAmount,
  openModalL,
}: any) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const balance = useAppSelector(selectBalance);
  const [modal, setModal] = useState<boolean>(false);
  const [list, setList] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 703);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 703);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  let data: { label: any; id: any }[];
  if (location.pathname === "/spendMoney") {
    data = dataS;
  } else if (location.pathname === "/getMoney") {
    data = dataG;
  }
  return (
    <Section>
      <Modal
        isOpen={isOpenD}
        closeModal={closeModalD}
        title="Ви впевнені?"
        action={() => {
          dispatch(
            updateBalance(
              location.pathname === "/getMoney"
                ? balance - deletedElementAmount
                : location.pathname === "/spendMoney"
                  ? balance + deletedElementAmount
                  : 0,
            ),
          );
          dispatch(deleteMoney(deletedElementId));
        }}
      />
      <GreyBg></GreyBg>
      {modal && isMobile ? (
        <Block>
          <GreyBgInput></GreyBgInput>
          <Header openModalL={openModalL} />
          <ModalStyled>
            <Container>
              <ArrowBtn
                onClick={() => {
                  setModal(false);
                }}
                type="button"
              >
                <ArrowIcon width="24" height="24">
                  <use href="#backarrow"></use>
                </ArrowIcon>
              </ArrowBtn>
              <Formik
                initialValues={{
                  desc: "",
                  amount: "",
                  category: "default",
                }}
                validate={(values: FormValues) => {
                  const errors: FormErrors = {};
                  if (!values.desc) {
                    errors.desc = "Required";
                  } else if (values.desc.length < 4) {
                    errors.desc =
                      "The description is too short. Must contain at least 4 symbols";
                  }
                  if (!values.amount) {
                    errors.amount = "Required";
                  } else if (
                    !Number(values.amount) ||
                    Number(values.amount) <= 0
                  ) {
                    errors.amount = "Amount must be a positive number";
                  }
                  if (values.category === "default") {
                    errors.category = "Choose a category";
                  }
                  return errors;
                }}
                onSubmit={async (values: FormValues, { resetForm }) => {
                  await dispatch(
                    addMoney({
                      desc: values.desc,
                      amount: Number.parseFloat(values.amount),
                      category: values.category,
                      type:
                        location.pathname === "/getMoney"
                          ? "+"
                          : location.pathname === "/spendMoney"
                            ? "-"
                            : "",
                    }),
                  );
                  await dispatch(
                    updateBalance(
                      location.pathname === "/getMoney"
                        ? balance + Number.parseFloat(values.amount)
                        : location.pathname === "/spendMoney"
                          ? balance - Number.parseFloat(values.amount)
                          : 0,
                    ),
                  );
                  values.amount = "";
                  values.category = "default";
                  values.desc = "";
                  resetForm();
                  setModal(false);
                  setList(false);
                }}
              >
                {({ values, handleChange, handleSubmit, resetForm }) => (
                  <form onSubmit={handleSubmit}>
                    <label>
                      <Input
                        type="text"
                        name="desc"
                        onChange={handleChange}
                        value={values.desc}
                        placeholder="Опис товару"
                      />
                    </label>
                    <WrapperInput>
                      <div>
                        <Btn
                          onClick={() => {
                            setList((prev) => !prev);
                          }}
                          type="button"
                        >
                          {values.category === "transport"
                            ? "Транспорт"
                            : values.category === "products"
                              ? "Продукти"
                              : values.category === "health"
                                ? "Здоров’я"
                                : values.category === "alcohole"
                                  ? "Алкоголь"
                                  : values.category === "entertaining"
                                    ? "Розваги"
                                    : values.category === "home"
                                      ? "Все для дому"
                                      : values.category === "technic"
                                        ? "Техніка"
                                        : values.category === "connection"
                                          ? "Комуналка, зв’язок"
                                          : values.category === "sport"
                                            ? "Спорт, хобі"
                                            : values.category === "education"
                                              ? "Навчання"
                                              : values.category === "other"
                                                ? "Інше"
                                                : values.category === "salary"
                                                  ? "ЗП"
                                                  : values.category ===
                                                      "addition"
                                                    ? "Дод. прибуток"
                                                    : values.category ===
                                                        "default"
                                                      ? "Категорія товару"
                                                      : ""}
                          <ArrowDown width="18" height="10">
                            <use href="#arrow"></use>
                          </ArrowDown>
                        </Btn>
                        {list ? (
                          <BtnList>
                            {data?.map(({ label, id }) => (
                              <li key={id} id={id}>
                                <BtnItem
                                  onClick={() => {
                                    values.category = id;
                                    setList(false);
                                  }}
                                  type="button"
                                >
                                  {label}
                                </BtnItem>
                              </li>
                            ))}
                          </BtnList>
                        ) : (
                          <></>
                        )}
                      </div>
                    </WrapperInput>
                    <NumberLabel>
                      <NumberInput
                        type="text"
                        name="amount"
                        onChange={handleChange}
                        value={values.amount}
                        placeholder="0.00"
                      />
                      <CalculatorIcon width="20" height="20">
                        <use href="#calculator"></use>
                      </CalculatorIcon>
                    </NumberLabel>
                    <WrapperBtn>
                      <Button
                        bg="orange"
                        shading={true}
                        label="Ввести"
                        type="submit"
                      />
                      <Button
                        bg="grey"
                        shading={true}
                        onClick={() => {
                          resetForm();
                          values.category = "default";
                        }}
                        label="Очистити"
                        type="button"
                      />
                    </WrapperBtn>
                  </form>
                )}
              </Formik>
            </Container>
          </ModalStyled>
        </Block>
      ) : (
        <></>
      )}
      <Container>
        <TopIcon src={top} alt="Top" />
        <Two src={two} alt="Two" />
        <Wrapper>
          <Wrap>
            <Balance />
            <Notification />
          </Wrap>
          <NavigateCategories />
        </Wrapper>
        <Navigation />
        <Div>
          <Entering setModal={setModal} />
          <DivWrapper>
            <Outlet />
            <Reduction />
          </DivWrapper>
        </Div>
      </Container>
    </Section>
  );
};

export default HomePage;
