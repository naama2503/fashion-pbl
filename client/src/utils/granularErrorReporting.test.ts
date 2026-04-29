import { describe, it, expect } from "vitest";

/**
 * Granular Error Reporting Tests
 * Tests the core validation logic for field-specific error messages
 */

const CAPITAL_PUNCTUATION_REGEX = /^[A-Z].*[.!?]$/;

const isValidCapitalPunctuation = (text: string | undefined): boolean => {
  if (!text || text.trim().length === 0) return false;
  return CAPITAL_PUNCTUATION_REGEX.test(text.trim());
};

const getFieldErrorMessage = (
  fieldName: string,
  value: string | undefined,
  language: "en" | "he" = "en"
): string | null => {
  if (!value || value.trim().length === 0) {
    return language === "en"
      ? `${fieldName} is required.`
      : `${fieldName} נדרש.`;
  }

  const trimmed = value.trim();

  if (!/^[A-Z]/.test(trimmed)) {
    return language === "en"
      ? `Fix capitalization in ${fieldName}: Start with a capital letter.`
      : `תקן הון ב${fieldName}: התחל באות גדולה.`;
  }

  if (!/[.!?]$/.test(trimmed)) {
    return language === "en"
      ? `Fix punctuation in ${fieldName}: End with . ! or ?`
      : `תקן פיסוק ב${fieldName}: הסתיים ב . ! או ?`;
  }

  return null;
};

describe("Granular Error Reporting - Core Validation", () => {
  describe("isValidCapitalPunctuation", () => {
    it("returns false for empty string", () => {
      expect(isValidCapitalPunctuation("")).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isValidCapitalPunctuation(undefined)).toBe(false);
    });

    it("returns false for whitespace only", () => {
      expect(isValidCapitalPunctuation("   ")).toBe(false);
    });

    it("returns true for valid text with capital and period", () => {
      expect(isValidCapitalPunctuation("Hello world.")).toBe(true);
    });

    it("returns true for valid text with capital and exclamation", () => {
      expect(isValidCapitalPunctuation("Hello world!")).toBe(true);
    });

    it("returns true for valid text with capital and question mark", () => {
      expect(isValidCapitalPunctuation("Hello world?")).toBe(true);
    });

    it("returns false for text without capital letter", () => {
      expect(isValidCapitalPunctuation("hello world.")).toBe(false);
    });

    it("returns false for text without punctuation", () => {
      expect(isValidCapitalPunctuation("Hello world")).toBe(false);
    });

    it("returns false for text with lowercase start and no punctuation", () => {
      expect(isValidCapitalPunctuation("hello world")).toBe(false);
    });

    it("handles whitespace trimming", () => {
      expect(isValidCapitalPunctuation("  Hello world.  ")).toBe(true);
    });

    it("rejects text with only capital letter", () => {
      expect(isValidCapitalPunctuation("A")).toBe(false);
    });

    it("accepts single word with capital and punctuation", () => {
      expect(isValidCapitalPunctuation("Hello.")).toBe(true);
    });
  });

  describe("getFieldErrorMessage - English", () => {
    const language = "en";

    it("returns required message for empty field", () => {
      const error = getFieldErrorMessage("Student 1 Name", "", language);
      expect(error).toBe("Student 1 Name is required.");
    });

    it("returns required message for undefined field", () => {
      const error = getFieldErrorMessage("Student 1 Name", undefined, language);
      expect(error).toBe("Student 1 Name is required.");
    });

    it("returns capitalization error for lowercase start", () => {
      const error = getFieldErrorMessage("Student 1 Name", "john doe.", language);
      expect(error).toContain("Fix capitalization");
      expect(error).toContain("Student 1 Name");
      expect(error).toContain("Start with a capital letter");
    });

    it("returns punctuation error for missing end punctuation", () => {
      const error = getFieldErrorMessage("Student 1 Name", "John Doe", language);
      expect(error).toContain("Fix punctuation");
      expect(error).toContain("Student 1 Name");
      expect(error).toContain("End with . ! or ?");
    });

    it("returns null for valid text", () => {
      const error = getFieldErrorMessage("Student 1 Name", "John Doe.", language);
      expect(error).toBeNull();
    });

    it("includes field name in error message", () => {
      const error = getFieldErrorMessage("Why good choice - Student 1", "invalid", language);
      expect(error).toContain("Why good choice - Student 1");
    });

    it("handles multiple word field names", () => {
      const error = getFieldErrorMessage("Final Population Choice", "invalid", language);
      expect(error).toContain("Final Population Choice");
    });

    it("accepts exclamation mark as valid punctuation", () => {
      const error = getFieldErrorMessage("Student 1 Name", "John Doe!", language);
      expect(error).toBeNull();
    });

    it("accepts question mark as valid punctuation", () => {
      const error = getFieldErrorMessage("Student 1 Name", "John Doe?", language);
      expect(error).toBeNull();
    });
  });

  describe("getFieldErrorMessage - Hebrew", () => {
    const language = "he";

    it("returns Hebrew required message for empty field", () => {
      const error = getFieldErrorMessage("שם סטודנט 1", "", language);
      expect(error).toBe("שם סטודנט 1 נדרש.");
    });

    it("returns Hebrew capitalization error", () => {
      const error = getFieldErrorMessage("שם סטודנט 1", "john doe.", language);
      expect(error).toContain("תקן הון");
      expect(error).toContain("שם סטודנט 1");
      expect(error).toContain("התחל באות גדולה");
    });

    it("returns Hebrew punctuation error", () => {
      const error = getFieldErrorMessage("שם סטודנט 1", "John Doe", language);
      expect(error).toContain("תקן פיסוק");
      expect(error).toContain("שם סטודנט 1");
      expect(error).toContain("הסתיים ב . ! או ?");
    });

    it("returns null for valid Hebrew text", () => {
      const error = getFieldErrorMessage("שם סטודנט 1", "John Doe.", language);
      expect(error).toBeNull();
    });
  });

  describe("Field-Specific Error Scenarios", () => {
    it("validates student names with specific error", () => {
      const error = getFieldErrorMessage("Student 1 Name", "john.", "en");
      expect(error).toContain("Fix capitalization in Student 1 Name");
    });

    it("validates population names with specific error", () => {
      const error = getFieldErrorMessage("Population Name", "homeless people", "en");
      expect(error).toContain("Fix capitalization in Population Name");
    });

    it("validates table cell responses with specific error", () => {
      const error = getFieldErrorMessage("Why good choice - Student 1", "they need help", "en");
      expect(error).toContain("Fix capitalization in Why good choice - Student 1");
    });

    it("validates final explanation with specific error", () => {
      const error = getFieldErrorMessage("Why (2+ sentences)", "This is why", "en");
      expect(error).toContain("Fix punctuation in Why (2+ sentences)");
    });
  });

  describe("Real-World Validation Scenarios", () => {
    it("validates complete valid response", () => {
      const responses = {
        studentName1: "John.",
        studentName2: "Jane.",
        studentName3: "Bob.",
        populationName: "Homeless people.",
        why1Student1: "They need help.",
        whyChosen: "This population is suffering.",
      };

      const errors = Object.entries(responses).map(([key, value]) => {
        return getFieldErrorMessage(key, value, "en");
      });

      expect(errors.every((e) => e === null)).toBe(true);
    });

    it("identifies multiple errors in response", () => {
      const responses = {
        studentName1: "john", // Missing capital and punctuation
        studentName2: "jane", // Missing capital and punctuation
        populationName: "homeless people", // Missing capital and punctuation
      };

      const errors = Object.entries(responses).map(([key, value]) => {
        return getFieldErrorMessage(key, value, "en");
      });

      expect(errors.filter((e) => e !== null).length).toBe(3);
    });

    it("distinguishes between capitalization and punctuation errors", () => {
      const noCapital = getFieldErrorMessage("Field", "hello world.", "en");
      const noPunctuation = getFieldErrorMessage("Field", "Hello world", "en");

      expect(noCapital).toContain("capitalization");
      expect(noPunctuation).toContain("punctuation");
      expect(noCapital).not.toBe(noPunctuation);
    });
  });

  describe("Edge Cases", () => {
    it("handles text with multiple spaces", () => {
      const error = getFieldErrorMessage("Field", "Hello    world.", "en");
      expect(error).toBeNull();
    });

    it("handles text with leading/trailing spaces", () => {
      const error = getFieldErrorMessage("Field", "  Hello world.  ", "en");
      expect(error).toBeNull();
    });

    it("rejects text with only punctuation", () => {
      const error = getFieldErrorMessage("Field", ".", "en");
      expect(error).not.toBeNull();
    });

    it("rejects text with only capital letter", () => {
      const error = getFieldErrorMessage("Field", "A", "en");
      expect(error).not.toBeNull();
    });

    it("accepts single character followed by punctuation", () => {
      const error = getFieldErrorMessage("Field", "A.", "en");
      expect(error).toBeNull();
    });

    it("handles special characters in field names", () => {
      const error = getFieldErrorMessage("Why NOT good choice - Student 1", "invalid", "en");
      expect(error).toContain("Why NOT good choice - Student 1");
    });
  });
});
