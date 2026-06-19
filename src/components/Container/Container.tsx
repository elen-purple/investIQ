import type { ReactNode } from "react";
import { Div } from "./ContainerStyled";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <Div>{children}</Div>;
};
