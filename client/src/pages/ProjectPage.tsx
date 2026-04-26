import { useState, useRef } from "react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { Lock, AlertCircle, HelpCircle, Upload, CheckCircle, XCircle } from "lucide-react";
import CanvasDraw from "react-canvas-draw";

const TABS = [
  { label: "Home", labelHe: "בית" },
  { label: "Group Decision", labelHe: "החלטה קבוצתית" },
  { label: "Research", labelHe: "מחקר" },
  { label: "Design Inquiry", labelHe: "חוקי עיצוב" },
  { label: "Creating a Logo", labelHe: "יצירת לוגו" },
  { label: "Vector Art", labelHe: "וקטור אמנות" },
  { label: "Fashion Item", labelHe: "פריט אופנה" },
  { label: "Presentation", labelHe: "מצגת" },
  { label: "Reflection", labelHe: "רפלקציה" },
];

const COLORS = [
  "#FDE68A", "#FDBA74", "#FCA5A5", "#D8B4FE", "#93C5FD", "#86EFAC", "#94A3B8", "#C7D2FE"
];

const IMAGES = {
  groupTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-group-decision-top-bRGmLFS52tVBmxVuPyKH7h.webp",
  groupBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-group-decision-bottom-F2rHCYhXzzEByzunwAExR5.webp",
  researchTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-research-top-U9zUqF3h6rinZQFXkdg7rS.webp",
  researchBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-research-bottom-gpbpDLofEE3mjKPw35JCLm.webp",
  designTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-design-top-ZyUQs8dq3hkDqwwridTV3V.webp",
  designBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-design-bottom-CPMAwyRzP7aWsS3VJ6SNZn.webp",
  logoTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-logo-top-EmYSyt2r67FPonpVgZmurr.webp",
  logoBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-logo-bottom-4YQFAz88VxKCQeLPVS4J3.webp",
  fashionTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-fashion-top-SvFVz6B2r7aZeBLKXzQofw.webp",
  fashionBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-fashion-bottom-8Uwd7nCJBVcgPfuXkdrfTi.webp",
  presentationTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-presentation-top-SVz84bcgZf829u8G2N2AmY.webp",
  presentationBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-presentation-bottom-eHcm6h6JT4YzGy4JjyLXds.webp",
};

// Gestalt logo examples
const GESTALT_LOGOS = [
  { 
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/gestalt-logo-proximity-nuNgWMJud2ZHVRaCqpAtiq.webp",
    principle: "Proximity",
    principleHe: "קרבה",
    desc: "Which principle is used here?"
  },
  { 
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/gestalt-logo-closure-aW3zXAaeXzpACXWKz7RPdd.webp",
    principle: "Closure",
    principleHe: "סגירה",
    desc: "Which principle is used here?"
  },
  { 
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/gestalt-logo-continuity-NGcqDuAmUNehSLvDXEMdca.webp",
    principle: "Continuity",
    principleHe: "המשכיות",
    desc: "Which principle is used here?"
  },
];

// Color meaning chart (Matte colors)
const COLOR_MEANINGS = [
  { color: "#FDE68A", name: "Yellow", nameHe: "צהוב", meaning: "Optimistic", meaningHe: "אופטימי" },
  { color: "#FDBA74", name: "Orange", nameHe: "כתום", meaning: "Friendly", meaningHe: "חברותי" },
  { color: "#FCA5A5", name: "Red", nameHe: "אדום", meaning: "Excitement", meaningHe: "התרגשות" },
  { color: "#D8B4FE", name: "Purple", nameHe: "סגול", meaning: "Creative", meaningHe: "יצירתי" },
  { color: "#93C5FD", name: "Blue", nameHe: "כחול", meaning: "Trust", meaningHe: "אמון" },
  { color: "#86EFAC", name: "Green", nameHe: "ירוק", meaning: "Peace/Growth", meaningHe: "שלום/צמיחה" },
  { color: "#94A3B8", name: "Grey", nameHe: "אפור", meaning: "Balance", meaningHe: "איזון" },
];

// Gestalt principles with Hebrew translations and descriptions
const GESTALT_PRINCIPLES = [
  { 
    name: "Closure", 
    nameHe: "סגירה", 
    desc: "The mind fills in missing parts to complete a shape. Example: Noreico, INTI logos - we see the complete form even though parts are missing.",
    descHe: "המוח ממלא חלקים חסרים כדי להשלים צורה. דוגמה: לוגו Noreico, INTI - אנחנו רואים את הצורה השלמה למרות שחלקים חסרים."
  },
  { 
    name: "Figure/Ground", 
    nameHe: "דמות/רקע", 
    desc: "Objects stand out from their background. Example: BUGS!, EAT.N logos - the figure pops out from the background.",
    descHe: "עצמים בולטים מהרקע שלהם. דוגמה: לוגו BUGS!, EAT.N - הדמות בולטת מהרקע."
  },
  { 
    name: "Continuation", 
    nameHe: "המשכיות", 
    desc: "Elements arranged in a line or curve are perceived as connected. Example: W, DIRECTV, leaf logos - our eye follows the continuous line.",
    descHe: "אלמנטים המסודרים בקו או עקומה נתפסים כמחוברים. דוגמה: לוגו W, DIRECTV, עלה - העין שלנו עוקבת אחרי הקו הרציף."
  },
  { 
    name: "Unity", 
    nameHe: "אחדות", 
    desc: "Similar elements are grouped together to create a unified whole. Example: JAMS, BRIDGE logos - multiple elements work as one.",
    descHe: "אלמנטים דומים מקובצים יחד כדי ליצור שלם מאוחד. דוגמה: לוגו JAMS, BRIDGE - אלמנטים מרובים עובדים כאחד."
  },
  { 
    name: "Balance", 
    nameHe: "איזון", 
    desc: "Visual weight is distributed evenly creating harmony. Example: Gucci, Adidas, Prada logos - symmetrical and balanced designs.",
    descHe: "המשקל הויזואלי מחולק באופן שווה ויוצר הרמוניה. דוגמה: לוגו Gucci, Adidas, Prada - עיצובים סימטריים ומאוזנים."
  },
];

// Design exercises
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
    correct: 0,
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
    correct: 1,
    feedback: "Correct! The triangle matches the pointed, directional nature of the plant stem. This demonstrates the Continuation principle - the mind follows visual lines and curves to connect elements. (נכון! המשולש תואם את הטבע המחודד וכיווני של גבעול הצמח. זה מדגים את עקרון ההמשכיות - המוח עוקב אחר קווים וקימורים חזותיים כדי לחבר אלמנטים.)",
    wrongFeedback: "Not quite. Look at the direction and shape of the plant stem. Which geometric shape represents its pointed direction? (לא בדיוק. תסתכל על כיוון וצורת גבעול הצמח. איזו צורה גיאומטרית מייצגת את כיוונו המחודד?)"
  },
];

// Validation helper for research questions
const validateResearchAnswer = (text: string, minSentences: number, needsStats: boolean = false): { valid: boolean; errors: string[] } => {
  const errors = [];
  
  const sentences = text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length < minSentences) {
    errors.push(`לפחות ${minSentences} משפטים נדרשים`);
  }
  
  if (text.length > 0 && !/^[A-Z]/.test(text) && !/^[א-ת]/.test(text)) {
    errors.push("אות גדולה בהתחלה");
  }
  
  if (text.length > 0 && !/[.!?]$/.test(text.trim())) {
    errors.push("סימן פיסוק בסוף");
  }
  
  // Check for statistics keywords if required
  if (needsStats) {
    const hasStats = /(%|אחוז|מחקר|נתונים|סטטיסטיקה|research|data|percent)/i.test(text);
    if (!hasStats) {
      errors.push("נדרשת סטטיסטיקה (%, מחקר, נתונים)");
    }
  }
  
  return { valid: errors.length === 0, errors };
};

export default function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [approvals, setApprovals] = useState([true, false, false, false, false, false, false, false]);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [studentNames, setStudentNames] = useState(["Student 1", "Student 2", "Student 3"]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showGrammarTips, setShowGrammarTips] = useState(false);
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, number>>({});
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<number, boolean>>({});
  const canvasRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAccessTab = (tabIndex: number): boolean => {
    return tabIndex === 0 || approvals[tabIndex - 1];
  };

  const handleSaveAndContinue = () => {
    if (!canAccessTab(currentTab)) {
      toast.error("This tab is locked. Get teacher approval for the previous tab first!");
      return;
    }

    // Validate based on tab
    if (currentTab === 1) {
      const whyText = responses.whyChosen || "";
      const validation = validateResearchAnswer(whyText, 2);
      if (!validation.valid) {
        setValidationErrors(validation.errors);
        toast.error("Please fix your writing before continuing!");
        return;
      }
    } else if (currentTab === 2) {
      // Research tab validation with specific requirements
      const q1Validation = validateResearchAnswer(responses.q1 || "", 2, true); // Q1 needs statistics
      const q2Validation = validateResearchAnswer(responses.q2 || "", 2, false);
      const q3Validation = validateResearchAnswer(responses.q3 || "", 3, true); // Q3 needs statistics
      const q4Validation = validateResearchAnswer(responses.q4 || "", 2, false);

      const allErrors = [
        ...q1Validation.errors.map(e => `Q1 (Who): ${e}`),
        ...q2Validation.errors.map(e => `Q2 (Why special): ${e}`),
        ...q3Validation.errors.map(e => `Q3 (Problem): ${e}`),
        ...q4Validation.errors.map(e => `Q4 (What changes): ${e}`),
      ];

      if (allErrors.length > 0) {
        setValidationErrors(allErrors);
        toast.error("Please fix all validation errors before continuing!");
        return;
      }
    } else if (currentTab === 3) {
      // Design Inquiry validation - check exercises
      const allAnswered = Object.keys(exerciseAnswers).length === DESIGN_EXERCISES.length;
      if (!allAnswered) {
        toast.error("Please answer all design exercises before continuing!");
        return;
      }
    } else if (currentTab === 4) {
      // Logo design validation
      const logoDesc = responses.logoDescription || "";
      const populationName = responses.logoPopulation || responses.chosenPopulation || "";
      const gestaltUsed = responses.logoGestalt || "";

      if (!populationName.trim()) {
        toast.error("Please enter the population name in the logo!");
        return;
      }
      if (!gestaltUsed.trim()) {
        toast.error("Please describe which Gestalt principle you used!");
        return;
      }
      if (logoDesc.trim().length < 20) {
        toast.error("Please provide a detailed logo description!");
        return;
      }
    } else if (currentTab === 5) {
      // Vector art validation
      const vectorDesc = responses.vectorDescription || "";
      if (vectorDesc.trim().length < 20) {
        toast.error("Please describe your silhouette vector (at least 20 characters)!");
        return;
      }
    } else if (currentTab === 6) {
      // Fashion item validation
      const itemDesc = responses.itemDescription || "";
      if (itemDesc.trim().length < 20) {
        toast.error("Please describe the fashion item (at least 20 characters)!");
        return;
      }
    } else if (currentTab === 7) {
      // Presentation validation
      const checkCount = Object.values(responses).filter((v, k) => k.toString().startsWith("check_") && v).length;
      if (checkCount < 4) {
        toast.error("Please check at least 4 items before continuing!");
        return;
      }
    } else if (currentTab === 8) {
      // Presentation validation
      const checkCount = Object.values(responses).filter((v, k) => k.toString().startsWith("check_") && v).length;
      if (checkCount < 4) {
        toast.error("Please check at least 4 items before continuing!");
        return;
      }
    } else if (currentTab === 9) {
      // Reflection validation
      const reflection = responses.reflection || "";
      if (reflection.trim().length < 50) {
        toast.error("Please write a meaningful reflection (at least 50 characters)!");
        return;
      }
    }

    setValidationErrors([]);
    
    if (currentTab < TABS.length - 1) {
      const newApprovals = [...approvals];
      newApprovals[currentTab] = true;
      setApprovals(newApprovals);
      setCurrentTab(currentTab + 1);
      toast.success(`Tab saved! Moving to next stage...`);
    } else {
      toast.success("Project completed!");
    }
  };

  const updateResponse = (key: string, value: any) => {
    setResponses({ ...responses, [key]: value });
  };

  const handleExerciseAnswer = (exerciseIdx: number, optionIdx: number) => {
    setExerciseAnswers({ ...exerciseAnswers, [exerciseIdx]: optionIdx });
    const exercise = DESIGN_EXERCISES[exerciseIdx];
    const isCorrect = optionIdx === exercise.correct;
    setExerciseFeedback({ ...exerciseFeedback, [exerciseIdx]: isCorrect });
  };

  const handleCanvasExport = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.canvas.drawing;
      const image = canvas.toDataURL("image/png");
      updateResponse("logoImage", image);
      toast.success("Logo saved!");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateResponse("logoUploadedFile", event.target?.result);
        toast.success("Logo file uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVectorUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateResponse("vectorUploadedFile", event.target?.result);
        toast.success("Silhouette file uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const tabColor = COLORS[currentTab];
  const isLocked = !canAccessTab(currentTab);

  // Tab 0: Home
  if (currentTab === 0) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
              HOW CAN FASHION CREATE SOCIAL CHANGE?
            </h1>
            <p style={{ fontSize: "1.125rem", color: "#555555", lineHeight: "1.6", marginBottom: "2rem" }}>
              In this project, you will work in groups to design a fashion item that sends a message for social change. (בפרויקט זה, תעבדו בקבוצות כדי לעצב פריט אופנה השולח הודעה לשינוי חברתי.)
            </p>
            <button
              onClick={handleSaveAndContinue}
              style={{
                backgroundColor: "#333333",
                color: "white",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              Start Your Project →
            </button>
          </div>
          <div>
            <img src={IMAGES.groupTop} alt="Group decision" style={{ width: "100%", borderRadius: "0.5rem" }} />
          </div>
        </div>
      </div>
    );
  }

  // Tab 1: Group Decision
  if (currentTab === 1) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                  Group Decision (החלטה קבוצתית)
                </h1>
                <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                  Work in groups of 2-3. Choose a population to help.
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 1 first!</p>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <div style={{ marginBottom: "2rem", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "0.375rem", borderLeft: "4px solid #333333" }}>
                    <p style={{ fontSize: "0.95rem", color: "#333333", lineHeight: "1.6" }}>
                      <strong>Assignment (משימה):</strong> Think of a group of people in the world today who are suffering and people are not aware enough of their struggle. 
                      (חשבו על קבוצת אנשים בעולם היום שסובלים ואנשים לא מודעים מספיק למאבקם.)
                    </p>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Group Members (חברי הקבוצה)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                      {studentNames.map((name, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={name}
                          onChange={(e) => {
                            const newNames = [...studentNames];
                            newNames[idx] = e.target.value;
                            setStudentNames(newNames);
                          }}
                          disabled={isLocked}
                          style={{
                            padding: "0.75rem",
                            border: "1px solid #D1D5DB",
                            borderRadius: "0.375rem",
                            fontFamily: "'Alef', 'Assistant', sans-serif",
                          }}
                          placeholder={`Student ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "1rem", color: "#333333" }}>
                      Compare Populations (השווה בין אוכלוסיות)
                    </label>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                        <thead>
                          <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "2px solid #D1D5DB" }}>
                            <th style={{ padding: "0.75rem", textAlign: "left", fontWeight: "bold", color: "#333333", borderRight: "1px solid #D1D5DB" }}>
                              Population Name
                            </th>
                            {studentNames.map((name, idx) => (
                              <th key={idx} style={{ padding: "0.75rem", textAlign: "center", fontWeight: "bold", color: "#333333", borderRight: "1px solid #D1D5DB" }}>
                                {name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {["Name of Population", "Why they're a good choice?", "Why NOT to choose them?"].map((row, rowIdx) => (
                            <tr key={rowIdx} style={{ borderBottom: "1px solid #E5E7EB" }}>
                              <td style={{ padding: "0.75rem", fontWeight: "bold", color: "#555555", backgroundColor: "#F9FAFB", borderRight: "1px solid #D1D5DB" }}>
                                {row}
                              </td>
                              {studentNames.map((name, colIdx) => (
                                <td key={colIdx} style={{ padding: "0.75rem", borderRight: "1px solid #D1D5DB" }}>
                                  <textarea
                                    value={responses[`table_${rowIdx}_${colIdx}`] || ""}
                                    onChange={(e) => updateResponse(`table_${rowIdx}_${colIdx}`, e.target.value)}
                                    disabled={isLocked}
                                    style={{
                                      width: "100%",
                                      padding: "0.5rem",
                                      border: "1px solid #D1D5DB",
                                      borderRadius: "0.375rem",
                                      fontFamily: "'Alef', 'Assistant', sans-serif",
                                      minHeight: "60px",
                                      resize: "vertical",
                                    }}
                                    placeholder="Enter text..."
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Which population did you choose? (איזו אוכלוסייה בחרתם?)
                    </label>
                    <input
                      type="text"
                      value={responses.chosenPopulation || ""}
                      onChange={(e) => updateResponse("chosenPopulation", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        marginBottom: "1rem",
                      }}
                      placeholder="Enter population name..."
                    />

                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Why? (at least 2 sentences) (למה? לפחות 2 משפטים)
                    </label>
                    <textarea
                      value={responses.whyChosen || ""}
                      onChange={(e) => {
                        updateResponse("whyChosen", e.target.value);
                        setValidationErrors([]);
                      }}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: validationErrors.length > 0 ? "2px solid #DC2626" : "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "100px",
                        resize: "vertical",
                      }}
                      placeholder="Explain your choice..."
                    />
                    
                    {validationErrors.length > 0 && (
                      <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "0.375rem", padding: "0.75rem", marginTop: "0.75rem" }}>
                        {validationErrors.map((error, idx) => (
                          <div key={idx} style={{ display: "flex", gap: "0.5rem", color: "#DC2626", fontSize: "0.875rem", marginBottom: idx < validationErrors.length - 1 ? "0.5rem" : 0 }}>
                            <AlertCircle size={16} style={{ flexShrink: 0 }} />
                            <span>{error}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSaveAndContinue}
                    disabled={isLocked}
                    style={{
                      width: "100%",
                      backgroundColor: isLocked ? "#D1D5DB" : "#FDBA74",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>

              <div>
                <img src={IMAGES.groupBottom} alt="Social change" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tab 2: Research
  if (currentTab === 2) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                  Research (מחקר)
                </h1>
                <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                  Answer these 4 questions about the population you chose.
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 2 first!</p>
                  </div>
                )}

                <button
                  onClick={() => setShowGrammarTips(!showGrammarTips)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "#E0E7FF",
                    color: "#333333",
                    padding: "0.75rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    border: "1px solid #C7D2FE",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    marginBottom: "1.5rem",
                  }}
                >
                  <HelpCircle size={18} />
                  {showGrammarTips ? "Hide Grammar Tips" : "Show Grammar Tips"}
                </button>

                {showGrammarTips && (
                  <div style={{ backgroundColor: "#F0F9FF", border: "2px solid #93C5FD", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem" }}>
                    <h3 style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>Writing Rules (חוקי כתיבה)</h3>
                    <ul style={{ color: "#555555", lineHeight: "1.8", fontSize: "0.875rem" }}>
                      <li>✓ Use CAPITAL LETTERS at the start (אותיות גדולות בהתחלה)</li>
                      <li>✓ Use PUNCTUATION at the end (סימן פיסוק בסוף)</li>
                      <li>✓ Use SIMPLE PAST TENSE (עבר פשוט) for events that happened</li>
                      <li>✓ Use SIMPLE PRESENT TENSE (הווה פשוט) for current situations</li>
                    </ul>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  {[
                    { q: "1. Who are they? (מי הם?) - At least 2 sentences", key: "q1", minSentences: 2 },
                    { q: "2. Why are they special? (למה הם מיוחדים?) - At least 2 sentences", key: "q2", minSentences: 2 },
                    { q: "3. What is their problem? (מה הבעיה שלהם?) - At least 3 sentences", key: "q3", minSentences: 3 },
                    { q: "4. What needs to change? (מה צריך להשתנות?) - At least 2 sentences", key: "q4", minSentences: 2 },
                  ].map((item, idx) => (
                    <div key={idx} style={{ marginBottom: "1.5rem", display: "grid", gridTemplateColumns: "150px 1fr", gap: "1rem", alignItems: "start" }}>
                      <div style={{ backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "0.375rem", borderLeft: "4px solid #333333", height: "fit-content" }}>
                        <label style={{ display: "block", fontWeight: "bold", fontSize: "0.875rem", marginBottom: "0.5rem", color: "#333333" }}>
                          {item.q}
                        </label>
                        <div style={{ fontSize: "0.75rem", color: "#555555", lineHeight: "1.4" }}>
                          <p>✓ Capital letter</p>
                          <p>✓ Punctuation</p>
                          <p>✓ {item.minSentences} sentences</p>
                        </div>
                      </div>
                      <div>
                        <textarea
                          value={responses[item.key] || ""}
                          onChange={(e) => updateResponse(item.key, e.target.value)}
                          disabled={isLocked}
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "1px solid #D1D5DB",
                            borderRadius: "0.375rem",
                            fontFamily: "'Alef', 'Assistant', sans-serif",
                            minHeight: "100px",
                            resize: "vertical",
                          }}
                          placeholder="Enter your answer..."
                        />
                      </div>
                    </div>
                  ))}

                  {validationErrors.length > 0 && (
                    <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "0.375rem", padding: "1rem", marginBottom: "1.5rem" }}>
                      {validationErrors.map((error, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "0.5rem", color: "#DC2626", fontSize: "0.875rem", marginBottom: idx < validationErrors.length - 1 ? "0.5rem" : 0 }}>
                          <AlertCircle size={16} style={{ flexShrink: 0 }} />
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={handleSaveAndContinue}
                    disabled={isLocked}
                    style={{
                      width: "100%",
                      backgroundColor: isLocked ? "#D1D5DB" : "#FCA5A5",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>

              <div>
                <img src={IMAGES.researchTop} alt="Research" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
                <img src={IMAGES.researchBottom} alt="Research" style={{ width: "100%", borderRadius: "0.5rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tab 3: Design Inquiry (Color Meanings + Gestalt + Exercises)
  if (currentTab === 3) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                  Design Inquiry (חוקי עיצוב)
                </h1>
                <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                  Learn about color meanings and design principles to create powerful messages. (למדו על משמעויות צבע ועקרונות עיצוב כדי ליצור הודעות חזקות.)
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 3 first!</p>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>
                    Color Meaning Chart (תרשים משמעויות צבע)
                  </h2>
                  <p style={{ color: "#555555", marginBottom: "1rem", fontSize: "0.95rem" }}>
                    Different colors communicate different emotions and meanings. Choose colors that match your message for social change. (צבעים שונים מעבירים רגשות ומשמעויות שונות. בחרו צבעים שתואמים את ההודעה שלכם לשינוי חברתי.)
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
                    {COLOR_MEANINGS.map((item, idx) => (
                      <div key={idx} style={{ padding: "1.5rem", borderRadius: "0.5rem", backgroundColor: item.color, opacity: 0.9, textAlign: "center", border: "2px solid #333333" }}>
                        <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                          {item.name} ({item.nameHe})
                        </h3>
                        <p style={{ fontSize: "1rem", color: "#333333", fontWeight: "bold" }}>
                          {item.meaning}
                        </p>
                        <p style={{ fontSize: "0.875rem", color: "#333333" }}>
                          ({item.meaningHe})
                        </p>
                      </div>
                    ))}
                  </div>

                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    Design Exercises (תרגילי עיצוב)
                  </h2>
                  {/* Bank Logo Exercise */}
                  <div style={{ marginBottom: "2rem", backgroundColor: "#F9FAFB", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #E5E7EB" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>Exercise 1: Bank Logos (תרגיל 1: לוגו בנקים)</h3>
                    <p style={{ fontSize: "0.875rem", color: "#555555", marginBottom: "1rem" }}>Which logo represents a serious bank? Which represents growth? Which represents an unserious bank? (איזה לוגו מייצג בנק רציני? איזה מייצג צמיחה? איזה מייצג בנק שאינו רציני?)</p>
                    <img src="/manus-storage/image11_ef7a8c4a.png" alt="Bank Logos" style={{ width: "100%", marginBottom: "1rem", borderRadius: "0.375rem", maxHeight: "400px", objectFit: "contain" }} />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1rem" }}>
                      {["Serious Bank (בנק רציני)", "Growth Bank (בנק צמיחה)", "Unserious Bank (בנק לא רציני)"].map((label, idx) => (
                        <button key={idx} onClick={() => updateResponse(`bankExercise_${idx}`, label)} disabled={isLocked} style={{ padding: "1rem", border: responses[`bankExercise_${idx}`] ? "3px solid #333333" : "1px solid #D1D5DB", borderRadius: "0.375rem", backgroundColor: responses[`bankExercise_${idx}`] ? "#F0F9FF" : "white", cursor: isLocked ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
                          <p style={{ fontSize: "0.875rem", color: "#333333", fontWeight: "bold" }}>{label}</p>
                        </button>
                      ))}
                    </div>
                    <div style={{ backgroundColor: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: "0.375rem", padding: "1rem" }}>
                      <p style={{ fontWeight: "bold", color: "#16A34A", marginBottom: "0.25rem" }}>Explanation (הסבר):</p>
                      <p style={{ fontSize: "0.875rem", color: "#555555" }}>Black represents seriousness and trust. Green represents growth and money. Pink represents playfulness and fun. Each color choice sends a message about the bank's personality. (שחור מייצג רציניות ואמון. ירוק מייצג צמיחה וכסף. ורוד מייצג משחק וכיף. כל בחירת צבע משדרת הודעה על אישיות הבנק.)</p>
                    </div>
                  </div>

                  {/* Font Exercise */}
                  <div style={{ marginBottom: "2rem", backgroundColor: "#F9FAFB", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #E5E7EB" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>Exercise 2: Font Shapes (תרגיל 2: צורות פונט)</h3>
                    <p style={{ fontSize: "0.875rem", color: "#555555", marginBottom: "1rem" }}>Which font represents childlike innocence? Which represents seriousness? Which represents a religious organization? (איזה פונט מייצג תמימות ילדותית? איזה מייצג רציניות? איזה מייצג ארגון דתי?)</p>
                    <img src="/manus-storage/image2_91aa3bdf.png" alt="Font Examples" style={{ width: "100%", marginBottom: "1rem", borderRadius: "0.375rem", maxHeight: "400px", objectFit: "contain" }} />
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1rem" }}>
                      {["Childlike (ילדותי)", "Serious (רציני)", "Religious (דתי)"].map((label, idx) => (
                        <button key={idx} onClick={() => updateResponse(`fontExercise_${idx}`, label)} disabled={isLocked} style={{ padding: "1rem", border: responses[`fontExercise_${idx}`] ? "3px solid #333333" : "1px solid #D1D5DB", borderRadius: "0.375rem", backgroundColor: responses[`fontExercise_${idx}`] ? "#F0F9FF" : "white", cursor: isLocked ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
                          <p style={{ fontSize: "0.875rem", color: "#333333", fontWeight: "bold" }}>{label}</p>
                        </button>
                      ))}
                    </div>
                    <div style={{ backgroundColor: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: "0.375rem", padding: "1rem" }}>
                      <p style={{ fontWeight: "bold", color: "#16A34A", marginBottom: "0.25rem" }}>Explanation (הסבר):</p>
                      <p style={{ fontSize: "0.875rem", color: "#555555" }}>Round fonts with soft curves feel friendly and childlike. Sharp, angular fonts feel serious and strong. Fonts with specific geometric patterns can feel religious or formal. Every choice of font sends a message about your brand's personality. (פונטים עגולים עם עקומות רכות מרגישים חברותיים וילדותיים. פונטים חדים וזוויתיים מרגישים רציניים וחזקים. פונטים עם דפוסים גיאומטריים ספציפיים יכולים להרגיש דתיים או רשמיים.)</p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div style={{ marginBottom: "2rem", backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#92400E", marginBottom: "0.75rem" }}>Key Takeaway (עיקרון חשוב)</h3>
                    <p style={{ fontSize: "0.95rem", color: "#92400E" }}>Every design choice sends a message about your organization. Color, font, and shape are strategic tools for social change. (כל בחירה עיצובית משדרת הודעה על הארגון שלך. צבע, פונט וצורה הם כלים אסטרטגיים לשינוי חברתי.)</p>
                  </div>

                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    Gestalt Principles (עקרונות גשטלט)
                  </h2>
                  <p style={{ color: "#555555", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                    Gestalt principles describe how our eyes and brain perceive visual elements. Use these principles to create a strong logo that communicates your message clearly. (עקרונות גשטלט מתארים כיצד עיננו והמוח שלנו תופסים אלמנטים ויזואליים. השתמשו בעקרונות אלה כדי ליצור לוגו חזק שמעביר את ההודעה שלכם בבירור.)
                  </p>

                  <div style={{ marginBottom: "2rem", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "0.375rem", borderLeft: "4px solid #333333" }}>
                    <h4 style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>Gestalt Principles Reference (עקרונות גשטלט):</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                      {GESTALT_PRINCIPLES.map((principle, idx) => (
                        <div key={idx} style={{ fontSize: "0.875rem" }}>
                          <p style={{ fontWeight: "bold", color: "#333333" }}>{principle.name} ({principle.nameHe})</p>
                          <p style={{ color: "#555555" }}>{principle.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                      Gestalt Logo Examples - Which principles are used? (דוגמאות לוגו בגשטלט - אילו עקרונות בשימוש?)
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                      {GESTALT_LOGOS.map((logo, idx) => (
                        <div key={idx} style={{ backgroundColor: "#F9FAFB", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #E5E7EB" }}>
                          <img src={logo.url} alt={logo.principle} style={{ width: "100%", height: "200px", objectFit: "contain", marginBottom: "1rem" }} />
                          <p style={{ fontSize: "0.875rem", color: "#555555", marginBottom: "0.75rem" }}>
                            <strong>Example {idx + 1}:</strong> Which principle is used here?
                          </p>
                          <p style={{ fontSize: "0.875rem", color: "#555555" }}>
                            <em>Answer will appear after you select</em>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>



                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Which colors will you use for your fashion item? (אילו צבעים תשתמשו?)
                    </label>
                    <textarea
                      value={responses.selectedColors || ""}
                      onChange={(e) => updateResponse("selectedColors", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "80px",
                        resize: "vertical",
                      }}
                      placeholder="Describe your color choices and why..."
                    />
                  </div>

                  <button
                    onClick={handleSaveAndContinue}
                    disabled={isLocked}
                    style={{
                      width: "100%",
                      backgroundColor: isLocked ? "#D1D5DB" : "#D8B4FE",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>

              <div>
                <img src={IMAGES.designTop} alt="Design" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
                <img src={IMAGES.designBottom} alt="Design" style={{ width: "100%", borderRadius: "0.5rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tab 4: Creating a Logo with Canvas
  if (currentTab === 4) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                  Creating a Logo (יצירת לוגו)
                </h1>
                <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                  Design a simple, memorable logo for your message.
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 4 first!</p>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <div style={{ marginBottom: "2rem", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "0.375rem", borderLeft: "4px solid #333333" }}>
                    <p style={{ fontSize: "0.95rem", color: "#333333", lineHeight: "1.6" }}>
                      <strong>Instructions (הוראות):</strong>
                      <br />• Include the population name in the logo
                      <br />• Use BLACK color (#000000)
                      <br />• Use 1 Gestalt principle in your design
                      <br />• Keep it simple and memorable
                    </p>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Population Name in Logo (שם האוכלוסייה בלוגו)
                    </label>
                    <input
                      type="text"
                      value={responses.logoPopulation || responses.chosenPopulation || ""}
                      onChange={(e) => updateResponse("logoPopulation", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        marginBottom: "1rem",
                      }}
                      placeholder="Enter population name..."
                    />
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Which Gestalt Principle did you use? (איזה עקרון גשטלט השתמשת?)
                    </label>
                    <select
                      value={responses.logoGestalt || ""}
                      onChange={(e) => updateResponse("logoGestalt", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        marginBottom: "1rem",
                      }}
                    >
                      <option value="">Select a principle...</option>
                      {GESTALT_PRINCIPLES.map((p) => (
                        <option key={p.name} value={p.name}>{p.name} ({p.nameHe})</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Draw Your Logo on Canvas (צייר את הלוגו שלך)
                    </label>
                    <div style={{ border: "2px solid #D1D5DB", borderRadius: "0.375rem", overflow: "hidden", marginBottom: "1rem" }}>
                      <CanvasDraw
                        ref={canvasRef}
                        canvasWidth={500}
                        canvasHeight={300}
                        brushColor="#000000"
                        brushRadius={3}
                        lazyRadius={0}
                        hideGrid
                        disabled={isLocked}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                      <button
                        onClick={handleCanvasExport}
                        disabled={isLocked}
                        style={{
                          flex: 1,
                          backgroundColor: isLocked ? "#D1D5DB" : "#333333",
                          color: "white",
                          padding: "0.5rem",
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                          border: "none",
                          borderRadius: "0.375rem",
                          cursor: isLocked ? "not-allowed" : "pointer",
                        }}
                      >
                        Save Canvas Drawing
                      </button>
                      <button
                        onClick={() => canvasRef.current?.clearCanvas()}
                        disabled={isLocked}
                        style={{
                          flex: 1,
                          backgroundColor: "#D1D5DB",
                          color: "#333333",
                          padding: "0.5rem",
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                          border: "none",
                          borderRadius: "0.375rem",
                          cursor: isLocked ? "not-allowed" : "pointer",
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Or Upload Your Logo File (או העלה קובץ לוגו)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isLocked}
                      style={{ display: "none" }}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        backgroundColor: isLocked ? "#D1D5DB" : "#93C5FD",
                        color: "#333333",
                        padding: "0.75rem",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        border: "2px dashed #93C5FD",
                        borderRadius: "0.5rem",
                        cursor: isLocked ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Upload size={20} />
                      Upload Logo File
                    </button>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Describe your logo (תאר את הלוגו שלך)
                    </label>
                    <textarea
                      value={responses.logoDescription || ""}
                      onChange={(e) => updateResponse("logoDescription", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "80px",
                        resize: "vertical",
                      }}
                      placeholder="Describe your logo design, colors, and symbols..."
                    />
                  </div>

                  <button
                    onClick={handleSaveAndContinue}
                    disabled={isLocked}
                    style={{
                      width: "100%",
                      backgroundColor: isLocked ? "#D1D5DB" : "#93C5FD",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>

              <div>
                <img src={IMAGES.logoTop} alt="Logo" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
                <img src={IMAGES.logoBottom} alt="Logo" style={{ width: "100%", borderRadius: "0.5rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tab 5: Vector Art - Silhouette
  if (currentTab === 5) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                  וקטור אמנות - צל (Vector Art - Silhouette)
                </h1>
                <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                  עכשיו תעצבו וקטור של צל המייצג את האוכלוסייה שלכם. הצל צריך להיות פשוט, ברור, וקל להכרה. (Now design a silhouette vector that represents your population. The silhouette should be simple, clear, and easy to recognize.)
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 5 first!</p>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    הוראות (Instructions)
                  </h2>
                  <div style={{ backgroundColor: "#F9FAFB", padding: "1.5rem", borderRadius: "0.5rem", marginBottom: "2rem", border: "1px solid #E5E7EB" }}>
                    <ul style={{ color: "#555555", lineHeight: "1.8", margin: 0, paddingLeft: "1.5rem" }}>
                      <li style={{ marginBottom: "0.75rem" }}>צייר צל של אדם, חפץ, או סמל המייצג את האוכלוסייה שלך (Draw a silhouette of a person, object, or symbol that represents your population)</li>
                      <li style={{ marginBottom: "0.75rem" }}>השתמש בצבע שחור או בצל אחיד (Use black color or a solid shadow)</li>
                      <li style={{ marginBottom: "0.75rem" }}>הצל צריך להיות קל להכרה וללא פרטים מיותרים (The silhouette should be recognizable and without unnecessary details)</li>
                      <li style={{ marginBottom: "0.75rem" }}>אתה יכול להשתמש בכלי הציור או להעלות קובץ (You can use the drawing tool or upload a file)</li>
                      <li>וודא שהצל מייצג את ההודעה החברתית שלך (Make sure the silhouette represents your social message)</li>
                    </ul>
                  </div>

                  <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    צייר את הצל שלך (Draw Your Silhouette)
                  </h3>
                  <div style={{ marginBottom: "2rem", border: "2px solid #D1D5DB", borderRadius: "0.5rem", overflow: "hidden" }}>
                    <CanvasDraw
                      ref={(canvasRef) => { if (canvasRef) (window as any).vectorCanvas = canvasRef; }}
                      canvasWidth={600}
                      canvasHeight={400}
                      brushColor="#000000"
                      brushRadius={3}
                      lazyRadius={0}
                      hideGrid
                      disabled={isLocked}
                    />
                  </div>

                  <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
                    <button
                      onClick={() => {
                        if ((window as any).vectorCanvas) (window as any).vectorCanvas.clear();
                        toast.success("Canvas cleared!");
                      }}
                      disabled={isLocked}
                      style={{
                        flex: 1,
                        backgroundColor: isLocked ? "#D1D5DB" : "#FCA5A5",
                        color: "#333333",
                        padding: "0.75rem",
                        fontSize: "0.95rem",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: isLocked ? "not-allowed" : "pointer",
                      }}
                    >
                      Clear Canvas (נקה קנבס)
                    </button>
                    <button
                      onClick={() => {
                        if ((window as any).vectorCanvas) {
                          const image = (window as any).vectorCanvas.canvasRef.current.toDataURL();
                          updateResponse("vectorDrawing", image);
                          toast.success("Silhouette saved!");
                        }
                      }}
                      disabled={isLocked}
                      style={{
                        flex: 1,
                        backgroundColor: isLocked ? "#D1D5DB" : "#86EFAC",
                        color: "#333333",
                        padding: "0.75rem",
                        fontSize: "0.95rem",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: isLocked ? "not-allowed" : "pointer",
                      }}
                    >
                      Save Drawing (שמור ציור)
                    </button>
                  </div>

                  <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    או העלה קובץ (Or Upload a File)
                  </h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleVectorUpload}
                    disabled={isLocked}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px dashed #D1D5DB",
                      borderRadius: "0.5rem",
                      cursor: isLocked ? "not-allowed" : "pointer",
                      marginBottom: "1.5rem",
                    }}
                  />

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      תיאור הצל שלך (Describe Your Silhouette)
                    </label>
                    <textarea
                      value={responses.vectorDescription || ""}
                      onChange={(e) => updateResponse("vectorDescription", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "100px",
                        resize: "vertical",
                      }}
                      placeholder="Explain what your silhouette represents and why you chose this design..."
                    />
                  </div>

                  <button
                    onClick={handleSaveAndContinue}
                    disabled={isLocked}
                    style={{
                      width: "100%",
                      backgroundColor: isLocked ? "#D1D5DB" : "#86EFAC",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>

              <div>
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-vector-top-9KJh7mPqZvR2LkDxN8Qp4m.webp" alt="Vector" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-vector-bottom-2Lk9QmRxP5S3NvWyJ6Tz8h.webp" alt="Vector" style={{ width: "100%", borderRadius: "0.5rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tab 6: Fashion Item (Simplified)
  if (currentTab === 6) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                  Fashion Item (פריט אופנה)
                </h1>
                <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                  Describe the fashion item that will send your message.
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 5 first!</p>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      What is the item? (Shirt/Hat/Bag/Other) (מה הפריט?)
                    </label>
                    <select
                      value={responses.itemType || ""}
                      onChange={(e) => updateResponse("itemType", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        marginBottom: "1rem",
                      }}
                    >
                      <option value="">Select an item...</option>
                      <option value="shirt">T-Shirt / חולצה</option>
                      <option value="hat">Hat / כובע</option>
                      <option value="bag">Bag / תיק</option>
                      <option value="other">Other / אחר</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Describe the item (תאר את הפריט)
                    </label>
                    <textarea
                      value={responses.itemDescription || ""}
                      onChange={(e) => updateResponse("itemDescription", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "100px",
                        resize: "vertical",
                      }}
                      placeholder="Describe colors, design, text, symbols..."
                    />
                  </div>

                  <button
                    onClick={handleSaveAndContinue}
                    disabled={isLocked}
                    style={{
                      width: "100%",
                      backgroundColor: isLocked ? "#D1D5DB" : "#86EFAC",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>

              <div>
                <img src={IMAGES.fashionTop} alt="Fashion" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
                <img src={IMAGES.fashionBottom} alt="Fashion" style={{ width: "100%", borderRadius: "0.5rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tab 6: Presentation (Translated to Hebrew)
  if (currentTab === 6) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                  Presentation (מצגת)
                </h1>
                <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                  רשימת בדיקה סופית לפני ההצגה שלכם.
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>כרטיסייה זו נעולה. קבלו אישור מהמורה לכרטיסייה 6 תחילה!</p>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                      רשימת בדיקה (Presentation Checklist)
                    </h3>
                    {[
                      "זיהינו אוכלוסייה שסובלת (We identified a population that is suffering)",
                      "חקרנו את הבעיות והצרכים שלהם (We researched their problems and needs)",
                      "בחרנו בצבעים משמעותיים להודעה שלנו (We chose meaningful colors for our message)",
                      "עיצבנו לוגו פשוט וזכור (We designed a simple, memorable logo)",
                      "יצרנו פריט אופנה השולח את ההודעה שלנו (We created a fashion item that sends our message)",
                      "אנחנו יכולים להסביר כיצד הפריט שלנו עוזר ליצור שינוי (We can explain how our item helps create change)",
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: "1rem", padding: "0.75rem", backgroundColor: "#F9FAFB", borderRadius: "0.375rem" }}>
                        <input
                          type="checkbox"
                          checked={responses[`check_${idx}`] || false}
                          onChange={(e) => updateResponse(`check_${idx}`, e.target.checked)}
                          disabled={isLocked}
                          style={{ marginRight: "1rem", width: "20px", height: "20px", cursor: "pointer" }}
                        />
                        <label style={{ color: "#333333", cursor: "pointer", flex: 1, fontSize: "0.95rem" }}>
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      הערות נוספות? (Any additional notes?)
                    </label>
                    <textarea
                      value={responses.presentationNotes || ""}
                      onChange={(e) => updateResponse("presentationNotes", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "80px",
                        resize: "vertical",
                      }}
                      placeholder="הוסף מידע נוסף..."
                    />
                  </div>

                  <button
                    onClick={handleSaveAndContinue}
                    disabled={isLocked}
                    style={{
                      width: "100%",
                      backgroundColor: isLocked ? "#D1D5DB" : "#94A3B8",
                      color: "white",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                  >
                    השלם פרויקט (Complete Project)
                  </button>
                </div>
              </div>

              <div>
                <img src={IMAGES.presentationTop} alt="Presentation" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
                <img src={IMAGES.presentationBottom} alt="Presentation" style={{ width: "100%", borderRadius: "0.5rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tab 7: Reflection
  if (currentTab === 7) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                Reflection (רפלקציה)
              </h1>
              <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                חשבו על הפרויקט שלכם והשפעתו. (Reflect on your project and its impact.)
              </p>

              {isLocked && (
                <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                  <Lock size={24} style={{ color: "#D97706" }} />
                  <p style={{ fontWeight: "bold", color: "#92400E" }}>כרטיסייה זו נעולה. קבלו אישור מהמורה לכרטיסייה 7 תחילה!</p>
                </div>
              )}

              <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    שאלות רפלקציה (Reflection Questions)
                  </h3>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      1. מה למדתם על האוכלוסייה שבחרתם? (What did you learn about the population you chose?)
                    </label>
                    <textarea
                      value={responses.reflection1 || ""}
                      onChange={(e) => updateResponse("reflection1", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "80px",
                        resize: "vertical",
                      }}
                      placeholder="כתוב את התשובה שלך..."
                    />
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      2. כיצד יכול הפריט האופנה שלכם לעזור ליצור שינוי? (How can your fashion item help create change?)
                    </label>
                    <textarea
                      value={responses.reflection2 || ""}
                      onChange={(e) => updateResponse("reflection2", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "80px",
                        resize: "vertical",
                      }}
                      placeholder="כתוב את התשובה שלך..."
                    />
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      3. מה היה הקשה ביותר בפרויקט הזה? (What was the most challenging part of this project?)
                    </label>
                    <textarea
                      value={responses.reflection3 || ""}
                      onChange={(e) => updateResponse("reflection3", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "80px",
                        resize: "vertical",
                      }}
                      placeholder="כתוב את התשובה שלך..."
                    />
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      4. מה היה הטוב ביותר בעבודה בקבוצה? (What was the best part of working in a group?)
                    </label>
                    <textarea
                      value={responses.reflection4 || ""}
                      onChange={(e) => updateResponse("reflection4", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "80px",
                        resize: "vertical",
                      }}
                      placeholder="כתוב את התשובה שלך..."
                    />
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      5. הרפלקציה הכללית שלך על הפרויקט (Your overall reflection on the project)
                    </label>
                    <textarea
                      value={responses.reflection || ""}
                      onChange={(e) => {
                        updateResponse("reflection", e.target.value);
                        setValidationErrors([]);
                      }}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: validationErrors.length > 0 ? "2px solid #DC2626" : "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "120px",
                        resize: "vertical",
                      }}
                      placeholder="כתוב רפלקציה משמעותית על הפרויקט שלך..."
                    />
                    {validationErrors.length > 0 && (
                      <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "0.375rem", padding: "0.75rem", marginTop: "0.75rem" }}>
                        {validationErrors.map((error, idx) => (
                          <div key={idx} style={{ display: "flex", gap: "0.5rem", color: "#DC2626", fontSize: "0.875rem" }}>
                            <AlertCircle size={16} style={{ flexShrink: 0 }} />
                            <span>{error}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSaveAndContinue}
                  disabled={isLocked}
                  style={{
                    width: "100%",
                    backgroundColor: isLocked ? "#D1D5DB" : "#C7D2FE",
                    color: "#333333",
                    padding: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: isLocked ? "not-allowed" : "pointer",
                  }}
                >
                  השלם את הפרויקט (Complete Project)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
