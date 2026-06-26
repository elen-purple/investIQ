import { useState } from "react";
import { Button } from "../Button/Button";
import {
  Backdrop,
  Close,
  Div,
  ErrorMessage,
  Icon,
  Title,
  Wrap,
} from "./ModalStyled";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  action: () => Promise<void>;
}

export const Modal = ({ isOpen, closeModal, title, action }: ModalProps) => {
  const [actionError, setActionError] = useState<string | null>(null);
  const [isActionPending, setIsActionPending] = useState(false);

  const handleClose = () => {
    setActionError(null);
    closeModal();
  };

  const handleSuggestion = async () => {
    if (isActionPending) return;

    try {
      setIsActionPending(true);
      setActionError(null);
      await action();
      handleClose();
    } catch (error) {
      console.log(error);
      setActionError("Не вдалося виконати дію. Спробуйте ще раз.");
    } finally {
      setIsActionPending(false);
    }
  };

  const handleDecline = () => {
    handleClose();
  };

  return (
    <>
      {isOpen ? (
        <Backdrop>
          <Div>
            <Close onClick={handleClose}>
              <Icon width="12" height="12">
                <use href="#close"></use>
              </Icon>
            </Close>
            <Title>{title}</Title>
            {actionError ? <ErrorMessage>{actionError}</ErrorMessage> : null}
            <Wrap>
              <Button
                bg="orange"
                shading={false}
                label="Так"
                onClick={handleSuggestion}
                type="button"
                disabled={isActionPending}
              />
              <Button
                bg="white"
                shading={false}
                label="Ні"
                onClick={handleDecline}
                type="button"
                disabled={isActionPending}
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
