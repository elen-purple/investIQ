import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Modal } from "../Modal/Modal";
import { logOut } from "../../redux/user/operations";
import { useAppDispatch } from "../../redux/store";

export const SharedLayout = ({ openModalL, isOpenL, closeModalL }: any) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Header openModalL={openModalL} />
      <Modal
        isOpen={isOpenL}
        closeModal={closeModalL}
        title="Ви дійсно хочете вийти?"
        action={() => {
          dispatch(logOut());
        }}
      />
      <Outlet />
    </>
  );
};
