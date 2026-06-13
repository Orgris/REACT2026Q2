import { describe, it, expect } from 'vitest';
import { getRegisterSchema } from '../utils/registerSchema';

describe('getRegisterSchema - Validation Behavior Tests', () => {
  const countries = ['USA', 'Canada', 'UK', 'Russia'];
  const schema = getRegisterSchema(countries);

  const validData = {
    name: 'John',
    age: 25,
    email: 'user@example.com',
    password: 'pass123',
    confirmPassword: 'pass123',
    gender: 'male',
    country: 'USA',
    terms: true,
    avatar: [new File(['dummy'], 'avatar.png', { type: 'image/png' })],
  };

  describe('Name validation', () => {
    it('should require name', async () => {
      await expect(
        schema.validate({ ...validData, name: undefined })
      ).rejects.toThrow('Name is required');
    });

    it('should reject name with lowercase first letter', async () => {
      await expect(
        schema.validate({ ...validData, name: 'john' })
      ).rejects.toThrow('First letter must be uppercase');
    });

    it('should accept valid name', async () => {
      const result = await schema.validate({ ...validData, name: 'John' });
      expect(result.name).toBe('John');
    });
  });

  describe('Email validation', () => {
    it('should require email', async () => {
      await expect(
        schema.validate({ ...validData, email: undefined })
      ).rejects.toThrow('Email is required');
    });

    it('should reject email with multiple @ symbols', async () => {
      await expect(
        schema.validate({ ...validData, email: 'user@example@com' })
      ).rejects.toThrow('Must contain exactly one @ symbol');
    });

    it('should reject email with empty local part', async () => {
      await expect(
        schema.validate({ ...validData, email: '@example.com' })
      ).rejects.toThrow('Local part cannot be empty');
    });

    it('should reject email without dot in domain', async () => {
      await expect(
        schema.validate({ ...validData, email: 'user@examplecom' })
      ).rejects.toThrow('Domain must contain at least one dot');
    });

    it('should accept valid email', async () => {
      const result = await schema.validate({
        ...validData,
        email: 'user@example.com',
      });
      expect(result.email).toBe('user@example.com');
    });
  });

  describe('Age validation', () => {
    it('should require age', async () => {
      await expect(
        schema.validate({ ...validData, age: undefined })
      ).rejects.toThrow('Age is required');
    });

    it('should reject negative age', async () => {
      await expect(schema.validate({ ...validData, age: -5 })).rejects.toThrow(
        'Age cannot be negative'
      );
    });

    it('should accept valid age', async () => {
      const result = await schema.validate({ ...validData, age: 25 });
      expect(result.age).toBe(25);
    });
  });

  describe('Password validation', () => {
    it('should require confirm password to match', async () => {
      await expect(
        schema.validate({ ...validData, confirmPassword: 'different' })
      ).rejects.toThrow('Passwords must match');
    });
  });

  describe('Country validation', () => {
    it('should require country', async () => {
      await expect(
        schema.validate({ ...validData, country: undefined })
      ).rejects.toThrow('Select your country');
    });

    it('should reject invalid country', async () => {
      await expect(
        schema.validate({ ...validData, country: 'InvalidCountry' })
      ).rejects.toThrow('Selected country is invalid');
    });
  });

  describe('Terms validation', () => {
    it('should require terms to be accepted', async () => {
      await expect(
        schema.validate({ ...validData, terms: false })
      ).rejects.toThrow('You must accept terms');
    });
  });

  describe('Avatar validation', () => {
    it('should require avatar', async () => {
      await expect(
        schema.validate({ ...validData, avatar: undefined })
      ).rejects.toThrow('Avatar is required');
    });

    it('should reject invalid file format', async () => {
      const gifFile = [
        new File(['dummy'], 'avatar.gif', { type: 'image/gif' }),
      ];
      await expect(
        schema.validate({ ...validData, avatar: gifFile })
      ).rejects.toThrow('Only PNG and JPEG formats are allowed');
    });
  });
});
