import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  userId: null | string;
  status: "idle" | "loading" | "succeeded";
}

const initialState: InitialState = {
  userId: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
      state.status = "succeeded";
    },
    clearUser: (state) => {
      state.userId = null;
      state.status = "succeeded";
    },
    setAuthLoading: (state) => {
      state.status = "loading";
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = userSlice.actions;
export const authReducer = userSlice.reducer;
