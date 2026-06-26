import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import type { RootState } from "../store";
import { isTransactionType, type MoneyEntry } from "../../types/transactions";

export const fetchMoney = createAsyncThunk<
  MoneyEntry[],
  void,
  { state: RootState }
>("money/fetchMoney", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const userId = state.user?.userId;
  if (!userId) return thunkAPI.rejectWithValue("Користувач не авторизований");
  try {
    const listRef = collection(db, "users", userId, "money");
    const q = query(listRef, orderBy("date"));
    const querySnapshot = await getDocs(q);
    const items: MoneyEntry[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (!isTransactionType(data.type)) return;

      items.push({
        id: doc.id,
        date: data.date?.toDate ? data.date.toDate().toISOString() : data.date,
        desc: data.desc,
        amount: data.amount,
        category: data.category,
        type: data.type,
      });
    });
    return items;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});
