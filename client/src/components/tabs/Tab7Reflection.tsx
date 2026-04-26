/*
 * Tab 7 – Reflection
 * Soft Atelier design: 5 reflection questions with elegant card layout
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Tab7Reflection() {
  const { t, isRTL } = useLanguage();
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const questions = [
    { key: "q1", label: t("tab7.q1"), placeholder: t("tab7.q1Placeholder") },
    { key: "q2", label: t("tab7.q2"), placeholder: t("tab7.q2Placeholder") },
    { key: "q3", label: t("tab7.q3"), placeholder: t("tab7.q3Placeholder") },
    { key: "q4", label: t("tab7.q4"), placeholder: t("tab7.q4Placeholder") },
    { key: "q5", label: t("tab7.q5"), placeholder: t("tab7.q5Placeholder") },
  ];

  const answeredCount = Object.values(answers).filter(
    a => a.trim().length > 0
  ).length;

  const handleSave = () => {
    toast.success(t("common.save"), {
      description: isRTL
        ? `${answeredCount} מתוך 5 שאלות נענו`
        : `${answeredCount} of 5 questions answered`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-xl p-6 border border-primary/20">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle size={24} className="text-primary" />
          <h3 className="font-display text-2xl font-semibold text-foreground">
            {t("tab7.subtitle")}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("tab7.instructions")}
        </p>

        {/* Progress indicator */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex gap-1.5">
            {questions.map(q => (
              <div
                key={q.key}
                className={`w-3 h-3 rounded-full transition-all ${
                  answers[q.key as keyof typeof answers].trim()
                    ? "bg-primary"
                    : "bg-border"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {answeredCount}/5 {isRTL ? "נענו" : "answered"}
          </span>
        </div>
      </div>

      {/* Questions */}
      {questions.map((q, i) => {
        const answered =
          answers[q.key as keyof typeof answers].trim().length > 0;
        return (
          <div key={q.key} className="space-y-2">
            <Label className="text-base font-semibold flex items-start gap-2">
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  answered
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {answered ? <CheckCircle size={14} /> : i + 1}
              </span>
              <span className="leading-snug">{q.label}</span>
            </Label>
            <Textarea
              value={answers[q.key as keyof typeof answers]}
              onChange={e =>
                setAnswers({ ...answers, [q.key]: e.target.value })
              }
              placeholder={q.placeholder}
              rows={4}
              className={`border-2 focus:border-primary bg-card resize-none transition-colors ${
                answered ? "border-primary/40" : "border-border"
              }`}
              dir={isRTL ? "rtl" : "ltr"}
            />
            <p className="text-xs text-muted-foreground text-right">
              {answers[q.key as keyof typeof answers].length}{" "}
              {t("common.characters")}
            </p>
            {i < questions.length - 1 && <hr className="stitch-divider" />}
          </div>
        );
      })}

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
