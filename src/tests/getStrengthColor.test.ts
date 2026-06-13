import { describe, it, expect } from 'vitest';
import { getStrengthColor } from '../utils/getStrengthColor';

describe('getStrengthColor', () => {
  describe('Edge cases (boundary values)', () => {
    it('should return gray for strength 0', () => {
      const result = getStrengthColor(0);
      expect(result).toBe('bg-gray-200');
    });

    it('should return red for strength 0.25', () => {
      const result = getStrengthColor(0.25);
      expect(result).toBe('bg-red-500');
    });

    it('should return orange for strength 0.5', () => {
      const result = getStrengthColor(0.5);
      expect(result).toBe('bg-orange-500');
    });

    it('should return yellow for strength 0.75', () => {
      const result = getStrengthColor(0.75);
      expect(result).toBe('bg-yellow-500');
    });

    it('should return green for strength 1', () => {
      const result = getStrengthColor(1);
      expect(result).toBe('bg-green-500');
    });
  });

  describe('Invalid/edge values', () => {
    it('should handle negative strength', () => {
      const result = getStrengthColor(-1);
      expect(result).toBe('bg-red-500');
    });

    it('should handle strength greater than 1', () => {
      const result = getStrengthColor(2);
      expect(result).toBe('bg-green-500');
    });

    it('should handle strength as decimal', () => {
      const result = getStrengthColor(0.333);
      expect(result).toBe('bg-orange-500');
    });
  });

  describe('Real-world scenarios', () => {
    it('should return gray for empty password (strength 0)', () => {
      const strength = 0;
      const result = getStrengthColor(strength);
      expect(result).toBe('bg-gray-200');
    });

    it('should return red for very weak password', () => {
      const strength = 0.2;
      const result = getStrengthColor(strength);
      expect(result).toBe('bg-red-500');
    });

    it('should return orange for weak password', () => {
      const strength = 0.4;
      const result = getStrengthColor(strength);
      expect(result).toBe('bg-orange-500');
    });

    it('should return yellow for medium password', () => {
      const strength = 0.6;
      const result = getStrengthColor(strength);
      expect(result).toBe('bg-yellow-500');
    });

    it('should return green for strong password', () => {
      const strength = 0.8;
      const result = getStrengthColor(strength);
      expect(result).toBe('bg-green-500');
    });

    it('should return green for very strong password', () => {
      const strength = 1;
      const result = getStrengthColor(strength);
      expect(result).toBe('bg-green-500');
    });
  });
});
