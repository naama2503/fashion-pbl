/**
 * Comprehensive bilingual translations for Fashion PBL
 * Supports English and Hebrew (RTL)
 */

export type Language = 'en' | 'he';

export const TRANSLATIONS = {
  // Navigation & General UI
  nav: {
    home: { en: 'Home', he: 'בית' },
    groupDecision: { en: 'Group Decision', he: 'החלטה קבוצתית' },
    research: { en: 'Research', he: 'מחקר' },
    designInquiry: { en: 'Design Inquiry', he: 'חקירה עיצובית' },
    logo: { en: 'Creating a Logo', he: 'יצירת לוגו' },
    vectorArt: { en: 'Vector Art', he: 'אמנות וקטור' },
    fashionItem: { en: 'Fashion Item', he: 'פריט אופנה' },
    presentation: { en: 'Presentation', he: 'מצגה' },
    reflection: { en: 'Reflection', he: 'רפלקציה' },
  },

  // Buttons
  buttons: {
    next: { en: 'Next', he: 'הבא' },
    previous: { en: 'Previous', he: 'הקודם' },
    save: { en: 'Save', he: 'שמור' },
    submit: { en: 'Submit', he: 'שלח' },
    continue: { en: 'Continue', he: 'המשך' },
    finish: { en: 'Finish', he: 'סיים' },
    reset: { en: 'Reset', he: 'אפס' },
    upload: { en: 'Upload', he: 'העלה' },
    download: { en: 'Download', he: 'הורד' },
    reveal: { en: 'Reveal', he: 'גלה' },
    revealMeaning: { en: 'Reveal Meaning', he: 'גלה משמעות' },
    viewPreviousWork: { en: 'View Previous Work', he: 'צפה בעבודה קודמת' },
    loadPreviousWork: { en: 'Load Previous Work', he: 'טען עבודה קודמת' },
  },

  // Tab 1: Group Decision
  tab1: {
    title: { en: 'Group Decision', he: 'החלטה קבוצתית' },
    subtitle: { en: 'Choose a population to help with fashion design', he: 'בחרו אוכלוסייה שתוכלו לעזור להם עם עיצוב אופנה' },
    instruction: { en: 'Select a population group and explain why you chose them.', he: 'בחרו קבוצת אוכלוסייה והסבירו מדוע בחרתם בהם.' },
    populationLabel: { en: 'Which population would you like to help?', he: 'איזו אוכלוסייה הייתם רוצים לעזור?' },
    reasonLabel: { en: 'Why did you choose this population?', he: 'מדוע בחרתם באוכלוסייה זו?' },
    reasonPlaceholder: { en: 'Explain your reasoning...', he: 'הסבירו את ההנמקה שלכם...' },
    errorEmpty: { en: 'Please fill in all fields', he: 'אנא מלאו את כל השדות' },
    errorGrammar: { en: 'Please check your grammar and punctuation', he: 'אנא בדקו את הדקדוק והפיסוק שלכם' },
  },

  // Tab 2: Research
  tab2: {
    title: { en: 'Research', he: 'מחקר' },
    subtitle: { en: 'Research your chosen population', he: 'חקרו את האוכלוסייה שבחרתם' },
    instruction: { en: 'Write at least 100 words about your chosen population. Focus on their needs, challenges, and lifestyle.', he: 'כתבו לפחות 100 מילים על האוכלוסייה שבחרתם. התמקדו בצרכיהם, אתגריהם וסגנון חייהם.' },
    researchLabel: { en: 'Research Notes', he: 'הערות מחקר' },
    researchPlaceholder: { en: 'Write your research here...', he: 'כתבו את המחקר שלכם כאן...' },
    wordCount: { en: 'Words:', he: 'מילים:' },
    minWords: { en: 'Minimum 100 words required', he: 'נדרשות לפחות 100 מילים' },
    errorGrammar: { en: 'Please check your grammar, punctuation, and word count', he: 'אנא בדקו את הדקדוק, הפיסוק וספירת המילים שלכם' },
  },

  // Tab 3: Design Inquiry
  tab3: {
    title: { en: 'Design Inquiry', he: 'חקירה עיצובית' },
    subtitle: { en: 'Learn about design principles', he: 'למדו על עקרונות עיצוב' },
    partA: { en: 'Part A: Color Psychology', he: 'חלק א: פסיכולוגיה של צבע' },
    partB: { en: 'Part B: Visual Associations', he: 'חלק ב: קשרים ויזואליים' },
    partC: { en: 'Part C: Gestalt Principles', he: 'חלק ג: עקרונות גשטלט' },
    colorQuestion: { en: 'What does each color make you feel?', he: 'איזה רגש מעלה אצלכם כל צבע?' },
    thornVsSmileQuestion: { en: 'Which font reminds you of thorns? Which reminds you of a smile?', he: 'איזה פונט מזכיר לכם קוצים? איזה מזכיר לכם חיוך?' },
    thornVsSmileLabel: { en: 'Thorns vs Smile', he: 'קוצים מול חיוך' },
    toyStoreLabel: { en: 'Toy Store Font', he: 'פונט חנות צעצועים' },
    gamingSpaceLabel: { en: 'Gaming Space Font', he: 'פונט מרחב משחקים' },
    restaurantLabel: { en: 'Restaurant Font', he: 'פונט מסעדה' },
    hospitalLabel: { en: 'Hospital Font', he: 'פונט בית חולים' },
    gestaltTitle: { en: 'Gestalt Principles', he: 'עקרונות גשטלט' },
    gestaltExplanation: { en: 'Gestalt principles explain how our brain naturally organizes visual elements into groups or a whole.', he: 'עקרונות גשטלט מסבירים כיצד המוח שלנו מארגן באופן טבעי אלמנטים חזותיים לקבוצות או ליחידה אחת שלמה.' },
    errorGrammar: { en: 'Please check your grammar and punctuation in all answers', he: 'אנא בדקו את הדקדוק והפיסוק בכל התשובות' },
  },

  // Tab 4: Logo
  tab4: {
    title: { en: 'Creating a Logo', he: 'יצירת לוגו' },
    subtitle: { en: 'Design a logo for your chosen population', he: 'עצבו לוגו לאוכלוסייה שבחרתם' },
    step1: { en: 'Step 1: Brainstorm Symbols', he: 'שלב 1: סערת מוחות סמלים' },
    step2: { en: 'Step 2: Design in Canva', he: 'שלב 2: עיצוב ב-Canva' },
    step3: { en: 'Step 3: Share Your Link', he: 'שלב 3: שתפו את הקישור שלכם' },
    canvaLinkLabel: { en: 'Canva Link', he: 'קישור Canva' },
    canvaLinkPlaceholder: { en: 'Paste your Canva link here...', he: 'הדביקו את קישור Canva שלכם כאן...' },
    logoDescriptionLabel: { en: 'Logo Description', he: 'תיאור הלוגו' },
    logoDescriptionPlaceholder: { en: 'Describe your logo design...', he: 'תארו את עיצוב הלוגו שלכם...' },
    errorGrammar: { en: 'Please check your grammar and punctuation', he: 'אנא בדקו את הדקדוק והפיסוק שלכם' },
  },

  // Tab 5: Vector Art
  tab5: {
    title: { en: 'Vector Art', he: 'אמנות וקטור' },
    subtitle: { en: 'Create vector art for your design', he: 'צרו אמנות וקטור לעיצוב שלכם' },
    instruction: { en: 'Create vector art that represents your chosen population or design concept.', he: 'צרו אמנות וקטור המייצגת את האוכלוסייה או קונספט העיצוב שבחרתם.' },
    tutorial: { en: 'View Tutorial', he: 'צפו בהדרכה' },
    uploadLabel: { en: 'Upload Vector File', he: 'העלו קובץ וקטור' },
    descriptionLabel: { en: 'Vector Description', he: 'תיאור הווקטור' },
    descriptionPlaceholder: { en: 'Describe your vector art...', he: 'תארו את אמנות הווקטור שלכם...' },
    supportedFormats: { en: 'Supported formats: SVG, PDF, PNG, JPG', he: 'פורמטים תומכים: SVG, PDF, PNG, JPG' },
    errorGrammar: { en: 'Please check your grammar and punctuation', he: 'אנא בדקו את הדקדוק והפיסוק שלכם' },
  },

  // Tab 6: Fashion Item
  tab6: {
    title: { en: 'Fashion Item', he: 'פריט אופנה' },
    subtitle: { en: 'Design a fashion item for your population', he: 'עצבו פריט אופנה לאוכלוסייה שלכם' },
    instruction: { en: 'Design a fashion item that addresses the needs of your chosen population.', he: 'עצבו פריט אופנה המטפל בצרכי האוכלוסייה שבחרתם.' },
    itemTypeLabel: { en: 'What type of fashion item?', he: 'איזה סוג של פריט אופנה?' },
    descriptionLabel: { en: 'Fashion Item Description', he: 'תיאור פריט האופנה' },
    descriptionPlaceholder: { en: 'Describe your fashion item design...', he: 'תארו את עיצוב פריט האופנה שלכם...' },
    uploadLabel: { en: 'Upload Design Image', he: 'העלו תמונת עיצוב' },
    errorGrammar: { en: 'Please check your grammar and punctuation', he: 'אנא בדקו את הדקדוק והפיסוק שלכם' },
  },

  // Tab 7: Presentation
  tab7: {
    title: { en: 'Presentation', he: 'מצגה' },
    subtitle: { en: 'Present your design project', he: 'הציגו את פרויקט העיצוב שלכם' },
    instruction: { en: 'Upload your presentation file (PDF, PPT, or Google Slides link).', he: 'העלו את קובץ המצגה שלכם (PDF, PPT, או קישור Google Slides).' },
    presentationLinkLabel: { en: 'Presentation Link', he: 'קישור המצגה' },
    presentationLinkPlaceholder: { en: 'Paste your presentation link here...', he: 'הדביקו את קישור המצגה שלכם כאן...' },
    notesLabel: { en: 'Presentation Notes', he: 'הערות המצגה' },
    notesPlaceholder: { en: 'Add any notes about your presentation...', he: 'הוסיפו הערות על המצגה שלכם...' },
    uploadLabel: { en: 'Upload Presentation File', he: 'העלו קובץ מצגה' },
    errorGrammar: { en: 'Please check your grammar and punctuation', he: 'אנא בדקו את הדקדוק והפיסוק שלכם' },
  },

  // Validation & Errors
  validation: {
    emptyField: { en: 'This field cannot be empty', he: 'שדה זה לא יכול להיות ריק' },
    invalidGrammar: { en: 'Please check your grammar and punctuation', he: 'אנא בדקו את הדקדוק והפיסוק שלכם' },
    capitalLetterError: { en: 'Sentences must start with a capital letter', he: 'משפטים חייבים להתחיל באות גדולה' },
    punctuationError: { en: 'Sentences must end with . ! or ?', he: 'משפטים חייבים להסתיים ב. ! או ?' },
    lowercaseIError: { en: 'The pronoun "I" must be capitalized', he: 'כל משפט חייב להסתיים בסימן פיסוק' },
    minWordsError: { en: 'Minimum word count not met', he: 'ספירת המילים המינימלית לא הושגה' },
    tabLocked: { en: 'This tab is locked. Complete the previous tab first.', he: 'הטאב הזה נעול. השלימו את הטאב הקודם תחילה.' },
    completeAllFields: { en: 'Please complete all required fields', he: 'אנא השלימו את כל השדות הנדרשים' },
  },

  // Rubric Panel
  rubric: {
    title: { en: 'Completion Checklist', he: 'רשימת בדיקה להשלמה' },
    complete: { en: '✓ Complete', he: '✓ הושלם' },
    incomplete: { en: 'Needs Correction', he: 'דורש תיקון' },
  },

  // Language Toggle
  language: {
    english: { en: 'English', he: 'אנגלית' },
    hebrew: { en: 'Hebrew', he: 'עברית' },
    toggleLabel: { en: 'Language', he: 'שפה' },
  },

  // Messages
  messages: {
    saved: { en: 'Saved successfully!', he: 'נשמר בהצלחה!' },
    error: { en: 'An error occurred. Please try again.', he: 'אירעה שגיאה. אנא נסו שוב.' },
    loading: { en: 'Loading...', he: 'טוען...' },
    success: { en: 'Success!', he: 'הצלחה!' },
    warning: { en: 'Warning', he: 'אזהרה' },
  },
};

/**
 * Get translation for a key
 */
export const t = (path: string, language: Language): string => {
  const keys = path.split('.');
  let value: any = TRANSLATIONS;

  for (const key of keys) {
    value = value?.[key];
  }

  if (typeof value === 'object' && value !== null) {
    return value[language] || value.en || path;
  }

  return value || path;
};

/**
 * Get bilingual translation object
 */
export const getBilingual = (path: string): { en: string; he: string } => {
  const keys = path.split('.');
  let value: any = TRANSLATIONS;

  for (const key of keys) {
    value = value?.[key];
  }

  if (typeof value === 'object' && value !== null && 'en' in value && 'he' in value) {
    return value;
  }

  return { en: path, he: path };
};
