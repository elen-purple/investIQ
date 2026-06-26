import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import type { RootState } from "../store";

export const fetchMoney = createAsyncThunk<
  {
    id: string;
    desc: string;
    amount: number;
    date: string;
    category: string;
    type: "+" | "-" | "";
  }[],
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
    const items: {
      id: string;
      desc: string;
      amount: number;
      date: string;
      category: string;
      type: "+" | "-" | "";
    }[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
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
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
