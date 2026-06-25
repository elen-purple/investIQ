import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "../Button/Button";
import { dataG, dataS } from "./data";
import { useLocation } from "react-router-dom";
import { addMoney } from "../../redux/money/operations";
import { updateBalance } from "../../redux/balance/operations";
import { selectBalance } from "../../redux/balance/selectors";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  Btn,
  BtnItem,
  BtnList,
  ButtonWrapper,
  CalculatorIcon,
  DateIcon,
  DateText,
  DateWrapper,
  FormStyled,
  Input,
  InputsOnlyWrapper,
  InputsWrapper,
  Label,
  NumberInput,
  NumberLabel,
  WrapperBtn,
  WrapperInput,
} from "./EnteringStyled";
import { CATEGORY_LABELS } from "../../constants/categories";

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

interface EnteringProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Entering = ({ setModal }: EnteringProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isIncome = location.pathname.includes("getMoney");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 703);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 703);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const balance = useAppSelector(selectBalance);
  let data: { label: any; id: any }[];
  if (location.pathname === "/spendMoney") {
    data = dataS;
  } else if (location.pathname === "/getMoney") {
    data = dataG;
  }

  const [list, setList] = useState<boolean>(false);

  return (
    <>
      {isMobile ? (
        <>
          <DateWrapper>
            <DateIcon width="20" height="20">
              <use href="#calendar"></use>
            </DateIcon>
            <DateText>
              {new Date().getDate().toString().padStart(2, "0")}.
              {(new Date().getMonth() + 1).toString().padStart(2, "0")}.
              {new Date().getUTCFullYear()}
            </DateText>
          </DateWrapper>
          <ButtonWrapper>
            <Button
              bg="orange"
              shading={false}
              label="Додати запис"
              onClick={() => {
                setModal(true);
              }}
              type="button"
            />
          </ButtonWrapper>
        </>
      ) : (
        <Formik
          initialValues={{ desc: "", amount: "", category: "default" }}
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
            } else if (!Number(values.amount) || Number(values.amount) <= 0) {
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
          }}
        >
          {({ values, handleChange, handleSubmit, resetForm }) => (
            <FormStyled onSubmit={handleSubmit}>
              <InputsWrapper>
                <DateWrapper style={{ margin: 0, justifyContent: "left" }}>
                  <DateIcon width="20" height="20">
                    <use href="#calendar"></use>
                  </DateIcon>
                  <DateText>
                    {new Date().getDate().toString().padStart(2, "0")}.
                    {(new Date().getMonth() + 1).toString().padStart(2, "0")}.
                    {new Date().getUTCFullYear()}
                  </DateText>
                </DateWrapper>
                <InputsOnlyWrapper>
                  <Label>
                    <Input
                      type="text"
                      name="desc"
                      onChange={handleChange}
                      value={values.desc}
                      placeholder={isIncome ? "Опис прибутку" : "Опис товару"}
                    />
                  </Label>
                  <WrapperInput>
                    <div>
                      <Btn
                        onClick={() => {
                          setList((prev) => !prev);
                        }}
                        type="button"
                      >
                        {values.category === "default"
                          ? isIncome
                            ? "Категорія прибутку"
                            : "Категорія товару"
                          : CATEGORY_LABELS[
                              values.category as keyof typeof CATEGORY_LABELS
                            ]}
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
                </InputsOnlyWrapper>
              </InputsWrapper>
              <WrapperBtn>
                <Button
                  bg="orange"
                  shading={false}
                  label="Ввести"
                  type="submit"
                />
                <Button
                  bg="white"
                  shading={false}
                  onClick={() => {
                    resetForm();
                    values.category = "default";
                  }}
                  label="Очистити"
                  type="button"
                />
              </WrapperBtn>
            </FormStyled>
          )}
        </Formik>
      )}
    </>
  );
};
