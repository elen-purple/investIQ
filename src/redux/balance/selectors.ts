interface Balance {
  value: number;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}
export const selectBalance = ({ balance }: { balance: Balance }) =>
  balance.value;

export const selectBalanceIsReady = ({ balance }: { balance: Balance }) =>
  balance.isLoaded && !balance.isLoading && balance.error === null;
