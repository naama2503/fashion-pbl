/*
 * Tab 1 – Group Identity
 * Soft Atelier design: parchment cards, dusty rose accents, stitch dividers
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Tab1GroupIdentity() {
  const { t, isRTL } = useLanguage();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState(["", "", ""]);
  const [theme, setTheme] = useState("");
  const [inspiration, setInspiration] = useState("");

  const addMember = () => setMembers([...members, ""]);
  const removeMember = (i: number) =>
    setMembers(members.filter((_, idx) => idx !== i));
  const updateMember = (i: number, val: string) => {
    const updated = [...members];
    updated[i] = val;
    setMembers(updated);
  };

  const handleSave = () => {
    toast.success(t("tab1.saved"), {
      description: groupName || "—",
    });
  };

  return (
    <div className="space-y-8">
      {/* Group Name */}
      <div className="space-y-2">
        <Label className="text-base font-semibold text-foreground flex items-center gap-2">
          <Users size={18} className="text-primary" />
          {t("tab1.groupName")}
        </Label>
        <Input
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          placeholder={t("tab1.groupNamePlaceholder")}
          className="text-lg border-2 border-border focus:border-primary bg-card"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      <hr className="stitch-divider" />

      {/* Members */}
      <div className="space-y-3">
        <Label className="text-base font-semibold text-foreground">
          {t("tab1.members")}
        </Label>
        <div className="grid gap-3 sm:grid-cols-2">
          {members.map((member, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground w-6 shrink-0 font-display italic">
                {i + 1}.
              </span>
              <Input
                value={member}
                onChange={e => updateMember(i, e.target.value)}
                placeholder={`${t("tab1.member")} ${i + 1}`}
                className="border-2 border-border focus:border-primary bg-card"
                dir={isRTL ? "rtl" : "ltr"}
              />
              {members.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMember(i)}
                  className="text-muted-foreground hover:text-destructive shrink-0"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={addMember}
          className="flex items-center gap-2 border-dashed border-2 border-primary/40 text-primary hover:bg-primary/5"
        >
          <Plus size={16} />
          {t("tab1.addMember")}
        </Button>
      </div>

      <hr className="stitch-divider" />

      {/* Theme */}
      <div className="space-y-2">
        <Label className="text-base font-semibold text-foreground flex items-center gap-2">
          <Sparkles size={18} className="text-primary" />
          {t("tab1.theme")}
        </Label>
        <Input
          value={theme}
          onChange={e => setTheme(e.target.value)}
          placeholder={t("tab1.themePlaceholder")}
          className="border-2 border-border focus:border-primary bg-card"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      {/* Inspiration */}
      <div className="space-y-2">
        <Label className="text-base font-semibold text-foreground">
          {t("tab1.inspiration")}
        </Label>
        <Textarea
          value={inspiration}
          onChange={e => setInspiration(e.target.value)}
          placeholder={t("tab1.inspirationPlaceholder")}
          rows={5}
          className="border-2 border-border focus:border-primary bg-card resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
        <p className="text-xs text-muted-foreground text-right">
          {inspiration.length} {t("common.characters")}
        </p>
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
