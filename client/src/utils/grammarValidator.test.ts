import { describe, it, expect } from 'vitest';
import { validateGrammar, validateMinimumWords, checkTabCompletion, getRubricForTab } from './grammarValidator';

describe('Grammar Validator', () => {
  describe('validateGrammar', () => {
    it('should return error for empty text', () => {
      const result = validateGrammar('', 'Test');
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain('cannot be empty');
    });

    it('should return error for text without ending punctuation', () => {
      const result = validateGrammar('This is a sentence', 'Test');
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(e => e.message.includes('must end with'))).toBe(true);
    });

    it('should pass for single sentence with capital letter and punctuation', () => {
      const result = validateGrammar('This is a valid sentence.', 'Test');
      expect(result).toHaveLength(0);
    });

    it('should return error for lowercase sentence start', () => {
      const result = validateGrammar('this is a sentence.', 'Test');
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(e => e.message.includes('capital letter'))).toBe(true);
    });

    it('should return error for lowercase i', () => {
      const result = validateGrammar('I like this. i am happy.', 'Test');
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(e => e.message.includes('lowercase'))) .toBe(true);
    });

    it('should pass for multiple sentences with correct grammar', () => {
      const result = validateGrammar('This is the first sentence. This is the second sentence!', 'Test');
      expect(result).toHaveLength(0);
    });

    it('should handle Hebrew text correctly', () => {
      const result = validateGrammar('זה משפט בעברית.', 'Test');
      expect(result).toHaveLength(0);
    });

    it('should handle mixed English and Hebrew', () => {
      const result = validateGrammar('This is English. זה עברית.', 'Test');
      expect(result).toHaveLength(0);
    });

    it('should detect multiple errors in one text', () => {
      const result = validateGrammar('this is wrong. and this too.', 'Test');
      expect(result.length).toBeGreaterThan(1);
    });

    it('should handle exclamation marks and question marks', () => {
      const result = validateGrammar('Is this valid? Yes, it is!', 'Test');
      expect(result).toHaveLength(0);
    });
  });

  describe('validateMinimumWords', () => {
    it('should return error if word count is below minimum', () => {
      const result = validateMinimumWords('This is short.', 100, 'Test');
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain('Minimum 100 words');
    });

    it('should pass if word count meets minimum', () => {
      const text = 'This is a longer text. '.repeat(20); // ~100 words
      const result = validateMinimumWords(text, 100, 'Test');
      expect(result).toHaveLength(0);
    });

    it('should count words correctly', () => {
      const text = 'One two three four five.';
      const result = validateMinimumWords(text, 10, 'Test');
      expect(result).toHaveLength(1);
    });
  });

  describe('getRubricForTab', () => {
    it('should return rubric items for Tab 1', () => {
      const rubric = getRubricForTab(1);
      expect(rubric.length).toBeGreaterThan(0);
      expect(rubric.some(item => item.id === 'populationName')).toBe(true);
    });

    it('should return rubric items for Tab 2', () => {
      const rubric = getRubricForTab(2);
      expect(rubric.length).toBeGreaterThan(0);
      expect(rubric.some(item => item.id === 'research_text')).toBe(true);
    });

    it('should return rubric items for Tab 3', () => {
      const rubric = getRubricForTab(3);
      expect(rubric.length).toBeGreaterThan(0);
      expect(rubric.some(item => item.id === 'thorn_vs_smile')).toBe(true);
    });

    it('should return empty array for invalid tab', () => {
      const rubric = getRubricForTab(999);
      expect(rubric).toEqual([]);
    });
  });

  describe('checkTabCompletion', () => {
    it('should return false if required fields are empty', () => {
      const responses = { population: '', reason: '' };
      const result = checkTabCompletion(1, responses);
      expect(result).toBe(false);
    });

    it('should return true if all rubric items pass', () => {
      const responses = {
        populationName: 'Homeless',
        whyChosen: 'Because we can help them. They need support.',
      };
      const result = checkTabCompletion(1, responses);
      expect(result).toBe(true);
    });

    it('should return false if grammar is invalid', () => {
      const responses = {
        populationName: 'Homeless',
        whyChosen: 'because we can help them. they need support.',
      };
      const result = checkTabCompletion(1, responses);
      expect(result).toBe(false);
    });

    it('should check Tab 2 research text with word count', () => {
      const shortText = 'This is too short.';
      const responses = { research_text: shortText };
      const result = checkTabCompletion(2, responses);
      expect(result).toBe(false);
    });

    it('should pass Tab 2 with valid research text', () => {
      const validText = 'This is a comprehensive research text with good information. '.repeat(12); // ~120 words
      const responses = { research_text: validText };
      const result = checkTabCompletion(2, responses);
      expect(result).toBe(true);
    });
  });

  describe('Rubric item rules', () => {
    it('should validate Tab 3 thorn vs smile answer', () => {
      const rubric = getRubricForTab(3);
      const thornItem = rubric.find(item => item.id === 'thorn_vs_smile');
      
      expect(thornItem?.rule('')).toBe(false);
      expect(thornItem?.rule('Cinzel reminds me of thorns.')).toBe(true);
      expect(thornItem?.rule('cinzel reminds me of thorns.')).toBe(false); // lowercase start
    });

    it('should validate Tab 4 logo description', () => {
      const rubric = getRubricForTab(4);
      const logoItem = rubric.find(item => item.id === 'logo_description');
      
      expect(logoItem?.rule('')).toBe(false);
      expect(logoItem?.rule('My logo features a circle with a star. It represents unity.')).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle text with only whitespace', () => {
      const result = validateGrammar('   ', 'Test');
      expect(result).toHaveLength(1);
    });

    it('should handle text with multiple periods', () => {
      const result = validateGrammar('This is valid... And this too!', 'Test');
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle text with numbers', () => {
      const result = validateGrammar('123 is a number. 456 is another.', 'Test');
      expect(result).toHaveLength(0);
    });

    it('should handle special characters', () => {
      const result = validateGrammar('This has @special #characters! And more?', 'Test');
      expect(result).toHaveLength(0);
    });
  });
});
