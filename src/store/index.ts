import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './user/appSlice';

export const store = configureStore({
  reducer: {
    appData: formDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
