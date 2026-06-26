import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import type { RootState } from "../store";

export const register = createAsyncThunk<
  { uid: string; email: string; displayName: string },
  { email: string; password: string; name: string },
  { state: RootState }
>("user/register", async ({ email, password, name }, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    return {
      uid: user.uid,
      email: user.email ?? "",
      displayName: name,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk<
  { uid: string; email: string; displayName: string },
  { email: string; password: string },
  { state: RootState }
>("user/logIn", async ({ email, password }, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    return {
      uid: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk("user/logOut", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
