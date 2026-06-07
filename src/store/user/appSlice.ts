import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserData } from '../../types/types';
import { INITIAL_COUNTRY_LIST } from '../../constants/countries';
import { INITIAL_GENDER_LIST } from '../../constants/genders';

interface appState {
  users: UserData[];
  countries: string[];
  genders: string[];
}

const initialState: appState = {
  users: [],
  countries: INITIAL_COUNTRY_LIST,
  genders: INITIAL_GENDER_LIST,
};

const appSlice = createSlice({
  name: 'appData',

  initialState,

  reducers: {
    submitUserData: (state, action: PayloadAction<UserData>) => {
      state.users.push(action.payload);
    },
  },
});

export const { submitUserData } = appSlice.actions;

export default appSlice.reducer;
