import { useState } from "react";

export const useModal = (state: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(state);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [result, setResult] = useState<"" | "yes" | "no">("");

  const makePositive = () => setResult("yes");
  const makeNegative = () => setResult("no");

  return { isOpen, openModal, closeModal, result, makePositive, makeNegative };
};
