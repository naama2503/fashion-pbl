/**
 * Detailed Error Messages - Provides comprehensive explanations for validation errors
 * Helps students understand WHY their input is incorrect
 */

export interface DetailedError {
  field: string;
  shortMessage: string;
  shortMessageHe: string;
  detailedMessage: string;
  detailedMessageHe: string;
  severity: 'error' | 'warning';
}

/**
 * Generate detailed error message explaining why capitalization is needed
 */
export const getCapitalizationErrorMessage = (
  fieldName: string,
  context: 'sentence' | 'proper_noun' | 'group_name' = 'sentence'
): DetailedError => {
  const messages: Record<string, { en: string; he: string }> = {
    sentence: {
      en: 'Every sentence must start with a capital letter. This is a basic rule of English grammar.',
      he: 'כל משפט חייב להתחיל באות גדולה. זה כלל בסיסי של דקדוק אנגלית.'
    },
    proper_noun: {
      en: 'Names of people, places, and groups must start with a capital letter.',
      he: 'שמות של אנשים, מקומות וקבוצות חייבים להתחיל באות גדולה.'
    },
    group_name: {
      en: 'The name of a group of people must start with a capital letter because it is a proper noun.',
      he: 'שם של קבוצת אנשים חייב להתחיל באות גדולה כי זה שם עצם.'
    }
  };

  const msg = messages[context] || messages.sentence;

  return {
    field: fieldName,
    shortMessage: 'Fix capitalization',
    shortMessageHe: 'תקן הון',
    detailedMessage: msg.en,
    detailedMessageHe: msg.he,
    severity: 'error'
  };
};

/**
 * Generate detailed error message explaining why punctuation is needed
 */
export const getPunctuationErrorMessage = (fieldName: string): DetailedError => {
  return {
    field: fieldName,
    shortMessage: 'Fix punctuation',
    shortMessageHe: 'תקן פיסוק',
    detailedMessage: 'Every sentence must end with a period (.), question mark (?), or exclamation mark (!). This shows where your sentence ends.',
    detailedMessageHe: 'כל משפט חייב להסתיים בנקודה (.), סימן שאלה (?) או סימן קריאה (!). זה מראה איפה המשפט שלך מסתיים.',
    severity: 'error'
  };
};

/**
 * Generate detailed error message for required field
 */
export const getRequiredFieldMessage = (fieldName: string, context: string = ''): DetailedError => {
  const contextMessage = context ? ` ${context}` : '';

  return {
    field: fieldName,
    shortMessage: 'This field is required',
    shortMessageHe: 'שדה זה נדרש',
    detailedMessage: `Please fill in ${fieldName}.${contextMessage}`,
    detailedMessageHe: `בואו למלא את ${fieldName}.${contextMessage}`,
    severity: 'error'
  };
};

/**
 * Generate detailed error message for minimum word count
 */
export const getMinimumWordsMessage = (fieldName: string, minimum: number, actual: number): DetailedError => {
  return {
    field: fieldName,
    shortMessage: `Minimum ${minimum} words required`,
    shortMessageHe: `דרוש מינימום ${minimum} מילים`,
    detailedMessage: `${fieldName} must have at least ${minimum} words. You have written ${actual} words. Please add more details to your answer.`,
    detailedMessageHe: `${fieldName} חייב להכיל לפחות ${minimum} מילים. כתבת ${actual} מילים. בואו להוסיף עוד פרטים לתשובה שלך.`,
    severity: 'error'
  };
};

/**
 * Generate detailed error message for lowercase 'i'
 */
export const getLowercaseIMessage = (fieldName: string): DetailedError => {
  return {
    field: fieldName,
    shortMessage: "Fix lowercase 'i'",
    shortMessageHe: "תקן 'i' קטנה",
    detailedMessage: "The pronoun 'I' must always be capitalized in English. Change 'i' to 'I'.",
    detailedMessageHe: "הכינוי 'I' חייב להיות תמיד באות גדולה באנגלית. שנה 'i' ל-'I'.",
    severity: 'error'
  };
};

/**
 * Generate detailed error message for specific word capitalization
 */
export const getWordCapitalizationMessage = (
  fieldName: string,
  word: string,
  reason: string
): DetailedError => {
  const reasonMessage = reason || 'it is a proper noun';
  const reasonMessageHe = reason || 'זה שם עצם';

  return {
    field: fieldName,
    shortMessage: `Capitalize "${word}"`,
    shortMessageHe: `הפוך את "${word}" לאות גדולה`,
    detailedMessage: `The word "${word}" should start with a capital letter because ${reasonMessage}.`,
    detailedMessageHe: `המילה "${word}" צריכה להתחיל באות גדולה כי ${reasonMessageHe}.`,
    severity: 'error'
  };
};

/**
 * Generate detailed error message for group/population name
 */
export const getGroupNameMessage = (fieldName: string): DetailedError => {
  return {
    field: fieldName,
    shortMessage: 'Capitalize group names',
    shortMessageHe: 'הפוך שמות קבוצות לאות גדולה',
    detailedMessage: `When you name a group of people (like "The Homeless" or "Refugees"), the name should start with a capital letter because it is a proper noun referring to a specific group.`,
    detailedMessageHe: `כשאתה קורא שם לקבוצת אנשים (כמו "חסרי בית" או "פליטים"), השם צריך להתחיל באות גדולה כי זה שם עצם המתייחס לקבוצה ספציפית.`,
    severity: 'error'
  };
};

/**
 * Generate detailed error message for sentence structure
 */
export const getSentenceStructureMessage = (fieldName: string): DetailedError => {
  return {
    field: fieldName,
    shortMessage: 'Check sentence structure',
    shortMessageHe: 'בדוק מבנה משפט',
    detailedMessage: 'Make sure each sentence starts with a capital letter and ends with punctuation (. ! ?). This helps readers understand where each thought begins and ends.',
    detailedMessageHe: 'ודא שכל משפט מתחיל באות גדולה ומסתיים בסימן פיסוק (. ! ?). זה עוזר לקוראים להבין איפה כל רעיון מתחיל ומסתיים.',
    severity: 'error'
  };
};

/**
 * Get detailed error message based on validation context
 */
export const getDetailedErrorMessage = (
  errorType: string,
  fieldName: string,
  context?: any
): DetailedError | null => {
  switch (errorType) {
    case 'capitalization':
      return getCapitalizationErrorMessage(fieldName, context?.context || 'sentence');
    case 'punctuation':
      return getPunctuationErrorMessage(fieldName);
    case 'required':
      return getRequiredFieldMessage(fieldName, context?.contextMessage);
    case 'min_words':
      return getMinimumWordsMessage(fieldName, context?.minimum || 100, context?.actual || 0);
    case 'lowercase_i':
      return getLowercaseIMessage(fieldName);
    case 'word_capitalization':
      return getWordCapitalizationMessage(fieldName, context?.word, context?.reason);
    case 'group_name':
      return getGroupNameMessage(fieldName);
    case 'sentence_structure':
      return getSentenceStructureMessage(fieldName);
    default:
      return null;
  }
};
