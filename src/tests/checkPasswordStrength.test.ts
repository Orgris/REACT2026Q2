import { describe, it, expect } from 'vitest';
import { checkPasswordStrength } from '../utils/checkPasswordStrength';

describe('checkPasswordStrength', () => {
  describe('Empty password', () => {
    it('should return false for all criteria when password is empty', () => {
      const result = checkPasswordStrength('');

      expect(result.hasNumber).toBe(false);
      expect(result.hasUppercase).toBe(false);
      expect(result.hasLowercase).toBe(false);
      expect(result.hasSpecial).toBe(false);
    });
  });

  describe('Numbers detection', () => {
    it('should detect numbers in password', () => {
      const result = checkPasswordStrength('123');

      expect(result.hasNumber).toBe(true);
    });

    it('should return false when no numbers present', () => {
      const result = checkPasswordStrength('abc');

      expect(result.hasNumber).toBe(false);
    });

    it('should detect numbers mixed with letters', () => {
      const result = checkPasswordStrength('abc123');

      expect(result.hasNumber).toBe(true);
    });
  });

  describe('Uppercase detection', () => {
    it('should detect English uppercase letters', () => {
      const result = checkPasswordStrength('ABC');

      expect(result.hasUppercase).toBe(true);
    });

    it('should detect Russian uppercase letters', () => {
      const result = checkPasswordStrength('АБВ');

      expect(result.hasUppercase).toBe(true);
    });

    it('should return false when no uppercase letters', () => {
      const result = checkPasswordStrength('abc');

      expect(result.hasUppercase).toBe(false);
    });

    it('should detect uppercase mixed with lowercase', () => {
      const result = checkPasswordStrength('Abc');

      expect(result.hasUppercase).toBe(true);
    });
  });

  describe('Lowercase detection', () => {
    it('should detect English lowercase letters', () => {
      const result = checkPasswordStrength('abc');

      expect(result.hasLowercase).toBe(true);
    });

    it('should detect Russian lowercase letters', () => {
      const result = checkPasswordStrength('абв');

      expect(result.hasLowercase).toBe(true);
    });

    it('should return false when no lowercase letters', () => {
      const result = checkPasswordStrength('ABC');

      expect(result.hasLowercase).toBe(false);
    });
  });

  describe('Special characters detection', () => {
    it('should detect exclamation mark', () => {
      const result = checkPasswordStrength('!');

      expect(result.hasSpecial).toBe(true);
    });

    it('should detect @ symbol', () => {
      const result = checkPasswordStrength('@');

      expect(result.hasSpecial).toBe(true);
    });

    it('should return false when no special characters', () => {
      const result = checkPasswordStrength('abc123');

      expect(result.hasSpecial).toBe(false);
    });
  });

  describe('Combined criteria', () => {
    it('should detect strong password with all criteria', () => {
      const result = checkPasswordStrength('StrongP@ss123');

      expect(result.hasNumber).toBe(true);
      expect(result.hasUppercase).toBe(true);
      expect(result.hasLowercase).toBe(true);
      expect(result.hasSpecial).toBe(true);
    });

    it('should detect password with only uppercase and numbers', () => {
      const result = checkPasswordStrength('ABC123');

      expect(result.hasNumber).toBe(true);
      expect(result.hasUppercase).toBe(true);
      expect(result.hasLowercase).toBe(false);
      expect(result.hasSpecial).toBe(false);
    });

    it('should detect password with only lowercase and special chars', () => {
      const result = checkPasswordStrength('abc!@#');

      expect(result.hasNumber).toBe(false);
      expect(result.hasUppercase).toBe(false);
      expect(result.hasLowercase).toBe(true);
      expect(result.hasSpecial).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle password with spaces', () => {
      const result = checkPasswordStrength('hello world');

      expect(result.hasLowercase).toBe(true);
      expect(result.hasSpecial).toBe(false);
    });

    it('should handle very long password', () => {
      const longPassword = 'A'.repeat(1000) + '1' + '!';
      const result = checkPasswordStrength(longPassword);

      expect(result.hasUppercase).toBe(true);
      expect(result.hasNumber).toBe(true);
      expect(result.hasSpecial).toBe(true);
    });
  });
});
