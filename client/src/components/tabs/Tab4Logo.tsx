/*
 * Tab 4 – Logo Design
 * Soft Atelier design: concept, sketches, final description
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Lightbulb, Pencil, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Tab4Logo() {
  const { t, isRTL } = useLanguage();
  const [concept, setConcept] = useState("");
  const [sketches, setSketches] = useState("");
  const [final, setFinal] = useState("");

  const handleSave = () => toast.success(t("common.save"));

  const sections = [
    {
      key: "concept",
      label: t("tab4.concept"),
      placeholder: t("tab4.conceptPlaceholder"),
      value: concept,
      onChange: setConcept,
      icon: <Lightbulb size={18} className="text-primary" />,
      rows: 5,
    },
    {
      key: "sketches",
      label: t("tab4.sketches"),
      placeholder: t("tab4.sketchesPlaceholder"),
      value: sketches,
      onChange: setSketches,
      icon: <Pencil size={18} className="text-primary" />,
      rows: 5,
    },
    {
      key: "final",
      label: t("tab4.final"),
      placeholder: t("tab4.finalPlaceholder"),
      value: final,
      onChange: setFinal,
      icon: <CheckCircle size={18} className="text-primary" />,
      rows: 6,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Tip */}
      <div className="flex gap-3 bg-primary/8 border border-primary/20 rounded-lg p-4">
        <Lightbulb size={20} className="text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80">{t("tab4.tip")}</p>
      </div>

      {/* Logo preview placeholder */}
      <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-card min-h-[160px]">
        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
          <span className="text-4xl">✏️</span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {isRTL ? "כאן יופיע הלוגו שלך" : "Your logo will appear here"}
        </p>
      </div>

      <hr className="stitch-divider" />

      {sections.map((s, i) => (
        <div key={s.key} className="space-y-2">
          <Label className="text-base font-semibold flex items-center gap-2">
            {s.icon}
            {s.label}
          </Label>
          <Textarea
            value={s.value}
            onChange={(e) => s.onChange(e.target.value)}
            placeholder={s.placeholder}
            rows={s.rows}
            className="border-2 border-border focus:border-primary bg-card resize-none"
            dir={isRTL ? "rtl" : "ltr"}
          />
          <p className="text-xs text-muted-foreground text-right">
            {s.value.length} {t("common.characters")}
          </p>
          {i < sections.length - 1 && <hr className="stitch-divider" />}
        </div>
      ))}

      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
          {t("common.save")}
        </Button>
      </div>
    </div>
  );
}
