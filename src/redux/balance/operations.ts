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

    if (!docSnap.exists()) return { balance: 0 };

    const balance = docSnap.data().balance;
    if (balance === undefined) return { balance: 0 };

    if (typeof balance !== "number" || !Number.isFinite(balance)) {
      return thunkAPI.rejectWithValue(
        "У Firebase збережено некоректний баланс",
      );
    }

    return { balance };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});
