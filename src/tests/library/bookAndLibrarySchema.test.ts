import { ZodError } from 'zod';
import { bookAndLibrarySchema } from '../../schemas/library.schema';

describe('bookAndLibrarySchema', () => {
  describe('Cas valides', () => {
    it('devrait valider un bookId et un libraryId valides', () => {
      //Arrange
      const input = {
        libraryId: '2',
        bookId: '5',
      };

      //Act
      const result = bookAndLibrarySchema.parse(input);

      //Assert
      expect(result).toEqual({
        libraryId: 2,
        bookId: 5,
      });
    });
  });

  describe('Cas invalides', () => {
    it('devrait lever une erreur si bookId est 0', () => {
      const input = {
        libraryId: '1',
        bookId: '0',
      };
      expect(() => bookAndLibrarySchema.parse(input)).toThrow(ZodError);
    });

    it('devrait lever une erreur si libraryId est négatif', () => {
      const input = {
        libraryId: '-3',
        bookId: '2',
      };
      expect(() => bookAndLibrarySchema.parse(input)).toThrow(ZodError);
    });

    it('devrait lever une erreur si les IDs ne sont pas numériques', () => {
      const input = {
        libraryId: 'abcd',
        bookId: 'abcd',
      };
      expect(() => bookAndLibrarySchema.parse(input)).toThrow(ZodError);
    });
  });
});
