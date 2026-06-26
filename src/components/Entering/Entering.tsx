import { Formik } from "formik";
import { useAppDispatch } from "../../redux/store";
import { Button } from "../Button/Button";
import { dataG, dataS } from "./data";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowBtn,
  ArrowDown,
  ArrowIcon,
  Block,
  Btn,
  BtnItem,
  BtnList,
  ButtonWrapper,
  CalculatorIcon,
  DateIcon,
  DateText,
  DateWrapper,
  ErrorMessage,
  FormStyled,
  GreyBgInput,
  Input,
  InputsOnlyWrapper,
  InputsWrapper,
  Label,
  ModalStyled,
  NumberInput,
  NumberLabel,
  WrapperBtn,
  WrapperInput,
} from "./EnteringStyled";
import { addTransactionWithBalance } from "../../redux/services/operations";
import { Header } from "../Header/Header";
import { Container } from "../Container/Container";
import {
  getCategoryLabel,
  isCategoryId,
  type CategoryId,
} from "../../constants/categories";
import { getTransactionType } from "../../utils/routes";
import { formatDate } from "../../utils/date";

interface FormValues {
  desc: string;
  amount: string;
  category: CategoryId | "default";
}

interface FormErrors {
  desc?: string;
  amount?: string;
  category?: string;
}

interface EnteringProps {
  type: "modal" | "desktop";
  openModalL: () => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
}

export const Entering = ({
  type,
  openModalL,
  setModal,
  modal,
}: EnteringProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const transactionType = getTransactionType(location.pathname);
  const isIncome = transactionType === "+";
  const data =
    transactionType === "+" ? dataG : transactionType === "-" ? dataS : [];
  const today = formatDate(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 703);
  const [list, setList] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 703);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleHelper = (value: string): number | null => {
    const normalized = value.trim().replace(",", ".");

    if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
      return null;
    }

    const parsed = Number(normalized);
    return parsed > 0 ? parsed : null;
  };

  const handleValidate = (values: FormValues) => {
    const errors: FormErrors = {};
    if (!values.desc) {
      errors.desc = "Required";
    } else if (values.desc.length < 4) {
      errors.desc =
        "The description is too short. Must contain at least 4 symbols";
    }
    if (!values.amount) {
      errors.amount = "Required";
    } else if (handleHelper(values.amount) === null) {
      errors.amount = "Amount must be a positive number";
    }
    if (values.category === "default") {
      errors.category = "Choose a category";
    }
    return errors;
  };

  const handleSumbitEntry = async (
    values: FormValues,
    resetForm: () => void,
  ) => {
    const amount = handleHelper(values.amount);
    if (amount === null) return;
    if (!transactionType) {
      setSubmitError(
        "Невідомий тип операції. Спробуйте відкрити сторінку заново.",
      );
      return;
    }
    if (!isCategoryId(values.category)) {
      setSubmitError("Оберіть категорію операції.");
      return;
    }

    try {
      setSubmitError(null);
      await dispatch(
        addTransactionWithBalance({
          desc: values.desc,
          amount,
          category: values.category,
          type: transactionType,
        }),
      ).unwrap();
      resetForm();
      setModal(false);
      setList(false);
    } catch (error) {
      console.log(error);
      setSubmitError("Не вдалося додати запис. Спробуйте ще раз.");
    }
  };

  return (
    <>
      {type === "modal" ? (
        <>
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
                    validate={(values: FormValues) => handleValidate(values)}
                    onSubmit={(values: FormValues, { resetForm }) =>
                      handleSumbitEntry(values, resetForm)
                    }
                  >
                    {({
                      values,
                      handleChange,
                      handleSubmit,
                      resetForm,
                      setFieldValue,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <label>
                          <Input
                            type="text"
                            name="desc"
                            onChange={handleChange}
                            value={values.desc}
                            placeholder={
                              isIncome ? "Опис прибутку" : "Опис товару"
                            }
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
                              {values.category === "default"
                                ? isIncome
                                  ? "Категорія прибутку"
                                  : "Категорія товару"
                                : getCategoryLabel(values.category)}
                              <ArrowDown width="18" height="10">
                                <use href="#arrow"></use>
                              </ArrowDown>
                            </Btn>
                            {list ? (
                              <BtnList>
                                {data?.map(({ id }) => (
                                  <li key={id} id={id}>
                                    <BtnItem
                                      onClick={() => {
                                        setFieldValue("category", id);
                                        setList(false);
                                      }}
                                      type="button"
                                    >
                                      {getCategoryLabel(id)}
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
                        {submitError ? (
                          <ErrorMessage>{submitError}</ErrorMessage>
                        ) : null}
                        <WrapperBtn>
                          <Button
                            bg="orange"
                            shading={true}
                            label="Ввести"
                            type="submit"
                            disabled={isSubmitting}
                          />
                          <Button
                            bg="grey"
                            shading={true}
                            onClick={() => {
                              resetForm();
                            }}
                            label="Очистити"
                            type="button"
                            disabled={isSubmitting}
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
        </>
      ) : (
        <>
          {isMobile ? (
            <>
              <DateWrapper>
                <DateIcon width="20" height="20">
                  <use href="#calendar"></use>
                </DateIcon>
                <DateText>{today}</DateText>
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
              validate={(values: FormValues) => handleValidate(values)}
              onSubmit={(values: FormValues, { resetForm }) =>
                handleSumbitEntry(values, resetForm)
              }
            >
              {({
                values,
                handleChange,
                handleSubmit,
                resetForm,
                setFieldValue,
                isSubmitting,
              }) => (
                <FormStyled onSubmit={handleSubmit}>
                  <InputsWrapper>
                    <DateWrapper style={{ margin: 0, justifyContent: "left" }}>
                      <DateIcon width="20" height="20">
                        <use href="#calendar"></use>
                      </DateIcon>
                      <DateText>{today}</DateText>
                    </DateWrapper>
                    <InputsOnlyWrapper>
                      <Label>
                        <Input
                          type="text"
                          name="desc"
                          onChange={handleChange}
                          value={values.desc}
                          placeholder={
                            isIncome ? "Опис прибутку" : "Опис товару"
                          }
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
                              : getCategoryLabel(values.category)}
                            <ArrowDown width="18" height="10">
                              <use href="#arrow"></use>
                            </ArrowDown>
                          </Btn>
                          {list ? (
                            <BtnList>
                              {data?.map(({ id }) => (
                                <li key={id} id={id}>
                                  <BtnItem
                                    onClick={() => {
                                      setFieldValue("category", id);
                                      setList(false);
                                    }}
                                    type="button"
                                  >
                                    {getCategoryLabel(id)}
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
                  {submitError ? (
                    <ErrorMessage>{submitError}</ErrorMessage>
                  ) : null}
                  <WrapperBtn>
                    <Button
                      bg="orange"
                      shading={false}
                      label="Ввести"
                      type="submit"
                      disabled={isSubmitting}
                    />
                    <Button
                      bg="white"
                      shading={false}
                      onClick={() => {
                        resetForm();
                      }}
                      label="Очистити"
                      type="button"
                      disabled={isSubmitting}
                    />
                  </WrapperBtn>
                </FormStyled>
              )}
            </Formik>
          )}
        </>
      )}
    </>
  );
};
