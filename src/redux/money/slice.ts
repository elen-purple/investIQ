import { createSlice } from "@reduxjs/toolkit";
import { fetchMoney } from "./operations";
import {
  addTransactionWithBalance,
  deleteTransactionWithBalance,
} from "../services/operations";
import type { MoneyEntry } from "../../types/transactions";
import { logOut } from "../user/operations";

interface InitialState {
  notes: MoneyEntry[];
  isLoading: boolean;
  error: null | string;
}

const initialState: InitialState = {
  notes: [],
  isLoading: false,
  error: null,
};

const moneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchMoney.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchMoney.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMoney.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })
      .addCase(addTransactionWithBalance.fulfilled, (state, action) => {
        state.notes.push(action.payload.item);
        state.error = null;
      })
      .addCase(addTransactionWithBalance.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      })
      .addCase(deleteTransactionWithBalance.fulfilled, (state, action) => {
        state.notes = [
          ...state.notes.filter(({ id }) => id !== action.payload.itemId),
        ];
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

export const moneyReducer = moneySlice.reducer;
