import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, register } from "./operations";

interface UserData {
  email: null | string;
  uid: string;
  displayName: null | string;
}

interface UserState {
  user: UserData | null;
  isAuth: boolean;
  isLoading: boolean;
  errorR: string | null;
  errorL: string | null;
}

const initialState: UserState = {
  user: {
    email: null,
    uid: "",
    displayName: null,
  },
  isAuth: false,
  isLoading: false,
  errorR: null,
  errorL: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (build) =>
    build
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
        state.errorR = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errorR = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
        state.errorR =
          typeof action.payload === "string"
            ? action.payload
            : (action.error?.message ?? null);
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
        state.errorL = null;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.errorL = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
        state.errorL =
          typeof action.payload === "string"
            ? action.payload
            : (action.error?.message ?? null);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(logOut.rejected, (state) => {
        state.user = null;
        state.isAuth = true;
      }),
});

export const userReducer = userSlice.reducer;
