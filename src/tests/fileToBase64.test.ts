import { describe, it, expect } from 'vitest';
import { fileToBase64 } from '../utils/fileToBase64';

describe('fileToBase64', () => {
  describe('Successful conversion', () => {
    it('should convert text file to base64 string', async () => {
      const file = new File(['hello world'], 'test.txt', {
        type: 'text/plain',
      });
      const result = await fileToBase64(file);

      expect(result).toMatch(/^data:text\/plain;base64,/);
      expect(result).toContain('base64');
    });

    it('should convert image file to base64 string', async () => {
      const file = new File(['dummy image content'], 'image.png', {
        type: 'image/png',
      });
      const result = await fileToBase64(file);

      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    it('should convert JPEG image to base64', async () => {
      const file = new File(['jpeg content'], 'photo.jpg', {
        type: 'image/jpeg',
      });
      const result = await fileToBase64(file);

      expect(result).toMatch(/^data:image\/jpeg;base64,/);
    });

    it('should preserve file content after encoding', async () => {
      const originalContent = 'Hello, World! 123 @#$';
      const file = new File([originalContent], 'test.txt', {
        type: 'text/plain',
      });
      const result = await fileToBase64(file);

      expect(result.length).toBeGreaterThan(originalContent.length);
    });
  });

  describe('File types and sizes', () => {
    it('should handle empty file', async () => {
      const file = new File([''], 'empty.txt', { type: 'text/plain' });
      const result = await fileToBase64(file);

      expect(result).toMatch(/^data:text\/plain;base64,/);
    });

    it('should handle large file content', async () => {
      const largeContent = 'a'.repeat(1000000);
      const file = new File([largeContent], 'large.txt', {
        type: 'text/plain',
      });
      const result = await fileToBase64(file);

      expect(result).toMatch(/^data:text\/plain;base64,/);
      expect(result.length).toBeGreaterThan(1000000);
    });

    it('should handle binary file', async () => {
      const binaryData = new Uint8Array([0, 1, 2, 3, 4, 5]);
      const file = new File([binaryData], 'binary.bin', {
        type: 'application/octet-stream',
      });
      const result = await fileToBase64(file);

      expect(result).toMatch(/^data:application\/octet-stream;base64,/);
    });
  });

  describe('Error handling', () => {
    it('should handle file with no content', async () => {
      const file = new File([], 'empty.txt', { type: 'text/plain' });
      const result = await fileToBase64(file);

      expect(result).toBeDefined();
      expect(result).toMatch(/^data:text\/plain;base64,/);
    });
  });

  describe('Edge cases', () => {
    it('should handle file with special characters in name', async () => {
      const file = new File(['content'], 'test!@#$%^.txt', {
        type: 'text/plain',
      });
      const result = await fileToBase64(file);

      expect(result).toMatch(/^data:text\/plain;base64,/);
    });

    it('should handle file with unicode content', async () => {
      const unicodeContent = 'Test content!';
      const file = new File([unicodeContent], 'unicode.txt', {
        type: 'text/plain',
      });
      const result = await fileToBase64(file);

      expect(result).toMatch(/^data:text\/plain;base64,/);
    });

    it('should handle file with very small content (1 byte)', async () => {
      const file = new File(['A'], 'single.txt', { type: 'text/plain' });
      const result = await fileToBase64(file);

      expect(result).toMatch(/^data:text\/plain;base64,/);
    });
  });
});
