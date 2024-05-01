import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/userSlice";

const persistConfig = { key: "user", storage };
const uPd = { key: "data", storage };

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedReducer1 = persistReducer(uPd, userSlice);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    user: persistedReducer1,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
