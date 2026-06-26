import { Formik } from "formik";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "../Button/Button";
import { selectBalance } from "../../redux/balance/selectors";
import { ErrorMessage, Form, Input, Subtitle, Wrapper } from "./BalanceStyled";
import { addTransactionWithBalance } from "../../redux/services/operations";

interface FormValues {
  balance: string;
}

interface FormErrors {
  balance?: string;
}

const parseMoneyInput = (value: string): number | null => {
  const normalized = value
    .replace(/\s/g, "")
    .replace(/UAH$/i, "")
    .replace(",", ".");

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatBalance = (value: number) =>
  `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/,/g, " ")} UAH`;

export const Balance = () => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector(selectBalance);
  const [submitError, setSubmitError] = useState<string | null>(null);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        balance: formatBalance(balance),
      }}
      validate={(values: FormValues) => {
        const errors: FormErrors = {};
        if (!values.balance) {
          errors.balance = "Required";
        } else if (parseMoneyInput(values.balance) === null) {
          errors.balance = "Balance must be a number";
        }
        return errors;
      }}
      onSubmit={async (values: FormValues, { setFieldValue }) => {
        const parsedBalance = parseMoneyInput(values.balance);

        if (parsedBalance === null) return;

        const difference = parsedBalance - balance;
        if (difference === 0) {
          setSubmitError(null);
          setFieldValue("balance", formatBalance(parsedBalance));
          return;
        }

        try {
          setSubmitError(null);
          await dispatch(
            addTransactionWithBalance({
              desc: "Зміна балансу",
              amount: Math.abs(difference),
              category: "other",
              type: difference > 0 ? "+" : "-",
            }),
          ).unwrap();
          setFieldValue("balance", formatBalance(parsedBalance));
        } catch {
          setSubmitError("Не вдалося оновити баланс. Спробуйте ще раз.");
        }
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Subtitle>Баланс:</Subtitle>
          <Wrapper>
            <label>
              <Input
                type="text"
                name="balance"
                onChange={handleChange}
                onFocus={(e) => {
                  const parsedBalance = parseMoneyInput(values.balance);

                  if (parsedBalance === null) return;

                  e.currentTarget.value = parsedBalance.toString();
                  setFieldValue("balance", parsedBalance.toString());
                }}
                value={values.balance}
                placeholder="0.00 UAH"
              />
            </label>
            <Button
              bg="orange"
              shading={false}
              label="Підтвердити"
              type="submit"
            />
          </Wrapper>
          {submitError ? <ErrorMessage>{submitError}</ErrorMessage> : null}
        </Form>
      )}
    </Formik>
  );
};
