import React, { useState } from "react";
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
    principle: "Proximity (קרבה)",
    desc: "Which principle is used here? (איזה עקרון משמש כאן?)"
  },
  { 
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/gestalt-logo-closure-aW3zXAaeXzpACXWKz7RPdd.webp",
    principle: "Closure (סגירה)",
    desc: "Which principle is used here? (איזה עקרון משמש כאן?)"
  },
  { 
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/gestalt-logo-continuity-Jx5zKmRyP8sL2NvWqTyUhh.webp",
    principle: "Continuity (רציפות)",
    desc: "Which principle is used here? (איזה עקרון משמש כאן?)"
  }
];

// Color meanings
const COLOR_MEANINGS = [
  { color: "#FDE68A", name: "Yellow", nameHe: "צהוב", meaning: "Optimistic", meaningHe: "אופטימי" },
  { color: "#FDBA74", name: "Orange", nameHe: "כתום", meaning: "Friendly", meaningHe: "חברותי" },
  { color: "#FCA5A5", name: "Red", nameHe: "אדום", meaning: "Excitement", meaningHe: "התרגשות" },
  { color: "#D8B4FE", name: "Purple", nameHe: "סגול", meaning: "Creative", meaningHe: "יצירתי" },
  { color: "#93C5FD", name: "Blue", nameHe: "כחול", meaning: "Trust", meaningHe: "אמון" },
  { color: "#86EFAC", name: "Green", nameHe: "ירוק", meaning: "Peace/Growth", meaningHe: "שלום/צמיחה" },
  { color: "#94A3B8", name: "Grey", nameHe: "אפור", meaning: "Balance", meaningHe: "איזון" },
];

export default function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [approvals, setApprovals] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showGrammarTips, setShowGrammarTips] = useState(false);
  const [showSpellCheck, setShowSpellCheck] = useState(false);

  const updateResponse = (key: string, value: any) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  // Simple spell check function
  const checkSpelling = (text: string): { errors: string[], suggestions: Record<string, string[]> } => {
    const commonMisspellings: Record<string, string[]> = {
      "teh": ["the"],
      "recieve": ["receive"],
      "occured": ["occurred"],
      "seperate": ["separate"],
      "definately": ["definitely"],
    };

    const errors: string[] = [];
    const suggestions: Record<string, string[]> = {};
    const words = text.toLowerCase().split(/\s+/);

    words.forEach((word) => {
      const cleaned = word.replace(/[.,!?;:]/g, "");
      if (commonMisspellings[cleaned]) {
        errors.push(cleaned);
        suggestions[cleaned] = commonMisspellings[cleaned];
      }
    });

    return { errors, suggestions };
  };

  // Validate text requirements
  const validateText = (text: string, minSentences: number = 2): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Check sentence count
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    if (sentences.length < minSentences) {
      errors.push(`At least ${minSentences} sentences required (כמה משפטים נדרשים: ${minSentences})`);
    }

    // Check capital letter at start
    if (text.length > 0 && !/^[A-Z\u05D0-\u05EA]/.test(text)) {
      errors.push("Must start with a capital letter (חייב להתחיל באות גדולה)");
    }

    // Check punctuation at end
    if (text.length > 0 && !/[.!?]$/.test(text.trim())) {
      errors.push("Must end with punctuation (חייב להסתיים בסימן פיסוק)");
    }

    return { valid: errors.length === 0, errors };
  };

  // Validate research tab
  const validateResearch = (): boolean => {
    const errors: string[] = [];

    // Q1: Who are they? (2 sentences + statistics)
    const q1 = responses.researchQ1 || "";
    const q1Validation = validateText(q1, 2);
    if (!q1Validation.valid) {
      errors.push("Q1 - Who are they? " + q1Validation.errors.join(", "));
    }
    if (!q1.includes("http") && !q1.includes("statistic") && !q1.includes("data")) {
      errors.push("Q1 must include statistics from a reliable source (צריך סטטיסטיקה)");
    }

    // Q2: Why special? (2 sentences)
    const q2 = responses.researchQ2 || "";
    const q2Validation = validateText(q2, 2);
    if (!q2Validation.valid) {
      errors.push("Q2 - Why special? " + q2Validation.errors.join(", "));
    }

    // Q3: What's the problem? (3 sentences + statistics)
    const q3 = responses.researchQ3 || "";
    const q3Validation = validateText(q3, 3);
    if (!q3Validation.valid) {
      errors.push("Q3 - Problem? " + q3Validation.errors.join(", "));
    }
    if (!q3.includes("http") && !q3.includes("statistic") && !q3.includes("data")) {
      errors.push("Q3 must include statistics from a reliable source (צריך סטטיסטיקה)");
    }

    // Q4: What needs to change? (2 sentences)
    const q4 = responses.researchQ4 || "";
    const q4Validation = validateText(q4, 2);
    if (!q4Validation.valid) {
      errors.push("Q4 - Change? " + q4Validation.errors.join(", "));
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      errors.forEach((err) => toast.error(err));
      return false;
    }

    return true;
  };

  const handleSaveAndContinue = () => {
    if (!canAccessTab(currentTab)) {
      toast.error("This tab is locked. Get teacher approval for the previous tab first!");
      return;
    }

    // Tab-specific validation
    if (currentTab === 2) {
      // Research tab
      if (!validateResearch()) {
        return;
      }
    } else if (currentTab === 3) {
      // Design Inquiry tab
      const colorExercises = responses.colorExerciseAnswers || [];
      if (colorExercises.length === 0) {
        toast.error("Please complete all design exercises!");
        return;
      }
    } else if (currentTab === 4) {
      // Logo Design tab
      const logoDesc = responses.logoDescription || "";
      if (logoDesc.trim().length < 20) {
        toast.error("Please provide a detailed logo description!");
        return;
      }
      if (!responses.selectedGestaltPrinciples || responses.selectedGestaltPrinciples.length === 0) {
        toast.error("Please select at least one Gestalt principle!");
        return;
      }
    }

    setValidationErrors([]);

    if (currentTab < TABS.length - 1) {
      setCurrentTab(currentTab + 1);
      toast.success("Moving to next tab!");
    } else {
      toast.success("Project completed!");
    }
  };

  const canAccessTab = (tabIndex: number): boolean => {
    return tabIndex === 0 || approvals[tabIndex - 1];
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
              Start Your Journey (התחל את הדרך שלך)
            </button>
          </div>
          <div>
            <img src={IMAGES.groupTop} alt="Home" style={{ width: "100%", borderRadius: "0.5rem" }} />
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
                  Research your population using reliable sources and statistics. (חקור את האוכלוסייה שלך באמצעות מקורות אמינים וסטטיסטיקה.)
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
                    backgroundColor: "#E5E7EB",
                    color: "#333333",
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <HelpCircle size={16} />
                  Grammar Tips (טיפים דקדוקיים)
                </button>

                {showGrammarTips && (
                  <div style={{ backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1.5rem", border: "1px solid #D1D5DB" }}>
                    <p style={{ color: "#333333", fontWeight: "bold", marginBottom: "0.5rem" }}>Writing Requirements (דרישות כתיבה):</p>
                    <ul style={{ color: "#555555", lineHeight: "1.8", margin: 0, paddingLeft: "1.5rem" }}>
                      <li>Use CAPITAL LETTERS at the start (אותיות גדולות בהתחלה)</li>
                      <li>Use PUNCTUATION at the end (סימן פיסוק בסוף)</li>
                      <li>Use simple past and present tense (עבר פשוט והווה פשוט)</li>
                      <li>Include statistics from reliable sources (כללול סטטיסטיקה ממקורות אמינים)</li>
                    </ul>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  {/* Q1 */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      1. Who are they? (מי הם?) - 2 sentences + Statistics (סטטיסטיקה)
                    </label>
                    <textarea
                      value={responses.researchQ1 || ""}
                      onChange={(e) => updateResponse("researchQ1", e.target.value)}
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
                      placeholder="Describe who this population is... (תאר מי היא האוכלוסייה הזו...)"
                    />
                  </div>

                  {/* Q2 */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      2. Why are they special? (למה הם מיוחדים?) - 2 sentences (משפטים)
                    </label>
                    <textarea
                      value={responses.researchQ2 || ""}
                      onChange={(e) => updateResponse("researchQ2", e.target.value)}
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
                      placeholder="Explain what makes them special... (הסבר מה הופך אותם למיוחדים...)"
                    />
                  </div>

                  {/* Q3 */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      3. What is their problem? (מה הבעיה שלהם?) - 3 sentences + Statistics (סטטיסטיקה)
                    </label>
                    <textarea
                      value={responses.researchQ3 || ""}
                      onChange={(e) => updateResponse("researchQ3", e.target.value)}
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
                      placeholder="Describe their problem... (תאר את הבעיה שלהם...)"
                    />
                  </div>

                  {/* Q4 */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      4. What needs to change? (מה צריך להשתנות?) - 2 sentences (משפטים)
                    </label>
                    <textarea
                      value={responses.researchQ4 || ""}
                      onChange={(e) => updateResponse("researchQ4", e.target.value)}
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
                      placeholder="Explain what should change... (הסבר מה צריך להשתנות...)"
                    />
                  </div>

                  {validationErrors.length > 0 && (
                    <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem" }}>
                      <p style={{ color: "#DC2626", fontWeight: "bold", marginBottom: "0.5rem" }}>Please fix these errors (תקן את השגיאות):</p>
                      <ul style={{ color: "#991B1B", margin: 0, paddingLeft: "1.5rem" }}>
                        {validationErrors.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

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
                    Save & Continue (שמור והמשך)
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

  // Tab 3: Design Inquiry
  if (currentTab === 3) {
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
              Design Inquiry (חוקי עיצוב)
            </h1>
            <p style={{ color: "#555555", marginBottom: "2rem" }}>
              Learn how colors and design principles communicate messages. (למד כיצד צבעים ועקרונות עיצוב מתקשרים הודעות.)
            </p>

            {isLocked && (
              <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                <Lock size={24} style={{ color: "#D97706" }} />
                <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 3 first!</p>
              </div>
            )}

            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                Color Meanings (משמעויות צבעים)
              </h2>
              <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                Each color has a psychological meaning that affects how people perceive your message. (לכל צבע יש משמעות פסיכולוגית המשפיעה על אופן תפיסת ההודעה שלך.)
              </p>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                {COLOR_MEANINGS.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: item.color, padding: "1rem", borderRadius: "0.5rem", textAlign: "center" }}>
                    <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.25rem" }}>
                      {item.name} ({item.nameHe})
                    </p>
                    <p style={{ color: "#555555", fontSize: "0.875rem" }}>
                      {item.meaning} ({item.meaningHe})
                    </p>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                Gestalt Principles (עקרונות גשטלט)
              </h2>
              <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                Gestalt principles explain how people perceive visual elements. (עקרונות גשטלט מסבירים כיצד אנשים תופסים אלמנטים ויזואליים.)
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                {GESTALT_LOGOS.map((logo, idx) => (
                  <div key={idx} style={{ backgroundColor: "#F9FAFB", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #E5E7EB" }}>
                    <img src={logo.url} alt={logo.principle} style={{ width: "100%", borderRadius: "0.375rem", marginBottom: "1rem", height: "150px", objectFit: "cover" }} />
                    <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                      {logo.principle}
                    </p>
                    <p style={{ color: "#555555", fontSize: "0.875rem" }}>
                      {logo.desc}
                    </p>
                  </div>
                ))}
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
                Save & Continue (שמור והמשך)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tab 4: Creating a Logo
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
                  Design a logo that represents your population and sends your message. (עצב לוגו המייצג את האוכלוסייה שלך ושולח את ההודעה שלך.)
                </p>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 4 first!</p>
                  </div>
                )}

                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    Instructions (הוראות)
                  </h2>
                  <div style={{ backgroundColor: "#F9FAFB", padding: "1.5rem", borderRadius: "0.5rem", marginBottom: "2rem", border: "1px solid #E5E7EB" }}>
                    <ul style={{ color: "#555555", lineHeight: "1.8", margin: 0, paddingLeft: "1.5rem" }}>
                      <li>Keep it simple. (שמור על פשטות.)</li>
                      <li>Use 2 colors. (השתמש ב-2 צבעים.)</li>
                      <li>Use 1 symbol. (השתמש בסמל אחד.)</li>
                      <li>Include the population name. (כלול את שם האוכלוסייה.)</li>
                      <li>Use black as one color. (השתמש בשחור כצבע אחד.)</li>
                    </ul>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Think of 3 symbols that represent your group (חשוב על 3 סמלים המייצגים את הקבוצה שלך)
                    </label>
                    <p style={{ color: "#666666", fontSize: "0.875rem", marginBottom: "1rem" }}>
                      For example - Jews: the Star of David, a lion, the shape of Israel (לדוגמה - יהודים: מגן דוד, אריה, צורת ישראל)
                    </p>
                    <textarea
                      value={responses.logoSymbols || ""}
                      onChange={(e) => updateResponse("logoSymbols", e.target.value)}
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
                      placeholder="List your 3 symbols... (רשום את 3 הסמלים שלך...)"
                    />
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Population Name (שם האוכלוסייה)
                    </label>
                    <input
                      type="text"
                      value={responses.populationName || ""}
                      onChange={(e) => updateResponse("populationName", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                      }}
                      placeholder="Enter population name... (הזן שם אוכלוסייה...)"
                    />
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      If you could switch a letter in the name of your group for one of the symbols, which letter would you choose? (אם היית יכול להחליף אות בשם הקבוצה שלך בסמל אחד, איזו אות היית בוחר?)
                    </label>
                    <input
                      type="text"
                      value={responses.letterSwitch || ""}
                      onChange={(e) => updateResponse("letterSwitch", e.target.value)}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                      }}
                      placeholder="Describe your choice... (תאר את הבחירה שלך...)"
                    />
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Select Gestalt Principles (בחר עקרונות גשטלט)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
                      {["Proximity", "Closure", "Continuity"].map((principle) => (
                        <label key={principle} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={responses.selectedGestaltPrinciples?.includes(principle) || false}
                            onChange={(e) => {
                              const selected = responses.selectedGestaltPrinciples || [];
                              if (e.target.checked) {
                                updateResponse("selectedGestaltPrinciples", [...selected, principle]);
                              } else {
                                updateResponse("selectedGestaltPrinciples", selected.filter((p: string) => p !== principle));
                              }
                            }}
                            disabled={isLocked}
                            style={{ cursor: "pointer" }}
                          />
                          <span style={{ color: "#333333" }}>{principle}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Logo Description (תיאור הלוגו)
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
                        minHeight: "100px",
                        resize: "vertical",
                      }}
                      placeholder="Describe your logo design... (תאר את עיצוב הלוגו שלך...)"
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
                    Save & Continue (שמור והמשך)
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

  // Placeholder for remaining tabs
  return (
    <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
      <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333" }}>
          {TABS[currentTab].label} ({TABS[currentTab].labelHe})
        </h1>
        <p style={{ color: "#555555", marginBottom: "2rem" }}>Tab {currentTab + 1} - Content coming soon...</p>
        <button
          onClick={handleSaveAndContinue}
          style={{
            backgroundColor: "#333333",
            color: "white",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Save & Continue (שמור והמשך)
        </button>
      </div>
    </div>
  );
}
