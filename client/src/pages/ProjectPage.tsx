import React, { useState, useEffect } from "react";
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

// Correct answers for font verification
const FONT_CORRECT_ANSWERS = {
  thornVsSmile: ["cinzel", "fredoka"], // Cinzel for thorns (serious/sharp), Fredoka for smile (fun/rounded)
  toyStore: "fredoka", // Fun, playful
  gamingSpace: "orbitron", // Tech, futuristic
  restaurant: "cinzel", // Elegant, formal
  hospital: "anton", // Strong, trustworthy, bold
};

const IMAGES = {
  groupTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-group-decision-top-bRGmLFS52tVBmxVuPyKH7h.webp",
  groupBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-group-decision-bottom-F2rHCYhXzzEByzunwAExR5.webp",
  researchTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-research-top-U9zUqF3h6rinZQFXkdg7rS.webp",
  researchBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-research-bottom-gpbpDLofEE3mjKPw35JCLm.webp",
  designTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-design-top-ZyUQs8dq3hkDqwwridTV3V.webp",
  designBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-design-bottom-CPMAwyRzP7aWsS3VJ6SNZn.webp",
  logoTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-logo-top-EmYSyt2r67FPonpVgZmurr.webp",
  logoBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-logo-bottom-4YSyt2r67FPonpVgZmurr.webp",
  fashionTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-fashion-top-SvFVz6B2r7aZeBLKXzQofw.webp",
  fashionBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-fashion-bottom-8Uwd7nCJBVcgPfuXkdrfTi.webp",
  presentationTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-presentation-top-SVz84bcgZf829u8G2N2AmY.webp",
  presentationBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-presentation-bottom-eHcm6h6JT4YzGy4JjyLXds.webp",
  thorns: "/manus-storage/thorns_089aaf42.jpg",
  smilingChild: "/manus-storage/smiling-child_3e376a8c.jpg",
};

// PART A: Learning Phase - Classic Gestalt Examples (Show & Tell)
const GESTALT_LEARNING_EXAMPLES = [
  { 
    name: "WWF Panda", 
    nameHe: "פנדה WWF",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/24/WWF_logo.svg",
    principle: "Closure (סגירה)",
    explanation: "The missing lines are completed by our mind to create the whole panda.",
    explanationHe: "הקווים החסרים מושלמים על ידי המוח שלנו כדי ליצור את הפנדה השלמה."
  },
  { 
    name: "FedEx Arrow", 
    nameHe: "חץ FedEx",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/FedEx_Corporation_logo.svg",
    principle: "Figure/Ground (דמות ורקע)",
    explanation: "The white space between 'E' and 'x' creates a hidden arrow.",
    explanationHe: "הרווח הלבן בין האותיות E ל-x יוצר חץ נסתר."
  },
  { 
    name: "Amazon", 
    nameHe: "אמזון",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    principle: "Continuation (המשכיות)",
    explanation: "The yellow arrow leads our eye from A to Z in a smooth movement.",
    explanationHe: "החץ הצהוב מוליך את העין שלנו מ-A ל-Z בתנועה חלקה."
  },
];

// PART B: Practice Quiz - New Logos (Students must guess)
const GESTALT_PRACTICE_QUIZ = [
  {
    name: "Adidas",
    nameHe: "אדידס",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    principle: "Balance/Symmetry",
    principleHe: "איזון/סימטריה",
    explanation: "Three parallel stripes create perfect visual balance and repetition.",
    explanationHe: "שלושה פסים מקבילים יוצרים איזון ויחזור מושלמים."
  },
  {
    name: "Olympics",
    nameHe: "אולימפיאדה",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Olympic_rings_with_white_rims.svg",
    principle: "Unity/Proximity",
    principleHe: "אחדות/קרבה",
    explanation: "The five rings are close and connected, forming one unified symbol.",
    explanationHe: "חמשת הטבעות קרובות ומחוברות, יוצרות סמל אחד מאוחד."
  },
  {
    name: "Beats by Dre",
    nameHe: "Beats by Dre",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Beats_Electronics_logo.svg",
    principle: "Figure/Ground",
    principleHe: "דמות ורקע",
    explanation: "The 'b' inside the circle is also a person wearing headphones - two images in one.",
    explanationHe: "ה-'b' בתוך העיגול הוא גם אדם עם אוזניות - שתי תמונות באחת."
  },
  {
    name: "IBM",
    nameHe: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    principle: "Closure",
    principleHe: "סגירה",
    explanation: "Our mind closes the gaps between the horizontal lines to read the letters.",
    explanationHe: "המוח שלנו סוגר את הפערים בין הקווים האופקיים כדי לקרוא את האותיות."
  },
];



// Color meanings
const COLOR_MEANINGS = [
  { color: "#FDE68A", name: "Yellow", nameHe: "צהוב", meaning: "Optimistic", meaningHe: "אופטימי" },
  { color: "#FDBA74", name: "Orange", nameHe: "כתום", meaning: "Friendly", meaningHe: "חברותי" },
  { color: "#FCA5A5", name: "Red", nameHe: "אדום", meaning: "Excitement", meaningHe: "התרגשות" },
  { color: "#D8B4FE", name: "Purple", nameHe: "סגול", meaning: "Creative", meaningHe: "יצירתי" },
  { color: "#93C5FD", name: "Blue", nameHe: "כחול", meaning: "Trust", meaningHe: "אמון" },
  { color: "#86EFAC", name: "Green", nameHe: "ירוק", meaning: "Peace/Growth", meaningHe: "שלום/צמיחה" },
];

// Font examples for "Yahav Bank"
const FONT_EXAMPLES = [
  { name: "Anton (Strong)", nameHe: "אנטון (חזק)", style: { fontFamily: "'Anton', sans-serif", fontSize: "2.5rem", fontWeight: 400, letterSpacing: "0.05em" } },
  { name: "Fredoka (Fun)", nameHe: "פרדוקה (כיף)", style: { fontFamily: "'Fredoka', sans-serif", fontSize: "2.5rem", fontWeight: 400 } },
  { name: "Cinzel (Serious)", nameHe: "סינזל (רציני)", style: { fontFamily: "'Cinzel', serif", fontSize: "2.5rem", fontWeight: 400, letterSpacing: "0.1em" } },
  { name: "Orbitron (Tech)", nameHe: "אורביטרון (טכנולוגי)", style: { fontFamily: "'Orbitron', sans-serif", fontSize: "2.5rem", fontWeight: 400, letterSpacing: "0.15em" } },
];

// Word categorization for visual associations
const WORDS_TO_CATEGORIZE = [
  { word: "Strong", wordHe: "חזק", category: "Strong" },
  { word: "Fun", wordHe: "כיף", category: "Fun" },
  { word: "Childish", wordHe: "ילדותי", category: "Childish" },
  { word: "Serious", wordHe: "רציני", category: "Serious" },
  { word: "Powerful", wordHe: "חזק", category: "Strong" },
  { word: "Playful", wordHe: "משחקי", category: "Fun" },
  { word: "Professional", wordHe: "מקצועי", category: "Serious" },
  { word: "Youthful", wordHe: "צעיר", category: "Childish" },
];

export default function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [responses, setResponses] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [studentNames, setStudentNames] = useState(["Student 1", "Student 2", "Student 3"]);
  
  // Tab 3 specific states
  const [tab3Responses, setTab3Responses] = useState<Record<string, string>>({
    thornVsSmile: "",
    toyStore: "",
    gamingSpace: "",
    restaurant: "",
    hospital: "",
    gestalt_0: "",
    gestalt_1: "",
    gestalt_2: "",
    gestalt_3: "",
    gestalt_4: "",
  });
  
  // Tab 4 specific states
  const [colorRevealed, setColorRevealed] = useState<Record<number, boolean>>({});
  const [fontRevealed, setFontRevealed] = useState<Record<string, boolean>>({});
  const [gestaltRevealed, setGestaltRevealed] = useState<Record<string, boolean>>({});
  const [selectedWords, setSelectedWords] = useState<Record<string, string>>({});
  const [fontPsychologyRevealed, setFontPsychologyRevealed] = useState(false);

  const tabColor = COLORS[currentTab];

  const canAccessTab = (tabIndex: number) => {
    if (tabIndex === 0) return true;
    return !isLocked;
  };

  const updateResponse = (key: string, value: any) => {
    setResponses({ ...responses, [key]: value });
  };

  const handleSaveAndContinue = () => {
    if (validationErrors.length === 0) {
      toast.success("Responses saved! Moving to next tab...");
      setCurrentTab(currentTab + 1);
    }
  };

  // Tab 3: Design Inquiry - 3 Parts (Color, Font/Shape, Gestalt)
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
                <p style={{ color: "#555555", marginBottom: "1rem" }}>
                  Learn how colors, fonts, and design principles communicate messages. (למדו כיצד צבעים, פונטים ועקרונות עיצוב מעבירים הודעות.)
                </p>
                <div style={{ backgroundColor: "#F0F9FF", border: "2px solid #93C5FD", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", fontSize: "0.9rem", color: "#1E40AF", lineHeight: "1.6" }}>
                  <p style={{ marginBottom: "0.5rem" }}>
                    <strong>What is Gestalt?</strong> Gestalt principles explain how our brain naturally organizes visual elements into groups or a whole, instead of seeing them as separate parts.
                  </p>
                  <p style={{ fontStyle: "italic", fontSize: "0.85rem", direction: "rtl", textAlign: "right" }}>
                    עקרונות הגשטלט מסבירים כיצד המוח שלנו מארגן באופן טבעי אלמנטים חזותיים לקבוצות או ליחידה אחת שלמה, במקום לראות אותם כחלקים נפרדים.
                  </p>
                </div>

                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 2 first! (הטאב הזה נעול. קבל אישור מורה עבור טאב 2 תחילה!)</p>
                  </div>
                )}

                {/* PART A: Color Psychology with Reveal Buttons */}
                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    Part A: Color Psychology (חלק א: פסיכולוגיה של צבע)
                  </h2>
                  <p style={{ color: "#555555", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                    What does each color make you feel? Click "Reveal Professional Meaning" to see what designers think. (איזה רגש מעלה אצלכם כל צבע? לחצו "גלה משמעות מקצועית" כדי לראות מה חושבים מעצבים.)
                  </p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                    {COLOR_MEANINGS.map((color, idx) => (
                      <div key={idx} style={{ padding: "1.5rem", backgroundColor: color.color, borderRadius: "0.5rem", border: "2px solid #333333", textAlign: "center" }}>
                        <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>{color.name} ({color.nameHe})</p>
                        
                        {colorRevealed[idx] ? (
                          <div style={{ backgroundColor: "rgba(255,255,255,0.9)", padding: "0.75rem", borderRadius: "0.375rem", marginTop: "0.75rem" }}>
                            <p style={{ fontWeight: "bold", color: "#333333", fontSize: "0.875rem" }}>{color.meaning}</p>
                            <p style={{ color: "#555555", fontSize: "0.75rem" }}>{color.meaningHe}</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => setColorRevealed({ ...colorRevealed, [idx]: true })}
                            disabled={isLocked}
                            style={{
                              marginTop: "0.75rem",
                              backgroundColor: "rgba(255,255,255,0.8)",
                              color: "#333333",
                              padding: "0.5rem 1rem",
                              borderRadius: "0.375rem",
                              border: "1px solid #333333",
                              fontWeight: "bold",
                              fontSize: "0.75rem",
                              cursor: isLocked ? "not-allowed" : "pointer",
                            }}
                          >
                            Reveal Meaning
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* PART B: Visual Associations with Images and Fonts */}
                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    Part B: Visual Associations (חלק ב: קשרים ויזואליים)
                  </h2>
                  
                  {/* Image Association */}
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                      Image Association (קשור תמונות)
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                      <div>
                        <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>Thorns (קוצים)</p>
                        <img src={IMAGES.thorns} alt="Thorns" style={{ width: "100%", borderRadius: "0.5rem", maxHeight: "200px", objectFit: "cover" }} />
                        <p style={{ color: "#555555", fontSize: "0.875rem", marginTop: "0.5rem" }}>This image feels: Strong, Serious, Dangerous (התמונה הזו מרגישה: חזקה, רצינית, מסוכנת)</p>
                      </div>
                      <div>
                        <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>Smiling Child (ילד חיוך)</p>
                        <img src={IMAGES.smilingChild} alt="Smiling Child" style={{ width: "100%", borderRadius: "0.5rem", maxHeight: "200px", objectFit: "cover" }} />
                        <p style={{ color: "#555555", fontSize: "0.875rem", marginTop: "0.5rem" }}>This image feels: Fun, Childish, Friendly (התמונה הזו מרגישה: כיף, ילדותית, ידידותית)</p>
                      </div>
                    </div>
                    
                    <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem" }}>
                      <p style={{ fontWeight: "bold", color: "#92400E", marginBottom: "0.5rem" }}>Question (שאלה):</p>
                      <p style={{ color: "#92400E", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                        Which of the fonts below reminds you of sharp thorns with pointed edges? Which one reminds you of smooth flow and a rounded smile like the child's? (איזה מהפונטים למטה מזכיר לכם קוצים חדים? איזה מזכיר לכם זרימה חלקה וחיוך עגול כמו של הילד?)
                      </p>
                      <textarea
                        placeholder="Write your answer here... (כתוב את התשובה שלך כאן...)"
                        value={tab3Responses.thornVsSmile}
                        onChange={(e) => setTab3Responses({ ...tab3Responses, thornVsSmile: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "0.375rem",
                          border: "1px solid #92400E",
                          fontFamily: "inherit",
                          fontSize: "0.875rem",
                          minHeight: "80px",
                          resize: "vertical"
                        }}
                      />
                    </div>
                  </div>

                  {/* Font Psychology */}
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                      Font Psychology - "Yahav Bank" (פסיכולוגיה של פונטים)
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                      {FONT_EXAMPLES.map((font, idx) => (
                        <div key={idx} style={{ backgroundColor: "#F9FAFB", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #E5E7EB", textAlign: "center" }}>
                          <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
                            {font.name} ({font.nameHe})
                          </p>
                          <div style={font.style}>Yahav Bank</div>
                        </div>
                      ))}
                    </div>
                    
                    {!fontRevealed.psychology ? (
                      <button
                        onClick={() => setFontRevealed({ ...fontRevealed, psychology: true })}
                        disabled={isLocked}
                        style={{
                          width: "100%",
                          backgroundColor: "#D8B4FE",
                          color: "#333333",
                          padding: "0.75rem 1.5rem",
                          borderRadius: "0.5rem",
                          border: "none",
                          fontWeight: "bold",
                          cursor: isLocked ? "not-allowed" : "pointer",
                          marginBottom: "1rem",
                        }}
                      >
                        Reveal Font Psychology (גלה פסיכולוגיה של פונטים)
                      </button>
                    ) : (
                      <div style={{ backgroundColor: "#F0F9FF", border: "2px solid #93C5FD", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem" }}>
                        <p style={{ fontWeight: "bold", color: "#1E40AF", marginBottom: "0.5rem" }}>Font Psychology (פסיכולוגיה של פונטים):</p>
                        <ul style={{ fontSize: "0.875rem", color: "#333333", marginLeft: "1.5rem", marginBottom: "1rem" }}>
                          <li><strong>Anton (Strong):</strong> Bold, powerful, confidence (בולד, חזק, ביטחון)</li>
                          <li><strong>Fredoka (Fun):</strong> Friendly, playful, approachable (ידידותי, משחקי, נגיש)</li>
                          <li><strong>Cinzel (Serious):</strong> Elegant, formal, professional (אלגנטי, רשמי, מקצועי)</li>
                          <li><strong>Orbitron (Tech):</strong> Modern, futuristic, innovative (מודרני, עתידני, חדשני)</li>
                        </ul>
                        
                        <div style={{ backgroundColor: "#FFFFFF", padding: "1rem", borderRadius: "0.375rem", marginTop: "1rem" }}>
                          <p style={{ fontWeight: "bold", color: "#1E40AF", marginBottom: "1rem", fontSize: "0.95rem" }}>Answer the questions below (בחר את התשובה הנכונה):</p>
                          
                          <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                              Which font would you use for a toy store? (איזה פונט הייתם משתמשים לחנות צעצועים?)
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {["Anton", "Fredoka", "Cinzel", "Orbitron"].map((font) => (
                                <label key={font} style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "0.875rem" }}>
                                  <input
                                    type="radio"
                                    name="toyStore"
                                    value={font}
                                    checked={tab3Responses.toyStore === font}
                                    onChange={(e) => setTab3Responses({ ...tab3Responses, toyStore: e.target.value })}
                                    style={{ marginRight: "0.5rem", cursor: "pointer" }}
                                  />
                                  {font}
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                              Which font would you use for a gaming space? (איזה פונט הייתם משתמשים למרחב גיימיג?)
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {["Anton", "Fredoka", "Cinzel", "Orbitron"].map((font) => (
                                <label key={font} style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "0.875rem" }}>
                                  <input
                                    type="radio"
                                    name="gamingSpace"
                                    value={font}
                                    checked={tab3Responses.gamingSpace === font}
                                    onChange={(e) => setTab3Responses({ ...tab3Responses, gamingSpace: e.target.value })}
                                    style={{ marginRight: "0.5rem", cursor: "pointer" }}
                                  />
                                  {font}
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                              Which font would you use for a restaurant? (איזה פונט הייתם משתמשים למסעדה?)
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {["Anton", "Fredoka", "Cinzel", "Orbitron"].map((font) => (
                                <label key={font} style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "0.875rem" }}>
                                  <input
                                    type="radio"
                                    name="restaurant"
                                    value={font}
                                    checked={tab3Responses.restaurant === font}
                                    onChange={(e) => setTab3Responses({ ...tab3Responses, restaurant: e.target.value })}
                                    style={{ marginRight: "0.5rem", cursor: "pointer" }}
                                  />
                                  {font}
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label style={{ display: "block", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                              Which font would you use for a hospital? (איזה פונט הייתם משתמשים לבית חולים?)
                            </label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {["Anton", "Fredoka", "Cinzel", "Orbitron"].map((font) => (
                                <label key={font} style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "0.875rem" }}>
                                  <input
                                    type="radio"
                                    name="hospital"
                                    value={font}
                                    checked={tab3Responses.hospital === font}
                                    onChange={(e) => setTab3Responses({ ...tab3Responses, hospital: e.target.value })}
                                    style={{ marginRight: "0.5rem", cursor: "pointer" }}
                                  />
                                  {font}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* PART C: Gestalt Gallery with Brand Logos */}
                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
                  {/* PART A: Learning Phase */}
                  <div style={{ marginBottom: "3rem" }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                      Part C - Learning: Gestalt Principles (חלק ג - למידה: עקרונות גשטלט)
                    </h2>
                    <p style={{ color: "#555555", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                      Study these 3 classic examples. The principle and explanation are shown immediately. (למד את 3 הדוגמאות הקלאסיות. העקרון וההסבר מוצגים מיד.)
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                      {GESTALT_LEARNING_EXAMPLES.map((example, idx) => (
                        <div key={idx} style={{ backgroundColor: "#F0FDF4", padding: "1.5rem", borderRadius: "0.5rem", border: "2px solid #86EFAC", textAlign: "center" }}>
                          <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "150px" }}>
                            <img src={example.logo} alt={example.name} style={{ height: "150px", maxWidth: "100%", objectFit: "contain" }} />
                          </div>
                          <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.5rem", fontSize: "0.95rem" }}>{example.name}</p>
                          <p style={{ fontWeight: "bold", color: "#16A34A", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                            {example.principle}
                          </p>
                          <p style={{ color: "#333333", fontSize: "0.85rem", lineHeight: "1.5", marginBottom: "0.5rem" }}>
                            {example.explanation}
                          </p>
                          <p style={{ color: "#555555", fontSize: "0.8rem", lineHeight: "1.5", fontStyle: "italic" }}>
                            {example.explanationHe}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PART B: Practice Quiz */}
                  <div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                      Part C - Practice Quiz: Guess the Principle (חלק ג - תרגול: נחש את העקרון)
                    </h2>
                    <p style={{ color: "#555555", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                      Now it's your turn! These are NEW logos. Try to identify which principle each one uses. Click "Check My Answer" to see if you're right. (עכשיו תורך! אלו לוגוים חדשים. נסה לזהות איזה עקרון כל אחד משתמש. לחץ "בדוק את התשובה שלי" כדי לראות אם צדקת.)
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                      {GESTALT_PRACTICE_QUIZ.map((logo, idx) => {
                        const isRevealed = gestaltRevealed[`quiz_${idx}`] || false;
                        return (
                          <div key={idx} style={{ backgroundColor: "#FEF3C7", padding: "1.5rem", borderRadius: "0.5rem", border: "2px solid #FBBF24", textAlign: "center" }}>
                            {/* Logo Display */}
                            <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "150px" }}>
                              <img src={logo.logo} alt={logo.name} style={{ height: "150px", maxWidth: "100%", objectFit: "contain" }} />
                            </div>
                            <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "1rem", fontSize: "0.95rem" }}>{logo.name}</p>

                            {/* Check Answer Button */}
                            <button
                              onClick={() => setGestaltRevealed({ ...gestaltRevealed, [`quiz_${idx}`]: true })}
                              disabled={isRevealed}
                              style={{
                                width: "100%",
                                backgroundColor: isRevealed ? "#86EFAC" : "#FBBF24",
                                color: "#333333",
                                padding: "0.75rem",
                                fontSize: "0.875rem",
                                fontWeight: "bold",
                                border: "none",
                                borderRadius: "0.375rem",
                                cursor: isRevealed ? "default" : "pointer",
                                marginBottom: "1rem",
                                transition: "all 0.3s ease"
                              }}
                            >
                              {isRevealed ? "✓ Revealed" : "Check My Answer"}
                            </button>

                            {/* Answer Box */}
                            {isRevealed && (
                              <div style={{ backgroundColor: "#DBEAFE", padding: "1rem", borderRadius: "0.375rem", border: "2px solid #3B82F6", textAlign: "left", direction: "rtl" }}>
                                <p style={{ fontWeight: "bold", color: "#1E40AF", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                                  ✓ {logo.principle}
                                </p>
                                <p style={{ color: "#1E40AF", fontSize: "0.8rem", lineHeight: "1.5", marginBottom: "0.5rem" }}>
                                  {logo.explanation}
                                </p>
                                <p style={{ color: "#1E40AF", fontSize: "0.8rem", lineHeight: "1.5", fontStyle: "italic" }}>
                                  {logo.explanationHe}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {(() => {
                    const allQuizAnswered = GESTALT_PRACTICE_QUIZ.every((_, idx) => tab3Responses[`gestalt_quiz_${idx}`]);
                    const allQuizCorrect = GESTALT_PRACTICE_QUIZ.every((logo, idx) => tab3Responses[`gestalt_quiz_${idx}`] === logo.principle);
                    const canContinue = !isLocked && allQuizAnswered && allQuizCorrect;
                    return (
                      <>
                        {!allQuizCorrect && allQuizAnswered && (
                          <div style={{ backgroundColor: "#FEE2E2", border: "2px solid #EF4444", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1rem", color: "#991B1B", fontSize: "0.9rem" }}>
                            ⚠️ Not all answers are correct. Please review and try again! (לא כל התשובות נכונות. אנא בדוק שוב!)
                          </div>
                        )}
                        <button
                          onClick={handleSaveAndContinue}
                          disabled={!canContinue}
                          style={{
                            width: "100%",
                            backgroundColor: !canContinue ? "#D1D5DB" : "#86EFAC",
                            color: "#333333",
                            padding: "0.75rem",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "0.5rem",
                            cursor: !canContinue ? "not-allowed" : "pointer",
                            marginTop: "2rem"
                          }}
                        >
                          {!allQuizAnswered ? "Answer all 4 questions to continue (ענה על כל 4 השאלות כדי להמשיך)" : !allQuizCorrect ? "Fix incorrect answers (תקן תשובות שגויות)" : "Save & Continue (שמור והמשך)"}
                        </button>
                      </>
                    );
                  })()}
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
                            {studentNames.map((name: string, idx: number) => (
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
                              {studentNames.map((name: string, colIdx: number) => (
                                <td key={colIdx} style={{ padding: "0.75rem", borderRight: "1px solid #D1D5DB" }}>
                                  <textarea
                                    value={(responses as any)[`table_${rowIdx}_${colIdx}`] || ""}
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
                      value={(responses as any).chosenPopulation || ""}
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
                      value={(responses as any).whyChosen || ""}
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

  // Tab 2: Research & Writing
  if (currentTab === 2) {
    const researchText = (responses as any).researchText || "";
    const wordCount = researchText.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
    const meetsMinimum = wordCount >= 100;
    const gemVisited = (responses as any).gemVisited || false;
    
    return (
      <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                  Research & Writing (מחקר וכתיבה)
                </h1>
                <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                  Research your chosen population and find statistics about their situation.
                </p>
                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 1 first!</p>
                  </div>
                )}
                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <div style={{ marginBottom: "2rem", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "0.375rem", borderLeft: "4px solid #333333" }}>
                    <p style={{ fontSize: "0.95rem", color: "#333333", lineHeight: "1.6", marginBottom: "1rem" }}>
                      <strong>Assignment (משימה):</strong> Research your chosen population and write about their situation. Include statistics and facts.
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#555555", marginBottom: "1rem" }}>
                      <strong>Example (דוגמה):</strong> "According to UNICEF, 160 million children worldwide are engaged in child labor. In developing countries, children often work instead of attending school, limiting their future opportunities. This population needs awareness and support."
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#555555" }}>
                      <strong>💡 Tip:</strong> Use Google Gemini to help with your research and writing. <a href="https://gemini.google.com/gem/1AnFJbpYQ-hsXjJDhota5pIkU3Qt9h6Vy?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={() => updateResponse("gemVisited", true)} style={{ color: "#2563EB", textDecoration: "underline" }}>Open Gem Helper →</a>
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Your Research & Writing (מינימום 100 מילים)
                    </label>
                    <textarea
                      value={researchText}
                      onChange={(e) => {
                        updateResponse("researchText", e.target.value);
                        setValidationErrors([]);
                      }}
                      disabled={isLocked}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        border: !meetsMinimum && researchText.length > 0 ? "2px solid #DC2626" : "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "200px",
                        resize: "vertical",
                        fontSize: "1rem",
                      }}
                      placeholder="Paste your research and writing here. Minimum 100 words required."
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                      <span style={{ fontSize: "0.875rem", color: meetsMinimum ? "#16A34A" : "#DC2626", fontWeight: "bold" }}>
                        Word count: {wordCount} / 100 {meetsMinimum ? "✓" : ""}
                      </span>
                    </div>
                  </div>
                  
                  {!meetsMinimum && researchText.length > 0 && (
                    <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "0.375rem", padding: "0.75rem", marginBottom: "1.5rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem", color: "#DC2626", fontSize: "0.875rem" }}>
                        <AlertCircle size={16} style={{ flexShrink: 0 }} />
                        <span>Please write at least 100 words. Currently {wordCount} words.</span>
                      </div>
                    </div>
                  )}
                  
                  {!gemVisited && (
                    <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.375rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                      <HelpCircle size={24} style={{ color: "#D97706" }} />
                      <div>
                        <p style={{ fontWeight: "bold", color: "#92400E", marginBottom: "0.5rem" }}>📌 Gem Helper is Mandatory!</p>
                        <p style={{ color: "#92400E", fontSize: "0.9rem" }}>You must visit the Google Gemini helper to complete your research. Click the link above to open the Gem Helper.</p>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={handleSaveAndContinue}
                    disabled={isLocked || !meetsMinimum || !gemVisited}
                    style={{
                      width: "100%",
                      backgroundColor: isLocked || !meetsMinimum || !gemVisited ? "#D1D5DB" : "#FCA5A5",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: isLocked || !meetsMinimum || !gemVisited ? "not-allowed" : "pointer",
                    }}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>
              <div>
                <img src={IMAGES.researchBottom} alt="Research" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              onClick={() => setCurrentTab(1)}
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

  // Tab 5: Creating a Logo (Logo Lab)
  if (currentTab === 4) {
    const canvaLink = (responses as any).canvaLink || "";
    const isValidCanvaLink = canvaLink.includes("canva.com") && canvaLink.includes("edit");
    
    return (
      <div style={{ backgroundColor: "#DCFCE7", minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
              Creating a Logo (יצירת לוגו)
            </h1>
            <p style={{ color: "#555555", marginBottom: "2rem" }}>
              Design a logo for your population using Canva. Follow the steps below.
            </p>
            
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333333", marginBottom: "1.5rem" }}>📋 Logo Design Steps</h2>
              
              <div style={{ marginBottom: "2rem", backgroundColor: "#F0FDF4", padding: "1.5rem", borderRadius: "0.375rem", borderLeft: "4px solid #22C55E" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>Step 1: Brainstorm Symbols</h3>
                <p style={{ color: "#555555", marginBottom: "1rem" }}>Think of 3 symbols that represent your population and their needs. These symbols should be simple, recognizable, and meaningful.</p>
                <textarea
                  value={(responses as any).symbolIdeas || ""}
                  onChange={(e) => updateResponse("symbolIdeas", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.375rem",
                    fontFamily: "'Alef', 'Assistant', sans-serif",
                    minHeight: "100px",
                    fontSize: "0.95rem",
                  }}
                  placeholder="Example: A heart (compassion), a book (education), a hand (support)"
                />
              </div>
              
              <div style={{ marginBottom: "2rem", backgroundColor: "#F0FDF4", padding: "1.5rem", borderRadius: "0.375rem", borderLeft: "4px solid #22C55E" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>Step 2: Design in Canva</h3>
                <p style={{ color: "#555555", marginBottom: "1rem" }}><strong>Instructions:</strong></p>
                <ul style={{ color: "#555555", marginBottom: "1rem", marginLeft: "1.5rem", listStyleType: "disc" }}>
                  <li>Go to <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" style={{ color: "#2563EB", textDecoration: "underline" }}>Canva.com</a> and create a new design</li>
                  <li>Use BLACK text/shapes only (no colors)</li>
                  <li>Replace ONE letter in your population name with a silhouette element (symbol)</li>
                  <li>Keep it simple and professional</li>
                  <li>Example: "CH**ILDREN**" where the "I" is replaced with a child silhouette</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: "2rem", backgroundColor: "#F0FDF4", padding: "1.5rem", borderRadius: "0.375rem", borderLeft: "4px solid #22C55E" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>Step 3: Share Your Canva Link</h3>
                <p style={{ color: "#555555", marginBottom: "1rem" }}>Paste your Canva "Can Edit" link below. Make sure the link allows editing.</p>
                <input
                  type="url"
                  value={canvaLink}
                  onChange={(e) => updateResponse("canvaLink", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: isValidCanvaLink ? "2px solid #22C55E" : canvaLink.length > 0 ? "2px solid #DC2626" : "1px solid #D1D5DB",
                    borderRadius: "0.375rem",
                    fontFamily: "'Alef', 'Assistant', sans-serif",
                    fontSize: "0.95rem",
                  }}
                  placeholder="https://www.canva.com/design/..."
                />
                {canvaLink.length > 0 && (
                  <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: isValidCanvaLink ? "#16A34A" : "#DC2626", fontWeight: "bold" }}>
                    {isValidCanvaLink ? "✓ Valid Canva link" : "✗ Please paste a valid Canva 'Can Edit' link"}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={handleSaveAndContinue}
              disabled={!isValidCanvaLink}
              style={{
                width: "100%",
                backgroundColor: isValidCanvaLink ? "#86EFAC" : "#D1D5DB",
                color: "#333333",
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "0.5rem",
                cursor: isValidCanvaLink ? "pointer" : "not-allowed",
              }}
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Placeholder for other tabs
  return (
    <div style={{ backgroundColor: tabColor, minHeight: "100vh", padding: "2rem", textAlign: "center" }}>
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
      <h1 style={{ marginTop: "5rem", fontSize: "2rem", fontWeight: "bold", color: "#333333" }}>
        {TABS[currentTab].label} ({TABS[currentTab].labelHe})
      </h1>
      <p style={{ color: "#555555", marginTop: "1rem" }}>Tab content coming soon...</p>
    </div>
  );
}
