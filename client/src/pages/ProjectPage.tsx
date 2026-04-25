import { useState } from "react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { Lock, AlertCircle } from "lucide-react";

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

// Validation helper
const validateText = (text: string): { valid: boolean; errors: string[] } => {
  const errors = [];
  
  // Check for at least 2 sentences
  const sentences = text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length < 2) {
    errors.push("לפחות 2 משפטים נדרשים (At least 2 sentences required)");
  }
  
  // Check for capital letter at start
  if (text.length > 0 && !/^[A-Z]/.test(text) && !/^[א-ת]/.test(text)) {
    errors.push("אות גדולה בהתחלה (Capital letter at the start required)");
  }
  
  // Check for punctuation at end
  if (text.length > 0 && !/[.!?]$/.test(text.trim())) {
    errors.push("סימן פיסוק בסוף (Punctuation at the end required)");
  }
  
  return { valid: errors.length === 0, errors };
};

export default function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [approvals, setApprovals] = useState([true, false, false, false, false, false, false]);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [studentNames, setStudentNames] = useState(["Student 1", "Student 2", "Student 3"]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const canAccessTab = (tabIndex: number): boolean => {
    return tabIndex === 0 || approvals[tabIndex - 1];
  };

  const handleSaveAndContinue = () => {
    if (!canAccessTab(currentTab)) {
      toast.error("This tab is locked. Get teacher approval for the previous tab first!");
      return;
    }

    // Validate Tab 1 specifically
    if (currentTab === 1) {
      const whyText = responses.whyChosen || "";
      const validation = validateText(whyText);
      
      if (!validation.valid) {
        setValidationErrors(validation.errors);
        toast.error("Please fix your writing before continuing!");
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
                  {/* Assignment */}
                  <div style={{ marginBottom: "2rem", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "0.375rem", borderLeft: "4px solid #333333" }}>
                    <p style={{ fontSize: "0.95rem", color: "#333333", lineHeight: "1.6" }}>
                      <strong>Assignment (משימה):</strong> Think of a group of people in the world today who are suffering and people are not aware enough of their struggle. 
                      (חשבו על קבוצת אנשים בעולם היום שסובלים ואנשים לא מודעים מספיק למאבקם.)
                    </p>
                  </div>

                  {/* Student Names */}
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

                  {/* Population Comparison Table */}
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

                  {/* Final Questions */}
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

  // Tabs 2-7: Placeholder with images
  const tabImages: Record<number, [string, string]> = {
    2: [IMAGES.researchTop, IMAGES.researchBottom],
    3: [IMAGES.designTop, IMAGES.designBottom],
    4: [IMAGES.logoTop, IMAGES.logoBottom],
    5: [IMAGES.fashionTop, IMAGES.fashionBottom],
    6: [IMAGES.presentationTop, IMAGES.presentationBottom],
  };

  const [topImg, bottomImg] = tabImages[currentTab] || [IMAGES.groupTop, IMAGES.groupBottom];

  return (
    <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
      
      <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "2rem" }}>
              {TABS[currentTab].label} ({TABS[currentTab].labelHe})
            </h1>

            {isLocked && (
              <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                <Lock size={24} style={{ color: "#D97706" }} />
                <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for the previous tab first!</p>
              </div>
            )}

            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#555555", marginBottom: "2rem", fontSize: "1.125rem" }}>Tab {currentTab + 1} content coming soon...</p>
              <button
                onClick={handleSaveAndContinue}
                disabled={isLocked}
                style={{
                  backgroundColor: isLocked ? "#D1D5DB" : "#333333",
                  color: "white",
                  padding: "0.75rem 1.5rem",
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
            <img src={topImg} alt="Tab illustration" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
            <img src={bottomImg} alt="Tab illustration" style={{ width: "100%", borderRadius: "0.5rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
