/*
 * Fashion PBL – Comprehensive Translations (English & Hebrew)
 * All UI text with Hebrew translations in parentheses
 */

export const translations = {
  // Home page
  home: {
    title: "How Can Fashion Create Social Change?",
    subtitle: "Fashion can change the world! (אופנה יכולה לשנות את העולם!)",
    startProject: "Start Your Project",
    teacherDashboard: "Teacher Dashboard",
    yourJourney: "Your PBL Journey",
    workInGroups: "Work in groups to create fashion items that send a message for social change",
  },

  // Navigation
  nav: {
    step1: "Group Decision (החלטה קבוצתית)",
    step2: "Research (מחקר)",
    step3: "Design Rules (חוקי עיצוב)",
    step4: "Logo (לוגו)",
    step5: "Fashion Item (פריט אופנה)",
    step6: "Presentation (מצגת)",
    step7: "Reflection (הרהור)",
  },

  // Grammar helper
  grammar: {
    reminder: "CAPITAL LETTER at the start! (אות גדולה בהתחלה!) Punctuation at the end! (סימן פיסוק בסוף!)",
    error: "Remember: Start with a capital letter and end with punctuation!",
  },

  // Gating messages
  gating: {
    locked: "This tab is locked. (כרטיסייה זו נעולה.)",
    waitForApproval: "Wait for teacher approval of the previous step.",
    approved: "✓ Approved (מאושר)",
    pending: "Pending teacher approval (בהמתנה לאישור המורה)",
  },

  // Tab 1: Group Decision
  tab1: {
    title: "Group Decision (החלטה קבוצתית)",
    subtitle: "Work in groups of 2-3. Choose a suffering group (e.g., homeless, elderly, children in need).",
    groupName: "Group Name (שם הקבוצה)",
    groupNamePlaceholder: "Enter your group name",
    members: "Group Members (חברי הקבוצה)",
    memberName: "Member Name",
    addMember: "Add Member",
    whyChosen: "Why did you choose this group? (למה בחרתם בקבוצה זו?)",
    whyChosenPlaceholder: "Explain your choice...",
    save: "Save",
  },

  // Tab 2: Research
  tab2: {
    title: "Research (מחקר)",
    subtitle: "Answer these 4 questions about the group you chose",
    q1: "1. Who are they? (מי הם?)",
    q1Placeholder: "Describe the group...",
    q2: "2. Why are they special? (למה הם מיוחדים?)",
    q2Placeholder: "What makes them unique...",
    q3: "3. What is their problem? (מה הבעיה שלהם?)",
    q3Placeholder: "Describe the challenges they face...",
    q4: "4. What needs to change? (מה צריך להשתנות?)",
    q4Placeholder: "What solutions do you envision...",
  },

  // Tab 3: Design Rules - Color Meaning Chart
  tab3: {
    title: "Design Rules (חוקי עיצוב)",
    subtitle: "Color Meaning Chart (תרשים משמעות הצבעים)",
    colorChart: [
      { color: "Yellow", meaning: "Optimistic (אופטימי)", hex: "#FFD700" },
      { color: "Orange", meaning: "Friendly (חברותי)", hex: "#FFA500" },
      { color: "Red", meaning: "Excitement (התרגשות)", hex: "#FF0000" },
      { color: "Purple", meaning: "Creative (יצירתי)", hex: "#800080" },
      { color: "Blue", meaning: "Trust (אמון)", hex: "#0000FF" },
      { color: "Green", meaning: "Peace/Growth (שלום/צמיחה)", hex: "#008000" },
      { color: "Grey", meaning: "Balance (איזון)", hex: "#808080" },
    ],
    whichColors: "Which colors will you use? (אילו צבעים תשתמשו?)",
    whyTheseColors: "Why these colors? (למה הצבעים האלה?)",
    whyExplanation: "Explain how your color choices connect to your message...",
  },

  // Tab 4: Logo Design
  tab4: {
    title: "Creating a Logo (יצירת לוגו)",
    subtitle: "Keep it simple. Use 2 colors. Use 1 symbol.",
    instructions: "Show examples of logos: Old Hats, Social Protest, Protester",
    logoDescription: "Describe your logo (תאר את הלוגו שלך)",
    logoDescPlaceholder: "What symbol will you use? What do the colors mean?",
    logoReasoning: "Why this logo? (למה הלוגו הזה?)",
    reasoningPlaceholder: "How does it connect to your message for change?",
  },

  // Tab 5: Fashion Item
  tab5: {
    title: "Fashion Item (פריט אופנה)",
    subtitle: "Create a fashion item that sends a message",
    itemType: "What is the item? (מה הפריט?)",
    itemTypes: ["Shirt (חולצה)", "Hat (כובע)", "Bag (תיק)", "Jacket (ז'קט)", "Pants (מכנסיים)", "Shoes (נעליים)", "Other (אחר)"],
    itemDescription: "Describe your fashion item (תאר את הפריט שלך)",
    itemDescPlaceholder: "What does it look like? What colors? What symbols?",
    howItHelps: "How does it help your group? (איך זה עוזר לקבוצה שלך?)",
    howItHelpsPlaceholder: "Explain the message and impact...",
  },

  // Tab 6: Presentation Checklist
  tab6: {
    title: "Presentation (מצגת)",
    subtitle: "Final checklist before presenting",
    checklist: [
      "We chose a group and explained why (בחרנו קבוצה והסברנו למה)",
      "We researched their problems (חקרנו את הבעיות שלהם)",
      "We chose colors with meaning (בחרנו צבעים עם משמעות)",
      "We created a simple logo (יצרנו לוגו פשוט)",
      "We designed a fashion item (עיצבנו פריט אופנה)",
      "Our item sends a clear message (הפריט שלנו שולח הודעה ברורה)",
      "Everyone in the group understands the project (כולם בקבוצה מבינים את הפרויקט)",
    ],
    ready: "Ready to present? (מוכנים להציג?)",
  },

  // Tab 7: Reflection
  tab7: {
    title: "Reflection (הרהור)",
    subtitle: "Think about what you learned",
    reflection: "Write your reflection (כתוב את ההרהור שלך)",
    reflectionPlaceholder: "What did you learn? How can fashion create change? What was challenging? What are you proud of?",
  },

  // Teacher Dashboard
  admin: {
    title: "Teacher Dashboard (לוח הבקרה של המורה)",
    password: "Enter Password",
    login: "Login",
    students: "Students (תלמידים)",
    group: "Group (קבוצה)",
    status: "Status (סטטוס)",
    approve: "Approve (אישור)",
    reject: "Reject (דחיה)",
    viewResponses: "View Responses (צפה בתשובות)",
    allApproved: "All tabs approved (כל הכרטיסיות אושרו)",
    pendingApproval: "Pending approval (בהמתנה לאישור)",
    approved: "Approved (מאושר)",
    rejected: "Rejected (דחוי)",
    pending: "Pending (בהמתנה)",
    feedbackNotes: "Feedback Notes (הערות משוב)",
    addFeedback: "Add feedback for revision (הוסף משוב לתיקון)",
    feedbackPlaceholder: "What should the group fix? (מה הקבוצה צריכה לתקן?)",
    viewCanva: "View Canva Design (צפה בעיצוב Canva)",
    viewPresentation: "View Presentation (צפה במצגה)",
    downloadFile: "Download File (הורד קובץ)",
  },

  // Common
  common: {
    save: "Save (שמור)",
    next: "Next (הבא)",
    previous: "Previous (הקודם)",
    submit: "Submit (שלח)",
    cancel: "Cancel (בטל)",
    loading: "Loading... (טוען...)",
    error: "Error (שגיאה)",
    success: "Success! (הצלחה!)",
    helpfulGem: "Helpful Gem (אבן חן מועילה)",
    openGem: "Open Learning Resource",
  },
};

export type TranslationKey = keyof typeof translations;
