import sanitizeHtml from 'sanitize-html';
import { libraryUpdateSchema } from '../../schemas/library.schema';

describe('libraryUpdateSchema -> Schema de validation', () => {
  describe('Cas de réussite', () => {
    it('doit valider un nom correct', () => {
      const result = libraryUpdateSchema.safeParse({ name: 'Test de nom' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Test de nom');
      }
    });
  });

  describe('Cas d’échec', () => {
    it('doit rejetter un nom vide', () => {
      const result = libraryUpdateSchema.safeParse({ name: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Le nom est requis');
      }
    });

    it('doit rejetter un nom trop long', () => {
      const name = 'a'.repeat(101);
      const result = libraryUpdateSchema.safeParse({ name: name });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Le nom est trop long');
      }
    });

    it('doit rejetter les mauvais types de données', () => {
      const result = libraryUpdateSchema.safeParse({ name: 1234 });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toMatch(/Expected string/);
      }
    });

    it('doit sanitizer les datas', () => {
      const scriptInput = '<script>alert</script>Ma biblio';
      const result = libraryUpdateSchema.safeParse({ name: scriptInput });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Ma biblio');
      }
    });
  });
});
