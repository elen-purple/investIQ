import { createSlice } from "@reduxjs/toolkit";
import { fetchBalance, updateBalance } from "./operations";

interface Balance {
  value: number;
  error: null | string;
}

const initialState: Balance = {
  value: 0,
  error: null,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.value = action.payload.balance;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.value = action.payload.balance;
      })
      .addCase(updateBalance.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      }),
});

export const balanceReducer = balanceSlice.reducer;
