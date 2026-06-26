export type TransactionType = "+" | "-";

export interface MoneyEntry {
  id: string;
  desc: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
}

export const isTransactionType = (value: unknown): value is TransactionType => {
  return value === "+" || value === "-";
};
