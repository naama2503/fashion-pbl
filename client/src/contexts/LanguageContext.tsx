/*
 * Fashion PBL – LanguageContext
 * Provides bilingual English/Hebrew support with RTL handling
 */
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "he";

const translations: Record<Language, Record<string, string>> = {
  en: {
    "home.title": "Fashion PBL",
    "home.subtitle": "Project-Based Learning — Student Workspace",
    "home.description": "Navigate through your fashion design project journey",
    "home.start": "Start Your Journey",
    "home.demo": "View Demo",

    "tab.1": "Group Identity",
    "tab.2": "Research",
    "tab.3": "Design & Color",
    "tab.4": "Logo Design",
    "tab.5": "Vector Art",
    "tab.6": "Fashion Collection",
    "tab.7": "Reflection",

    "tab1.title": "Group Identity",
    "tab1.subtitle": "Define your group's creative vision and identity",
    "tab1.groupName": "Group Name",
    "tab1.groupNamePlaceholder": "Enter your group name",
    "tab1.members": "Group Members",
    "tab1.member": "Member",
    "tab1.addMember": "Add Member",
    "tab1.theme": "Design Theme",
    "tab1.themePlaceholder": "Describe your group's fashion theme",
    "tab1.inspiration": "Inspiration & Vision",
    "tab1.inspirationPlaceholder": "What inspires your group? What is your creative vision?",
    "tab1.saved": "Group identity saved!",

    "tab2.title": "Fashion Research",
    "tab2.subtitle": "Explore fashion history, trends, and inspiration",
    "tab2.instructions": "Research your chosen fashion topic thoroughly. Document your findings below.",
    "tab2.topic": "Research Topic",
    "tab2.topicPlaceholder": "e.g., 1960s Mod Fashion, Sustainable Couture...",
    "tab2.notes": "Research Notes",
    "tab2.notesPlaceholder": "Write your research findings here. Include at least 10 key points about your topic...",
    "tab2.sources": "Sources & References",
    "tab2.sourcesPlaceholder": "List your sources: books, websites, museums...",
    "tab2.tip": "Tip: Explore fashion history museums, designer archives, and trend reports for rich research material.",

    "tab3.title": "Design & Color Theory",
    "tab3.subtitle": "Build your color palette and design language",
    "tab3.instructions": "Choose your color palette and document your design principles.",
    "tab3.palette": "Your Color Palette",
    "tab3.primary": "Primary",
    "tab3.secondary": "Secondary",
    "tab3.accent": "Accent",
    "tab3.neutral": "Neutral",
    "tab3.principles": "Design Principles",
    "tab3.principlesPlaceholder": "Describe the design principles guiding your collection...",
    "tab3.mood": "Mood Board Notes",
    "tab3.moodPlaceholder": "Describe the mood, feeling, and aesthetic of your collection...",

    "tab4.title": "Logo Design",
    "tab4.subtitle": "Create the visual identity for your fashion brand",
    "tab4.instructions": "Design a logo that represents your group's fashion brand. Consider typography, symbols, and color.",
    "tab4.concept": "Logo Concept",
    "tab4.conceptPlaceholder": "Describe your logo concept — shapes, typography, symbolism...",
    "tab4.sketches": "Sketch Descriptions",
    "tab4.sketchesPlaceholder": "Describe your logo sketches and iterations...",
    "tab4.final": "Final Logo Description",
    "tab4.finalPlaceholder": "Describe your final logo design in detail...",
    "tab4.tip": "Tip: A great fashion logo is timeless, versatile, and reflects the brand's personality.",

    "tab5.title": "Vector Art",
    "tab5.subtitle": "Translate your designs into digital vector illustrations",
    "tab5.instructions": "Document your vector art process and describe your digital illustrations.",
    "tab5.tools": "Tools Used",
    "tab5.toolsPlaceholder": "e.g., Adobe Illustrator, Inkscape, Figma...",
    "tab5.process": "Vector Process",
    "tab5.processPlaceholder": "Describe how you created your vector illustrations — steps, techniques, challenges...",
    "tab5.elements": "Design Elements",
    "tab5.elementsPlaceholder": "List and describe the vector elements you created...",
    "tab5.tip": "Tip: Vector art is resolution-independent — perfect for logos, patterns, and fashion illustrations.",

    "tab6.title": "Fashion Collection",
    "tab6.subtitle": "Present your complete fashion design collection",
    "tab6.description": "Showcase your complete fashion collection with garment descriptions, fabric choices, and styling notes.",
    "tab6.collection": "Collection Name",
    "tab6.collectionPlaceholder": "Name your fashion collection...",
    "tab6.garments": "Garment Descriptions",
    "tab6.garmentsPlaceholder": "Describe each piece in your collection — silhouette, fabric, details...",
    "tab6.styling": "Styling Notes",
    "tab6.stylingPlaceholder": "How would these pieces be styled and worn together?",
    "tab6.story": "Collection Story",
    "tab6.storyPlaceholder": "What story does your collection tell?",

    "tab7.title": "Reflection",
    "tab7.subtitle": "Reflect on your learning journey and growth",
    "tab7.instructions": "Answer the reflection questions thoughtfully and honestly.",
    "tab7.q1": "What did you learn about fashion design during this project?",
    "tab7.q1Placeholder": "Share your key learnings about fashion design...",
    "tab7.q2": "What was the most challenging part of the project?",
    "tab7.q2Placeholder": "Describe the challenges you faced and how you overcame them...",
    "tab7.q3": "How did your group collaborate effectively?",
    "tab7.q3Placeholder": "Reflect on your teamwork and collaboration...",
    "tab7.q4": "What would you do differently if you started again?",
    "tab7.q4Placeholder": "What improvements would you make?",
    "tab7.q5": "What are you most proud of in this project?",
    "tab7.q5Placeholder": "Share your proudest achievement...",

    "common.previous": "Previous",
    "common.next": "Next",
    "common.save": "Save",
    "common.progress": "Progress",
    "common.of": "of",
    "common.tab": "Tab",
    "common.demo": "Demo Mode",
    "common.demoDesc": "This is a demonstration of the student workspace. Navigate through all 7 tabs to explore the complete experience.",
    "common.back": "Back",
    "common.characters": "characters",
  },
  he: {
    "home.title": "אופנה PBL",
    "home.subtitle": "למידה מבוססת פרויקט — סביבת עבודה לתלמיד",
    "home.description": "נווט דרך מסע פרויקט עיצוב האופנה שלך",
    "home.start": "התחל את המסע",
    "home.demo": "צפה בהדגמה",

    "tab.1": "זהות קבוצתית",
    "tab.2": "מחקר",
    "tab.3": "עיצוב וצבע",
    "tab.4": "עיצוב לוגו",
    "tab.5": "אמנות וקטורית",
    "tab.6": "קולקציית אופנה",
    "tab.7": "הרהור",

    "tab1.title": "זהות קבוצתית",
    "tab1.subtitle": "הגדר את החזון היצירתי והזהות של הקבוצה שלך",
    "tab1.groupName": "שם הקבוצה",
    "tab1.groupNamePlaceholder": "הכנס את שם הקבוצה שלך",
    "tab1.members": "חברי הקבוצה",
    "tab1.member": "חבר",
    "tab1.addMember": "הוסף חבר",
    "tab1.theme": "נושא עיצוב",
    "tab1.themePlaceholder": "תאר את נושא האופנה של הקבוצה שלך",
    "tab1.inspiration": "השראה וחזון",
    "tab1.inspirationPlaceholder": "מה מעורר השראה בקבוצה שלך? מהו החזון היצירתי שלך?",
    "tab1.saved": "זהות הקבוצה נשמרה!",

    "tab2.title": "מחקר אופנה",
    "tab2.subtitle": "חקור היסטוריית אופנה, מגמות והשראה",
    "tab2.instructions": "חקור את נושא האופנה שבחרת ביסודיות. תעד את ממצאיך למטה.",
    "tab2.topic": "נושא המחקר",
    "tab2.topicPlaceholder": "לדוגמה: אופנת שנות ה-60, קוטור בר-קיימא...",
    "tab2.notes": "הערות מחקר",
    "tab2.notesPlaceholder": "כתוב את ממצאי המחקר שלך כאן. כלול לפחות 10 נקודות מפתח על הנושא שלך...",
    "tab2.sources": "מקורות ואסמכתאות",
    "tab2.sourcesPlaceholder": "רשום את המקורות שלך: ספרים, אתרים, מוזיאונים...",
    "tab2.tip": "טיפ: חקור מוזיאוני היסטוריית אופנה, ארכיוני מעצבים ודוחות מגמות לחומר מחקר עשיר.",

    "tab3.title": "עיצוב ותורת הצבע",
    "tab3.subtitle": "בנה את לוח הצבעים ושפת העיצוב שלך",
    "tab3.instructions": "בחר את לוח הצבעים שלך ותעד את עקרונות העיצוב שלך.",
    "tab3.palette": "לוח הצבעים שלך",
    "tab3.primary": "ראשי",
    "tab3.secondary": "משני",
    "tab3.accent": "הדגשה",
    "tab3.neutral": "ניטרלי",
    "tab3.principles": "עקרונות עיצוב",
    "tab3.principlesPlaceholder": "תאר את עקרונות העיצוב המנחים את הקולקציה שלך...",
    "tab3.mood": "הערות לוח מצב רוח",
    "tab3.moodPlaceholder": "תאר את מצב הרוח, התחושה והאסתטיקה של הקולקציה שלך...",

    "tab4.title": "עיצוב לוגו",
    "tab4.subtitle": "צור את הזהות הויזואלית למותג האופנה שלך",
    "tab4.instructions": "עצב לוגו המייצג את מותג האופנה של הקבוצה שלך. שקול טיפוגרפיה, סמלים וצבע.",
    "tab4.concept": "קונספט הלוגו",
    "tab4.conceptPlaceholder": "תאר את קונספט הלוגו שלך — צורות, טיפוגרפיה, סמליות...",
    "tab4.sketches": "תיאורי סקיצות",
    "tab4.sketchesPlaceholder": "תאר את סקיצות הלוגו והאיטרציות שלך...",
    "tab4.final": "תיאור הלוגו הסופי",
    "tab4.finalPlaceholder": "תאר את עיצוב הלוגו הסופי שלך בפירוט...",
    "tab4.tip": "טיפ: לוגו אופנה מצוין הוא נצחי, רב-תכליתי ומשקף את אישיות המותג.",

    "tab5.title": "אמנות וקטורית",
    "tab5.subtitle": "תרגם את עיצוביך לאיורים דיגיטליים וקטוריים",
    "tab5.instructions": "תעד את תהליך האמנות הוקטורית שלך ותאר את האיורים הדיגיטליים שלך.",
    "tab5.tools": "כלים בשימוש",
    "tab5.toolsPlaceholder": "לדוגמה: Adobe Illustrator, Inkscape, Figma...",
    "tab5.process": "תהליך וקטורי",
    "tab5.processPlaceholder": "תאר כיצד יצרת את האיורים הוקטוריים שלך — שלבים, טכניקות, אתגרים...",
    "tab5.elements": "אלמנטים עיצוביים",
    "tab5.elementsPlaceholder": "רשום ותאר את האלמנטים הוקטוריים שיצרת...",
    "tab5.tip": "טיפ: אמנות וקטורית אינה תלויה ברזולוציה — מושלמת ללוגואים, דפוסים ואיורי אופנה.",

    "tab6.title": "קולקציית אופנה",
    "tab6.subtitle": "הצג את קולקציית עיצוב האופנה המלאה שלך",
    "tab6.description": "הצג את הקולקציה המלאה שלך עם תיאורי בגדים, בחירות בד והערות סטיילינג.",
    "tab6.collection": "שם הקולקציה",
    "tab6.collectionPlaceholder": "תן שם לקולקציית האופנה שלך...",
    "tab6.garments": "תיאורי בגדים",
    "tab6.garmentsPlaceholder": "תאר כל פריט בקולקציה שלך — סילואט, בד, פרטים...",
    "tab6.styling": "הערות סטיילינג",
    "tab6.stylingPlaceholder": "כיצד ישולבו ויילבשו הפריטים הללו יחד?",
    "tab6.story": "סיפור הקולקציה",
    "tab6.storyPlaceholder": "איזה סיפור מספרת הקולקציה שלך?",

    "tab7.title": "הרהור",
    "tab7.subtitle": "הרהר על מסע הלמידה והצמיחה שלך",
    "tab7.instructions": "ענה על שאלות ההרהור בצורה מחושבת וכנה.",
    "tab7.q1": "מה למדת על עיצוב אופנה במהלך הפרויקט הזה?",
    "tab7.q1Placeholder": "שתף את הלמידות המרכזיות שלך על עיצוב אופנה...",
    "tab7.q2": "מה היה החלק המאתגר ביותר בפרויקט?",
    "tab7.q2Placeholder": "תאר את האתגרים שעמדת בפניהם וכיצד התגברת עליהם...",
    "tab7.q3": "כיצד שיתפה הקבוצה שלך פעולה ביעילות?",
    "tab7.q3Placeholder": "הרהר על עבודת הצוות והשיתוף פעולה שלך...",
    "tab7.q4": "מה היית עושה אחרת אם היית מתחיל מחדש?",
    "tab7.q4Placeholder": "אילו שיפורים היית מבצע?",
    "tab7.q5": "ממה אתה הכי גאה בפרויקט הזה?",
    "tab7.q5Placeholder": "שתף את ההישג שאתה הכי גאה בו...",

    "common.previous": "הקודם",
    "common.next": "הבא",
    "common.save": "שמור",
    "common.progress": "התקדמות",
    "common.of": "מתוך",
    "common.tab": "כרטיסייה",
    "common.demo": "מצב הדגמה",
    "common.demoDesc": "זו הדגמה של חלל העבודה של התלמיד. נווט דרך כל 7 הכרטיסיות כדי לחקור את החוויה המלאה.",
    "common.back": "חזור",
    "common.characters": "תווים",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL: language === "he" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
