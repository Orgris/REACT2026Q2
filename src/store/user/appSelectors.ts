import type { RootState } from '..';

export const selectUsers = (state: RootState) => state.appData.users;

export const selectGenders = (state: RootState) => state.appData.genders;

export const selectCountries = (state: RootState) => state.appData.countries;
