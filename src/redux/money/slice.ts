import { createSlice } from "@reduxjs/toolkit";
import { addMoney, deleteMoney, fetchMoney } from "./operations";

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
        state.error = action.error.message ?? null;
      })
      .addCase(addMoney.fulfilled, (state, action: any) => {
        state.notes.push(action.payload);
      })
      .addCase(addMoney.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      })
      .addCase(deleteMoney.fulfilled, (state, action) => {
        state.notes = [
          ...state.notes.filter(({ id }) => id !== action.payload),
        ];
      })
      .addCase(deleteMoney.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      }),
});

export const moneyReducer = moneySlice.reducer;
