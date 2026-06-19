interface Balance {
  value: number;
}
export const selectBalance = ({ balance }: { balance: Balance }) =>
  balance.value;
