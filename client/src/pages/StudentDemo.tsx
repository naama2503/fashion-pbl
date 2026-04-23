/*
 * Fashion PBL – StudentDemo Page
 * Design: Soft Atelier / Couture Studio
 * - Warm parchment (#FDF8F3), dusty rose primary, sage accent
 * - Cormorant Garamond display, Nunito body
 * - Sticky header, scrollable tab rail, fade-up content transitions
 * - Full RTL (Hebrew) support
 */
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useLocation } from "wouter";
import Tab1GroupIdentity from "@/components/tabs/Tab1GroupIdentity";
import Tab2Research from "@/components/tabs/Tab2Research";
import Tab3Design from "@/components/tabs/Tab3Design";
import Tab4Logo from "@/components/tabs/Tab4Logo";
import Tab5Vector from "@/components/tabs/Tab5Vector";
import Tab6Fashion from "@/components/tabs/Tab6Fashion";
import Tab7Reflection from "@/components/tabs/Tab7Reflection";

const TABS = [
  { id: 1, icon: "👥", emoji_label_en: "Group", emoji_label_he: "קבוצה" },
  { id: 2, icon: "📚", emoji_label_en: "Research", emoji_label_he: "מחקר" },
  { id: 3, icon: "🎨", emoji_label_en: "Design", emoji_label_he: "עיצוב" },
  { id: 4, icon: "✏️", emoji_label_en: "Logo", emoji_label_he: "לוגו" },
  { id: 5, icon: "📐", emoji_label_en: "Vector", emoji_label_he: "וקטור" },
  { id: 6, icon: "👗", emoji_label_en: "Fashion", emoji_label_he: "אופנה" },
  { id: 7, icon: "💭", emoji_label_en: "Reflect", emoji_label_he: "הרהור" },
];

export default function StudentDemo() {
  const [currentTab, setCurrentTab] = useState(1);
  const [contentKey, setContentKey] = useState(0);
  const [, setLocation] = useLocation();
  const { language, setLanguage, t, isRTL } = useLanguage();

  const handleTabChange = (id: number) => {
    setCurrentTab(id);
    setContentKey((k) => k + 1);
  };

  const handlePrevious = () => {
    if (currentTab > 1) handleTabChange(currentTab - 1);
  };

  const handleNext = () => {
    if (currentTab < 7) handleTabChange(currentTab + 1);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  const progressPercent = (currentTab / TABS.length) * 100;

  const renderTabContent = () => {
    switch (currentTab) {
      case 1: return <Tab1GroupIdentity />;
      case 2: return <Tab2Research />;
      case 3: return <Tab3Design />;
      case 4: return <Tab4Logo />;
      case 5: return <Tab5Vector />;
      case 6: return <Tab6Fashion />;
      case 7: return <Tab7Reflection />;
      default: return null;
    }
  };

  const currentTabData = TABS.find((t) => t.id === currentTab)!;

  return (
    <div className={`min-h-screen bg-background text-foreground ${isRTL ? "rtl" : "ltr"}`}>
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container py-3 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
              <span className="text-lg">👗</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-none truncate">
                {t("home.title")}
              </h1>
              <p className="text-xs text-muted-foreground truncate hidden sm:block">
                {t("home.subtitle")}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 border-border hover:border-primary bg-card"
            >
              <Globe size={14} />
              <span className="text-xs font-semibold">
                {language === "en" ? "עברית" : "English"}
              </span>
            </Button>
            <Button
              onClick={() => setLocation("/")}
              variant="outline"
              size="sm"
              className="border-border hover:border-primary bg-card text-xs"
            >
              {t("common.back")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* ── Tab Navigation Rail ── */}
        <nav className="w-full">
          <div className="flex items-stretch gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {TABS.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border-2 transition-all duration-200
                    whitespace-nowrap shrink-0 min-w-[72px] sm:min-w-[88px]
                    ${isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                      : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-primary/5"
                    }
                  `}
                >
                  <span className="text-xl leading-none">{tab.icon}</span>
                  <span className="text-xs font-bold leading-none">
                    {isRTL ? tab.emoji_label_he : tab.emoji_label_en}
                  </span>
                  <span className={`text-[10px] font-mono leading-none ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {String(tab.id).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ── Tab Content Card ── */}
        <Card className="border-2 border-border shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/8 to-secondary/10 border-b border-border py-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentTabData.icon}</span>
              <div>
                <CardTitle className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                  {t(`tab.${currentTab}`)}
                </CardTitle>
                <CardDescription className="text-sm mt-0.5">
                  {isRTL
                    ? `כרטיסייה ${currentTab} מתוך ${TABS.length}`
                    : `Tab ${currentTab} of ${TABS.length}`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 min-h-[500px]">
            <div key={contentKey} className="tab-content-enter">
              {renderTabContent()}
            </div>
          </CardContent>
        </Card>

        {/* ── Navigation Footer ── */}
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentTab === 1}
            variant="outline"
            className="flex items-center gap-2 border-2 border-border hover:border-primary disabled:opacity-40 px-5 py-5"
          >
            {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            <span className="hidden sm:inline">{t("common.previous")}</span>
          </Button>

          {/* Progress */}
          <div className="flex-1 max-w-xs text-center space-y-1.5">
            <p className="text-sm font-semibold text-foreground">
              {t("common.progress")}: {currentTab} / {TABS.length}
            </p>
            <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    tab.id === currentTab
                      ? "bg-primary scale-125"
                      : tab.id < currentTab
                      ? "bg-primary/40"
                      : "bg-border"
                  }`}
                  title={isRTL ? tab.emoji_label_he : tab.emoji_label_en}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={currentTab === 7}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 px-5 py-5"
          >
            <span className="hidden sm:inline">{t("common.next")}</span>
            {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>

        {/* ── Info Card ── */}
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="py-4 px-5 flex items-start gap-3">
            <Info size={18} className="text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {t("common.demo")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("common.demoDesc")}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
