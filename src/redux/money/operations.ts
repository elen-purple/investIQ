import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
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

export const addMoney = createAsyncThunk<
  {
    id: string;
    desc: string;
    amount: number;
    date: string;
    category: string;
    type: string;
  },
  { desc: string; amount: number; category: string; type: string }
>("money/addMoney", async ({ desc, amount, category, type }: any, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const userId = state.user?.userId;
  if (!userId) return thunkAPI.rejectWithValue("Користувач не авторизований");
  try {
    const listRef = collection(db, "users", userId, "money");
    const date = new Date().toISOString();
    const docRef = await addDoc(listRef, {
      desc,
      amount,
      category,
      date,
      type,
    });
    return { id: docRef.id, desc, amount, date, category, type };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteMoney = createAsyncThunk(
  "money/deleteMoney",
  async (itemId: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const userId = state.user?.userId;
    if (!userId) return thunkAPI.rejectWithValue("Користувач не авторизований");
    try {
      const itemDocRef = doc(db, "users", userId, "money", itemId);
      await deleteDoc(itemDocRef);
      return itemId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
