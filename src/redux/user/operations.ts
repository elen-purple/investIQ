import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebase";

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface LogInCredentials {
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  "user/register",
  async ({ email, password, name }: RegisterCredentials, thunkAPI) => {
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
        email: user.email,
        displayName: name,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logIn = createAsyncThunk(
  "user/logIn",
  async ({ email, password }: LogInCredentials, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logOut = createAsyncThunk("user/logOut", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
