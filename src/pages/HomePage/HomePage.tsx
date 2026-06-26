import { Outlet, useLocation } from "react-router-dom";
import { Entering } from "../../components/Entering/Entering";
import { Modal } from "../../components/Modal/Modal";
import { useAppDispatch } from "../../redux/store";
import { Navigation } from "../../components/Navigation/Navigation";
import { Reduction } from "../../components/Reduction/Reduction";
import { Notification } from "../../components/Notification/Notification";
import { Balance } from "../../components/Balance/Balance";
import { NavigateCategories } from "../../components/NavigateCategories/NavigateCategories";
import { Container } from "../../components/Container/Container";
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

import { useEffect, useState } from "react";
import { deleteTransactionWithBalance } from "../../redux/services/operations";

interface HomePageProps {
  isOpenD: boolean;
  closeModalD: () => void;
  deletedElementId: string | null;
  deletedElementAmount: number | null;
  openModalL: () => void;
}

const HomePage = ({
  isOpenD,
  closeModalD,
  deletedElementId,
  deletedElementAmount,
  openModalL,
}: HomePageProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [modal, setModal] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      const transactionType = (
        location.pathname === "/getMoney"
          ? "+"
          : location.pathname === "/spendMoney"
            ? "-"
            : "+"
      ) as "+" | "-";

      await dispatch(
        deleteTransactionWithBalance({
          itemId: typeof deletedElementId === "string" ? deletedElementId : "",
          amount:
            typeof deletedElementAmount === "number" ? deletedElementAmount : 0,
          type: transactionType,
        }),
      ).unwrap();
      closeModalD();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Section>
      <Modal
        isOpen={isOpenD}
        closeModal={closeModalD}
        title="Ви впевнені?"
        action={handleDelete}
      />
      <GreyBg></GreyBg>
      <Entering
        setModal={setModal}
        modal={modal}
        type="modal"
        openModalL={openModalL}
      />
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
          <Entering
            type="desktop"
            openModalL={openModalL}
            setModal={setModal}
            modal={modal}
          />
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
