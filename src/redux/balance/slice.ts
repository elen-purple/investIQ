import { createSlice } from "@reduxjs/toolkit";
import { fetchBalance } from "./operations";
import {
  addTransactionWithBalance,
  deleteTransactionWithBalance,
} from "../services/operations";

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
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })
      .addCase(addTransactionWithBalance.fulfilled, (state, action) => {
        state.value = action.payload.newBalance;
      })
      .addCase(addTransactionWithBalance.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })
      .addCase(deleteTransactionWithBalance.fulfilled, (state, action) => {
        state.value = action.payload.newBalance;
      })
      .addCase(deleteTransactionWithBalance.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      }),
});

export const balanceReducer = balanceSlice.reducer;
