/*
 * Tab 6 – Fashion Collection
 * Soft Atelier design: collection showcase with garments, styling, story
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shirt, BookOpen, Star } from "lucide-react";
import { toast } from "sonner";

export default function Tab6Fashion() {
  const { t, isRTL } = useLanguage();
  const [collection, setCollection] = useState("");
  const [garments, setGarments] = useState("");
  const [styling, setStyling] = useState("");
  const [story, setStory] = useState("");

  const handleSave = () => toast.success(t("common.save"));

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-xl overflow-hidden h-48 sm:h-64">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663590009957/UXiCrDDkTDpzvHtgmiLssq/fashion-hero-P9XMcefoHhHTRjMuQ6pWfa.webp"
          alt="Fashion atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-white font-display text-2xl font-semibold drop-shadow-md">
            {t("tab6.subtitle")}
          </h3>
        </div>
      </div>

      {/* Collection Name */}
      <div className="space-y-2">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Star size={18} className="text-primary" />
          {t("tab6.collection")}
        </Label>
        <Input
          value={collection}
          onChange={e => setCollection(e.target.value)}
          placeholder={t("tab6.collectionPlaceholder")}
          className="text-lg border-2 border-border focus:border-primary bg-card"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      <hr className="stitch-divider" />

      {/* Garments */}
      <div className="space-y-2">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Shirt size={18} className="text-primary" />
          {t("tab6.garments")}
        </Label>
        <Textarea
          value={garments}
          onChange={e => setGarments(e.target.value)}
          placeholder={t("tab6.garmentsPlaceholder")}
          rows={8}
          className="border-2 border-border focus:border-primary bg-card resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
        <p className="text-xs text-muted-foreground text-right">
          {garments.length} {t("common.characters")}
        </p>
      </div>

      <hr className="stitch-divider" />

      {/* Styling Notes */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">{t("tab6.styling")}</Label>
        <Textarea
          value={styling}
          onChange={e => setStyling(e.target.value)}
          placeholder={t("tab6.stylingPlaceholder")}
          rows={5}
          className="border-2 border-border focus:border-primary bg-card resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      {/* Collection Story */}
      <div className="space-y-2">
        <Label className="text-base font-semibold flex items-center gap-2">
          <BookOpen size={18} className="text-primary" />
          {t("tab6.story")}
        </Label>
        <Textarea
          value={story}
          onChange={e => setStory(e.target.value)}
          placeholder={t("tab6.storyPlaceholder")}
          rows={5}
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
