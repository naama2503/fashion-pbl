import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface StudentLoginProps {
  onLoginSuccess: (studentId: number, groupName: string, startTab?: number) => void;
}

export function StudentLogin({ onLoginSuccess }: StudentLoginProps) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTabSelector, setShowTabSelector] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  
  const TABS = [
    { label: "Home", labelHe: "בית" },
    { label: "Group Decision", labelHe: "החלטה קבוצתית" },
    { label: "Research", labelHe: "מחקר" },
    { label: "Design Inquiry", labelHe: "חקירה עיצובית" },
    { label: "Creating a Logo", labelHe: "יצירת לוגו" },
    { label: "Fashion Item", labelHe: "פריט אופנה" },
    { label: "Choosing a Product", labelHe: "בחירת מוצר" },
    { label: "Reflection", labelHe: "הרהור" },
  ];
  
  // Check if student has previous work
  const hasPreviousWork = localStorage.getItem("studentId") !== null;
  const savedStudentId = localStorage.getItem("studentId");
  const savedGroupName = localStorage.getItem("groupName");

  const createGroupMutation = trpc.pbl.createGroup.useMutation({
    onSuccess: (data: any) => {
      toast.success("Group created successfully!");
      // Use the real student ID returned from the mutation
      const studentId = data.studentId || 1;
      // New student: proceed to tab 1
      onLoginSuccess(studentId, groupName, 1);
    },
    onError: (error) => {
      toast.error("Failed to create group");
      console.error(error);
    },
  });

  const handleContinueWithTab = () => {
    if (savedStudentId) {
      // Returning student: use saved group name and selected tab
      onLoginSuccess(parseInt(savedStudentId), savedGroupName || "Returning Group", selectedTab);
      setShowTabSelector(false);
    }
  };
  
  const handleLogin = async () => {
    // Check if this is a returning student
    if (hasPreviousWork && savedStudentId) {
      // Returning student: show tab selector
      setShowTabSelector(true);
      return;
    }

    // New student: create a new group
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    setIsLoading(true);
    try {
      const memberList = members
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      await createGroupMutation.mutateAsync({
        groupName: groupName.trim(),
        members: memberList.length > 0 ? memberList : [groupName],
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-4 border-gray-900 shadow-xl">
        <h1 className="text-4xl font-black mb-2 text-center">Fashion PBL</h1>
        <p className="text-center text-gray-600 mb-8">
          How can fashion create social change? / איך אופנה יכולה ליצור שינוי חברתי?
        </p>

        <div className="space-y-4">
          {!showTabSelector ? (
            <>
              <div>
                <label className="block text-sm font-bold mb-2">
                  Group Name / שם הקבוצה
                </label>
                <Input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g., Group A / קבוצה א"
                  className="border-2 border-gray-300 text-lg"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Member Names (optional) / שמות חברים (אופציונלי)
                </label>
                <Input
                  type="text"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  placeholder="e.g., Leah, David, Sarah / לאה, דוד, שרה"
                  className="border-2 border-gray-300 text-lg"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate with commas / הפרד בפסיקים
                </p>
              </div>
            </>
          ) : (
            <>
            <h2 className="text-xl font-bold text-center mb-4">
              Welcome back, {savedGroupName}! / ברוכים הבאים חזרה, {savedGroupName}!
            </h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Which tab would you like to continue with? / איזה שלב אתה רוצה להמשיך?
            </p>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {TABS.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`p-3 rounded border-2 font-bold text-sm ${
                      selectedTab === index
                        ? "border-gray-900 bg-gray-100"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div>{tab.label}</div>
                    <div className="text-xs text-gray-600">{tab.labelHe}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {!showTabSelector ? (
            <Button
              onClick={handleLogin}
              disabled={isLoading || !groupName.trim()}
              className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3 font-bold text-lg"
            >
              {isLoading ? "Loading..." : "Start Project / התחל פרויקט"}
            </Button>
          ) : (
            <Button
              onClick={handleContinueWithTab}
              className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3 font-bold text-lg"
            >
              Continue to Tab / המשך לשלב
            </Button>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Your group name will be saved so you can return to your work later. /
          שם הקבוצה שלך יישמר כדי שתוכל לחזור לעבודתך מאוחר יותר.
        </p>
      </Card>
    </div>
  );
}
