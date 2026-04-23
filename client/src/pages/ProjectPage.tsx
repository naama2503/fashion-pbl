import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { ExternalLink, Lock } from "lucide-react";

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
  { name: "Yellow", he: "צהוב", meaning: "Optimistic (אופטימי)", bg: "bg-yellow-400" },
  { name: "Orange", he: "כתום", meaning: "Friendly (חברותי)", bg: "bg-orange-400" },
  { name: "Red", he: "אדום", meaning: "Excitement (התרגשות)", bg: "bg-red-400" },
  { name: "Purple", he: "סגול", meaning: "Creative (יצירתי)", bg: "bg-purple-400" },
  { name: "Blue", he: "כחול", meaning: "Trust (אמון)", bg: "bg-blue-400" },
  { name: "Green", he: "ירוק", meaning: "Peace/Growth (שלום/צמיחה)", bg: "bg-green-400" },
  { name: "Grey", he: "אפור", meaning: "Balance (איזון)", bg: "bg-gray-400" },
];

export default function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [approvals, setApprovals] = useState([true, false, false, false, false, false, false]);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const canAccessTab = (tabIndex: number): boolean => {
    return tabIndex === 0 || approvals[tabIndex - 1];
  };

  const handleSave = () => {
    if (!canAccessTab(currentTab)) {
      toast.error("This tab is locked. Get teacher approval for the previous tab first!");
      return;
    }
    toast.success(`Tab ${currentTab + 1} saved! (שמור!)`);
  };

  const updateResponse = (key: string, value: any) => {
    setResponses({ ...responses, [key]: value });
  };

  // Tab 1: Home
  if (currentTab === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div className="md:ml-64 pt-20 md:pt-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              HOW CAN FASHION CREATE SOCIAL CHANGE?
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              Fashion can change the world! (אופנה יכולה לשנות את העולם!)
            </p>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                In this project, you will work in groups to design a fashion item that sends a message for social change.
              </p>
              <p className="text-lg text-gray-600">
                בפרויקט זה, תעבדו בקבוצות כדי לעצב פריט אופנה השולח הודעה לשינוי חברתי.
              </p>
            </div>
            <Button onClick={() => setCurrentTab(1)} className="mt-8 bg-gray-900 text-white px-8 py-4 text-lg font-bold">
              Start Your Project →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Tab 2: Group Decision
  if (currentTab === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div className="md:ml-64 pt-20 md:pt-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Group Decision (החלטה קבוצתית)</h1>
            <p className="text-gray-600 mb-8">Work in groups of 2-3. Choose a suffering group to help.</p>

            {!canAccessTab(1) && (
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Lock size={24} className="text-yellow-600" />
                <p className="font-bold text-yellow-800">This tab is locked. Get teacher approval for Tab 1 first!</p>
              </div>
            )}

            <Card className="p-8 border-2 border-gray-300 space-y-6">
              <div>
                <label className="block font-bold text-lg mb-2">Group Name (שם הקבוצה)</label>
                <Input
                  placeholder="e.g., Helping Homeless"
                  value={responses.groupName || ""}
                  onChange={(e) => updateResponse("groupName", e.target.value)}
                  disabled={!canAccessTab(1)}
                  className="border-2"
                />
              </div>

              <div>
                <label className="block font-bold text-lg mb-2">Group Members (חברי הקבוצה)</label>
                <Input
                  placeholder="Names separated by commas"
                  value={responses.members || ""}
                  onChange={(e) => updateResponse("members", e.target.value)}
                  disabled={!canAccessTab(1)}
                  className="border-2"
                />
              </div>

              <div>
                <label className="block font-bold text-lg mb-2">Why did you choose this group? (למה בחרתם בקבוצה זו?)</label>
                <Textarea
                  placeholder="Explain your choice..."
                  value={responses.whyChosen || ""}
                  onChange={(e) => updateResponse("whyChosen", e.target.value)}
                  disabled={!canAccessTab(1)}
                  className="border-2 min-h-32"
                />
                <p className="text-xs text-red-600 mt-2">💡 CAPITAL LETTER at the start! (אות גדולה בהתחלה!) Punctuation at the end! (סימן פיסוק בסוף!)</p>
              </div>

              <Button onClick={handleSave} disabled={!canAccessTab(1)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3">
                Save & Continue
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Tab 3: Research
  if (currentTab === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div className="md:ml-64 pt-20 md:pt-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Research (מחקר)</h1>
            <p className="text-gray-600 mb-8">Answer these 4 questions about your chosen group.</p>

            {!canAccessTab(2) && (
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Lock size={24} className="text-yellow-600" />
                <p className="font-bold text-yellow-800">This tab is locked. Get teacher approval for Tab 2 first!</p>
              </div>
            )}

            <Card className="p-8 border-2 border-gray-300 space-y-6">
              {[
                { q: "Who are they? (מי הם?)", key: "q1" },
                { q: "Why are they special? (למה הם מיוחדים?)", key: "q2" },
                { q: "What is their problem? (מה הבעיה שלהם?)", key: "q3" },
                { q: "What needs to change? (מה צריך להשתנות?)", key: "q4" },
              ].map((item) => (
                <div key={item.key}>
                  <label className="block font-bold text-lg mb-2">{item.q}</label>
                  <Textarea
                    placeholder="Your answer..."
                    value={responses[item.key] || ""}
                    onChange={(e) => updateResponse(item.key, e.target.value)}
                    disabled={!canAccessTab(2)}
                    className="border-2 min-h-24"
                  />
                  <p className="text-xs text-red-600 mt-1">💡 CAPITAL LETTER at the start! Punctuation at the end!</p>
                </div>
              ))}

              <Button onClick={handleSave} disabled={!canAccessTab(2)} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3">
                Save & Continue
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Tab 4: Design Inquiry (Color Meaning Chart)
  if (currentTab === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div className="md:ml-64 pt-20 md:pt-0 p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Design Inquiry (חוקי עיצוב)</h1>
            <p className="text-gray-600 mb-8">Color Meaning Chart - Choose 2 colors for your design.</p>

            {!canAccessTab(3) && (
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Lock size={24} className="text-yellow-600" />
                <p className="font-bold text-yellow-800">This tab is locked. Get teacher approval for Tab 3 first!</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
              {COLORS.map((color) => (
                <Card key={color.name} className={`${color.bg} p-6 rounded-lg border-2 border-gray-300 text-center cursor-pointer hover:shadow-lg transition-all`}>
                  <div className="font-black text-lg text-gray-900">{color.name}</div>
                  <div className="text-sm text-gray-800">{color.he}</div>
                  <div className="text-xs font-bold text-gray-900 mt-2">{color.meaning}</div>
                </Card>
              ))}
            </div>

            <Card className="p-8 border-2 border-gray-300 space-y-6">
              <div>
                <label className="block font-bold text-lg mb-2">Which 2 colors did you choose? (אילו 2 צבעים בחרתם?)</label>
                <Input
                  placeholder="e.g., Orange and Blue"
                  value={responses.colorsChosen || ""}
                  onChange={(e) => updateResponse("colorsChosen", e.target.value)}
                  disabled={!canAccessTab(3)}
                  className="border-2"
                />
              </div>

              <div>
                <label className="block font-bold text-lg mb-2">Why did you choose these colors? (למה בחרתם בצבעים האלה?)</label>
                <Textarea
                  placeholder="Explain your choice..."
                  value={responses.colorExplanation || ""}
                  onChange={(e) => updateResponse("colorExplanation", e.target.value)}
                  disabled={!canAccessTab(3)}
                  className="border-2 min-h-32"
                />
                <p className="text-xs text-red-600 mt-2">💡 CAPITAL LETTER at the start! Punctuation at the end!</p>
              </div>

              <Button onClick={handleSave} disabled={!canAccessTab(3)} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3">
                Save & Continue
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Tab 5: Creating a Logo
  if (currentTab === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div className="md:ml-64 pt-20 md:pt-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Creating a Logo (יצירת לוגו)</h1>
            <p className="text-gray-600 mb-8">Keep it simple. Use 2 colors. Use 1 symbol.</p>

            {!canAccessTab(4) && (
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Lock size={24} className="text-yellow-600" />
                <p className="font-bold text-yellow-800">This tab is locked. Get teacher approval for Tab 4 first!</p>
              </div>
            )}

            <Card className="p-8 border-2 border-gray-300 space-y-6">
              <div>
                <label className="block font-bold text-lg mb-2">Describe your logo (תאר את הלוגו שלך)</label>
                <Textarea
                  placeholder="Describe your logo design..."
                  value={responses.logoDescription || ""}
                  onChange={(e) => updateResponse("logoDescription", e.target.value)}
                  disabled={!canAccessTab(4)}
                  className="border-2 min-h-32"
                />
                <p className="text-xs text-red-600 mt-2">💡 CAPITAL LETTER at the start! Punctuation at the end!</p>
              </div>

              <div>
                <label className="block font-bold text-lg mb-2">Why does this logo represent your message? (למה הלוגו הזה מייצג את ההודעה שלך?)</label>
                <Textarea
                  placeholder="Explain the symbolism..."
                  value={responses.logoReasoning || ""}
                  onChange={(e) => updateResponse("logoReasoning", e.target.value)}
                  disabled={!canAccessTab(4)}
                  className="border-2 min-h-32"
                />
                <p className="text-xs text-red-600 mt-2">💡 CAPITAL LETTER at the start! Punctuation at the end!</p>
              </div>

              <Button onClick={handleSave} disabled={!canAccessTab(4)} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3">
                Save & Continue
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Tab 6: Fashion Item
  if (currentTab === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div className="md:ml-64 pt-20 md:pt-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Fashion Item (פריט אופנה)</h1>
            <p className="text-gray-600 mb-8">Describe the fashion item you will create.</p>

            {!canAccessTab(5) && (
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Lock size={24} className="text-yellow-600" />
                <p className="font-bold text-yellow-800">This tab is locked. Get teacher approval for Tab 5 first!</p>
              </div>
            )}

            <Card className="p-8 border-2 border-gray-300 space-y-6">
              <div>
                <label className="block font-bold text-lg mb-2">What is the fashion item? (מה הפריט?)</label>
                <Input
                  placeholder="e.g., Shirt, Hat, Bag, Jacket"
                  value={responses.itemType || ""}
                  onChange={(e) => updateResponse("itemType", e.target.value)}
                  disabled={!canAccessTab(5)}
                  className="border-2"
                />
              </div>

              <div>
                <label className="block font-bold text-lg mb-2">Describe the item (תאר את הפריט)</label>
                <Textarea
                  placeholder="Describe colors, symbols, text, etc..."
                  value={responses.itemDescription || ""}
                  onChange={(e) => updateResponse("itemDescription", e.target.value)}
                  disabled={!canAccessTab(5)}
                  className="border-2 min-h-32"
                />
                <p className="text-xs text-red-600 mt-2">💡 CAPITAL LETTER at the start! Punctuation at the end!</p>
              </div>

              <div>
                <label className="block font-bold text-lg mb-2">How does this item help your group? (איך הפריט הזה עוזר לקבוצתך?)</label>
                <Textarea
                  placeholder="Explain the impact..."
                  value={responses.itemImpact || ""}
                  onChange={(e) => updateResponse("itemImpact", e.target.value)}
                  disabled={!canAccessTab(5)}
                  className="border-2 min-h-32"
                />
                <p className="text-xs text-red-600 mt-2">💡 CAPITAL LETTER at the start! Punctuation at the end!</p>
              </div>

              <Button onClick={handleSave} disabled={!canAccessTab(5)} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3">
                Save & Continue
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Tab 7: Presentation
  if (currentTab === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} canAccessTab={canAccessTab} tabs={TABS} />
        
        <div className="md:ml-64 pt-20 md:pt-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Presentation (מצגת)</h1>
            <p className="text-gray-600 mb-8">Final checklist before presenting your project.</p>

            {!canAccessTab(6) && (
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Lock size={24} className="text-yellow-600" />
                <p className="font-bold text-yellow-800">This tab is locked. Get teacher approval for Tab 6 first!</p>
              </div>
            )}

            <Card className="p-8 border-2 border-gray-300 space-y-6">
              <div className="space-y-4">
                {[
                  "We chose a suffering group",
                  "We researched the group (4 questions answered)",
                  "We chose meaningful colors",
                  "We created a simple logo with 1 symbol",
                  "We designed a fashion item",
                  "Our item sends a message for change",
                  "We are ready to present!",
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={responses[`check_${idx}`] || false}
                      onChange={(e) => updateResponse(`check_${idx}`, e.target.checked)}
                      disabled={!canAccessTab(6)}
                      className="w-5 h-5"
                    />
                    <span className="font-bold text-gray-900">{item}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block font-bold text-lg mb-2">Final Reflection (הרהורים סופיים)</label>
                <Textarea
                  placeholder="What did you learn from this project?"
                  value={responses.reflection || ""}
                  onChange={(e) => updateResponse("reflection", e.target.value)}
                  disabled={!canAccessTab(6)}
                  className="border-2 min-h-32"
                />
                <p className="text-xs text-red-600 mt-2">💡 CAPITAL LETTER at the start! Punctuation at the end!</p>
              </div>

              <Button onClick={handleSave} disabled={!canAccessTab(6)} className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3">
                Submit Project
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
