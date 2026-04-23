/*
 * Fashion PBL – Home Landing Page
 * Design: Soft Atelier / Couture Studio
 * - Full-bleed hero with atelier image
 * - Elegant serif headings, parchment tones
 * - Language toggle, CTA to student demo
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

const TABS_PREVIEW = [
  { id: 1, icon: "👥", en: "Group Identity", he: "זהות קבוצתית" },
  { id: 2, icon: "📚", en: "Research", he: "מחקר" },
  { id: 3, icon: "🎨", en: "Design & Color", he: "עיצוב וצבע" },
  { id: 4, icon: "✏️", en: "Logo Design", he: "עיצוב לוגו" },
  { id: 5, icon: "📐", en: "Vector Art", he: "אמנות וקטורית" },
  { id: 6, icon: "👗", en: "Fashion Collection", he: "קולקציית אופנה" },
  { id: 7, icon: "💭", en: "Reflection", he: "הרהור" },
];

export default function Home() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [, setLocation] = useLocation();

  const toggleLanguage = () => setLanguage(language === "en" ? "he" : "en");

  return (
    <div className={`min-h-screen bg-background text-foreground ${isRTL ? "rtl" : "ltr"}`}>
      {/* ── Minimal top bar ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <div className="font-display text-xl font-bold text-white drop-shadow-md">
          Fashion PBL
        </div>
        <Button
          onClick={toggleLanguage}
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
        >
          <Globe size={14} />
          <span className="text-xs font-semibold">
            {language === "en" ? "עברית" : "English"}
          </span>
        </Button>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/fashion-hero-P9XMcefoHhHTRjMuQ6pWfa.webp"
          alt="Fashion atelier studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 container pb-12 pt-20">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">
            {isRTL ? "למידה מבוססת פרויקט" : "Project-Based Learning"}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            {isRTL ? "אופנה PBL" : "Fashion PBL"}
          </h1>
          <p className="text-white/85 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
            {t("home.description")}
          </p>
          <Button
            onClick={() => setLocation("/demo")}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 shadow-lg flex items-center gap-2"
          >
            {t("home.start")}
            {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </Button>
        </div>
      </section>

      {/* ── Tab Preview Section ── */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">
            {isRTL ? "מה תלמד" : "What You'll Explore"}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
            {isRTL ? "שבעה שלבים של יצירה" : "Seven Stages of Creation"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TABS_PREVIEW.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setLocation("/demo")}
              className="group text-left bg-card border-2 border-border hover:border-primary rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none">{tab.icon}</span>
                <div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {String(tab.id).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {isRTL ? tab.he : tab.en}
                  </h3>
                </div>
              </div>
            </button>
          ))}

          {/* CTA card */}
          <button
            onClick={() => setLocation("/demo")}
            className="group text-left bg-primary border-2 border-primary rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between min-h-[100px]"
          >
            <p className="text-primary-foreground font-semibold text-base leading-snug">
              {isRTL ? "התחל את המסע שלך" : "Begin Your Journey"}
            </p>
            <div className="flex items-center gap-1 text-primary-foreground/80 text-sm mt-3">
              {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              <span>{t("home.demo")}</span>
            </div>
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-6">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground font-display italic">
            {isRTL ? "עיצוב אופנה · יצירתיות · שיתוף פעולה" : "Fashion Design · Creativity · Collaboration"}
          </p>
        </div>
      </footer>
    </div>
  );
}
