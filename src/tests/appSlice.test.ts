import { describe, it, expect } from 'vitest';
import appReducer, {
  submitUserData,
  type appState,
} from '../store/user/appSlice';
import {
  selectUsers,
  selectGenders,
  selectCountries,
} from '../store/user/appSelectors';
import { mockUser, mockUser2 } from './mocks';

describe('Store - Behavior Tests', () => {
  describe('Reducer', () => {
    it('should return initial state', () => {
      const initialState = appReducer(undefined, { type: 'unknown' });

      expect(initialState).toEqual({
        users: [],
        countries: expect.any(Array),
        genders: expect.any(Array),
      });
      expect(initialState.users).toHaveLength(0);
    });

    it('should handle submitUserData - add new user to empty list', () => {
      const initialState = { users: [], countries: [], genders: [] };
      const nextState = appReducer(initialState, submitUserData(mockUser));

      expect(nextState.users).toHaveLength(1);
      expect(nextState.users[0]).toEqual(mockUser);
    });

    it('should handle submitUserData - add multiple users', () => {
      const initialState: appState = {
        users: [],
        countries: [],
        genders: [],
      };

      let state = appReducer(initialState, submitUserData(mockUser));
      state = appReducer(state, submitUserData(mockUser2));

      expect(state.users).toHaveLength(2);
      expect(state.users[0]).toEqual(mockUser);
      expect(state.users[1]).toEqual(mockUser2);
    });

    it('should handle submitUserData - preserve existing users', () => {
      const initialState = { users: [mockUser], countries: [], genders: [] };
      const nextState = appReducer(initialState, submitUserData(mockUser2));

      expect(nextState.users).toHaveLength(2);
      expect(nextState.users[0]).toEqual(mockUser);
      expect(nextState.users[1]).toEqual(mockUser2);
    });
  });

  describe('Actions', () => {
    it('should create submitUserData action with correct payload', () => {
      const action = submitUserData(mockUser);

      expect(action.type).toBe('appData/submitUserData');
      expect(action.payload).toEqual(mockUser);
    });

    it('should create submitUserData action with different users', () => {
      const action1 = submitUserData(mockUser);
      const action2 = submitUserData(mockUser2);

      expect(action1.payload).toEqual(mockUser);
      expect(action2.payload).toEqual(mockUser2);
      expect(action1.payload.id).not.toBe(action2.payload.id);
    });
  });

  describe('Selectors', () => {
    const mockState = {
      appData: {
        users: [mockUser, mockUser2],
        countries: ['USA', 'Canada', 'UK'],
        genders: ['male', 'female', 'other'],
      },
    };

    it('should select all users', () => {
      const users = selectUsers(mockState);

      expect(users).toHaveLength(2);
      expect(users).toEqual([mockUser, mockUser2]);
    });

    it('should select empty array when no users', () => {
      const emptyState = {
        appData: { users: [], countries: [], genders: [] },
      };
      const users = selectUsers(emptyState);

      expect(users).toHaveLength(0);
      expect(users).toEqual([]);
    });

    it('should select all genders', () => {
      const genders = selectGenders(mockState);

      expect(genders).toHaveLength(3);
      expect(genders).toEqual(['male', 'female', 'other']);
    });

    it('should select all countries', () => {
      const countries = selectCountries(mockState);

      expect(countries).toHaveLength(3);
      expect(countries).toEqual(['USA', 'Canada', 'UK']);
    });

    it('should return consistent data structure', () => {
      const users = selectUsers(mockState);

      users.forEach((user) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password');
        expect(user).toHaveProperty('age');
        expect(user).toHaveProperty('gender');
        expect(user).toHaveProperty('country');
        expect(user).toHaveProperty('terms');
        expect(user).toHaveProperty('avatar');
      });
    });
  });

  describe('Integration - Action + Reducer', () => {
    it('should dispatch action and update state correctly', () => {
      let state = appReducer(undefined, { type: 'unknown' });

      expect(state.users).toHaveLength(0);

      state = appReducer(state, submitUserData(mockUser));

      expect(state.users).toHaveLength(1);
      expect(state.users[0].name).toBe('John Doe');
      expect(state.users[0].email).toBe('john@example.com');

      state = appReducer(state, submitUserData(mockUser2));

      expect(state.users).toHaveLength(2);
      expect(state.users[1].name).toBe('Jane Smith');
    });
  });
});
