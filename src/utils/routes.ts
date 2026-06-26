import type { CategoryId } from "../constants/categories";
import type { TransactionType } from "../types/transactions";

export type TransactionSection = "getMoney" | "spendMoney";

export const getTransactionSection = (
  pathname: string,
): TransactionSection | null => {
  const section = pathname.split("/").filter(Boolean).at(-1);

  return section === "getMoney" || section === "spendMoney" ? section : null;
};

export const getTransactionType = (
  pathname: string,
): TransactionType | null => {
  const section = getTransactionSection(pathname);

  if (section === "getMoney") return "+";
  if (section === "spendMoney") return "-";
  return null;
};

export const getDefaultCategory = (pathname: string): CategoryId | null => {
  const type = getTransactionType(pathname);

  if (type === "+") return "salary";
  if (type === "-") return "transport";
  return null;
};
