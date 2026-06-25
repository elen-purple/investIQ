import { Button } from "../Button/Button";
import { Backdrop, Close, Div, Icon, Title, Wrap } from "./ModalStyled";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  action: () => Promise<void>;
}

export const Modal = ({ isOpen, closeModal, title, action }: ModalProps) => {
  const handleSuggestion = async () => {
    try {
      await action();
      closeModal();
    } catch (error) {
      console.log(error);
    }
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
                onClick={handleSuggestion}
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
