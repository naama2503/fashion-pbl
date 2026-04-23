/*
 * Tab 5 – Vector Art
 * Soft Atelier design: tools, process, elements documentation
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Lightbulb, Triangle, Layers } from "lucide-react";
import { toast } from "sonner";

const VECTOR_TOOLS = ["Adobe Illustrator", "Inkscape", "Figma", "CorelDRAW", "Canva", "Affinity Designer"];

export default function Tab5Vector() {
  const { t, isRTL, language } = useLanguage();
  const [tools, setTools] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [process, setProcess] = useState("");
  const [elements, setElements] = useState("");

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSave = () => toast.success(t("common.save"));

  return (
    <div className="space-y-8">
      {/* Tip */}
      <div className="flex gap-3 bg-secondary/30 border border-secondary rounded-lg p-4">
        <Lightbulb size={20} className="text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80">{t("tab5.tip")}</p>
      </div>

      {/* Vector illustration placeholder */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="aspect-square border-2 border-dashed border-primary/30 rounded-xl bg-card flex flex-col items-center justify-center gap-2"
          >
            <Triangle size={32} className="text-primary/30" />
            <span className="text-xs text-muted-foreground">
              {isRTL ? `איור ${n}` : `Illustration ${n}`}
            </span>
          </div>
        ))}
      </div>

      <hr className="stitch-divider" />

      {/* Tools */}
      <div className="space-y-3">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Layers size={18} className="text-primary" />
          {t("tab5.tools")}
        </Label>
        <div className="flex flex-wrap gap-2">
          {VECTOR_TOOLS.map((tool) => (
            <button
              key={tool}
              onClick={() => toggleTool(tool)}
              className={`px-3 py-1.5 rounded-full text-sm border-2 transition-all ${
                selectedTools.includes(tool)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50 text-foreground"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
        <Input
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          placeholder={t("tab5.toolsPlaceholder")}
          className="border-2 border-border focus:border-primary bg-card"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      <hr className="stitch-divider" />

      {/* Process */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">{t("tab5.process")}</Label>
        <Textarea
          value={process}
          onChange={(e) => setProcess(e.target.value)}
          placeholder={t("tab5.processPlaceholder")}
          rows={7}
          className="border-2 border-border focus:border-primary bg-card resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      {/* Elements */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">{t("tab5.elements")}</Label>
        <Textarea
          value={elements}
          onChange={(e) => setElements(e.target.value)}
          placeholder={t("tab5.elementsPlaceholder")}
          rows={5}
          className="border-2 border-border focus:border-primary bg-card resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
          {t("common.save")}
        </Button>
      </div>
    </div>
  );
}
