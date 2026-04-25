import { useState, useRef } from "react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { Lock, AlertCircle, HelpCircle, Upload } from "lucide-react";
import CanvasDraw from "react-canvas-draw";

const TABS = [
  { label: "Home", labelHe: "בית" },
  { label: "Group Decision", labelHe: "החלטה קבוצתית" },
  { label: "Research", labelHe: "מחקר" },
  { label: "Design Inquiry", labelHe: "חוקי עיצוב" },
  { label: "Creating a Logo", labelHe: "יצירת לוגו" },
  { label: "Fashion Item", labelHe: "פריט אופנה" },
  { label: "Presentation", labelHe: "מצגת" },
];

const COLORS = [
  "#FDE68A", "#FDBA74", "#FCA5A5", "#D8B4FE", "#93C5FD", "#86EFAC", "#94A3B8"
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

// Gestalt principles
const GESTALT_PRINCIPLES = [
  { name: "Proximity", nameHe: "קרבה", desc: "Objects close together are perceived as a group" },
  { name: "Similarity", nameHe: "דמיון", desc: "Objects that look similar are perceived as related" },
  { name: "Continuity", nameHe: "המשכיות", desc: "Elements arranged in a line or curve are perceived as connected" },
  { name: "Closure", nameHe: "סגירה", desc: "The mind fills in missing parts to complete a shape" },
  { name: "Figure-Ground", nameHe: "דמות-רקע", desc: "Objects stand out from their background" },
];

// Validation helper for research questions
const validateResearchAnswer = (text: string, minSentences: number): { valid: boolean; errors: string[] } => {
  const errors = [];
  
  const sentences = text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length < minSentences) {
    errors.push(`לפחות ${minSentences} משפטים נדרשים (At least ${minSentences} sentences required)`);
  }
  
  if (text.length > 0 && !/^[A-Z]/.test(text) && !/^[א-ת]/.test(text)) {
    errors.push("אות גדולה בהתחלה (Capital letter at the start required)");
  }
  
  if (text.length > 0 && !/[.!?]$/.test(text.trim())) {
    errors.push("סימן פיסוק בסוף (Punctuation at the end required)");
  }

  // Check for statistics mention (for "Who are they" question)
  if (minSentences === 2 && text.length > 0 && !/\d+%|\d+\s*(million|billion|thousand|million|מיליון|מליארד|אלף)/i.test(text)) {
    errors.push("Include statistics from a reliable source (כלול סטטיסטיקה ממקור אמין)");
  }
  
  return { valid: errors.length === 0, errors };
};

export default function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [approvals, setApprovals] = useState([true, false, false, false, false, false, false]);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [studentNames, setStudentNames] = useState(["Student 1", "Student 2", "Student 3"]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showGrammarTips, setShowGrammarTips] = useState(false);
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
      const q1Validation = validateResearchAnswer(responses.q1 || "", 2);
      const q2Validation = validateResearchAnswer(responses.q2 || "", 2);
      const q3Validation = validateResearchAnswer(responses.q3 || "", 3);
      const q4Validation = validateResearchAnswer(responses.q4 || "", 2);

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
    } else if (currentTab === 4) {
      // Logo design validation
      const logoDesc = responses.logoDescription || "";
      const populationName = responses.chosenPopulation || responses.logoPopulation || "";
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
      // Fashion item validation
      const itemDesc = responses.itemDescription || "";
      if (itemDesc.trim().length < 20) {
        toast.error("Please describe the fashion item (at least 20 characters)!");
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
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
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
                      <li>✓ Include STATISTICS from reliable sources (סטטיסטיקה ממקור אמין)</li>
                    </ul>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  {[
                    { q: "1. Who are they? (מי הם?) - At least 2 sentences + statistics", key: "q1", minSentences: 2 },
                    { q: "2. Why are they special? (למה הם מיוחדים?) - At least 2 sentences", key: "q2", minSentences: 2 },
                    { q: "3. What is their problem? (מה הבעיה שלהם?) - At least 3 sentences", key: "q3", minSentences: 3 },
                    { q: "4. What needs to change? (מה צריך להשתנות?) - At least 2 sentences", key: "q4", minSentences: 2 },
                  ].map((item, idx) => (
                    <div key={idx} style={{ marginBottom: "1.5rem" }}>
                      <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                        {item.q}
                      </label>
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

  // Tab 3: Design Inquiry (Color Meanings + Gestalt)
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
                  Learn about color meanings and design principles.
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 3 first!</p>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    Color Meaning Chart (תרשים משמעויות צבע)
                  </h2>
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
                    Gestalt Principles (עקרונות גשטלט)
                  </h2>
                  <p style={{ color: "#555555", marginBottom: "1rem", lineHeight: "1.6" }}>
                    Gestalt principles describe how our eyes and brain perceive visual elements. Use these principles to create a strong logo that communicates your message clearly.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
                    {GESTALT_PRINCIPLES.map((principle, idx) => (
                      <div key={idx} style={{ padding: "1rem", backgroundColor: "#F3F4F6", borderRadius: "0.375rem", borderLeft: "4px solid #333333" }}>
                        <h4 style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.25rem" }}>
                          {principle.name} ({principle.nameHe})
                        </h4>
                        <p style={{ fontSize: "0.875rem", color: "#555555" }}>
                          {principle.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Which colors will you use for your fashion item? (אילו צבעים תשתמשו?) *
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

  // Tab 5: Fashion Item
  if (currentTab === 5) {
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

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      How does it help your population? (איך זה עוזר לאוכלוסייה שלך?)
                    </label>
                    <textarea
                      value={responses.itemHelps || ""}
                      onChange={(e) => updateResponse("itemHelps", e.target.value)}
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
                      placeholder="Explain how this item creates change..."
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

  // Tab 6: Presentation
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
                  Final checklist before presenting your project.
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 6 first!</p>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                      Presentation Checklist (רשימת בדיקה)
                    </h3>
                    {[
                      "We identified a population that is suffering",
                      "We researched their problems and needs",
                      "We chose meaningful colors for our message",
                      "We designed a simple, memorable logo",
                      "We created a fashion item that sends our message",
                      "We can explain how our item helps create change",
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: "1rem", padding: "0.75rem", backgroundColor: "#F9FAFB", borderRadius: "0.375rem" }}>
                        <input
                          type="checkbox"
                          checked={responses[`check_${idx}`] || false}
                          onChange={(e) => updateResponse(`check_${idx}`, e.target.checked)}
                          disabled={isLocked}
                          style={{ marginRight: "1rem", width: "20px", height: "20px", cursor: "pointer" }}
                        />
                        <label style={{ color: "#333333", cursor: "pointer", flex: 1 }}>
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Any additional notes? (הערות נוספות?)
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
                      placeholder="Add any additional information..."
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
                    Complete Project
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

  return null;
}
