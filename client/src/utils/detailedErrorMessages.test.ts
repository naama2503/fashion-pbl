import { describe, it, expect } from 'vitest';
import {
  getCapitalizationErrorMessage,
  getPunctuationErrorMessage,
  getRequiredFieldMessage,
  getMinimumWordsMessage,
  getLowercaseIMessage,
  getWordCapitalizationMessage,
  getGroupNameMessage,
  getSentenceStructureMessage,
  getDetailedErrorMessage,
} from './detailedErrorMessages';

describe('Detailed Error Messages', () => {
  describe('getCapitalizationErrorMessage', () => {
    it('should return capitalization error for sentence context', () => {
      const error = getCapitalizationErrorMessage('Test Field', 'sentence');
      expect(error.field).toBe('Test Field');
      expect(error.severity).toBe('error');
      expect(error.shortMessage).toBe('Fix capitalization');
      expect(error.shortMessageHe).toBe('תקן הון');
      expect(error.detailedMessage).toContain('capital letter');
      expect(error.detailedMessageHe).toContain('אות גדולה');
    });

    it('should return capitalization error for proper noun context', () => {
      const error = getCapitalizationErrorMessage('Name Field', 'proper_noun');
      expect(error.detailedMessage).toContain('Names of people');
      expect(error.detailedMessageHe).toContain('שמות של אנשים');
    });

    it('should return capitalization error for group name context', () => {
      const error = getCapitalizationErrorMessage('Population', 'group_name');
      expect(error.detailedMessage).toContain('group of people');
      expect(error.detailedMessageHe).toContain('קבוצת אנשים');
    });
  });

  describe('getPunctuationErrorMessage', () => {
    it('should return punctuation error message', () => {
      const error = getPunctuationErrorMessage('Test Field');
      expect(error.field).toBe('Test Field');
      expect(error.shortMessage).toBe('Fix punctuation');
      expect(error.shortMessageHe).toBe('תקן פיסוק');
      expect(error.detailedMessage).toContain('period');
      expect(error.detailedMessageHe).toContain('נקודה');
    });
  });

  describe('getRequiredFieldMessage', () => {
    it('should return required field error', () => {
      const error = getRequiredFieldMessage('Population Name');
      expect(error.field).toBe('Population Name');
      expect(error.shortMessage).toBe('This field is required');
      expect(error.shortMessageHe).toBe('שדה זה נדרש');
    });

    it('should include context message if provided', () => {
      const error = getRequiredFieldMessage('Population Name', 'Please choose a specific group');
      expect(error.detailedMessage).toContain('Please choose a specific group');
    });
  });

  describe('getMinimumWordsMessage', () => {
    it('should return minimum words error with counts', () => {
      const error = getMinimumWordsMessage('Research Response', 100, 45);
      expect(error.field).toBe('Research Response');
      expect(error.shortMessage).toBe('Minimum 100 words required');
      expect(error.shortMessageHe).toBe('דרוש מינימום 100 מילים');
      expect(error.detailedMessage).toContain('100 words');
      expect(error.detailedMessage).toContain('45 words');
      expect(error.detailedMessageHe).toContain('100 מילים');
      expect(error.detailedMessageHe).toContain('45 מילים');
    });
  });

  describe('getLowercaseIMessage', () => {
    it('should return lowercase i error', () => {
      const error = getLowercaseIMessage('Explanation');
      expect(error.field).toBe('Explanation');
      expect(error.shortMessage).toContain("'i'");
      expect(error.detailedMessage).toContain('always be capitalized');
      expect(error.detailedMessageHe).toContain('תמיד באות גדולה');
    });
  });

  describe('getWordCapitalizationMessage', () => {
    it('should return word capitalization error with reason', () => {
      const error = getWordCapitalizationMessage(
        'Population Name',
        'homeless',
        'it refers to a specific group of people'
      );
      expect(error.field).toBe('Population Name');
      expect(error.shortMessage).toContain('homeless');
      expect(error.detailedMessage).toContain('homeless');
      expect(error.detailedMessage).toContain('it refers to a specific group of people');
    });

    it('should use default reason if not provided', () => {
      const error = getWordCapitalizationMessage('Field', 'word', '');
      expect(error.detailedMessage).toContain('proper noun');
    });
  });

  describe('getGroupNameMessage', () => {
    it('should return group name error with explanation', () => {
      const error = getGroupNameMessage('Population');
      expect(error.field).toBe('Population');
      expect(error.shortMessage).toBe('Capitalize group names');
      expect(error.shortMessageHe).toBe('הפוך שמות קבוצות לאות גדולה');
      expect(error.detailedMessage).toContain('group of people');
      expect(error.detailedMessage).toContain('proper noun');
      expect(error.detailedMessageHe).toContain('קבוצת אנשים');
      expect(error.detailedMessageHe).toContain('שם עצם');
    });
  });

  describe('getSentenceStructureMessage', () => {
    it('should return sentence structure error', () => {
      const error = getSentenceStructureMessage('Response');
      expect(error.field).toBe('Response');
      expect(error.shortMessage).toBe('Check sentence structure');
      expect(error.shortMessageHe).toBe('בדוק מבנה משפט');
      expect(error.detailedMessage).toContain('capital letter');
      expect(error.detailedMessage).toContain('punctuation');
    });
  });

  describe('getDetailedErrorMessage', () => {
    it('should return capitalization error for capitalization type', () => {
      const error = getDetailedErrorMessage('capitalization', 'Field', { context: 'sentence' });
      expect(error).not.toBeNull();
      expect(error?.shortMessage).toBe('Fix capitalization');
    });

    it('should return punctuation error for punctuation type', () => {
      const error = getDetailedErrorMessage('punctuation', 'Field');
      expect(error).not.toBeNull();
      expect(error?.shortMessage).toBe('Fix punctuation');
    });

    it('should return required field error for required type', () => {
      const error = getDetailedErrorMessage('required', 'Field', { contextMessage: 'Choose a group' });
      expect(error).not.toBeNull();
      expect(error?.shortMessage).toBe('This field is required');
    });

    it('should return minimum words error for min_words type', () => {
      const error = getDetailedErrorMessage('min_words', 'Field', { minimum: 100, actual: 50 });
      expect(error).not.toBeNull();
      expect(error?.shortMessage).toContain('100 words');
    });

    it('should return lowercase i error for lowercase_i type', () => {
      const error = getDetailedErrorMessage('lowercase_i', 'Field');
      expect(error).not.toBeNull();
      expect(error?.shortMessage).toContain("'i'");
    });

    it('should return word capitalization error for word_capitalization type', () => {
      const error = getDetailedErrorMessage('word_capitalization', 'Field', {
        word: 'test',
        reason: 'it is a proper noun',
      });
      expect(error).not.toBeNull();
      expect(error?.shortMessage).toContain('test');
    });

    it('should return group name error for group_name type', () => {
      const error = getDetailedErrorMessage('group_name', 'Field');
      expect(error).not.toBeNull();
      expect(error?.shortMessage).toBe('Capitalize group names');
    });

    it('should return sentence structure error for sentence_structure type', () => {
      const error = getDetailedErrorMessage('sentence_structure', 'Field');
      expect(error).not.toBeNull();
      expect(error?.shortMessage).toBe('Check sentence structure');
    });

    it('should return null for unknown error type', () => {
      const error = getDetailedErrorMessage('unknown_type', 'Field');
      expect(error).toBeNull();
    });
  });

  describe('Bilingual Support', () => {
    it('should provide both English and Hebrew messages', () => {
      const error = getCapitalizationErrorMessage('Field', 'sentence');
      expect(error.shortMessage).toBeTruthy();
      expect(error.shortMessageHe).toBeTruthy();
      expect(error.detailedMessage).toBeTruthy();
      expect(error.detailedMessageHe).toBeTruthy();
    });

    it('should have matching message structure across all error types', () => {
      const errorTypes = [
        { type: 'capitalization', context: { context: 'sentence' } },
        { type: 'punctuation', context: {} },
        { type: 'required', context: {} },
        { type: 'min_words', context: { minimum: 100, actual: 50 } },
        { type: 'lowercase_i', context: {} },
        { type: 'group_name', context: {} },
      ];

      errorTypes.forEach(({ type, context }) => {
        const error = getDetailedErrorMessage(type, 'Field', context);
        expect(error).not.toBeNull();
        expect(error?.shortMessage).toBeTruthy();
        expect(error?.shortMessageHe).toBeTruthy();
        expect(error?.detailedMessage).toBeTruthy();
        expect(error?.detailedMessageHe).toBeTruthy();
      });
    });
  });
});
