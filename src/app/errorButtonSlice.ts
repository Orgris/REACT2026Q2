import { createSlice } from '@reduxjs/toolkit';

interface ErrorButtonState {
  errorOccured: boolean;
}

const initialState: ErrorButtonState = {
  errorOccured: false,
};

const errorButtonSlice = createSlice({
  name: 'errorButton',
  initialState,
  reducers: {
    setError: (state) => {
      state.errorOccured = true;
    },
  },
});

export const { setError } = errorButtonSlice.actions;

export default errorButtonSlice.reducer;
