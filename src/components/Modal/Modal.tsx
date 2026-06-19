import { Button } from "../Button/Button";
import { Backdrop, Close, Div, Icon, Title, Wrap } from "./ModalStyled";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  action: () => void;
}

export const Modal = ({ isOpen, closeModal, title, action }: ModalProps) => {
  const handleSuggetion = () => {
    action();
    closeModal();
  };

  const handleDecline = () => {
    closeModal();
  };

  return (
    <>
      {isOpen ? (
        <Backdrop>
          <Div>
            <Close onClick={closeModal}>
              <Icon width="12" height="12">
                <use href="#close"></use>
              </Icon>
            </Close>
            <Title>{title}</Title>
            <Wrap>
              <Button
                bg="orange"
                shading={false}
                label="Так"
                onClick={handleSuggetion}
                type="button"
              />
              <Button
                bg="white"
                shading={false}
                label="Ні"
                onClick={handleDecline}
                type="button"
              />
            </Wrap>
          </Div>
        </Backdrop>
      ) : (
        <></>
      )}
    </>
  );
};
