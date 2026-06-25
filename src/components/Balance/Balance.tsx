import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "../Button/Button";
import { selectBalance } from "../../redux/balance/selectors";
import { Form, Input, Subtitle, Wrapper } from "./BalanceStyled";
import { addTransactionWithBalance } from "../../redux/services/operations";

interface FormValues {
  balance: string;
}

interface FormErrors {
  balance?: string;
}

export const Balance = () => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector(selectBalance);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        balance:
          new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
            .format(Number.parseFloat(balance.toString()))
            .replace(/,/g, " ") + " UAH",
      }}
      validate={(values: FormValues) => {
        const errors: FormErrors = {};
        if (!values.balance) {
          errors.balance = "Required";
        } else if (
          !(
            Number.parseFloat(values.balance) === 0 ||
            Number.parseFloat(values.balance)
          )
        ) {
          errors.balance = "Balance must be a number";
        }
        return errors;
      }}
      onSubmit={async (values: FormValues, { setFieldValue }) => {
        const difference = parseFloat(values.balance) - balance;
        if (difference === 0) {
          setFieldValue(
            "balance",
            new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
              .format(Number.parseFloat(values.balance))
              .replace(/,/g, " ") + " UAH",
          );
          return;
        }
        await dispatch(
          addTransactionWithBalance({
            desc: "Зміна балансу",
            amount: Math.abs(difference),
            category: "other",
            type: difference > 0 ? "+" : difference < 0 ? "-" : "",
          }),
        );
        setFieldValue(
          "balance",
          new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
            .format(Number.parseFloat(values.balance))
            .replace(/,/g, " ") + " UAH",
        );
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
                  e.currentTarget.value = parseFloat(
                    values.balance.replace(/\s/g, ""),
                  ).toString();
                  setFieldValue(
                    "balance",
                    parseFloat(values.balance.replace(/\s/g, "")).toString(),
                  );
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
        </Form>
      )}
    </Formik>
  );
};
