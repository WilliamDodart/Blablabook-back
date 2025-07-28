import sanitizeHtml from 'sanitize-html';
import { libraryCreateSchema } from '../../schemas/library.schema';

describe('libraryCreateSchema', () => {
  describe('Cas valides', () => {
    it('devrait valider un nom et un user_id valides', () => {
      const input = {
        name: 'Ma bibliothèque',
        user_id: 1,
      };
      const result = libraryCreateSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe(sanitizeHtml(input.name));
        expect(result.data.user_id).toBe(1);
      }
    });

    it('devrait nettoyer le HTML dans le nom', () => {
      const input = {
        name: '<script>alert("xss")</script>Ma bibliothèque',
        user_id: 2,
      };
      const result = libraryCreateSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).not.toContain('<script>');
        expect(result.data.name).toContain('Ma bibliothèque');
      }
    });
  });

  describe('Cas invalides', () => {
    it('devrait échouer si le nom est vide', () => {
      const result = libraryCreateSchema.safeParse({ name: '', user_id: 1 });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Le nom est requis');
      }
    });

    it('devrait échouer si le nom dépasse 100 caractères', () => {
      const longName = 'a'.repeat(101);
      const result = libraryCreateSchema.safeParse({
        name: longName,
        user_id: 1,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Le nom est trop long');
      }
    });

    it('devrait échouer si user_id est manquant', () => {
      const result = libraryCreateSchema.safeParse({ name: 'Nom valide' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "L'identifiant de l'utilisateur est incorrect",
        );
      }
    });

    it('devrait échouer si user_id n’est pas un entier', () => {
      const result = libraryCreateSchema.safeParse({
        name: 'Nom',
        user_id: 1.5,
      });
      expect(result.success).toBe(false);
    });

    it('devrait échouer si user_id n’est pas un nombre', () => {
      const result = libraryCreateSchema.safeParse({
        name: 'Nom',
        user_id: 'abc' as string,
      });
      expect(result.success).toBe(false);
    });
  });
});
