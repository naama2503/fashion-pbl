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

// Brand logos for Gestalt Gallery
const BRAND_LOGOS = [
  { 
    name: "Nike", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Nike_logo.svg/1024px-Nike_logo.svg.png",
    principle: "Continuity",
    principleHe: "המשכיות",
    explanation: "The swoosh creates a continuous curved line that our eye follows.",
    explanationHe: "הסווש יוצר קו עקום רציף שהעין שלנו עוקבת אחריו."
  },
  { 
    name: "Adidas", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_logo.svg/1024px-Adidas_logo.svg.png",
    principle: "Similarity",
    principleHe: "דמיון",
    explanation: "Three parallel stripes create unity through repetition and similarity.",
    explanationHe: "שלושה פסים מקבילים יוצרים אחדות דרך חזרה ודמיון."
  },
  { 
    name: "Apple", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png",
    principle: "Closure",
    principleHe: "סגירה",
    explanation: "The missing bite is completed by our mind, creating the whole apple.",
    explanationHe: "הנשיכה החסרה משלימה בנו, יוצרת את התפוח השלם."
  },
  { 
    name: "Gucci", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Gucci_logo.svg/1024px-Gucci_logo.svg.png",
    principle: "Balance",
    principleHe: "איזון",
    explanation: "Symmetrical interlocking Gs create perfect visual balance and harmony.",
    explanationHe: "ג'ים משולבים סימטריים יוצרים איזון ויוניטי ויזואליים מושלמים."
  },
  { 
    name: "Shell", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Shell_logo.svg/1024px-Shell_logo.svg.png",
    principle: "Proximity",
    principleHe: "קרבה",
    explanation: "Segments grouped closely together form the shell shape.",
    explanationHe: "קטעים מקובצים קרוב זה לזה יוצרים את צורת הקליפה."
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
  { name: "Bold", nameHe: "בולד", style: { fontWeight: "bold", fontSize: "2rem" } },
  { name: "Cursive", nameHe: "כתב יד", style: { fontStyle: "italic", fontSize: "2rem" } },
  { name: "Minimalist", nameHe: "מינימליסט", style: { fontWeight: 300, fontSize: "2rem", letterSpacing: "0.1em" } },
  { name: "Sharp-Edged", nameHe: "חד", style: { fontWeight: 900, fontSize: "2rem", letterSpacing: "-0.05em" } },
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
  
  // Tab 4 specific states
  const [colorRevealed, setColorRevealed] = useState<Record<number, boolean>>({});
  const [fontRevealed, setFontRevealed] = useState<Record<string, boolean>>({});
  const [gestaltRevealed, setGestaltRevealed] = useState<Record<number, boolean>>({});
  const [selectedWords, setSelectedWords] = useState<Record<string, string>>({});

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
                <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                  Learn how colors, fonts, and design principles communicate messages. (למדו כיצד צבעים, פונטים ועקרונות עיצוב מעבירים הודעות.)
                </p>

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
                      <div style={{ backgroundColor: "#F0F9FF", border: "2px solid #93C5FD", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1rem" }}>
                        <p style={{ fontWeight: "bold", color: "#1E40AF", marginBottom: "0.5rem" }}>Font Psychology (פסיכולוגיה של פונטים):</p>
                        <ul style={{ fontSize: "0.875rem", color: "#333333", marginLeft: "1.5rem" }}>
                          <li><strong>Bold:</strong> Strength, power, confidence (חוזק, כוח, ביטחון)</li>
                          <li><strong>Cursive:</strong> Elegance, femininity, creativity (אלגנציה, נשיות, יצירתיות)</li>
                          <li><strong>Minimalist:</strong> Modern, clean, trustworthy (מודרני, נקי, אמין)</li>
                          <li><strong>Sharp-Edged:</strong> Aggressive, dynamic, edgy (אגרסיבי, דינמי, חד)</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* PART C: Gestalt Gallery with Brand Logos */}
                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    Part C: Gestalt Gallery (חלק ג: גלריית גשטלט)
                  </h2>
                  <p style={{ color: "#555555", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                    Famous brands use Gestalt principles. Click "Reveal Principle" to see which principle each uses. (מותגים מפורסמים משתמשים בעקרונות גשטלט. לחצו "גלה עקרון" כדי לראות איזה עקרון כל אחד משתמש.)
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
                    {BRAND_LOGOS.map((brand, idx) => (
                      <div key={idx} style={{ backgroundColor: "#F9FAFB", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #E5E7EB" }}>
                        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                          <img src={brand.logo} alt={brand.name} style={{ height: "80px", objectFit: "contain" }} />
                          <p style={{ fontWeight: "bold", color: "#333333", marginTop: "0.5rem" }}>{brand.name}</p>
                        </div>
                        
                        {gestaltRevealed[idx] ? (
                          <div style={{ backgroundColor: "#E0E7FF", padding: "1rem", borderRadius: "0.375rem" }}>
                            <p style={{ fontWeight: "bold", color: "#1E40AF", marginBottom: "0.5rem" }}>
                              {brand.principle} ({brand.principleHe})
                            </p>
                            <p style={{ fontSize: "0.875rem", color: "#333333", lineHeight: "1.5" }}>{brand.explanation}</p>
                            <p style={{ fontSize: "0.75rem", color: "#555555", marginTop: "0.5rem" }}>{brand.explanationHe}</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => setGestaltRevealed({ ...gestaltRevealed, [idx]: true })}
                            disabled={isLocked}
                            style={{
                              width: "100%",
                              backgroundColor: "#D8B4FE",
                              color: "#333333",
                              padding: "0.5rem",
                              borderRadius: "0.375rem",
                              border: "none",
                              fontWeight: "bold",
                              fontSize: "0.875rem",
                              cursor: isLocked ? "not-allowed" : "pointer",
                            }}
                          >
                            Reveal Principle
                          </button>
                        )}
                      </div>
                    ))}
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
                    Save & Continue (שמור והמשך)
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
