/*
 * Tab 2 – Fashion Research
 * Soft Atelier design: research notes, sources, parchment tip box
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BookOpen, Lightbulb } from "lucide-react";
import { toast } from "sonner";

export default function Tab2Research() {
  const { t, isRTL } = useLanguage();
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [sources, setSources] = useState("");

  const handleSave = () => {
    toast.success(t("common.save"), { description: topic || "—" });
  };

  return (
    <div className="space-y-8">
      {/* Hero image */}
      <div className="relative rounded-xl overflow-hidden h-48 sm:h-56">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/fashion-research-HGJPnNKvE3idnhUG3SDhbM.webp"
          alt="Fashion research mood board"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-white font-display text-2xl font-semibold drop-shadow-md">
            {t("tab2.subtitle")}
          </h3>
        </div>
      </div>

      {/* Tip box */}
      <div className="flex gap-3 bg-secondary/30 border border-secondary rounded-lg p-4">
        <Lightbulb size={20} className="text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80">{t("tab2.tip")}</p>
      </div>

      {/* Topic */}
      <div className="space-y-2">
        <Label className="text-base font-semibold flex items-center gap-2">
          <BookOpen size={18} className="text-primary" />
          {t("tab2.topic")}
        </Label>
        <Input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder={t("tab2.topicPlaceholder")}
          className="border-2 border-border focus:border-primary bg-card text-base"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      <hr className="stitch-divider" />

      {/* Research Notes */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">{t("tab2.notes")}</Label>
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder={t("tab2.notesPlaceholder")}
          rows={10}
          className="border-2 border-border focus:border-primary bg-card resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
        <p className="text-xs text-muted-foreground text-right">
          {notes.split("\n").filter(Boolean).length} {isRTL ? "שורות" : "lines"}{" "}
          · {notes.length} {t("common.characters")}
        </p>
      </div>

      {/* Sources */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">{t("tab2.sources")}</Label>
        <Textarea
          value={sources}
          onChange={e => setSources(e.target.value)}
          placeholder={t("tab2.sourcesPlaceholder")}
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
