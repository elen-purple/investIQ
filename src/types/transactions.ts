import type { CategoryId } from "../constants/categories";

export type TransactionType = "+" | "-";

export interface MoneyEntry {
  id: string;
  desc: string;
  amount: number;
  date: string;
  category: CategoryId;
  type: TransactionType;
}

export const isTransactionType = (value: unknown): value is TransactionType => {
  return value === "+" || value === "-";
};
