import { configureStore } from '@reduxjs/toolkit';
import errorButtonReducer from './errorButtonSlice';

export const store = configureStore({
  reducer: {
    errorButton: errorButtonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
