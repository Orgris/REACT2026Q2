import type { RootState } from '..';

export const hasErrorOccured = (state: RootState) =>
  state.errorButton.errorOccured;
