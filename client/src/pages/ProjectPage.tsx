import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { Lock } from "lucide-react";

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
  { name: "Yellow", hex: "#FDE68A" },
  { name: "Orange", hex: "#FDBA74" },
  { name: "Red", hex: "#FCA5A5" },
  { name: "Purple", hex: "#D8B4FE" },
  { name: "Blue", hex: "#93C5FD" },
  { name: "Green", hex: "#86EFAC" },
  { name: "Grey", hex: "#94A3B8" },
];

export default function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [approvals, setApprovals] = useState([true, false, false, false, false, false, false]);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [studentNames, setStudentNames] = useState(["Student 1", "Student 2", "Student 3"]);

  const canAccessTab = (tabIndex: number): boolean => {
    return tabIndex === 0 || approvals[tabIndex - 1];
  };

  const handleSaveAndContinue = () => {
    if (!canAccessTab(currentTab)) {
      toast.error("This tab is locked. Get teacher approval for the previous tab first!");
      return;
    }
    
    // Mark current tab as approved and move to next
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

  // Tab 0: Home
  if (currentTab === 0) {
    return (
      <div style={{ backgroundColor: "#b79d8a", minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#333333", marginBottom: "1.5rem" }}>
              HOW CAN FASHION CREATE SOCIAL CHANGE?
            </h1>
            <p style={{ fontSize: "1.25rem", color: "#555555", marginBottom: "2rem" }}>
              Fashion can change the world! (אופנה יכולה לשנות את העולם!)
            </p>
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <p style={{ fontSize: "1rem", color: "#555555", lineHeight: "1.6" }}>
                In this project, you will work in groups to design a fashion item that sends a message for social change.
              </p>
              <p style={{ fontSize: "1rem", color: "#555555", lineHeight: "1.6", marginTop: "1rem" }}>
                בפרויקט זה, תעבדו בקבוצות כדי לעצב פריט אופנה השולח הודעה לשינוי חברתי.
              </p>
            </div>
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
        </div>
      </div>
    );
  }

  // Tab 1: Group Decision
  if (currentTab === 1) {
    return (
      <div style={{ backgroundColor: "#FDBA74", minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
              Group Decision (החלטה קבוצתית)
            </h1>
            <p style={{ color: "#555555", marginBottom: "2rem" }}>
              Work in groups of 2-3. Choose a population to help.
            </p>

            {!canAccessTab(1) && (
              <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                <Lock size={24} style={{ color: "#D97706" }} />
                <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 1 first!</p>
              </div>
            )}

            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
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
                      disabled={!canAccessTab(1)}
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
                                disabled={!canAccessTab(1)}
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
                  disabled={!canAccessTab(1)}
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
                  onChange={(e) => updateResponse("whyChosen", e.target.value)}
                  disabled={!canAccessTab(1)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.375rem",
                    fontFamily: "'Alef', 'Assistant', sans-serif",
                    minHeight: "100px",
                    resize: "vertical",
                  }}
                  placeholder="Explain your choice..."
                />
                <p style={{ fontSize: "0.75rem", color: "#DC2626", marginTop: "0.5rem" }}>
                  💡 CAPITAL LETTER at the start! (אות גדולה בהתחלה!) Punctuation at the end! (סימן פיסוק בסוף!)
                </p>
              </div>

              <button
                onClick={handleSaveAndContinue}
                disabled={!canAccessTab(1)}
                style={{
                  width: "100%",
                  backgroundColor: canAccessTab(1) ? "#FDBA74" : "#D1D5DB",
                  color: "#333333",
                  padding: "0.75rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: canAccessTab(1) ? "pointer" : "not-allowed",
                }}
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tab 2-7: Placeholder for other tabs
  const tabColors = ["#FCA5A5", "#D8B4FE", "#93C5FD", "#86EFAC", "#94A3B8"];
  
  return (
    <div style={{ backgroundColor: tabColors[currentTab - 2] || "#b79d8a", minHeight: "100vh" }}>
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
      
      <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "2rem" }}>
            {TABS[currentTab].label} ({TABS[currentTab].labelHe})
          </h1>

          {!canAccessTab(currentTab) && (
            <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
              <Lock size={24} style={{ color: "#D97706" }} />
              <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for the previous tab first!</p>
            </div>
          )}

          <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", textAlign: "center" }}>
            <p style={{ color: "#555555", marginBottom: "2rem" }}>Tab {currentTab + 1} content coming soon...</p>
            <button
              onClick={handleSaveAndContinue}
              disabled={!canAccessTab(currentTab)}
              style={{
                backgroundColor: canAccessTab(currentTab) ? "#333333" : "#D1D5DB",
                color: "white",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "0.5rem",
                cursor: canAccessTab(currentTab) ? "pointer" : "not-allowed",
              }}
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
