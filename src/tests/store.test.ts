import { describe, it, expect } from 'vitest';
import { store, type AppDispatch, type RootState } from '../store';
import { mockUser } from './mocks';
import { submitUserData } from '../store/user/appSlice';

describe('Store Configuration', () => {
  describe('Store creation', () => {
    it('should create store with initial state', () => {
      const state = store.getState();

      expect(state).toHaveProperty('appData');
      expect(state.appData).toEqual({
        users: [],
        countries: expect.any(Array),
        genders: expect.any(Array),
      });
    });

    it('should have correct reducer keys', () => {
      const state = store.getState();

      expect(Object.keys(state)).toEqual(['appData']);
    });
  });

  describe('Store actions', () => {
    it('should dispatch actions and update state', () => {
      store.dispatch(submitUserData(mockUser));

      const state = store.getState();
      expect(state.appData.users).toHaveLength(1);
      expect(state.appData.users[0]).toEqual(mockUser);
    });

    it('should handle multiple dispatches', () => {
      const initialLength = store.getState().appData.users.length;

      store.dispatch(submitUserData(mockUser));
      store.dispatch(
        submitUserData({ ...mockUser, id: initialLength + 2, name: 'Another' })
      );

      const state = store.getState();
      expect(state.appData.users.length).toBeGreaterThan(initialLength);
    });
  });

  describe('Type exports', () => {
    it('should export RootState type', () => {
      const state: RootState = store.getState();
      expect(state).toBeDefined();
    });

    it('should export AppDispatch type', () => {
      const dispatch: AppDispatch = store.dispatch;
      expect(dispatch).toBeDefined();
      expect(typeof dispatch).toBe('function');
    });
  });
});
