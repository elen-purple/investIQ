import { Btn } from "./ButtonStyled";
import { useTheme } from "styled-components";

interface ButtonProps {
  bg: "orange" | "white" | "grey";
  shading: boolean;
  label: string;
  onClick?: () => void;
  type: "button" | "submit";
  disabled?: boolean;
}

export const Button = ({
  bg,
  shading,
  label,
  onClick,
  type,
  disabled = false,
}: ButtonProps) => {
  const theme = useTheme();

  const backgroundColor =
    bg === "orange"
      ? theme.colors.accentBg
      : bg === "grey"
        ? theme.colors.secondaryBg
        : bg === "white"
          ? theme.colors.primaryBg
          : "#ffff";

  const border = `${
    bg === "orange"
      ? theme.colors.accentBg
      : bg === "grey"
        ? theme.colors.secondaryBg
        : bg === "white"
          ? theme.colors.secondaryBg
          : "#ffff"
  } 2px solid`;

  const color =
    bg === "orange"
      ? theme.colors.primaryBg
      : bg === "grey"
        ? theme.colors.secondaryText
        : bg === "white"
          ? theme.colors.secondaryText
          : "#ffff";

  const boxShadow = ` 1px 3px 5px 0 ${
    shading
      ? bg === "orange"
        ? "rgba(255, 107, 8, 0.35)"
        : bg === "grey"
          ? "rgba(82, 85, 95, 0.15)"
          : ""
      : "none"
  }`;

  return (
    <Btn
      style={{ backgroundColor, border, color, boxShadow }}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Btn>
  );
};
