import { createSlice } from "@reduxjs/toolkit";
import { fetchMoney } from "./operations";
import {
  addTransactionWithBalance,
  deleteTransactionWithBalance,
} from "../services/operations";

interface Note {
  id: string;
  desc: string;
  date: string;
  category: string;
  amount: number;
  type: "+" | "-" | "";
}

interface InitialState {
  notes: Note[];
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
      })
      .addCase(fetchMoney.pending, (state) => {
        state.isLoading = true;
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
      })
      .addCase(deleteTransactionWithBalance.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? null);
      }),
});

export const moneyReducer = moneySlice.reducer;
