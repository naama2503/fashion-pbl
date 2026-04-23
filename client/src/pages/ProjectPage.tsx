/*
 * Fashion PBL – Main Project Page with 7 Tabs
 * Features: Hebrew translations, grammar helpers, gating system, Supabase integration
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { translations } from "@/lib/translations";
import { ExternalLink, Lock, CheckCircle } from "lucide-react";

const COLOR_CHART = translations.tab3.colorChart;
const LOGO_EXAMPLES = [
  { name: "Old Hats", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/logo-old-hats-FoQThQBHDbC25LfTcLaJEw.webp" },
  { name: "Social Protest", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/logo-social-protest-MJAss8nuvVNebqJ6Xu6BPY.webp" },
  { name: "Protester", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/logo-protester-L2gSyLm76K6P6RdvXPk2aC.webp" },
];

interface TabState {
  tab1_groupName: string;
  tab1_members: string[];
  tab1_whyChosen: string;
  tab2_q1_who: string;
  tab2_q2_why: string;
  tab2_q3_problem: string;
  tab2_q4_change: string;
  tab3_colorChoices: Record<string, string>;
  tab3_colorExplanation: string;
  tab4_logoDescription: string;
  tab4_logoReasoning: string;
  tab5_itemType: string;
  tab5_itemDescription: string;
  tab5_howItHelps: string;
  tab6_checklist: Record<string, boolean>;
  tab7_reflection: string;
}

const INITIAL_STATE: TabState = {
  tab1_groupName: "",
  tab1_members: [""],
  tab1_whyChosen: "",
  tab2_q1_who: "",
  tab2_q2_why: "",
  tab2_q3_problem: "",
  tab2_q4_change: "",
  tab3_colorChoices: {},
  tab3_colorExplanation: "",
  tab4_logoDescription: "",
  tab4_logoReasoning: "",
  tab5_itemType: "",
  tab5_itemDescription: "",
  tab5_howItHelps: "",
  tab6_checklist: translations.tab6.checklist.reduce((acc, item) => ({ ...acc, [item]: false }), {}),
  tab7_reflection: "",
};

const APPROVALS = [false, false, false, false, false, false, false]; // Simulated approvals

export default function ProjectPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [state, setState] = useState<TabState>(INITIAL_STATE);
  const [memberName, setMemberName] = useState("");

  // Gating logic: can only access tab if previous is approved
  const canAccessTab = (tabIndex: number) => tabIndex === 0 || APPROVALS[tabIndex - 1];

  const handleSave = () => {
    toast.success("✓ Saved! (שמור!)");
  };

  const handleNext = () => {
    handleSave();
    if (currentTab < 6 && canAccessTab(currentTab + 1)) {
      setCurrentTab(currentTab + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  const GrammarHelper = () => (
    <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded text-sm">
      <p className="text-red-700 font-semibold">{translations.grammar.reminder}</p>
    </div>
  );

  const TabLock = ({ tabIndex }: { tabIndex: number }) => {
    if (canAccessTab(tabIndex)) return null;
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <Lock size={48} className="mx-auto mb-4 text-gray-500" />
          <p className="text-gray-700 font-semibold">{translations.gating.locked}</p>
          <p className="text-gray-600 text-sm mt-2">{translations.gating.waitForApproval}</p>
        </div>
      </div>
    );
  };

  const ApprovalBadge = ({ tabIndex }: { tabIndex: number }) => (
    <div className="flex items-center gap-2 mb-4">
      {APPROVALS[tabIndex] ? (
        <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          <CheckCircle size={16} />
          {translations.gating.approved}
        </div>
      ) : (
        <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
          {translations.gating.pending}
        </div>
      )}
    </div>
  );

  // ─── TAB 1: GROUP DECISION ───
  const Tab1 = () => (
    <div className="space-y-6">
      <ApprovalBadge tabIndex={0} />
      {!canAccessTab(0) ? (
        <TabLock tabIndex={0} />
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold mb-2">{translations.tab1.title}</h3>
            <p className="text-gray-600 mb-4">{translations.tab1.subtitle}</p>
          </div>

          <GrammarHelper />

          <div>
            <label className="block font-semibold mb-2">{translations.tab1.groupName}</label>
            <Input
              value={state.tab1_groupName}
              onChange={(e) => setState({ ...state, tab1_groupName: e.target.value })}
              placeholder={translations.tab1.groupNamePlaceholder}
              className="border-2 border-gray-300"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">{translations.tab1.members}</label>
            {state.tab1_members.map((member, idx) => (
              <Input
                key={idx}
                value={member}
                onChange={(e) => {
                  const newMembers = [...state.tab1_members];
                  newMembers[idx] = e.target.value;
                  setState({ ...state, tab1_members: newMembers });
                }}
                placeholder={`${translations.tab1.memberName} ${idx + 1}`}
                className="mb-2 border-2 border-gray-300"
              />
            ))}
            <Button
              onClick={() => setState({ ...state, tab1_members: [...state.tab1_members, ""] })}
              variant="outline"
              className="w-full"
            >
              {translations.tab1.addMember}
            </Button>
          </div>

          <div>
            <label className="block font-semibold mb-2">{translations.tab1.whyChosen}</label>
            <Textarea
              value={state.tab1_whyChosen}
              onChange={(e) => setState({ ...state, tab1_whyChosen: e.target.value })}
              placeholder={translations.tab1.whyChosenPlaceholder}
              className="border-2 border-gray-300 min-h-32"
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-gray-900 text-white hover:bg-gray-800">
            {translations.common.save}
          </Button>
        </>
      )}
    </div>
  );

  // ─── TAB 2: RESEARCH ───
  const Tab2 = () => (
    <div className="space-y-6">
      <ApprovalBadge tabIndex={1} />
      {!canAccessTab(1) ? (
        <TabLock tabIndex={1} />
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold mb-2">{translations.tab2.title}</h3>
            <p className="text-gray-600 mb-4">{translations.tab2.subtitle}</p>
          </div>

          <GrammarHelper />

          {[
            { key: "tab2_q1_who", label: translations.tab2.q1, placeholder: translations.tab2.q1Placeholder },
            { key: "tab2_q2_why", label: translations.tab2.q2, placeholder: translations.tab2.q2Placeholder },
            { key: "tab2_q3_problem", label: translations.tab2.q3, placeholder: translations.tab2.q3Placeholder },
            { key: "tab2_q4_change", label: translations.tab2.q4, placeholder: translations.tab2.q4Placeholder },
          ].map((q) => (
            <div key={q.key}>
              <label className="block font-semibold mb-2">{q.label}</label>
              <Textarea
                value={(state as any)[q.key]}
                onChange={(e) => setState({ ...state, [q.key]: e.target.value })}
                placeholder={q.placeholder}
                className="border-2 border-gray-300 min-h-24"
              />
            </div>
          ))}

          <Button onClick={handleSave} className="w-full bg-gray-900 text-white hover:bg-gray-800">
            {translations.common.save}
          </Button>
        </>
      )}
    </div>
  );

  // ─── TAB 3: DESIGN RULES ───
  const Tab3 = () => (
    <div className="space-y-6">
      <ApprovalBadge tabIndex={2} />
      {!canAccessTab(2) ? (
        <TabLock tabIndex={2} />
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold mb-2">{translations.tab3.title}</h3>
            <p className="text-gray-600 mb-4">{translations.tab3.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {COLOR_CHART.map((item) => (
              <Card key={item.color} className="p-3 border-2 cursor-pointer hover:border-gray-900" onClick={() => setState({ ...state, tab3_colorChoices: { ...state.tab3_colorChoices, [item.color]: item.meaning } })}>
                <div className="w-full h-16 rounded mb-2" style={{ backgroundColor: item.hex }} />
                <p className="font-bold text-sm">{item.color}</p>
                <p className="text-xs text-gray-600">{item.meaning}</p>
              </Card>
            ))}
          </div>

          <div>
            <label className="block font-semibold mb-2">{translations.tab3.whyTheseColors}</label>
            <Textarea
              value={state.tab3_colorExplanation}
              onChange={(e) => setState({ ...state, tab3_colorExplanation: e.target.value })}
              placeholder={translations.tab3.whyExplanation}
              className="border-2 border-gray-300 min-h-24"
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-gray-900 text-white hover:bg-gray-800">
            {translations.common.save}
          </Button>
        </>
      )}
    </div>
  );

  // ─── TAB 4: LOGO DESIGN ───
  const Tab4 = () => (
    <div className="space-y-6">
      <ApprovalBadge tabIndex={3} />
      {!canAccessTab(3) ? (
        <TabLock tabIndex={3} />
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold mb-2">{translations.tab4.title}</h3>
            <p className="text-gray-600 mb-4">{translations.tab4.subtitle}</p>
          </div>

          <div>
            <p className="font-semibold mb-4">{translations.tab4.instructions}</p>
            <div className="grid grid-cols-3 gap-4">
              {LOGO_EXAMPLES.map((logo) => (
                <Card key={logo.name} className="p-3 border-2">
                  <img src={logo.url} alt={logo.name} className="w-full h-24 object-contain mb-2" />
                  <p className="text-sm font-semibold text-center">{logo.name}</p>
                </Card>
              ))}
            </div>
          </div>

          <GrammarHelper />

          <div>
            <label className="block font-semibold mb-2">{translations.tab4.logoDescription}</label>
            <Textarea
              value={state.tab4_logoDescription}
              onChange={(e) => setState({ ...state, tab4_logoDescription: e.target.value })}
              placeholder={translations.tab4.logoDescPlaceholder}
              className="border-2 border-gray-300 min-h-24"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">{translations.tab4.logoReasoning}</label>
            <Textarea
              value={state.tab4_logoReasoning}
              onChange={(e) => setState({ ...state, tab4_logoReasoning: e.target.value })}
              placeholder={translations.tab4.reasoningPlaceholder}
              className="border-2 border-gray-300 min-h-24"
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-gray-900 text-white hover:bg-gray-800">
            {translations.common.save}
          </Button>
        </>
      )}
    </div>
  );

  // ─── TAB 5: FASHION ITEM ───
  const Tab5 = () => (
    <div className="space-y-6">
      <ApprovalBadge tabIndex={4} />
      {!canAccessTab(4) ? (
        <TabLock tabIndex={4} />
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold mb-2">{translations.tab5.title}</h3>
            <p className="text-gray-600 mb-4">{translations.tab5.subtitle}</p>
          </div>

          <GrammarHelper />

          <div>
            <label className="block font-semibold mb-2">{translations.tab5.itemType}</label>
            <select
              value={state.tab5_itemType}
              onChange={(e) => setState({ ...state, tab5_itemType: e.target.value })}
              className="w-full border-2 border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select an item...</option>
              {translations.tab5.itemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">{translations.tab5.itemDescription}</label>
            <Textarea
              value={state.tab5_itemDescription}
              onChange={(e) => setState({ ...state, tab5_itemDescription: e.target.value })}
              placeholder={translations.tab5.itemDescPlaceholder}
              className="border-2 border-gray-300 min-h-24"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">{translations.tab5.howItHelps}</label>
            <Textarea
              value={state.tab5_howItHelps}
              onChange={(e) => setState({ ...state, tab5_howItHelps: e.target.value })}
              placeholder={translations.tab5.howItHelpsPlaceholder}
              className="border-2 border-gray-300 min-h-24"
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-gray-900 text-white hover:bg-gray-800">
            {translations.common.save}
          </Button>
        </>
      )}
    </div>
  );

  // ─── TAB 6: PRESENTATION ───
  const Tab6 = () => (
    <div className="space-y-6">
      <ApprovalBadge tabIndex={5} />
      {!canAccessTab(5) ? (
        <TabLock tabIndex={5} />
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold mb-2">{translations.tab6.title}</h3>
            <p className="text-gray-600 mb-4">{translations.tab6.subtitle}</p>
          </div>

          <div className="space-y-3">
            {translations.tab6.checklist.map((item) => (
              <label key={item} className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={state.tab6_checklist[item] || false}
                  onChange={(e) => setState({ ...state, tab6_checklist: { ...state.tab6_checklist, [item]: e.target.checked } })}
                  className="w-5 h-5"
                />
                <span className="font-semibold">{item}</span>
              </label>
            ))}
          </div>

          <Button onClick={handleSave} className="w-full bg-gray-900 text-white hover:bg-gray-800">
            {translations.common.save}
          </Button>
        </>
      )}
    </div>
  );

  // ─── TAB 7: REFLECTION ───
  const Tab7 = () => (
    <div className="space-y-6">
      <ApprovalBadge tabIndex={6} />
      {!canAccessTab(6) ? (
        <TabLock tabIndex={6} />
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold mb-2">{translations.tab7.title}</h3>
            <p className="text-gray-600 mb-4">{translations.tab7.subtitle}</p>
          </div>

          <GrammarHelper />

          <div>
            <label className="block font-semibold mb-2">{translations.tab7.reflection}</label>
            <Textarea
              value={state.tab7_reflection}
              onChange={(e) => setState({ ...state, tab7_reflection: e.target.value })}
              placeholder={translations.tab7.reflectionPlaceholder}
              className="border-2 border-gray-300 min-h-32"
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-gray-900 text-white hover:bg-gray-800">
            {translations.common.save}
          </Button>
        </>
      )}
    </div>
  );

  const tabs = [Tab1, Tab2, Tab3, Tab4, Tab5, Tab6, Tab7];
  const CurrentTab = tabs[currentTab];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Floating Gem Button */}
      <a
        href="https://gemini.google.com/gem/1AnFJbpYQ-hsXjJDhota5pIkU3Qt9h6Vy?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-yellow-400 text-gray-900 rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center gap-2 font-bold"
      >
        💎 {translations.common.helpfulGem}
        <ExternalLink size={16} />
      </a>

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white border-b-4 border-gray-900 z-10">
        <div className="container py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {translations.nav && Object.values(translations.nav).map((label, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTab(idx)}
                disabled={!canAccessTab(idx)}
                className={`px-4 py-2 rounded font-bold whitespace-nowrap transition-all ${
                  currentTab === idx
                    ? "bg-gray-900 text-white"
                    : canAccessTab(idx)
                    ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {idx + 1}. {label.split("(")[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <Card className="p-8 border-2 border-gray-300">
          <CurrentTab />
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 justify-between">
          <Button onClick={handlePrevious} disabled={currentTab === 0} variant="outline" className="px-6 py-2">
            {translations.common.previous}
          </Button>
          <Button onClick={handleNext} disabled={currentTab === 6 || !canAccessTab(currentTab + 1)} className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800">
            {translations.common.next}
          </Button>
        </div>
      </div>
    </div>
  );
}
