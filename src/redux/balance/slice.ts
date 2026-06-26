import { createSlice } from "@reduxjs/toolkit";
import { fetchBalance } from "./operations";
import {
  addTransactionWithBalance,
  deleteTransactionWithBalance,
} from "../services/operations";
import { logOut } from "../user/operations";

interface Balance {
  value: number;
  isLoading: boolean;
  isLoaded: boolean;
  error: null | string;
}

const initialState: Balance = {
  value: 0,
  isLoading: false,
  isLoaded: false,
  error: null,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.value = action.payload.balance;
        state.isLoading = false;
        state.isLoaded = true;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoaded = true;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })
      .addCase(addTransactionWithBalance.fulfilled, (state, action) => {
        state.value = action.payload.newBalance;
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(addTransactionWithBalance.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })
      .addCase(deleteTransactionWithBalance.fulfilled, (state, action) => {
        state.value = action.payload.newBalance;
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(deleteTransactionWithBalance.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })
      .addCase(logOut.fulfilled, () => initialState),
});

export const balanceReducer = balanceSlice.reducer;
