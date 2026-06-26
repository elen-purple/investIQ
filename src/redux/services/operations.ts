import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import { doc, collection, runTransaction } from "firebase/firestore";
import type { RootState } from "../store";

interface AddTransactionPayload {
  desc: string;
  amount: number;
  category: string;
  type: "+" | "-" | "";
}

export const addTransactionWithBalance = createAsyncThunk<
  {
    item: {
      id: string;
      desc: string;
      amount: number;
      date: string;
      category: string;
      type: "+" | "-" | "";
    };
    newBalance: number;
  },
  AddTransactionPayload,
  { state: RootState }
>(
  "money/addTransactionWithBalance",
  async ({ desc, amount, category, type }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user?.userId;

    if (!userId) return thunkAPI.rejectWithValue("Користувач не авторизований");

    const userDocRef = doc(db, "users", userId);
    const newTransactionRef = doc(collection(db, "users", userId, "money"));
    const date = new Date().toISOString();

    try {
      const result = await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef);

        let currentBalance = 0;
        if (userDoc.exists()) {
          currentBalance = userDoc.data().balance || 0;
        }
        const dynamicAmount = type === "+" ? amount : -amount;
        const computedBalance = currentBalance + dynamicAmount;

        transaction.set(newTransactionRef, {
          desc,
          amount,
          category,
          date,
          type,
        });

        transaction.set(
          userDocRef,
          { balance: computedBalance },
          { merge: true },
        );

        return {
          item: {
            id: newTransactionRef.id,
            desc,
            amount,
            date,
            category,
            type,
          },
          newBalance: computedBalance,
        };
      });

      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

interface DeleteTransactionPayload {
  itemId: string;
  amount: number;
  type: "+" | "-" | "";
}

export const deleteTransactionWithBalance = createAsyncThunk<
  { itemId: string; newBalance: number },
  DeleteTransactionPayload,
  { state: RootState }
>(
  "money/deleteTransactionWithBalance",
  async ({ itemId, amount, type }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user?.userId;

    if (!userId) return thunkAPI.rejectWithValue("Користувач не авторизований");

    const userDocRef = doc(db, "users", userId);
    const itemDocRef = doc(db, "users", userId, "money", itemId);

    try {
      const result = await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef);
        let currentBalance = 0;
        if (userDoc.exists()) {
          currentBalance = userDoc.data().balance || 0;
        }

        const dynamicAmount = type === "+" ? -amount : amount;
        const computedBalance = currentBalance + dynamicAmount;

        transaction.delete(itemDocRef);

        transaction.set(
          userDocRef,
          { balance: computedBalance },
          { merge: true },
        );

        return {
          itemId,
          newBalance: computedBalance,
        };
      });

      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  },
);
