import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { Lock, AlertCircle, HelpCircle, Upload, CheckCircle, XCircle } from "lucide-react";
import CanvasDraw from "react-canvas-draw";
import { trpc } from "@/lib/trpc";
import { validateGrammar, checkTabCompletion, getRubricForTab } from "@/utils/grammarValidator";
import { RubricPanel } from "@/components/RubricPanel";

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
    explanationHe: "המוח שלנו משלים את הקווים החסרים כדי ליצור דמות של פנדה שלמה."
  },
  { 
    name: "FedEx Arrow", 
    nameHe: "חץ FedEx",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/FedEx_Corporation_-_Logo.svg",
    principle: "Figure/Ground (דמות ורקע)",
    explanation: "The white space between 'E' and 'x' creates a hidden arrow.",
     explanationHe: "המרחב הלבן שבין אותיות E ו-x יוצר חץ נסתר."
  },
  { 
    name: "Amazon", 
    nameHe: "אמזון",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    principle: "Continuation (המשכיות)",
    explanation: "The yellow arrow leads our eye from A to Z in a smooth movement.",
    explanationHe: "חץ הצהב מוליך את העין שלנו מ-A ל-Z בתנועה חלקה."
  },
  { 
    name: "Olympics", 
    nameHe: "אולימפיאדה",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Olympic_rings_without_rims.svg",
    principle: "Unity/Proximity (אחדות/קרבה)",
    explanation: "The five rings are positioned close together, creating a unified symbol despite being separate circles.",
    explanationHe: "חמש הטבעות ממוקמות קרוב זו לזו, מה שיוצר סמל מאוחד למרות שהן מעגולים נפרדים."
  },
  { 
    name: "Adidas", 
    nameHe: "אדידס",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    principle: "Balance/Symmetry (איזון/סימטריה)",
    explanation: "Three parallel stripes create perfect visual balance and symmetrical repetition.",
    explanationHe: "שלושה פסים מקבילים יוצרים איזון חזותי וחזרה סימטרית מושלמה."
  },
];

// PART B: Practice Quiz - New Logos (Students must guess)
const GESTALT_PRACTICE_QUIZ = [
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
    explanationHe: "המוח שלנו סוגר את הפערים בין הקווים האופקיים כדי לקרוא את דיבורים."
  },
  {
    name: "Unilever",
    nameHe: "יוניליוור",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Unilever.svg",
    principle: "Closure",
    principleHe: "סגירה",
    explanation: "The 'U' is formed by our mind completing the open lines.",
    explanationHe: "ד-'U' נוצרת על ידי המוח שלנו המשלים את הקווים הפתוחים."
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
    gestalt_quiz_0: "",
    gestalt_quiz_1: "",
    gestalt_quiz_2: "",
    gestalt_quiz_3: "",
    gestalt_4: "",
  });
  
  // Tab 4 specific states
  const [colorRevealed, setColorRevealed] = useState<Record<number, boolean>>({});
  const [fontRevealed, setFontRevealed] = useState<Record<string, boolean>>({});
  const [gestaltRevealed, setGestaltRevealed] = useState<Record<string, boolean>>({});
  const [selectedWords, setSelectedWords] = useState<Record<string, string>>({});
  const [fontPsychologyRevealed, setFontPsychologyRevealed] = useState(false);
  
  // Grammar validation states
  const [tab2GrammarErrors, setTab2GrammarErrors] = useState<string[]>([]);
  const [tab3GrammarErrors, setTab3GrammarErrors] = useState<string[]>([]);
  const [tab2GrammarValid, setTab2GrammarValid] = useState(false);
  const [tab3GrammarValid, setTab3GrammarValid] = useState(false);

  const [showPreviousWork, setShowPreviousWork] = useState(false);
  const [previousWorkData, setPreviousWorkData] = useState<any>(null);
  const [isLoadingPreviousWork, setIsLoadingPreviousWork] = useState(false);

  // Error state management for visual feedback
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showGlobalAlert, setShowGlobalAlert] = useState(false);
  const [globalAlertMessage, setGlobalAlertMessage] = useState('');
  const [disabledButtonAttempt, setDisabledButtonAttempt] = useState(false);

  const tabColor = COLORS[currentTab];

  const fetchResponseQuery = trpc.pbl.fetchResponse.useQuery(
    { studentId: parseInt(localStorage.getItem('studentId') || '1'), tabNumber: currentTab + 1 },
    { enabled: false }
  );

  const handleViewPreviousWork = async () => {
    setIsLoadingPreviousWork(true);
    try {
      let studentId = localStorage.getItem('studentId');
      if (!studentId) {
        studentId = '1';
        localStorage.setItem('studentId', studentId);
      }
      
      const data = await fetchResponseQuery.refetch();
      if (data.data) {
        setPreviousWorkData(data.data);
        setShowPreviousWork(true);
      } else {
        toast.info('No previous work found for this tab.');
      }
    } catch (error) {
      console.error('Error fetching previous work:', error);
      toast.error('Failed to load previous work.');
    } finally {
      setIsLoadingPreviousWork(false);
    }
  };

  const handleLoadPreviousWork = () => {
    if (previousWorkData) {
      setResponses(previousWorkData.responseData || {});
      setTab3Responses(previousWorkData.responseData || {});
      setShowPreviousWork(false);
      toast.success('Previous work loaded!');
    }
  };

  const canAccessTab = (tabIndex: number) => {
    if (tabIndex === 0) return true;
    if (tabIndex === 1) return true;
    if (tabIndex === 2) {
      const population = (responses as any).chosenPopulation || '';
      const whyChosen = (responses as any).whyChosen || '';
      return population.trim() && whyChosen.trim() && checkTabCompletion(1, { chosen_population: population, why_chosen: whyChosen });
    }
    if (tabIndex === 3) {
      const researchText = (responses as any).researchText || '';
      const wordCount = researchText.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
      return wordCount >= 100 && checkTabCompletion(2, { research_text: researchText });
    }
    if (tabIndex === 4) {
      const thornVsSmile = (responses as any).thornVsSmile || '';
      return thornVsSmile.trim() && checkTabCompletion(3, { thorn_vs_smile: thornVsSmile });
    }
    return false;
  };

  const updateResponse = (key: string, value: any) => {
    setResponses({ ...responses, [key]: value });
  };

  const saveResponseMutation = trpc.pbl.saveResponse.useMutation({
    onSuccess: () => {
      toast.success("Responses saved! Moving to next tab...");
      setCurrentTab(currentTab + 1);
    },
    onError: (error) => {
      console.error('Error saving responses:', error);
      toast.error("Failed to save responses. Please try again.");
    },
  });

  const handleSaveAndContinue = async () => {
    // Check if current tab has required fields filled
    const checkTabValidation = () => {
      if (currentTab === 1) {
        // Tab 1: Group Decision - check population and why
        const population = (responses as any).chosenPopulation || '';
        const whyChosen = (responses as any).whyChosen || '';
        if (!population.trim() || !whyChosen.trim()) {
          toast.error('Please fill in all answers! (אנא מלאו את כל התשובות!)');
          return false;
        }
      } else if (currentTab === 2) {
        // Tab 2: Research - check research text
        const researchText = (responses as any).researchText || '';
        const wordCount = researchText.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
        if (wordCount < 100) {
          toast.error('Please write at least 100 words! (אנא כתוב לפחות 100 מילים!)');
          return false;
        }
      }
      return true;
    };

    if (validationErrors.length === 0 && checkTabValidation()) {
      try {
        let studentId = localStorage.getItem('studentId');
        if (!studentId) {
          studentId = '1';
          localStorage.setItem('studentId', studentId);
        }
        
        await saveResponseMutation.mutateAsync({
          studentId: parseInt(studentId),
          tabNumber: currentTab + 1,
          responseData: responses,
          colorFeelings: (responses as any).colorFeelings,
          fontShapeAnswers: (responses as any).fontShapeAnswers,
          gestaltAnswers: (responses as any).gestaltAnswers,
        });
      } catch (error) {
        console.error('Error saving responses:', error);
      }
    }
  };

  // Tab 3: Design Inquiry - Restructured with Color → Font → Thorn/Smile → Gestalt
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
                <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", fontSize: "0.9rem", color: "#92400E", lineHeight: "1.6" }}>
                  <p style={{ marginBottom: "0.5rem" }}>
                    <strong>What is Color Psychology?</strong> Colors influence our emotions and perceptions. Different colors evoke different feelings and associations.
                  </p>
                  <p style={{ marginBottom: "0.5rem", direction: "rtl", textAlign: "right" }}>
                    <strong>מהי פסיכולוגיה של צבע?</strong> צבעים משפיעים על הרגשות ועל התפיסה שלנו. צבעים שונים מעוררים רגשות ואסוציאציות שונות.
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
                    Part A: Color Psychology / חלק א: פסיכולוגיה של צבע
                  </h2>
                  <p style={{ color: "#555555", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                    What does each color make you feel? Click "Reveal Professional Meaning" to see what designers think.
                  </p>
                  <p style={{ color: "#555555", marginBottom: "1.5rem", fontSize: "0.95rem", direction: "rtl", textAlign: "right" }}>
                    איזה רגש מעלה אצלכם כל צבע? לחצו על "גלה משמעות מקצועית" כדי לראות מה מעצבים חושבים.
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
                            Reveal Meaning / גלה משמעות
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* PART B: Visual Associations with Images and Fonts */}
                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    Part B: Visual Associations / חלק ב: קשרים ויזואליים
                  </h2>
                  
                  {/* Image Association */}
                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                      Image Association / קשור תמונות
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                      <div>
                        <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>Thorns (קוצים)</p>
                        <img src={IMAGES.thorns} alt="Thorns" style={{ width: "100%", borderRadius: "0.5rem", maxHeight: "200px", objectFit: "cover" }} />
                        <div>
                          <p style={{ color: "#555555", fontSize: "0.875rem", marginTop: "0.5rem" }}>This image feels: Strong, Serious, Dangerous</p>
                          <p style={{ color: "#555555", fontSize: "0.875rem", marginTop: "0.5rem", direction: "rtl", textAlign: "right" }}>התמונה הזו מרגישה: חזקה, רצינית, מסוכנת.</p>
                        </div>
                      </div>
                      <div>
                        <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>Smiling Child (ילד חיוך)</p>
                        <img src={IMAGES.smilingChild} alt="Smiling Child" style={{ width: "100%", borderRadius: "0.5rem", maxHeight: "200px", objectFit: "cover" }} />
                        <div>
                          <p style={{ color: "#555555", fontSize: "0.875rem", marginTop: "0.5rem" }}>This image feels: Fun, Childish, Friendly</p>
                          <p style={{ color: "#555555", fontSize: "0.875rem", marginTop: "0.5rem", direction: "rtl", textAlign: "right" }}>התמונה הזו מרגישה: כיפית, ילדותית, ידידותית.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem" }}>
                      <p style={{ fontWeight: "bold", color: "#92400E", marginBottom: "0.5rem" }}>Question / שאלה:</p>
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
                      Font Psychology - "Yahav Bank" / פסיכולוגיה של פונטים
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
                    
                    {true && (
                      <div style={{ backgroundColor: "#F0F9FF", border: "2px solid #93C5FD", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem" }}>
                        <p style={{ fontWeight: "bold", color: "#1E40AF", marginBottom: "0.5rem" }}>Font Psychology / פסיכולוגיה של פונטים:</p>
                        <ul style={{ fontSize: "0.875rem", color: "#333333", marginLeft: "1.5rem", marginBottom: "1rem" }}>
                          <li><strong>Anton (Strong):</strong> Bold, powerful, confidence (בולד, חזק, ביטחון)</li>
                          <li><strong>Fredoka (Fun):</strong> Friendly, playful, approachable (ידידותי, משחקי, נגיש)</li>
                          <li><strong>Cinzel (Serious):</strong> Elegant, formal, professional (אלגנטי, רשמי, מקצועי)</li>
                          <li><strong>Orbitron (Tech):</strong> Modern, futuristic, innovative (מודרני, עתידני, חדשני)</li>
                        </ul>
                        
                        <div style={{ backgroundColor: "#FFFFFF", padding: "1rem", borderRadius: "0.375rem", marginTop: "1rem" }}>
                          <p style={{ fontWeight: "bold", color: "#1E40AF", marginBottom: "1rem", fontSize: "0.95rem" }}>Answer the questions below / בחר את התשובות הבאות:</p>
                          
                          <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                              Which font would you use for a toy store? / איזה פונט הייתם משתמשים לחנות צעצועים?
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
                              Which font would you use for a gaming space? / איזה פונט הייתם משתמשים למרחב גיימיג?
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
                              Which font would you use for a restaurant? / איזה פונט הייתם משתמשים למסעדה?
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
                              Which font would you use for a hospital? / איזה פונט הייתם משתמשים לבית חולים?
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

                {/* PART D: Gestalt Gallery with Brand Logos */}
                <>
                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                    Part D - Gestalt Principles (חלק ד - עקרונות גשטלט)
                  </h2>
                  <p style={{ backgroundColor: "#DBEAFE", border: "2px solid #3B82F6", borderRadius: "0.5rem", padding: "1rem", marginBottom: "2rem", color: "#1E40AF", fontSize: "0.95rem", lineHeight: "1.6" }}>
                    Gestalt principles explain how our brain naturally organizes visual elements into groups or a whole. (עקרונות הגשטלט מסבירים כיצד המוח שלנו מארגן באופן טבעי אלמנטים חזותיים לקבוצות או ליחידה אחת שלמה.)
                  </p>

                  {/* PART A: Learning Phase */}
                  <div style={{ marginBottom: "3rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                      Learning: 3 Classic Examples (למידה: 3 דוגמאות קלאסיות)
                    </h3>
                    <p style={{ color: "#555555", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                      Study these examples. The principle and explanation are shown immediately. (למד את הדוגמאות הללו. העקרון וההסבר מוצגים מיד.)
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                      {GESTALT_LEARNING_EXAMPLES.map((example, idx) => (
                        <div key={idx} style={{ backgroundColor: "#F0FDF4", padding: "1.5rem", borderRadius: "0.5rem", border: "2px solid #86EFAC", textAlign: "center" }}>
                          <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "150px" }}>
                            <img src={example.logo} alt={example.name} style={{ height: "150px", maxWidth: "100%", objectFit: "contain" }} onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.parentElement) e.currentTarget.parentElement.textContent = example.name; }} />
                          </div>
                          <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "0.5rem", fontSize: "0.95rem" }}>{example.name}</p>
                          <p style={{ fontWeight: "bold", color: "#16A34A", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                            {example.principle}
                          </p>
                          <p style={{ color: "#333333", fontSize: "0.85rem", lineHeight: "1.5", marginBottom: "0.5rem" }}>
                            {example.explanation}
                          </p>
                          <p style={{ color: "#555555", fontSize: "0.8rem", lineHeight: "1.5", fontStyle: "italic", direction: "rtl", textAlign: "right" }}>
                            {example.explanationHe}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PART B: Practice Quiz */}
                  <div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                      Practice Quiz: Guess the Principle (תרגול: נחש את העקרון)
                    </h3>
                    <p style={{ color: "#555555", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                      Now it's your turn! These are NEW logos. Select the principle you think each one uses. (עכשיו תורך! בחר את העקרון שלדעתך כל לוגו משתמש בו.)
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                      {GESTALT_PRACTICE_QUIZ.map((logo, idx) => {
                        const selectedAnswer = tab3Responses[`gestalt_quiz_${idx}`] || null;
                        const isCorrect = selectedAnswer === logo.principle;
                        const showFeedback = selectedAnswer !== null;
                        const principles = ["Closure", "Figure/Ground", "Unity/Proximity", "Balance/Symmetry"];

                        return (
                          <div key={idx} style={{ backgroundColor: "#FEF3C7", padding: "1.5rem", borderRadius: "0.5rem", border: "2px solid #FBBF24" }}>
                            {/* Logo Display */}
                            <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "150px" }}>
                              <img src={logo.logo} alt={`${logo.name} logo`} crossOrigin="anonymous" style={{ height: "150px", maxWidth: "100%", objectFit: "contain" }} onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22150%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E' + logo.name + '%3C/text%3E%3C/svg%3E'; }} />
                            </div>
                            <p style={{ fontWeight: "bold", color: "#333333", marginBottom: "1rem", fontSize: "0.95rem", textAlign: "center" }}>
                              {logo.name} ({logo.nameHe})
                            </p>

                            {/* Multiple Choice Options */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                              {principles.map((principle) => {
                                const principleHe = {
                                  "Closure": "סגירה",
                                  "Figure/Ground": "דמות ורקע",
                                  "Continuation": "המשכיות",
                                  "Unity/Proximity": "אחדות/קרבה",
                                  "Balance/Symmetry": "איזון/סימטריה"
                                }[principle] || principle;
                                
                                return (
                                  <button
                                    key={principle}
                                    onClick={() => setTab3Responses(prev => ({ ...prev, [`gestalt_quiz_${idx}`]: principle }))}
                                    disabled={selectedAnswer !== null && !isCorrect}
                                    style={{
                                      width: "100%",
                                      backgroundColor: selectedAnswer === principle ? (isCorrect ? "#22C55E" : "#EF4444") : "#FFFFFF",
                                      color: selectedAnswer === principle ? "#FFFFFF" : "#333333",
                                      padding: "0.75rem",
                                      fontSize: "0.875rem",
                                      fontWeight: "bold",
                                      border: `2px solid ${selectedAnswer === principle ? (isCorrect ? "#16A34A" : "#DC2626") : "#FBBF24"}`,
                                      borderRadius: "0.375rem",
                                      cursor: selectedAnswer !== null ? "default" : "pointer",
                                      transition: "all 0.2s ease"
                                    }}
                                  >
                                    {principle} / {principleHe}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Feedback */}
                            {showFeedback && (
                              <div style={{
                                backgroundColor: isCorrect ? "#DCFCE7" : "#FEE2E2",
                                border: `2px solid ${isCorrect ? "#22C55E" : "#EF4444"}`,
                                borderRadius: "0.375rem",
                                padding: "1rem",
                                textAlign: "left",
                                direction: "rtl"
                              }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                  <p style={{
                                    fontWeight: "bold",
                                    color: isCorrect ? "#15803D" : "#991B1B",
                                    fontSize: "0.9rem",
                                    margin: 0
                                  }}>
                                    {isCorrect ? "✓ Correct! (נכון!)" : "✗ Try again! (נסו שוב!)"}
                                  </p>
                                  <button
                                    onClick={() => setTab3Responses(prev => ({ ...prev, [`gestalt_quiz_${idx}`]: "" }))}
                                    style={{
                                      backgroundColor: "#FFFFFF",
                                      color: "#333333",
                                      border: "1px solid #999999",
                                      borderRadius: "0.25rem",
                                      padding: "0.4rem 0.8rem",
                                      fontSize: "0.75rem",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      transition: "all 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F3F4F6"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
                                  >
                                    🔄 Reset (אפס)
                                  </button>
                                </div>
                                {isCorrect && (
                                  <>
                                    <p style={{ color: "#15803D", fontSize: "0.8rem", lineHeight: "1.5", marginBottom: "0.5rem" }}>
                                      {logo.explanation}
                                    </p>
                                    <p style={{ color: "#15803D", fontSize: "0.8rem", lineHeight: "1.5", fontStyle: "italic" }}>
                                      {logo.explanationHe}
                                    </p>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {(() => {
                    const thornVsSmileValid = tab3Responses.thornVsSmile && /^[A-Z].*[.!?]$/.test(tab3Responses.thornVsSmile.trim());
                    const fontPsychologyValid = tab3Responses.fontShapeAnswers && /^[A-Z].*[.!?]$/.test(tab3Responses.fontShapeAnswers.trim());
                    const allQuizAnswered = GESTALT_PRACTICE_QUIZ.every((_, idx) => tab3Responses[`gestalt_quiz_${idx}`]);
                    const allQuizCorrect = GESTALT_PRACTICE_QUIZ.every((logo, idx) => tab3Responses[`gestalt_quiz_${idx}`] === logo.principle);
                    const canContinue = !isLocked && thornVsSmileValid && fontPsychologyValid && allQuizAnswered && allQuizCorrect;
                    return (
                      <>
                        {!thornVsSmileValid && tab3Responses.thornVsSmile && (
                          <div style={{ backgroundColor: "#FEE2E2", border: "2px solid #EF4444", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1rem", color: "#991B1B", fontSize: "0.9rem" }}>
                            ⚠️ Fix Thorn vs Smile: Capital letter + punctuation (תקן קוץ לעומת חיוך: אות גדולה וסימן פיסוק)
                          </div>
                        )}
                        {!fontPsychologyValid && tab3Responses.fontShapeAnswers && (
                          <div style={{ backgroundColor: "#FEE2E2", border: "2px solid #EF4444", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1rem", color: "#991B1B", fontSize: "0.9rem" }}>
                            ⚠️ Fix Font Psychology: Capital letter + punctuation (תקן פסיכולוגיה פונט: אות גדולה וסימן פיסוק)
                          </div>
                        )}
                        {!allQuizCorrect && allQuizAnswered && (
                          <div style={{ backgroundColor: "#FEE2E2", border: "2px solid #EF4444", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1rem", color: "#991B1B", fontSize: "0.9rem" }}>
                            ⚠️ Not all Gestalt answers correct. Review and try again! (לא כל תשובות הגשטלט נכונות. בדוק שוב!)
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
                </>
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
                  Work in groups of 2-3. Choose a population to help. (עבדו בקבוצות של 2-3. בחרו אוכלוסיה לעזור.)
                </p>
                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 1 first! (טאב זה נעול. קבל אישור ממורה עבור טאב 1 בראשונה!)</p>
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
                      Group Members / חברי הקבוצה
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
                          placeholder={`Student ${idx + 1} / תלמיד ${idx + 1}`}
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
                              Population Name / שם אוכלוסיה
                            </th>
                            {studentNames.map((name: string, idx: number) => (
                              <th key={idx} style={{ padding: "0.75rem", textAlign: "center", fontWeight: "bold", color: "#333333", borderRight: "1px solid #D1D5DB" }}>
                                {name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { en: "Name of Population", he: "שם אוכלוסיה" },
                            { en: "Why they're a good choice?", he: "למה הם בחירה טובה?" },
                            { en: "Why NOT to choose them?", he: "למה לא לבחור אותם?" }
                          ].map((row, rowIdx) => (
                            <tr key={rowIdx} style={{ borderBottom: "1px solid #E5E7EB" }}>
                              <td style={{ padding: "0.75rem", fontWeight: "bold", color: "#555555", backgroundColor: "#F9FAFB", borderRight: "1px solid #D1D5DB" }}>
                                {row.en} / {row.he}
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
                                    placeholder="Enter text... / הזן טקסט..."
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
                        border: !(responses as any).chosenPopulation?.trim() ? "2px solid #DC2626" : "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        marginBottom: "0.5rem",
                        backgroundColor: !(responses as any).chosenPopulation?.trim() ? "#FEE2E2" : "#FFFFFF",
                      }}
                      placeholder="Enter population name... / הזן שם אוכלוסיה..."
                    />
                    {!(responses as any).chosenPopulation?.trim() && (
                      <p style={{ color: "#DC2626", fontSize: "0.875rem", marginBottom: "1rem", fontWeight: "bold" }}>
                        ⚠️ This field is required! (שדה זה נדרש!)
                      </p>
                    )}
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Why? (at least 2 sentences) / למה? (לפחות 2 משפטים)
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
                        border: !(responses as any).whyChosen?.trim() ? "2px solid #DC2626" : "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "100px",
                        resize: "vertical",
                        backgroundColor: !(responses as any).whyChosen?.trim() ? "#FEE2E2" : "#FFFFFF",
                      }}
                      placeholder="Explain your choice..."
                    />
                    {!(responses as any).whyChosen?.trim() && (
                      <p style={{ color: "#DC2626", fontSize: "0.875rem", marginBottom: "1rem", fontWeight: "bold" }}>
                        ⚠️ This field is required! (שדה זה נדרש!)
                      </p>
                    )}
                    
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
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <button
                      onClick={handleViewPreviousWork}
                      disabled={isLoadingPreviousWork}
                      style={{
                        backgroundColor: "#E0E7FF",
                        color: "#333333",
                        padding: "0.75rem",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        border: "2px solid #818CF8",
                        borderRadius: "0.5rem",
                        cursor: isLoadingPreviousWork ? "not-allowed" : "pointer",
                      }}
                    >
                      {isLoadingPreviousWork ? "Loading..." : "📋 View Previous Work"}
                    </button>
                    <button
                      onClick={handleSaveAndContinue}
                      disabled={isLocked}
                      style={{
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
                      Save & Continue / שמור והמשך
                    </button>
                  </div>
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
                  Research your chosen population and find statistics about their situation. (חקור את האוכלוסיה שבחרתם ומצאו סטטיסטיקה על המצבים שלהם.)
                </p>
                {isLocked && (
                  <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                    <Lock size={24} style={{ color: "#D97706" }} />
                    <p style={{ fontWeight: "bold", color: "#92400E" }}>This tab is locked. Get teacher approval for Tab 1 first! (טאב זה נעול. קבל אישור ממורה עבור טאב 1 בראשונה!)</p>
                  </div>
                )}
                <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                  <div style={{ marginBottom: "2rem", backgroundColor: "#F3F4F6", padding: "1rem", borderRadius: "0.375rem", borderLeft: "4px solid #333333" }}>
                    <p style={{ fontSize: "0.95rem", color: "#333333", lineHeight: "1.6", marginBottom: "1rem" }}>
                      <strong>Assignment (משימה):</strong> Research your chosen population and write about their situation. Include statistics and facts.
                    </p>
                    <p style={{ fontSize: "0.95rem", color: "#333333", lineHeight: "1.6", marginBottom: "1rem", direction: "rtl", textAlign: "right" }}>
                      <strong>משימה:</strong> חקור את האוכלוסיה שבחרת וכתוב על מצבם. כלול סטטיסטיקות ועובדות.
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#555555", marginBottom: "1rem" }}>
                      <strong>Example (דוגמה):</strong> "According to UNICEF, 160 million children worldwide are engaged in child labor. In developing countries, children often work instead of attending school, limiting their future opportunities. This population needs awareness and support."
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#555555", marginBottom: "1rem", direction: "rtl", textAlign: "right" }}>
                      <strong>דוגמה:</strong> "לפי יוניסף, 160 מיליון ילדים ברחבי העולם עובדים בעבודת ילדים. במדינות מתפתחות, ילדים עובדים לעיתים במקום להיות בבית ספר, מה שמגביל את הזדמנויות שלהם בעתיד. אוכלוסיה זו זקוקה למודעות ותמיכה."
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#555555" }}>
                      <strong>💡 Open / פתח:</strong> Use Google Gemini to help with your research and writing. (השתמשו ב-Google Gemini לעזרה עם המחקר והכתיבה.) <a href="https://gemini.google.com/gem/1AnFJbpYQ-hsXjJDhota5pIkU3Qt9h6Vy?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={() => updateResponse("gemVisited", true)} style={{ color: "#2563EB", textDecoration: "underline" }}>Open Gem Helper / פתח עזר →</a>
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                      Your Research & Writing / המחקר והכתיבה שלך (מינימום 100 מילים)
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
                        border: !researchText.trim() ? "2px solid #DC2626" : !meetsMinimum && researchText.length > 0 ? "2px solid #DC2626" : "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        fontFamily: "'Alef', 'Assistant', sans-serif",
                        minHeight: "200px",
                        resize: "vertical",
                        fontSize: "1rem",
                        backgroundColor: !researchText.trim() ? "#FEE2E2" : "#FFFFFF",
                      }}
                      placeholder="Paste your research and writing here. Minimum 100 words required. / הדבק את המחקר והכתיבה שלך. מינימום 100 מילים."
                    />
                    {!researchText.trim() && (
                      <p style={{ color: "#DC2626", fontSize: "0.875rem", marginTop: "0.5rem", fontWeight: "bold" }}>
                        ⚠️ This field is required! (שדה זה נדרש!)
                      </p>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                      <span style={{ fontSize: "0.875rem", color: meetsMinimum ? "#16A34A" : "#DC2626", fontWeight: "bold" }}>
                        Word count / ספיראת מילים: {wordCount} / 100 {meetsMinimum ? "✓" : ""}
                      </span>
                    </div>
                  </div>
                  
                  {/* Rubric Panel for Tab 2 */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <RubricPanel
                      rubricItems={getRubricForTab(2)}
                      responses={{ research_text: researchText }}
                      language="en"
                    />
                  </div>
                  
                  {!meetsMinimum && researchText.length > 0 && (
                    <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "0.375rem", padding: "0.75rem", marginBottom: "1.5rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem", color: "#DC2626", fontSize: "0.875rem" }}>
                        <AlertCircle size={16} style={{ flexShrink: 0 }} />
                        <span>Please write at least 100 words. Currently {wordCount} words. / כתוב לכתוב לפחות 100 מילים. כרגע {wordCount} מילים.</span>
                      </div>
                    </div>
                  )}
                  
                  {!gemVisited && (
                    <div style={{ backgroundColor: "#FEF3C7", border: "2px solid #FCD34D", borderRadius: "0.375rem", padding: "1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
                      <HelpCircle size={24} style={{ color: "#D97706" }} />
                      <div>
                        <p style={{ fontWeight: "bold", color: "#92400E", marginBottom: "0.5rem" }}>📌 Gem Helper is Mandatory! / עזר Gem הוא חיובי להשלמה!</p>
                        <p style={{ color: "#92400E", fontSize: "0.9rem" }}>You must visit the Google Gemini helper to complete your research. Click the link above to open the Gem Helper. / עליך לבקר את עזר Google Gemini כדי להשלים את המחקר. לחץ על הקישור במעלה כדי לפתוח את עזר Gem.</p>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={handleSaveAndContinue}
                    disabled={isLocked || !meetsMinimum || !gemVisited || !checkTabCompletion(2, { research_text: researchText })}
                    style={{
                      width: "100%",
                      backgroundColor: isLocked || !meetsMinimum || !gemVisited || !checkTabCompletion(2, { research_text: researchText }) ? "#D1D5DB" : "#FCA5A5",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor: isLocked || !meetsMinimum || !gemVisited || !checkTabCompletion(2, { research_text: researchText }) ? "not-allowed" : "pointer",
                    }}
                  >
                    {!checkTabCompletion(2, { research_text: researchText }) && researchText.trim() ? "Fix grammar and punctuation / תקן דקדוק וסימני פיסוק" : "Save & Continue / שמור והמשך"}
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
              Design a logo for your population using Canva. Follow the steps below. (עצבו לוגו עבור אוכלוסיה שלכם בעזרת Canva. עקבו את השלבים בהמשך.)
            </p>
            
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333333", marginBottom: "1.5rem" }}>📋 Logo Design Steps / שלבי עיצוב לוגו</h2>
              
              <div style={{ marginBottom: "2rem", backgroundColor: "#F0FDF4", padding: "1.5rem", borderRadius: "0.375rem", borderLeft: "4px solid #22C55E" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>Step 1: Brainstorm Symbols / שלב 1: חישוב סמלים</h3>
                <p style={{ color: "#555555", marginBottom: "1rem" }}>Think of 3 symbols that represent your population and their needs. These symbols should be simple, recognizable, and meaningful. (חשבו על 3 סמלים שמייצגים את אוכלוסיה ואת הצרכים שלהם. הסמלים צריכים להיות פשוטים, דרישים ומטעמים.)</p>
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
                  placeholder="Example: A heart (compassion), a book (education), a hand (support) / דוגמה: לב (חמלה), ספר (חינוך), יד (עזרה)"
                />
              </div>
              
              <div style={{ marginBottom: "2rem", backgroundColor: "#F0FDF4", padding: "1.5rem", borderRadius: "0.375rem", borderLeft: "4px solid #22C55E" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>Step 2: Design in Canva / שלב 2: עיצוב ב-Canva</h3>
                <p style={{ color: "#555555", marginBottom: "1rem" }}><strong>Instructions / הוראות:</strong></p>
                <ul style={{ color: "#555555", marginBottom: "1rem", marginLeft: "1.5rem", listStyleType: "disc" }}>
                  <li>Go to <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" style={{ color: "#2563EB", textDecoration: "underline" }}>Canva.com</a> and create a new design / לך ל-Canva.com וצור עיצוב חדש</li>
                  <li>Use BLACK text/shapes only (no colors) / השתמש בטקסט וצורות שחורים בלבד בלבד (בלי צבעים)</li>
                  <li>Replace ONE letter in your population name with a silhouette element (symbol) / החלף אות אחד בשם אוכלוסיה בסמל סילוהט (סמל)</li>
                  <li>Keep it simple and professional / שמור על זה פשוט ומקצועי</li>
                  <li>Example: "CH**ILDREN**" where the "I" is replaced with a child silhouette / דוגמה: "ילדים" כאשר ה-"I" הוחלף בסילוהט של ילד</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: "2rem", backgroundColor: "#F0FDF4", padding: "1.5rem", borderRadius: "0.375rem", borderLeft: "4px solid #22C55E" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>Step 2.5: Logo Description / שלב 2.5: תיאור הלוגו</h3>
                <p style={{ color: "#555555", marginBottom: "1rem" }}>Describe your logo design. Explain the symbols you used and why they represent your population. (תארו את עיצוב הלוגו שלכם. הסבירו את הסמלים שהשתמשתם בהם ומדוע הם מייצגים את אוכלוסיה שלכם.)</p>
                <textarea
                  value={(responses as any).logoDescription || ""}
                  onChange={(e) => updateResponse("logoDescription", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.375rem",
                    fontFamily: "'Alef', 'Assistant', 'sans-serif",
                    minHeight: "100px",
                    fontSize: "0.95rem",
                  }}
                  placeholder="Describe your logo design..."
                />
                
                {/* Rubric Panel for Tab 4 - Logo Description */}
                <div style={{ marginTop: "1rem" }}>
                  <RubricPanel
                    rubricItems={getRubricForTab(4)}
                    responses={{ logo_description: (responses as any).logoDescription || "" }}
                    language="en"
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: "2rem", backgroundColor: "#F0FDF4", padding: "1.5rem", borderRadius: "0.375rem", borderLeft: "4px solid #22C55E" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333333", marginBottom: "0.75rem" }}>Step 3: Share Your Canva Link / שלב 3: שיתוף הקישור שלך ב-Canva</h3>
                <p style={{ color: "#555555", marginBottom: "1rem" }}>Paste your Canva "Can Edit" link below. Make sure the link allows editing. (הדבק את הקישור "Can Edit" שלך מ-Canva במטה. טא וודא שהקישור מאפשר עריכה.)</p>
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
                  placeholder="https://www.canva.com/design/... / הדבק קישור Canva"
                />
                {canvaLink.length > 0 && (
                  <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: isValidCanvaLink ? "#16A34A" : "#DC2626", fontWeight: "bold" }}>
                    {isValidCanvaLink ? "✓ Valid Canva link / קישור Canva תקין" : "✗ Please paste a valid Canva 'Can Edit' link / הדבק קישור 'Can Edit' תקין"}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={handleSaveAndContinue}
              disabled={!isValidCanvaLink || !checkTabCompletion(4, { logo_description: (responses as any).logoDescription || "" })}
              style={{
                width: "100%",
                backgroundColor: !isValidCanvaLink || !checkTabCompletion(4, { logo_description: (responses as any).logoDescription || "" }) ? "#D1D5DB" : "#86EFAC",
                color: "#333333",
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "0.5rem",
                cursor: !isValidCanvaLink || !checkTabCompletion(4, { logo_description: (responses as any).logoDescription || "" }) ? "not-allowed" : "pointer",
              }}
            >
              {!checkTabCompletion(4, { logo_description: (responses as any).logoDescription || "" }) && (responses as any).logoDescription ? "Fix grammar and punctuation" : "Save & Continue / שמור והמשך"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tab 6: Creating a Vector
  if (currentTab === 5) {
    const uploadedFile = (responses as any).vectorFile || null;
    const [fileError, setFileError] = React.useState("");
    
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      const allowedTypes = ['.svg', '.pdf', '.png', '.jpg', '.jpeg'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        setFileError('Please upload a valid file (SVG, PDF, PNG, or JPG)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setFileError('File size must be less than 10MB');
        return;
      }
      
      setFileError('');
      updateResponse('vectorFile', { name: file.name, size: file.size, type: file.type });
    };
    
    return (
      <div style={{ backgroundColor: "#FEF9C3", minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
              Stage 6: Transforming your Logo to a Vector / שלב 6: הפכת הלוגו לוקטור
            </h1>
            <p style={{ color: "#555555", marginBottom: "2rem" }}>
              Learn how to convert your design into a professional vector file. / למדו כיצד להפוך את העיצוב לקובץ וקטור מפורסי.
            </p>
            
            {/* Tutorial Section */}
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                📚 Tutorial / מדריך
              </h2>
              <p style={{ color: "#555555", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                Before you finish, you must learn how to turn your design into a high-quality vector file. Click the button below to open the tutorial. / לפני שתסיימו, עליכם ללמוד כיצד להפוך את העיצוב לקובץ וקטור איכותי. לחצו על הכפתור במטה כדי לפתוח את המדריך.
              </p>
              <a
                href="https://docs.google.com/presentation/d/1cyOzGa0tvc2jad1-eFhgCy-TqYCiPJWj5d75rQ0zzlQ/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#FCD34D",
                  color: "#333333",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  border: "2px solid #333333",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FBBF24";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#FCD34D";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                Open Tutorial / פתח מדריך →
              </a>
            </div>
            
            {/* File Upload Section */}
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                📄 Upload Your Final File / העלו את הקובץ הסופי
              </h2>
              <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                After following the tutorial, upload your final vector file here (SVG, PDF, or high-res PNG/JPG). / אחרי עיצוב המדריך, העלו את קובץ הוקטור הסופי שלכם כאן.
              </p>
              
              <div style={{
                border: "2px dashed #D1D5DB",
                borderRadius: "0.5rem",
                padding: "2rem",
                textAlign: "center",
                backgroundColor: "#F9FAFB",
                marginBottom: "1rem",
              }}>
                <input
                  type="file"
                  accept=".svg,.pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  id="vectorFileInput"
                />
                <label
                  htmlFor="vectorFileInput"
                  style={{
                    display: "block",
                    cursor: "pointer",
                    padding: "1rem",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📁</div>
                  <p style={{ color: "#333333", fontWeight: "bold", marginBottom: "0.25rem" }}>
                    Click to upload or drag and drop / לחץ לטעינה או גרור ורטוב
                  </p>
                  <p style={{ color: "#555555", fontSize: "0.875rem" }}>
                    SVG, PDF, PNG, JPG (Max 10MB)
                  </p>
                </label>
              </div>
              
              {fileError && (
                <div style={{
                  backgroundColor: "#FEE2E2",
                  border: "1px solid #FCA5A5",
                  borderRadius: "0.375rem",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                  color: "#DC2626",
                  fontSize: "0.875rem",
                }}>
                  ⚠️ {fileError}
                </div>
              )}
              
              {uploadedFile && (
                <div style={{
                  backgroundColor: "#ECFDF5",
                  border: "2px solid #86EFAC",
                  borderRadius: "0.375rem",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}>
                  <p style={{ color: "#16A34A", fontWeight: "bold", marginBottom: "0.25rem" }}>
                    ✓ File uploaded / קובץ טוען
                  </p>
                  <p style={{ color: "#555555", fontSize: "0.875rem" }}>
                    {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}
            </div>
            
            <button
              onClick={handleSaveAndContinue}
              disabled={!uploadedFile}
              style={{
                width: "100%",
                backgroundColor: uploadedFile ? "#FBBF24" : "#D1D5DB",
                color: "#333333",
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "0.5rem",
                cursor: uploadedFile ? "pointer" : "not-allowed",
              }}
            >
              Finish / סיים
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tab 7: Presentation
  if (currentTab === 6) {
    const uploadedPresentation = (responses as any).presentationFile || null;
    const [presentationError, setPresentationError] = React.useState("");
    
    const handlePresentationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      const allowedTypes = ['.ppt', '.pptx', '.pdf', '.key'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        setPresentationError('Please upload a valid presentation file (PPT, PPTX, PDF, or Keynote)');
        return;
      }
      
      if (file.size > 50 * 1024 * 1024) { // 50MB limit for presentations
        setPresentationError('File size must be less than 50MB');
        return;
      }
      
      setPresentationError('');
      updateResponse('presentationFile', { name: file.name, size: file.size, type: file.type });
    };
    
    return (
      <div style={{ backgroundColor: "#E0E7FF", minHeight: "100vh" }}>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
              Stage 7: Final Presentation / שלב 7: מצגה סופית
            </h1>
            <p style={{ color: "#555555", marginBottom: "2rem" }}>
              Upload your final presentation about how fashion can create social change. / העלו את המצגה הסופית שלכם על איך אופנה יכולה ליצור שינוי חברה.
            </p>
            
            {/* Presentation Upload Section */}
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333333", marginBottom: "1rem" }}>
                📊 Upload Your Presentation / העלו את המצגה
              </h2>
              <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                Upload your presentation file (PowerPoint, PDF, or Keynote). / העלו קובץ מצגה (PowerPoint, PDF, או Keynote).
              </p>
              
              <div style={{
                border: "2px dashed #818CF8",
                borderRadius: "0.5rem",
                padding: "2rem",
                textAlign: "center",
                backgroundColor: "#F0F4FF",
                marginBottom: "1rem",
              }}>
                <input
                  type="file"
                  accept=".ppt,.pptx,.pdf,.key"
                  onChange={handlePresentationUpload}
                  style={{ display: "none" }}
                  id="presentationFileInput"
                />
                <label
                  htmlFor="presentationFileInput"
                  style={{
                    display: "block",
                    cursor: "pointer",
                    padding: "1rem",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📄</div>
                  <p style={{ color: "#333333", fontWeight: "bold", marginBottom: "0.25rem" }}>
                    Click to upload or drag and drop / לחץ לטעינה או גרור ורטוב
                  </p>
                  <p style={{ color: "#555555", fontSize: "0.875rem" }}>
                    PPT, PPTX, PDF, Keynote (Max 50MB)
                  </p>
                </label>
              </div>
              
              {presentationError && (
                <div style={{
                  backgroundColor: "#FEE2E2",
                  border: "1px solid #FCA5A5",
                  borderRadius: "0.375rem",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                  color: "#DC2626",
                  fontSize: "0.875rem",
                }}>
                  ⚠️ {presentationError}
                </div>
              )}
              
              {uploadedPresentation && (
                <div style={{
                  backgroundColor: "#ECFDF5",
                  border: "2px solid #86EFAC",
                  borderRadius: "0.375rem",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}>
                  <p style={{ color: "#16A34A", fontWeight: "bold", marginBottom: "0.25rem" }}>
                    ✓ Presentation uploaded / מצגה טוענה
                  </p>
                  <p style={{ color: "#555555", fontSize: "0.875rem" }}>
                    {uploadedPresentation.name} ({(uploadedPresentation.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}
            </div>
            
            <button
              onClick={handleSaveAndContinue}
              disabled={!uploadedPresentation}
              style={{
                width: "100%",
                backgroundColor: uploadedPresentation ? "#A78BFA" : "#D1D5DB",
                color: "#333333",
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "0.5rem",
                cursor: uploadedPresentation ? "pointer" : "not-allowed",
              }}
            >
              Submit & Complete / שלח והשלמו
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
