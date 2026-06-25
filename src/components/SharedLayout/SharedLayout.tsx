import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Modal } from "../Modal/Modal";
import { logOut } from "../../redux/user/operations";
import { useAppDispatch } from "../../redux/store";

interface SharedLayoutProps {
  openModalL: () => void;
  isOpenL: boolean;
  closeModalL: () => void;
}

export const SharedLayout = ({
  openModalL,
  isOpenL,
  closeModalL,
}: SharedLayoutProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Header openModalL={openModalL} />
      <Modal
        isOpen={isOpenL}
        closeModal={closeModalL}
        title="Ви дійсно хочете вийти?"
        action={async () => {
          await dispatch(logOut());
        }}
      />
      <Outlet />
    </>
  );
};
