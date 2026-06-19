import { selectBalance } from "../../redux/balance/selectors";
import { useAppSelector } from "../../redux/store";
import { Block, Icon, Text, Title, Wrapper } from "./NotificationStyled";

export const Notification = () => {
  const balance = useAppSelector(selectBalance);

  return (
    <>
      {balance === 0 ? (
        <Wrapper>
          <Icon width="30" height="16">
            <use href="#triangle"></use>
          </Icon>
          <Block>
            <Title>
              Привіт! Для початку роботи внесіть свій поточний баланс рахунку!
            </Title>
            <Text>Ви не можете витрачати гроші, поки їх у Вас немає :)</Text>
          </Block>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};
