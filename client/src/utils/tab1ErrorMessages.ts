/**
 * Tab 1 (Group Decision) - Detailed Error Messages Helper
 * Provides specific, bilingual error explanations for each field
 */

export interface Tab1FieldError {
  message: string;
  detailedMessage: string;
}

/**
 * Get detailed error message for student name field
 */
export const getStudentNameError = (language: 'en' | 'he'): Tab1FieldError => {
  if (language === 'he') {
    return {
      message: 'שם הסטודנט חייב להתחיל באות גדולה',
      detailedMessage: 'שמות של אנשים חייבים להתחיל באות גדולה. זה כלל בסיסי של דקדוק.',
    };
  }
  return {
    message: 'Student name must start with a capital letter',
    detailedMessage: 'Names of people must start with a capital letter. This is a basic rule of grammar.',
  };
};

/**
 * Get detailed error message for population name field
 */
export const getPopulationNameError = (language: 'en' | 'he'): Tab1FieldError => {
  if (language === 'he') {
    return {
      message: 'שם האוכלוסייה חייב להתחיל באות גדולה',
      detailedMessage: 'בחר שם של אוכלוסיה. השם צריך להתחיל באות גדולה כי זה שם של קבוצת אנשים.',
    };
  }
  return {
    message: 'Population name must start with a capital letter',
    detailedMessage: 'Choose the name of a population. The name should start with a capital letter because it refers to a group of people.',
  };
};

/**
 * Get detailed error message for final population choice field
 */
export const getFinalPopulationChoiceError = (language: 'en' | 'he'): Tab1FieldError => {
  if (language === 'he') {
    return {
      message: 'בחירה סופית של אוכלוסייה נדרשת',
      detailedMessage: 'בחר שם של אוכלוסיה. השם צריך להתחיל באות גדולה כי זה שם של קבוצת אנשים.',
    };
  }
  return {
    message: 'Final population choice is required',
    detailedMessage: 'Choose the name of a population. The name should start with a capital letter because it refers to a group of people.',
  };
};

/**
 * Get detailed error message for explanation field
 */
export const getExplanationError = (language: 'en' | 'he'): Tab1FieldError => {
  if (language === 'he') {
    return {
      message: 'הסבר נדרש',
      detailedMessage: 'הסבר מדוע בחרת באוכלוסייה זו. כל משפט חייב להתחיל באות גדולה ולהסתיים בנקודה (.) או סימן קריאה (!).',
    };
  }
  return {
    message: 'Explanation is required',
    detailedMessage: 'Explain why you chose this population. Every sentence must start with a capital letter and end with a period (.) or exclamation mark (!).',
  };
};

/**
 * Get detailed error message for capitalization issues
 */
export const getCapitalizationIssueError = (language: 'en' | 'he', fieldName: string): Tab1FieldError => {
  if (language === 'he') {
    return {
      message: `תקן הון ב${fieldName}`,
      detailedMessage: `המילה הראשונה ב${fieldName} חייבת להתחיל באות גדולה. זה כלל בסיסי של דקדוק.`,
    };
  }
  return {
    message: `Fix capitalization in ${fieldName}`,
    detailedMessage: `The first word in ${fieldName} must start with a capital letter. This is a basic rule of grammar.`,
  };
};

/**
 * Get detailed error message for punctuation issues
 */
export const getPunctuationIssueError = (language: 'en' | 'he', fieldName: string): Tab1FieldError => {
  if (language === 'he') {
    return {
      message: `תקן פיסוק ב${fieldName}`,
      detailedMessage: `${fieldName} חייב להסתיים בנקודה (.) או סימן קריאה (!). זה מראה איפה המשפט מסתיים.`,
    };
  }
  return {
    message: `Fix punctuation in ${fieldName}`,
    detailedMessage: `${fieldName} must end with a period (.) or exclamation mark (!). This shows where the sentence ends.`,
  };
};

/**
 * Get detailed error message for required field
 */
export const getRequiredFieldError = (language: 'en' | 'he', fieldName: string): Tab1FieldError => {
  if (language === 'he') {
    return {
      message: `${fieldName} נדרש`,
      detailedMessage: `בואו למלא את ${fieldName}. זה חלק חשוב של התרגיל.`,
    };
  }
  return {
    message: `${fieldName} is required`,
    detailedMessage: `Please fill in ${fieldName}. This is an important part of the exercise.`,
  };
};

/**
 * Get detailed error message for specific word capitalization (e.g., "homeless" should be "Homeless")
 */
export const getWordCapitalizationIssueError = (
  language: 'en' | 'he',
  word: string,
  reason: string = ''
): Tab1FieldError => {
  const reasonText = reason || (language === 'he' ? 'זה שם של קבוצת אנשים' : 'it refers to a group of people');

  if (language === 'he') {
    return {
      message: `הפוך את "${word}" לאות גדולה`,
      detailedMessage: `המילה "${word}" צריכה להתחיל באות גדולה כי ${reasonText}.`,
    };
  }
  return {
    message: `Capitalize "${word}"`,
    detailedMessage: `The word "${word}" should start with a capital letter because ${reasonText}.`,
  };
};
