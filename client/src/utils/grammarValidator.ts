/**
 * Grammar Validator - Comprehensive validation for student responses
 * Supports English and Hebrew text
 * Rules: Capital letters at start of every sentence, ending punctuation
 */

export interface ValidationError {
  field: string;
  message: string;
  messageHe: string;
  severity: 'error' | 'warning';
}

export interface RubricItem {
  id: string;
  label: string;
  labelHe: string;
  rule: (text: string) => boolean;
  errorMessage: string;
  errorMessageHe: string;
}

/**
 * Validate grammar in text
 * Checks for:
 * - Capital letters at start of every sentence
 * - Ending punctuation (. ! ?) for every sentence
 * - Lowercase 'i' (English only)
 */
export const validateGrammar = (text: string, fieldName: string = 'Text'): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!text || text.trim().length === 0) {
    return [{
      field: fieldName,
      message: `${fieldName} cannot be empty`,
      messageHe: `${fieldName} לא יכול להיות ריק`,
      severity: 'error'
    }];
  }

  // Split into sentences - handles . ! ?
  const sentenceRegex = /[^.!?]*[.!?]+/g;
  const sentences = text.match(sentenceRegex) || [];

  if (sentences.length === 0) {
    return [{
      field: fieldName,
      message: `Text must end with a period (.), question mark (?), or exclamation mark (!)`,
      messageHe: `הטקסט חייב להסתיים בנקודה (.), סימן שאלה (?) או סימן קריאה (!)`,
      severity: 'error'
    }];
  }

  sentences.forEach((sentence, idx) => {
    const trimmed = sentence.trim();
    if (trimmed.length === 0) return;

    // Check if sentence starts with capital letter (English or Hebrew)
    const firstChar = trimmed.charAt(0);
    const isCapitalEnglish = /^[A-Z]/.test(firstChar);
    const isCapitalHebrew = /^[\u05D0-\u05EA]/.test(firstChar); // Hebrew letters are always uppercase
    const isCapital = isCapitalEnglish || isCapitalHebrew;

    if (!isCapital && !/^[\d\s]/.test(firstChar)) {
      errors.push({
        field: fieldName,
        message: `Sentence ${idx + 1} must start with a capital letter`,
        messageHe: `משפט ${idx + 1} חייב להתחיל באות גדולה`,
        severity: 'error'
      });
    }

    // Check for lowercase 'i' (English only)
    if (/\bi\b/.test(trimmed)) {
      errors.push({
        field: fieldName,
        message: `Sentence ${idx + 1} has lowercase 'i' - must be 'I'`,
        messageHe: `משפט ${idx + 1} יש 'i' קטנה - חייב להיות 'I'`,
        severity: 'error'
      });
    }

    // Check if sentence ends with punctuation
    if (!/[.!?]$/.test(trimmed)) {
      errors.push({
        field: fieldName,
        message: `Sentence ${idx + 1} must end with punctuation (. ! ?)`,
        messageHe: `משפט ${idx + 1} חייב להסתיים בסימן פיסוק (. ! ?)`,
        severity: 'error'
      });
    }
  });

  return errors;
};

/**
 * Validate minimum word count
 */
export const validateMinimumWords = (text: string, minWords: number, fieldName: string = 'Text'): ValidationError[] => {
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  
  if (wordCount < minWords) {
    return [{
      field: fieldName,
      message: `Minimum ${minWords} words required (currently ${wordCount} words)`,
      messageHe: `נדרשות לפחות ${minWords} מילים (כרגע ${wordCount} מילים)`,
      severity: 'error'
    }];
  }

  return [];
};

/**
 * Rubric definitions for each tab
 */
export const TAB_RUBRICS: Record<number, RubricItem[]> = {
  1: [ // Group Decision
    {
      id: 'populationName',
      label: 'Population Selected',
      labelHe: 'אוכלוסייה נבחרה',
      rule: (text: string): boolean => !!(text && text.trim().length > 0),
      errorMessage: 'Please select a population',
      errorMessageHe: 'אנא בחר אוכלוסייה'
    },
    {
      id: 'whyChosen',
      label: 'Reason Explained',
      labelHe: 'סיבה הוסברה',
      rule: (text: string): boolean => {
        const errors = validateGrammar(text, 'Reason');
        return errors.length === 0 && text.trim().length > 0;
      },
      errorMessage: 'Reason must be filled with correct grammar',
      errorMessageHe: 'יש למלא את הסיבה בדקדוק נכון'
    }
  ],
  2: [ // Research
    {
      id: 'research_text',
      label: 'Research Text (100+ words)',
      labelHe: 'טקסט מחקר (100+ מילים)',
      rule: (text: string): boolean => {
        const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const grammarErrors = validateGrammar(text, 'Research');
        return wordCount >= 100 && grammarErrors.length === 0;
      },
      errorMessage: 'Research must be 100+ words with correct grammar',
      errorMessageHe: 'המחקר חייב להיות 100+ מילים עם דקדוק נכון'
    }
  ],
  3: [ // Design Inquiry
    {
      id: 'thorn_vs_smile',
      label: 'Thorn vs Smile Answer',
      labelHe: 'תשובת קוץ מול חיוך',
      rule: (text: string): boolean => {
        const errors = validateGrammar(text, 'Answer');
        return errors.length === 0 && text.trim().length > 0;
      },
      errorMessage: 'Answer must be filled with correct grammar',
      errorMessageHe: 'יש למלא את התשובה בדקדוק נכון'
    },
    {
      id: 'toy_store',
      label: 'Toy Store Font Answer',
      labelHe: 'תשובת פונט חנות צעצועים',
      rule: (text: string): boolean => {
        const errors = validateGrammar(text, 'Answer');
        return errors.length === 0 && text.trim().length > 0;
      },
      errorMessage: 'Answer must be filled with correct grammar',
      errorMessageHe: 'יש למלא את התשובה בדקדוק נכון'
    },
    {
      id: 'gaming_space',
      label: 'Gaming Space Font Answer',
      labelHe: 'תשובת פונט מרחב משחקים',
      rule: (text: string): boolean => {
        const errors = validateGrammar(text, 'Answer');
        return errors.length === 0 && text.trim().length > 0;
      },
      errorMessage: 'Answer must be filled with correct grammar',
      errorMessageHe: 'יש למלא את התשובה בדקדוק נכון'
    },
    {
      id: 'restaurant',
      label: 'Restaurant Font Answer',
      labelHe: 'תשובת פונט מסעדה',
      rule: (text: string): boolean => {
        const errors = validateGrammar(text, 'Answer');
        return errors.length === 0 && text.trim().length > 0;
      },
      errorMessage: 'Answer must be filled with correct grammar',
      errorMessageHe: 'יש למלא את התשובה בדקדוק נכון'
    },
    {
      id: 'hospital',
      label: 'Hospital Font Answer',
      labelHe: 'תשובת פונט בית חולים',
      rule: (text: string): boolean => {
        const errors = validateGrammar(text, 'Answer');
        return errors.length === 0 && text.trim().length > 0;
      },
      errorMessage: 'Answer must be filled with correct grammar',
      errorMessageHe: 'יש למלא את התשובה בדקדוק נכון'
    }
  ],
  4: [ // Logo
    {
      id: 'logo_description',
      label: 'Logo Description',
      labelHe: 'תיאור לוגו',
      rule: (text: string): boolean => {
        const errors = validateGrammar(text, 'Description');
        return errors.length === 0 && text.trim().length > 0;
      },
      errorMessage: 'Logo description must be filled with correct grammar',
      errorMessageHe: 'תיאור הלוגו חייב להיות מלא בדקדוק נכון'
    }
  ],
  5: [ // Vector Art - File upload only
    {
      id: 'vectorFile',
      label: 'Vector File Uploaded',
      labelHe: 'קובץ וקטור הועלה',
      rule: (file: any): boolean => !!file && file.name && file.size > 0,
      errorMessage: 'Please upload a vector file',
      errorMessageHe: 'אנא העלה קובץ וקטור'
    }
  ],
  6: [ // Fashion Item - File upload only
    {
      id: 'fashionFile',
      label: 'Fashion Item File Uploaded',
      labelHe: 'קובץ פריט אופנה הועלה',
      rule: (file: any): boolean => !!file && file.name && file.size > 0,
      errorMessage: 'Please upload a fashion item file',
      errorMessageHe: 'אנא העלה קובץ פריט אופנה'
    }
  ],
  7: [ // Presentation - File upload only
    {
      id: 'presentationFile',
      label: 'Presentation File Uploaded',
      labelHe: 'קובץ מצגה הועלה',
      rule: (file: any): boolean => !!file && file.name && file.size > 0,
      errorMessage: 'Please upload a presentation file',
      errorMessageHe: 'אנא העלה קובץ מצגה'
    }
  ]
};

/**
 * Get rubric items for a specific tab
 */
export const getRubricForTab = (tabNumber: number): RubricItem[] => {
  return TAB_RUBRICS[tabNumber] || [];
};

/**
 * Check if all rubric items pass for a tab
 */
export const checkTabCompletion = (tabNumber: number, responses: Record<string, any>): boolean => {
  const rubric = getRubricForTab(tabNumber);
  return rubric.every(item => item.rule(responses[item.id] || ''));
};
