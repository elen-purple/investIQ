import { Formik } from "formik";
import { Container } from "../Container/Container";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { logIn, register } from "../../redux/user/operations";
import { useAppDispatch } from "../../redux/store";
import { Input } from "../Input/Input";
import {
  Buttons,
  Desc,
  Desk,
  Div,
  GreyBg,
  Hand,
  Section,
  Stats,
  Subtitle,
  Title,
  Top,
  Two,
  Wrapper,
} from "./FormStyled";
import hand from "../../imgs/mobile/mobile-hand.png";
import stats from "../../imgs/mobile/mobile-stats.png";
import top from "../../imgs/tablet/tablet-top.png";
import two from "../../imgs/tablet/tablet-two.png";
import desk from "../../imgs/desktop/desktop-top.png";

interface FormProps {
  type: "signup" | "login";
}

interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}

export const Form = ({ type }: FormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    if (type === "signup") {
      navigate("/login");
    } else if (type === "login") {
      navigate("/signup");
    }
  };

  return (
    <Section>
      <GreyBg></GreyBg>
      <Container>
        <Hand src={hand} alt="Hand" />
        <Stats src={stats} alt="Stats" />
        <Top src={top} alt="Top" />
        <Two src={two} alt="Two" />
        <Desk src={desk} alt="Desk" />
        <Wrapper>
          <Title>InvestIQ</Title>
          <Subtitle>Smart Finance</Subtitle>
        </Wrapper>
        <Div>
          <Desc>
            {type === "signup"
              ? "Зареєстуватися за допомогою ім'я, ел. пошти та паролю"
              : "Увійти за допомогою ел. пошти та паролю після реєстрації"}
          </Desc>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validate={(values: FormValues) => {
              const errors: FormErrors = {};
              if (type === "signup") {
                if (!values.name) {
                  errors.name = "Required";
                } else if (values.name.length < 4) {
                  errors.name =
                    "The name is too short. Must contain at least 4 symbols";
                }
              }
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 8) {
                errors.password =
                  "The password is too short. Must contain at least 8 symbols";
              }
              return errors;
            }}
            onSubmit={async (values: FormValues, { resetForm }) => {
              if (type === "signup") {
                dispatch(
                  register({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                  }),
                );
                values.email = "";
                values.password = "";
                values.name = "";
              } else if (type === "login") {
                dispatch(
                  logIn({
                    email: values.email,
                    password: values.password,
                  }),
                );
                values.email = "";
                values.password = "";
              }
              resetForm();
              try {
                if (type === "signup") {
                  await dispatch(
                    register({
                      name: values.name,
                      email: values.email,
                      password: values.password,
                    }),
                  ).unwrap();
                } else if (type === "login") {
                  await dispatch(
                    logIn({
                      email: values.email,
                      password: values.password,
                    }),
                  ).unwrap();
                }
                resetForm();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {type === "signup" ? (
                  <Input
                    handleChange={handleChange}
                    values={values.name}
                    errors={errors.name}
                    touched={touched.name}
                    type={"name"}
                    placeholder={"Ім'я"}
                    label={"Ім'я:"}
                  />
                ) : (
                  <></>
                )}

                <Input
                  handleChange={handleChange}
                  values={values.email}
                  errors={errors.email}
                  touched={touched.email}
                  type={"email"}
                  placeholder={"your@email.com"}
                  label={"Електронна пошта:"}
                />
                <Input
                  handleChange={handleChange}
                  values={values.password}
                  errors={errors.password}
                  touched={touched.password}
                  type={"password"}
                  placeholder={"Пароль"}
                  label={"Пароль:"}
                />
                {type === "signup" ? (
                  <Buttons>
                    <Button
                      bg="orange"
                      shading={true}
                      label="Реєстрація"
                      type="submit"
                    />
                    <Button
                      bg="grey"
                      shading={true}
                      label="Увійти"
                      type="button"
                      onClick={handleNavigate}
                    />
                  </Buttons>
                ) : type === "login" ? (
                  <Buttons>
                    <Button
                      bg="orange"
                      shading={true}
                      label="Увійти"
                      type="submit"
                    />
                    <Button
                      bg="grey"
                      shading={true}
                      label="Реєстрація"
                      type="button"
                      onClick={handleNavigate}
                    />
                  </Buttons>
                ) : (
                  <></>
                )}
              </form>
            )}
          </Formik>
        </Div>
      </Container>
    </Section>
  );
};
