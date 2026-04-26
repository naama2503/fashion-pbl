/*
 * Tab 3 – Design & Color Theory
 * Soft Atelier design: interactive color swatches, design principles textarea
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PALETTE_COLORS = [
  {
    key: "primary",
    label_en: "Primary",
    label_he: "ראשי",
    default: "#C9748A",
    textColor: "#fff",
  },
  {
    key: "secondary",
    label_en: "Secondary",
    label_he: "משני",
    default: "#7A9E7E",
    textColor: "#fff",
  },
  {
    key: "accent",
    label_en: "Accent",
    label_he: "הדגשה",
    default: "#D4A96A",
    textColor: "#fff",
  },
  {
    key: "neutral",
    label_en: "Neutral",
    label_he: "ניטרלי",
    default: "#C4B5A0",
    textColor: "#3a2e28",
  },
];

const FASHION_COLORS = [
  { name_en: "Ivory", name_he: "שנהב", hex: "#FFFFF0" },
  { name_en: "Blush", name_he: "סומק", hex: "#FFB6C1" },
  { name_en: "Dusty Rose", name_he: "ורוד עמום", hex: "#C9748A" },
  { name_en: "Burgundy", name_he: "בורגונדי", hex: "#800020" },
  { name_en: "Sage", name_he: "מרווה", hex: "#7A9E7E" },
  { name_en: "Forest", name_he: "יער", hex: "#228B22" },
  { name_en: "Navy", name_he: "נייבי", hex: "#1B3A6B" },
  { name_en: "Camel", name_he: "גמל", hex: "#C19A6B" },
  { name_en: "Charcoal", name_he: "פחם", hex: "#36454F" },
  { name_en: "Gold", name_he: "זהב", hex: "#D4A96A" },
  { name_en: "Cream", name_he: "קרם", hex: "#FFFDD0" },
  { name_en: "Mauve", name_he: "מוב", hex: "#E0B0FF" },
];

export default function Tab3Design() {
  const { t, isRTL, language } = useLanguage();
  const [palette, setPalette] = useState<Record<string, string>>(
    Object.fromEntries(PALETTE_COLORS.map(c => [c.key, c.default]))
  );
  const [principles, setPrinciples] = useState("");
  const [mood, setMood] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleColor = (hex: string) => {
    setSelectedColors(prev =>
      prev.includes(hex) ? prev.filter(c => c !== hex) : [...prev, hex]
    );
  };

  const handleSave = () => {
    toast.success(t("common.save"));
  };

  return (
    <div className="space-y-8">
      {/* Hero image */}
      <div className="relative rounded-xl overflow-hidden h-48 sm:h-56">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/fashion-design-MPbh2g8AfALXgetVgrSLSf.webp"
          alt="Fashion design color palette"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-white font-display text-2xl font-semibold drop-shadow-md">
            {t("tab3.subtitle")}
          </h3>
        </div>
      </div>

      {/* Your Palette */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">{t("tab3.palette")}</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PALETTE_COLORS.map(c => (
            <div key={c.key} className="space-y-2">
              <div
                className="h-20 rounded-lg border-2 border-border flex items-end p-2 cursor-pointer color-swatch"
                style={{ backgroundColor: palette[c.key] }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: c.textColor }}
                >
                  {language === "en" ? c.label_en : c.label_he}
                </span>
              </div>
              <input
                type="color"
                value={palette[c.key]}
                onChange={e =>
                  setPalette({ ...palette, [c.key]: e.target.value })
                }
                className="w-full h-8 rounded cursor-pointer border border-border"
                title={language === "en" ? c.label_en : c.label_he}
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="stitch-divider" />

      {/* Fashion Color Swatches */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">
          {isRTL ? "בחר צבעי אופנה" : "Select Fashion Colors"}
        </Label>
        <p className="text-sm text-muted-foreground">
          {isRTL
            ? "לחץ על צבעים כדי לבחור אותם לקולקציה שלך"
            : "Click colors to select them for your collection"}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {FASHION_COLORS.map(color => {
            const isSelected = selectedColors.includes(color.hex);
            const isDark = [
              "#800020",
              "#1B3A6B",
              "#228B22",
              "#36454F",
            ].includes(color.hex);
            return (
              <button
                key={color.hex}
                onClick={() => toggleColor(color.hex)}
                className={`color-swatch rounded-lg border-2 p-3 flex flex-col items-center gap-1 transition-all ${
                  isSelected
                    ? "border-primary ring-2 ring-primary ring-offset-1 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                <span
                  className={`text-xs font-semibold ${isDark ? "text-white" : "text-foreground/80"}`}
                >
                  {language === "en" ? color.name_en : color.name_he}
                </span>
                <span
                  className={`text-xs font-mono ${isDark ? "text-white/70" : "text-foreground/50"}`}
                >
                  {color.hex}
                </span>
              </button>
            );
          })}
        </div>
        {selectedColors.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">
              {isRTL ? "נבחרו:" : "Selected:"}
            </span>
            {selectedColors.map(hex => (
              <div
                key={hex}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: hex }}
                title={hex}
              />
            ))}
          </div>
        )}
      </div>

      <hr className="stitch-divider" />

      {/* Design Principles */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">
          {t("tab3.principles")}
        </Label>
        <Textarea
          value={principles}
          onChange={e => setPrinciples(e.target.value)}
          placeholder={t("tab3.principlesPlaceholder")}
          rows={5}
          className="border-2 border-border focus:border-primary bg-card resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      {/* Mood Board Notes */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">{t("tab3.mood")}</Label>
        <Textarea
          value={mood}
          onChange={e => setMood(e.target.value)}
          placeholder={t("tab3.moodPlaceholder")}
          rows={4}
          className="border-2 border-border focus:border-primary bg-card resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
        >
          {t("common.save")}
        </Button>
      </div>
    </div>
  );
}
