import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import type { RootState } from "../store";

export const fetchBalance = createAsyncThunk<
  { balance: number },
  void,
  { state: RootState }
>("balance/fetchBalance", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const userId = state.user?.userId;

  if (!userId) return thunkAPI.rejectWithValue("Користувач не авторизований");

  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists() && docSnap.data().balance !== undefined) {
      return { balance: docSnap.data().balance };
    } else {
      return { balance: 0 };
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
