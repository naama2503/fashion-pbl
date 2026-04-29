/**
 * Tab 2 Grammar Validator
 * Strict validation: Capital letter at start, punctuation at end
 * Pattern: ^[A-Z].*[.!?]$
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  fieldErrors: Record<string, string | null>;
}

export interface Tab2Fields {
  studentName1?: string;
  studentName2?: string;
  studentName3?: string;
  populationName?: string;
  why1Student1?: string;
  why1Student2?: string;
  why1Student3?: string;
  why2Student1?: string;
  why2Student2?: string;
  why2Student3?: string;
  finalPopulation?: string;
  finalWhy?: string;
}

const CAPITAL_PUNCTUATION_REGEX = /^[A-Z].*[.!?]$/;

/**
 * Check if text matches capital + punctuation pattern
 */
export const isValidCapitalPunctuation = (text: string | undefined): boolean => {
  if (!text || text.trim().length === 0) return false;
  return CAPITAL_PUNCTUATION_REGEX.test(text.trim());
};

/**
 * Get specific, granular error message for a field
 * Returns specific feedback about what needs to be fixed
 */
export const getFieldErrorMessage = (
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

  // Check capital letter
  if (!/^[A-Z]/.test(trimmed)) {
    return language === "en"
      ? `Fix capitalization in ${fieldName}: Start with a capital letter.`
      : `תקן הון ב${fieldName}: התחל באות גדולה.`;
  }

  // Check ending punctuation
  if (!/[.!?]$/.test(trimmed)) {
    return language === "en"
      ? `Fix punctuation in ${fieldName}: End with . ! or ?`
      : `תקן פיסוק ב${fieldName}: הסתיים ב . ! או ?`;
  }

  return null;
};

/**
 * Validate all Tab 2 fields
 */
export const validateTab2Fields = (
  fields: Tab2Fields,
  language: "en" | "he" = "en"
): ValidationResult => {
  const fieldErrors: Record<string, string | null> = {};
  const errors: string[] = [];

  // Define all fields to validate with their display names
  const fieldsToValidate: Array<[keyof Tab2Fields, string, string]> = [
    ["studentName1", "Student 1 Name", "שם סטודנט 1"],
    ["studentName2", "Student 2 Name", "שם סטודנט 2"],
    ["studentName3", "Student 3 Name", "שם סטודנט 3"],
    ["populationName", "Population Name", "שם האוכלוסייה"],
    ["why1Student1", "Why good choice - Student 1", "למה בחירה טובה - סטודנט 1"],
    ["why1Student2", "Why good choice - Student 2", "למה בחירה טובה - סטודנט 2"],
    ["why1Student3", "Why good choice - Student 3", "למה בחירה טובה - סטודנט 3"],
    ["why2Student1", "Why NOT good choice - Student 1", "למה לא בחירה טובה - סטודנט 1"],
    ["why2Student2", "Why NOT good choice - Student 2", "למה לא בחירה טובה - סטודנט 2"],
    ["why2Student3", "Why NOT good choice - Student 3", "למה לא בחירה טובה - סטודנט 3"],
    ["finalPopulation", "Final Population Choice", "בחירה סופית של אוכלוסייה"],
    ["finalWhy", "Why (2+ sentences)", "למה (2+ משפטים)"],
  ];

  // Validate each field
  fieldsToValidate.forEach(([fieldKey, enName, heName]) => {
    const displayName = language === "en" ? enName : heName;
    const value = fields[fieldKey];
    const error = getFieldErrorMessage(displayName, value, language);

    fieldErrors[fieldKey] = error;
    if (error) {
      errors.push(error);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    fieldErrors,
  };
};

/**
 * Get validation status for a specific field
 */
export const getFieldValidationStatus = (
  fieldName: keyof Tab2Fields,
  value: string | undefined,
  language: "en" | "he" = "en"
): { isValid: boolean; error: string | null } => {
  const fieldLabels: Record<keyof Tab2Fields, [string, string]> = {
    studentName1: ["Student 1 Name", "שם סטודנט 1"],
    studentName2: ["Student 2 Name", "שם סטודנט 2"],
    studentName3: ["Student 3 Name", "שם סטודנט 3"],
    populationName: ["Population Name", "שם האוכלוסייה"],
    why1Student1: ["Why good choice - Student 1", "למה בחירה טובה - סטודנט 1"],
    why1Student2: ["Why good choice - Student 2", "למה בחירה טובה - סטודנט 2"],
    why1Student3: ["Why good choice - Student 3", "למה בחירה טובה - סטודנט 3"],
    why2Student1: ["Why NOT good choice - Student 1", "למה לא בחירה טובה - סטודנט 1"],
    why2Student2: ["Why NOT good choice - Student 2", "למה לא בחירה טובה - סטודנט 2"],
    why2Student3: ["Why NOT good choice - Student 3", "למה לא בחירה טובה - סטודנט 3"],
    finalPopulation: ["Final Population Choice", "בחירה סופית של אוכלוסייה"],
    finalWhy: ["Why (2+ sentences)", "למה (2+ משפטים)"],
  };

  const [enLabel, heLabel] = fieldLabels[fieldName] || ["Unknown", "לא ידוע"];
  const displayName = language === "en" ? enLabel : heLabel;
  const error = getFieldErrorMessage(displayName, value, language);

  return {
    isValid: error === null,
    error,
  };
};

/**
 * Get all field errors as a map for real-time display
 */
export const getFieldErrorsMap = (
  fields: Tab2Fields,
  language: "en" | "he" = "en"
): Record<string, string | null> => {
  const result = validateTab2Fields(fields, language);
  return result.fieldErrors;
};
