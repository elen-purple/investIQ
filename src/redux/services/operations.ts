import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import { doc, collection, runTransaction } from "firebase/firestore";
import type { RootState } from "../store";
import {
  isTransactionType,
  isValidTransactionAmount,
  type MoneyEntry,
  type TransactionType,
} from "../../types/transactions";
import type { CategoryId } from "../../constants/categories";

interface AddTransactionPayload {
  desc: string;
  amount: number;
  category: CategoryId;
  type: TransactionType;
}

export const addTransactionWithBalance = createAsyncThunk<
  {
    item: MoneyEntry;
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
    if (!isValidTransactionAmount(amount) || desc.trim() === "") {
      return thunkAPI.rejectWithValue("Некоректні дані транзакції");
    }

    const userDocRef = doc(db, "users", userId);
    const newTransactionRef = doc(collection(db, "users", userId, "money"));
    const date = new Date().toISOString();

    try {
      const result = await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef);

        let currentBalance = 0;
        if (userDoc.exists()) {
          const storedBalance = userDoc.data().balance;
          if (
            storedBalance !== undefined &&
            (typeof storedBalance !== "number" ||
              !Number.isFinite(storedBalance))
          ) {
            throw new Error("У Firebase збережено некоректний баланс");
          }
          currentBalance = storedBalance ?? 0;
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
}

export const deleteTransactionWithBalance = createAsyncThunk<
  { itemId: string; newBalance: number },
  DeleteTransactionPayload,
  { state: RootState }
>("money/deleteTransactionWithBalance", async ({ itemId }, thunkAPI) => {
  const state = thunkAPI.getState();
  const userId = state.user?.userId;

  if (!userId) return thunkAPI.rejectWithValue("Користувач не авторизований");

  const userDocRef = doc(db, "users", userId);
  const itemDocRef = doc(db, "users", userId, "money", itemId);

  try {
    const result = await runTransaction(db, async (transaction) => {
      const [userDoc, itemDoc] = await Promise.all([
        transaction.get(userDocRef),
        transaction.get(itemDocRef),
      ]);

      if (!itemDoc.exists()) {
        throw new Error("Транзакцію вже видалено або вона не існує");
      }

      const itemData = itemDoc.data();
      if (
        !isValidTransactionAmount(itemData.amount) ||
        !isTransactionType(itemData.type)
      ) {
        throw new Error("У Firebase збережено некоректну транзакцію");
      }

      let currentBalance = 0;
      if (userDoc.exists()) {
        const storedBalance = userDoc.data().balance;
        if (
          storedBalance !== undefined &&
          (typeof storedBalance !== "number" || !Number.isFinite(storedBalance))
        ) {
          throw new Error("У Firebase збережено некоректний баланс");
        }
        currentBalance = storedBalance ?? 0;
      }

      const dynamicAmount =
        itemData.type === "+" ? -itemData.amount : itemData.amount;
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
});
