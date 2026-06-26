import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/slice";
import storage from "redux-persist/lib/storage";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { moneyReducer } from "./money/slice";
import { balanceReducer } from "./balance/slice";
import type { WebStorage } from "redux-persist/es/types";

type StorageImport = WebStorage | { default: WebStorage };

const storageModule = storage as unknown as StorageImport;
const persistStorage =
  "getItem" in storageModule ? storageModule : storageModule.default;

const persistConfig = {
  key: "root",
  storage: persistStorage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: combineReducers({
    user: persistedReducer,
    money: moneyReducer,
    balance: balanceReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
