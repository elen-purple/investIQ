import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";

export const fetchMoney = createAsyncThunk(
  "money/fetchMoney",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const userId = state.user?.userId;
    if (!userId) return thunkAPI.rejectWithValue("Користувач не авторизований");
    try {
      const listRef = collection(db, "users", userId, "money");
      const q = query(listRef, orderBy("date"));
      const querySnapshot = await getDocs(q);
      const items: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          ...data,
          date: data.date?.toDate
            ? data.date.toDate().toISOString()
            : data.date,
        });
      });
      return items;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
