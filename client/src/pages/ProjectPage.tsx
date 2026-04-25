import { useState } from "react";
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
  { label: "Vector Art", labelHe: "אמנות וקטור" },
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
  vectorTop: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-vector-top-dqfXCoC86xsXbvB7Sv8qAM.webp",
  vectorBottom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/icon-vector-bottom-QTp7h4ybRvh3oJjx6o6aty.webp",
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
    desc: "Which principle is used here?",
    descHe: "איזה עקרון משמש כאן?"
  },
  { 
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/gestalt-logo-closure-aW3zXAaeXzpACXWKz7RPdd.webp",
    principle: "Closure",
    principleHe: "סגירה",
    desc: "Which principle is used here?",
    descHe: "איזה עקרון משמש כאן?"
  },
  { 
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/gestalt-logo-continuity-NGcqDuAmUNehSLvDXEMdca.webp",
    principle: "Continuity",
    principleHe: "המשכיות",
    desc: "Which principle is used here?",
    descHe: "איזה עקרון משמש כאן?"
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

// Gestalt principles
const GESTALT_PRINCIPLES = [
  { name: "Proximity", nameHe: "קרבה", desc: "Objects close together are perceived as a group", descHe: "עצמים הקרובים זה לזה נתפסים כקבוצה" },
  { name: "Similarity", nameHe: "דמיון", desc: "Objects that look similar are perceived as related", descHe: "עצמים שנראים דומים נתפסים כקשורים" },
  { name: "Continuity", nameHe: "המשכיות", desc: "Elements arranged in a line or curve are perceived as connected", descHe: "אלמנטים המסודרים בקו או בעקומה נתפסים כמחוברים" },
  { name: "Closure", nameHe: "סגירה", desc: "The mind fills in missing parts to complete a shape", descHe: "המוח ממלא חלקים חסרים כדי להשלים צורה" },
  { name: "Figure-Ground", nameHe: "דמות-רקע", desc: "Objects stand out from their background", descHe: "עצמים בולטים מהרקע שלהם" },
];

// Design exercises
const DESIGN_EXERCISES = [
  {
    word: "CHANGE",
    options: [
      { text: "CHANGE", style: { fontSize: "2rem", fontWeight: "bold", color: "#333333" }, label: "Bold Black", labelHe: "שחור מודגש" },
      { text: "CHANGE", style: { fontSize: "2rem", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#86EFAC" }, label: "Fluid Green", labelHe: "ירוק זורם" },
      { text: "CHANGE", style: { fontSize: "2rem", fontWeight: "bold", color: "#FCA5A5", fontStyle: "italic" }, label: "Red Italic", labelHe: "אדום נטוי" },
    ],
    correct: 1,
    feedback: "Green represents growth and change - the fluid font makes the message feel dynamic and hopeful.",
    feedbackHe: "ירוק מייצג צמיחה ושינוי - הגופן הזורם הופך את ההודעה לדינמית ומלאת תקווה."
  },
  {
    word: "HOPE",
    options: [
      { text: "HOPE", style: { fontSize: "2rem", color: "#333333", textDecoration: "line-through" }, label: "Strikethrough", labelHe: "קו חוצה" },
      { text: "HOPE", style: { fontSize: "2rem", fontWeight: "bold", color: "#86EFAC" }, label: "Bold Green", labelHe: "ירוק מודגש" },
      { text: "HOPE", style: { fontSize: "1rem", color: "#333333" }, label: "Small Black", labelHe: "שחור קטן" },
    ],
    correct: 1,
    feedback: "Green represents growth and hope - the bold green makes the message powerful and visible.",
    feedbackHe: "ירוק מייצג צמיחה ותקווה - הירוק המודגש הופך את ההודעה לחזקה וגלויה."
  },
  {
    word: "UNITY",
    options: [
      { text: "UNITY", style: { fontSize: "2rem", color: "#FDE68A", textShadow: "2px 2px 4px #333333" }, label: "Yellow with Shadow", labelHe: "צהוב עם צל" },
      { text: "UNITY", style: { fontSize: "2rem", fontWeight: "bold", color: "#D8B4FE" }, label: "Bold Purple", labelHe: "סגול מודגש" },
      { text: "UNITY", style: { fontSize: "1.5rem", color: "#333333", letterSpacing: "0.2em" }, label: "Spaced Black", labelHe: "שחור מרווח" },
    ],
    correct: 1,
    feedback: "Purple represents creativity and unity - the bold purple creates a sense of togetherness and imagination.",
    feedbackHe: "סגול מייצג יצירתיות ואחדות - הסגול המודגש יוצר תחושה של אחדות ודמיון."
  },
];

export default function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(1);
  const [isApproved, setIsApproved] = useState(false);
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [showGrammarTips, setShowGrammarTips] = useState(false);
  const [designExerciseAnswers, setDesignExerciseAnswers] = useState<Record<number, number>>({});
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<number, { correct: boolean; message: string }>>({});
  const [gestaltPrinciples, setGestaltPrinciples] = useState<string[]>([]);

  const handleTabClick = (tabIndex: number) => {
    if (tabIndex === 0 || isApproved || tabIndex === currentTab) {
      setCurrentTab(tabIndex);
    } else {
      toast.error("This tab is locked. Wait for teacher approval.");
    }
  };

  const handleDesignExerciseAnswer = (exerciseIndex: number, selectedIndex: number) => {
    const exercise = DESIGN_EXERCISES[exerciseIndex];
    const isCorrect = selectedIndex === exercise.correct;
    
    setDesignExerciseAnswers({ ...designExerciseAnswers, [exerciseIndex]: selectedIndex });
    setExerciseFeedback({
      ...exerciseFeedback,
      [exerciseIndex]: {
        correct: isCorrect,
        message: isCorrect ? exercise.feedback : `Not quite. ${exercise.feedback}`
      }
    });
  };

  const toggleGestaltPrinciple = (principle: string) => {
    setGestaltPrinciples(prev =>
      prev.includes(principle)
        ? prev.filter(p => p !== principle)
        : [...prev, principle]
    );
  };

  const renderTab = () => {
    switch (currentTab) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={IMAGES.groupTop} alt="Group Decision" className="w-full h-48 object-cover rounded-lg" />
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Group Decision (החלטה קבוצתית)</h2>
                <p className="text-gray-700 mb-4">Work in groups of 2-3. Choose a population suffering and not aware enough of their struggle.</p>
                <p className="text-gray-700 text-sm italic">עבדו בקבוצות של 2-3. בחרו אוכלוסייה שסובלת ואנשים לא מודעים מספיק לסבלם.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Group Members (חברי הקבוצה)</h3>
              <input
                type="text"
                placeholder="Enter group member names (שם חברי הקבוצה)"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                value={responses[1]?.members || ""}
                onChange={(e) => setResponses({ ...responses, [1]: { ...responses[1], members: e.target.value } })}
              />

              <div className="bg-yellow-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-300">
                <p className="font-semibold text-gray-800">Assignment:</p>
                <p className="text-gray-700 mt-2">Think of a group of people in the world today who are suffering and people are not aware enough of their struggle.</p>
                <p className="text-gray-700 text-sm italic mt-2">תרגיל: חשבו על קבוצת אנשים בעולם היום שסובלים ואנשים לא מודעים מספיק לסבלם.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Population Comparison Table</label>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2">Criteria</th>
                          <th className="border border-gray-300 p-2">Student 1</th>
                          <th className="border border-gray-300 p-2">Student 2</th>
                          <th className="border border-gray-300 p-2">Student 3</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2 font-semibold">Name of Population</td>
                          <td className="border border-gray-300 p-2"><input type="text" className="w-full p-1 border border-gray-300 rounded" /></td>
                          <td className="border border-gray-300 p-2"><input type="text" className="w-full p-1 border border-gray-300 rounded" /></td>
                          <td className="border border-gray-300 p-2"><input type="text" className="w-full p-1 border border-gray-300 rounded" /></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-semibold">Why they're a good choice?</td>
                          <td className="border border-gray-300 p-2"><textarea className="w-full p-1 border border-gray-300 rounded" rows={2}></textarea></td>
                          <td className="border border-gray-300 p-2"><textarea className="w-full p-1 border border-gray-300 rounded" rows={2}></textarea></td>
                          <td className="border border-gray-300 p-2"><textarea className="w-full p-1 border border-gray-300 rounded" rows={2}></textarea></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 font-semibold">Why not to choose them?</td>
                          <td className="border border-gray-300 p-2"><textarea className="w-full p-1 border border-gray-300 rounded" rows={2}></textarea></td>
                          <td className="border border-gray-300 p-2"><textarea className="w-full p-1 border border-gray-300 rounded" rows={2}></textarea></td>
                          <td className="border border-gray-300 p-2"><textarea className="w-full p-1 border border-gray-300 rounded" rows={2}></textarea></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Which population did you choose? (איזו אוכלוסייה בחרתם?)</label>
                  <input
                    type="text"
                    placeholder="Population name"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                    value={responses[1]?.chosenPopulation || ""}
                    onChange={(e) => setResponses({ ...responses, [1]: { ...responses[1], chosenPopulation: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Why? (לפחות 2 משפטים) (At least 2 sentences)</label>
                  <textarea
                    placeholder="Your answer..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    value={responses[1]?.why || ""}
                    onChange={(e) => setResponses({ ...responses, [1]: { ...responses[1], why: e.target.value } })}
                  />
                  <div className="text-sm text-red-600 mt-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    Capital letter at the start! (אות גדולה בהתחלה!) Punctuation at the end! (סימן פיסוק בסוף!)
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (responses[1]?.why && responses[1].why.split('.').length >= 2) {
                  setIsApproved(true);
                  setCurrentTab(2);
                  toast.success("Saved! Moving to next tab...");
                } else {
                  toast.error("Please write at least 2 sentences with proper punctuation.");
                }
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
            >
              Save & Continue
            </button>

            <img src={IMAGES.groupBottom} alt="Group Decision Bottom" className="w-full h-48 object-cover rounded-lg" />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={IMAGES.researchTop} alt="Research" className="w-full h-48 object-cover rounded-lg" />
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Research (מחקר)</h2>
                <p className="text-gray-700">Answer 4 research questions about your chosen population.</p>
                <p className="text-gray-700 text-sm italic">ענו על 4 שאלות מחקר על האוכלוסייה שבחרתם.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800">Grammar Rules:</p>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• Capital letter at start</li>
                    <li>• Punctuation at end</li>
                    <li>• Simple past & present tense</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800">חוקים דקדוקיים:</p>
                  <ul className="text-sm text-gray-700 mt-2 space-y-1">
                    <li>• אות גדולה בהתחלה</li>
                    <li>• סימן פיסוק בסוף</li>
                    <li>• עבר פשוט והווה פשוט</li>
                  </ul>
                </div>
                <button
                  onClick={() => setShowGrammarTips(!showGrammarTips)}
                  className="bg-green-500 text-white p-4 rounded-lg font-bold hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <HelpCircle size={20} />
                  Grammar Tips
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">1. Who are they? (מי הם?) - At least 2 sentences</label>
                  <textarea
                    placeholder="Your answer..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-20"
                    value={responses[2]?.q1 || ""}
                    onChange={(e) => setResponses({ ...responses, [2]: { ...responses[2], q1: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">2. Why are they special? (למה הם מיוחדים?) - At least 2 sentences</label>
                  <textarea
                    placeholder="Your answer..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-20"
                    value={responses[2]?.q2 || ""}
                    onChange={(e) => setResponses({ ...responses, [2]: { ...responses[2], q2: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">3. What is their problem? (מה הבעיה שלהם?) - At least 3 sentences</label>
                  <textarea
                    placeholder="Your answer..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    value={responses[2]?.q3 || ""}
                    onChange={(e) => setResponses({ ...responses, [2]: { ...responses[2], q3: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">4. What needs to change? (מה צריך להשתנות?) - At least 2 sentences</label>
                  <textarea
                    placeholder="Your answer..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-20"
                    value={responses[2]?.q4 || ""}
                    onChange={(e) => setResponses({ ...responses, [2]: { ...responses[2], q4: e.target.value } })}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const q1Sentences = (responses[2]?.q1 || "").split(".").filter((s: string) => s.trim()).length;
                const q2Sentences = (responses[2]?.q2 || "").split(".").filter((s: string) => s.trim()).length;
                const q3Sentences = (responses[2]?.q3 || "").split(".").filter((s: string) => s.trim()).length;
                const q4Sentences = (responses[2]?.q4 || "").split(".").filter((s: string) => s.trim()).length;

                if (q1Sentences >= 2 && q2Sentences >= 2 && q3Sentences >= 3 && q4Sentences >= 2) {
                  setIsApproved(true);
                  setCurrentTab(3);
                  toast.success("Saved! Moving to next tab...");
                } else {
                  toast.error("Please meet the sentence requirements for all questions.");
                }
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
            >
              Save & Continue
            </button>

            <img src={IMAGES.researchBottom} alt="Research Bottom" className="w-full h-48 object-cover rounded-lg" />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={IMAGES.designTop} alt="Design Inquiry" className="w-full h-48 object-cover rounded-lg" />
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Design Inquiry (חוקי עיצוב)</h2>
                <p className="text-gray-700">Learn about color meanings and design principles to create impactful fashion items.</p>
                <p className="text-gray-700 text-sm italic">למדו על משמעויות צבעים ועקרונות עיצוב כדי ליצור פריטי אופנה משפיעים.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Color Meaning Chart (תרשים משמעות הצבע)</h3>
              <p className="text-gray-700 mb-4">Different colors carry different meanings. Choose colors that match your message for social change.</p>
              <p className="text-gray-700 text-sm italic mb-4">צבעים שונים נושאים משמעויות שונות. בחרו צבעים שמתאימים להודעה שלכם לשינוי חברתי.</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {COLOR_MEANINGS.map((item) => (
                  <div key={item.name} className="p-4 rounded-lg border-2 border-gray-300" style={{ backgroundColor: item.color }}>
                    <p className="font-bold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-700">{item.nameHe}</p>
                    <p className="font-semibold text-gray-800 mt-2">{item.meaning}</p>
                    <p className="text-sm text-gray-700">{item.meaningHe}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Gestalt Principles (עקרונות גשטלט)</h3>
              <p className="text-gray-700 mb-4">Gestalt principles explain how we perceive visual elements as unified wholes. These principles help create logos and designs that communicate effectively.</p>
              <p className="text-gray-700 text-sm italic mb-6">עקרונות גשטלט מסבירים כיצד אנו תופסים אלמנטים ויזואליים כשלמויות מאוחדות. עקרונות אלה עוזרים ליצור לוגוים ועיצובים שמתקשרים בצורה יעילה.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {GESTALT_PRINCIPLES.map((principle) => (
                  <div key={principle.name} className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                    <p className="font-bold text-gray-800">{principle.name}</p>
                    <p className="text-sm text-gray-700">{principle.nameHe}</p>
                    <p className="text-gray-700 mt-2">{principle.desc}</p>
                    <p className="text-sm text-gray-700 italic">{principle.descHe}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Design Exercises (תרגילי עיצוב)</h3>
              <p className="text-gray-700 mb-6">Choose the design that best communicates the message. Think about color, font, and style.</p>
              <p className="text-gray-700 text-sm italic mb-6">בחרו את העיצוב שמתקשר הכי טוב את ההודעה. חשבו על צבע, גופן וסגנון.</p>

              <div className="space-y-8">
                {DESIGN_EXERCISES.map((exercise, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-300">
                    <p className="font-bold text-gray-800 mb-4">Exercise {idx + 1}: Which design best conveys "{exercise.word}"?</p>
                    <p className="text-sm text-gray-700 italic mb-4">תרגיל {idx + 1}: איזה עיצוב מעביר הכי טוב את "{exercise.word}"?</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {exercise.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleDesignExerciseAnswer(idx, optIdx)}
                          className={`p-6 rounded-lg border-2 transition-all ${
                            designExerciseAnswers[idx] === optIdx
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <div style={option.style} className="mb-3 text-center">
                            {option.text}
                          </div>
                          <p className="text-sm font-semibold text-gray-800">{option.label}</p>
                          <p className="text-xs text-gray-700">{option.labelHe}</p>
                        </button>
                      ))}
                    </div>

                    {exerciseFeedback[idx] && (
                      <div className={`p-4 rounded-lg flex items-start gap-3 ${
                        exerciseFeedback[idx].correct ? "bg-green-50 border border-green-300" : "bg-red-50 border border-red-300"
                      }`}>
                        {exerciseFeedback[idx].correct ? (
                          <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                        ) : (
                          <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                        )}
                        <div>
                          <p className="font-semibold text-gray-800">{exerciseFeedback[idx].correct ? "Correct!" : "Not quite..."}</p>
                          <p className="text-gray-700 text-sm mt-1">{exerciseFeedback[idx].message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Gestalt Logos Examples (דוגמאות לוגו עם גשטלט)</h3>
              <p className="text-gray-700 mb-6">Look at these logos and identify which Gestalt principles are used in each one.</p>
              <p className="text-gray-700 text-sm italic mb-6">הסתכלו על הלוגוים האלה וזהו אילו עקרונות גשטלט משמשים בכל אחד.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GESTALT_LOGOS.map((logo, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                    <img src={logo.url} alt={`Gestalt Logo ${idx + 1}`} className="w-full h-40 object-cover rounded-lg mb-4" />
                    <p className="font-bold text-gray-800 mb-2">{logo.desc}</p>
                    <p className="text-sm text-gray-700 italic mb-4">{logo.descHe}</p>
                    <p className="text-sm font-semibold text-gray-800">Answer: {logo.principle} ({logo.principleHe})</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setIsApproved(true);
                setCurrentTab(4);
                toast.success("Saved! Moving to next tab...");
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
            >
              Save & Continue
            </button>

            <img src={IMAGES.designBottom} alt="Design Inquiry Bottom" className="w-full h-48 object-cover rounded-lg" />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={IMAGES.logoTop} alt="Logo Design" className="w-full h-48 object-cover rounded-lg" />
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Creating a Logo (יצירת לוגו)</h2>
                <p className="text-gray-700">Design a logo for your chosen population using Gestalt principles.</p>
                <p className="text-gray-700 text-sm italic">עצבו לוגו לאוכלוסייה שבחרתם באמצעות עקרונות גשטלט.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions (הוראות)</h3>
              <p className="text-gray-700 mb-2">Keep it simple. Use 2 colors. Use 1 symbol.</p>
              <p className="text-gray-700 text-sm italic mb-6">שמרו על פשטות. השתמשו ב-2 צבעים. השתמשו בסמל אחד.</p>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-300">
                <p className="font-semibold text-gray-800">Think of 3 symbols that represent your population.</p>
                <p className="text-gray-700 text-sm mt-2">For instance - Jews: the Star of David, a lion, the shape of Israel.</p>
                <p className="text-gray-700 text-sm italic mt-2">חשבו על 3 סמלים המייצגים את האוכלוסייה שלכם.</p>
                <p className="text-gray-700 text-sm italic">לדוגמה - יהודים: מגן דוד, אריה, צורת ישראל.</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Population Name (שם האוכלוסייה)</label>
                  <input
                    type="text"
                    placeholder="Enter population name"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={responses[4]?.populationName || ""}
                    onChange={(e) => setResponses({ ...responses, [4]: { ...responses[4], populationName: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">3 Symbols (3 סמלים)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <input
                        key={i}
                        type="text"
                        placeholder={`Symbol ${i}`}
                        className="p-3 border border-gray-300 rounded-lg"
                        value={responses[4]?.[`symbol${i}`] || ""}
                        onChange={(e) => setResponses({ ...responses, [4]: { ...responses[4], [`symbol${i}`]: e.target.value } })}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">If you could switch a letter in the name for one of the symbols, which letter would you choose? (אם היית יכול להחליף אות בשם בסמל אחד, איזו אות היית בוחר?)</label>
                  <input
                    type="text"
                    placeholder="Your answer"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={responses[4]?.letterSwitch || ""}
                    onChange={(e) => setResponses({ ...responses, [4]: { ...responses[4], letterSwitch: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Select Gestalt Principles (בחרו עקרונות גשטלט)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {GESTALT_PRINCIPLES.map((principle) => (
                      <button
                        key={principle.name}
                        onClick={() => toggleGestaltPrinciple(principle.name)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          gestaltPrinciples.includes(principle.name)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <p className="font-semibold text-gray-800">{principle.name}</p>
                        <p className="text-sm text-gray-700">{principle.nameHe}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Draw Your Logo (צייר את הלוגו שלך)</h3>
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
                <CanvasDraw
                  ref={(canvasDraw) => {
                    if (canvasDraw) {
                      responses[4] = { ...responses[4], canvasData: canvasDraw.getSaveData() };
                    }
                  }}
                  canvasWidth={600}
                  canvasHeight={400}
                  brushColor="#000000"
                  brushRadius={3}
                  lazyRadius={0}
                  hideGrid
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-800 mb-2">Upload Logo File (העלו קובץ לוגו)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setResponses({ ...responses, [4]: { ...responses[4], logoFile: e.target.files[0].name } });
                      toast.success("File uploaded!");
                    }
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                setIsApproved(true);
                setCurrentTab(5);
                toast.success("Saved! Moving to next tab...");
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
            >
              Save & Continue
            </button>

            <img src={IMAGES.logoBottom} alt="Logo Design Bottom" className="w-full h-48 object-cover rounded-lg" />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={IMAGES.vectorTop} alt="Vector Art" className="w-full h-48 object-cover rounded-lg" />
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Vector Art (אמנות וקטור)</h2>
                <p className="text-gray-700 italic">צרו סילואט וקטור שמייצג את האוכלוסייה שלכם. השתמשו בצורות גיאומטריות פשוטות וקווים נקיים.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 italic">הוראות (Instructions)</h3>
              <ul className="text-gray-700 space-y-2 mb-6 italic">
                <li>• צרו סילואט פשוט של אדם או קבוצת אנשים</li>
                <li>• השתמשו בצורות גיאומטריות בלבד (עיגולים, ריבועים, משולשים)</li>
                <li>• שמרו על פשטות - לא יותר מ-5 צורות</li>
                <li>• השתמשו בצבע שחור בלבד</li>
                <li>• הסילואט צריך לייצג את הערכים של האוכלוסייה</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Draw Your Silhouette (צייר את הסילואט שלך)</h3>
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
                <CanvasDraw
                  ref={(canvasDraw) => {
                    if (canvasDraw) {
                      responses[5] = { ...responses[5], canvasData: canvasDraw.getSaveData() };
                    }
                  }}
                  canvasWidth={600}
                  canvasHeight={400}
                  brushColor="#000000"
                  brushRadius={3}
                  lazyRadius={0}
                  hideGrid
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-800 mb-2 italic">העלו קובץ סילואט (Upload Silhouette File)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setResponses({ ...responses, [5]: { ...responses[5], silhouetteFile: e.target.files[0].name } });
                      toast.success("File uploaded!");
                    }
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                setIsApproved(true);
                setCurrentTab(6);
                toast.success("Saved! Moving to next tab...");
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
            >
              Save & Continue
            </button>

            <img src={IMAGES.vectorBottom} alt="Vector Art Bottom" className="w-full h-48 object-cover rounded-lg" />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={IMAGES.fashionTop} alt="Fashion Item" className="w-full h-48 object-cover rounded-lg" />
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Fashion Item (פריט אופנה)</h2>
                <p className="text-gray-700">Design a fashion item that sends a message for your population.</p>
                <p className="text-gray-700 text-sm italic">עצבו פריט אופנה שמעביר הודעה לאוכלוסייה שלכם.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">What is the item? (מה הפריט?)</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={responses[6]?.itemType || ""}
                    onChange={(e) => setResponses({ ...responses, [6]: { ...responses[6], itemType: e.target.value } })}
                  >
                    <option value="">Select an item</option>
                    <option value="shirt">T-Shirt / חולצה</option>
                    <option value="hat">Hat / כובע</option>
                    <option value="bag">Bag / תיק</option>
                    <option value="other">Other / אחר</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Describe your fashion item (תארו את פריט האופנה שלכם)</label>
                  <textarea
                    placeholder="Your description..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    value={responses[6]?.description || ""}
                    onChange={(e) => setResponses({ ...responses, [6]: { ...responses[6], description: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Upload Fashion Item Design (העלו עיצוב של פריט האופנה)</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setResponses({ ...responses, [6]: { ...responses[6], fashionFile: e.target.files[0].name } });
                        toast.success("File uploaded!");
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsApproved(true);
                setCurrentTab(7);
                toast.success("Saved! Moving to next tab...");
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
            >
              Save & Continue
            </button>

            <img src={IMAGES.fashionBottom} alt="Fashion Item Bottom" className="w-full h-48 object-cover rounded-lg" />
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src={IMAGES.presentationTop} alt="Presentation" className="w-full h-48 object-cover rounded-lg" />
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Presentation (מצגת)</h2>
                <p className="text-gray-700">Prepare your presentation checklist before presenting to the class.</p>
                <p className="text-gray-700 text-sm italic">הכינו את רשימת הבדיקה שלכם לפני הצגה בכיתה.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Presentation Checklist (רשימת בדיקה למצגת)</h3>
              <div className="space-y-3">
                {[
                  "We introduced our population and why we chose them",
                  "We explained the problem they face",
                  "We showed our logo and explained the Gestalt principles used",
                  "We presented our vector silhouette and its meaning",
                  "We showed our fashion item and explained the message",
                  "We explained how fashion can create change for our population"
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={responses[7]?.[`check${idx}`] || false}
                      onChange={(e) => setResponses({ ...responses, [7]: { ...responses[7], [`check${idx}`]: e.target.checked } })}
                    />
                    <span className="text-gray-800">{item}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <label className="block font-semibold text-gray-800 mb-2">Additional Notes (הערות נוספות)</label>
                <textarea
                  placeholder="Any additional notes..."
                  className="w-full p-3 border border-gray-300 rounded-lg h-20"
                  value={responses[7]?.notes || ""}
                  onChange={(e) => setResponses({ ...responses, [7]: { ...responses[7], notes: e.target.value } })}
                />
              </div>
            </div>

            <button
              onClick={() => {
                setIsApproved(true);
                setCurrentTab(8);
                toast.success("Saved! Moving to next tab...");
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
            >
              Save & Continue
            </button>

            <img src={IMAGES.presentationBottom} alt="Presentation Bottom" className="w-full h-48 object-cover rounded-lg" />
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Reflection (רפלקציה)</h2>
              <p className="text-gray-700 mb-6">Reflect on your project and learning journey.</p>
              <p className="text-gray-700 text-sm italic mb-6">תרגלו על הפרויקט שלכם ועל מסע הלמידה שלכם.</p>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">What did you learn about your population? (מה למדתם על האוכלוסייה שלכם?)</label>
                  <textarea
                    placeholder="Your reflection..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    value={responses[8]?.q1 || ""}
                    onChange={(e) => setResponses({ ...responses, [8]: { ...responses[8], q1: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">How can fashion create social change? (איך אופנה יכולה ליצור שינוי חברתי?)</label>
                  <textarea
                    placeholder="Your reflection..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    value={responses[8]?.q2 || ""}
                    onChange={(e) => setResponses({ ...responses, [8]: { ...responses[8], q2: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">What was the most challenging part of this project? (מה היה החלק הקשה ביותר בפרויקט זה?)</label>
                  <textarea
                    placeholder="Your reflection..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    value={responses[8]?.q3 || ""}
                    onChange={(e) => setResponses({ ...responses, [8]: { ...responses[8], q3: e.target.value } })}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">What would you do differently next time? (מה היית עושה אחרת בפעם הבאה?)</label>
                  <textarea
                    placeholder="Your reflection..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    value={responses[8]?.q4 || ""}
                    onChange={(e) => setResponses({ ...responses, [8]: { ...responses[8], q4: e.target.value } })}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                toast.success("Project completed! Thank you for your work.");
              }}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
            >
              Submit Project
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: "#b79d8a" }}>
      <Navigation currentTab={currentTab} onTabChange={handleTabClick} canAccessTab={() => true} tabs={TABS} />
      
      <div className="max-w-6xl mx-auto p-6">
        {renderTab()}
      </div>
    </div>
  );
}
