import { useAppSelector } from "../../redux/store";
import { selectAuth, selectUser } from "../../redux/auth/selectors";
import { Container } from "../Container/Container";
import {
  Avatar,
  Icon,
  Letter,
  Logout,
  LogoutBtn,
  Name,
  Section,
  Line,
  Wrapper,
  User,
} from "./HeaderStyled";
import { Link } from "react-router-dom";

export const Header = ({ openModalL }: any) => {
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectAuth);
  const displayName = user?.displayName;

  const handleLogOut = () => {
    openModalL();
  };

  return (
    <Section>
      <Container>
        <Link to="/spendMoney">
          <svg width="99" height="31">
            <use href="#logo"></use>
          </svg>
        </Link>
        {isAuth ? (
          <Wrapper>
            <User>
              <Avatar>
                <Letter>{displayName?.split("")[0]}</Letter>
              </Avatar>
              <Name>{displayName}</Name>
            </User>
            <Line></Line>
            <LogoutBtn onClick={handleLogOut} type="button">
              Вийти
            </LogoutBtn>
            <Logout onClick={handleLogOut} type="button">
              <Icon width="16" height="16">
                <use href="#logout"></use>
              </Icon>
            </Logout>
          </Wrapper>
        ) : (
          <></>
        )}
      </Container>
    </Section>
  );
};
