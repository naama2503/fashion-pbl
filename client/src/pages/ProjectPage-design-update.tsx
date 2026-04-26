// Design Exercises Update for ProjectPage.tsx
// Replace the DESIGN_EXERCISES constant with this updated version

const DESIGN_EXERCISES = [
  {
    title: "Exercise 1: Similarity (דמיון)",
    principle: "Similarity",
    principleHe: "דמיון",
    description: "Match the image to the shape that represents it. Objects that look similar are perceived as related.",
    descriptionHe: "התאם את התמונה לצורה המייצגת אותה. עצמים שנראים דומים נתפסים כקשורים.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/gestalt-exercise-similarity-2XgPLmqLuCeH9tEMGDKGLS.webp",
    options: [
      { shape: "Circle (עיגול)", correct: true },
      { shape: "Triangle (משולש)", correct: false },
      { shape: "Square (ריבוע)", correct: false },
    ],
    feedback: "Correct! The circle matches the child's round face shape. This demonstrates the Similarity principle - the mind groups objects that share similar characteristics. (נכון! העיגול תואם את צורת הפנים העגולה של הילד. זה מדגים את עקרון הדמיון - המוח מקבץ עצמים שחולקים מאפיינים דומים.)",
    wrongFeedback: "Not quite. Look at the shape of the child's face. Which geometric shape matches it best? (לא בדיוק. תסתכל על צורת הפנים של הילד. איזו צורה גיאומטרית מתאימה לה הכי טוב?)"
  },
  {
    title: "Exercise 2: Continuation (המשכיות)",
    principle: "Continuation",
    principleHe: "המשכיות",
    description: "Match the image to the shape that represents its direction. Elements arranged in a line or curve are perceived as connected.",
    descriptionHe: "התאם את התמונה לצורה המייצגת את כיוונה. אלמנטים המסודרים בקו או בעקומה נתפסים כמחוברים.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/gestalt-exercise-continuation-gx76GeimrG9wVBEtJ6ZPWc.webp",
    options: [
      { shape: "Circle (עיגול)", correct: false },
      { shape: "Triangle (משולש)", correct: true },
      { shape: "Square (ריבוע)", correct: false },
    ],
    feedback: "Correct! The triangle matches the pointed, directional nature of the plant stem. This demonstrates the Continuation principle - the mind follows visual lines and curves to connect elements. (נכון! המשולש תואם את הטבע המחודד וכיווני של גבעול הצמח. זה מדגים את עקרון ההמשכיות - המוח עוקב אחר קווים וקימורים חזותיים כדי לחבר אלמנטים.)",
    wrongFeedback: "Not quite. Look at the direction and shape of the plant stem. Which geometric shape represents its pointed direction? (לא בדיוק. תסתכל על כיוון וצורת גבעול הצמח. איזו צורה גיאומטרית מייצגת את כיוונו המחודד?)"
  },
];
