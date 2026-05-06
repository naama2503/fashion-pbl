import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface StudentLoginProps {
  onLoginSuccess: (studentId: number, groupName: string) => void;
}

export function StudentLogin({ onLoginSuccess }: StudentLoginProps) {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [returningStudentId, setReturningStudentId] = useState<number | null>(null);

  // Check if group exists
  const checkGroupQuery = trpc.pbl.checkGroup.useQuery(
    { groupName: groupName.trim() },
    { enabled: groupName.trim().length > 2 }
  );

  const createGroupMutation = trpc.pbl.createGroup.useMutation({
    onSuccess: (data: any) => {
      toast.success("Group created successfully!");
      const studentId = data.studentId || 1;
      onLoginSuccess(studentId, groupName);
    },
    onError: (error) => {
      toast.error("Failed to create group");
      console.error(error);
    },
  });

  // Update returning status when checkGroup query completes
  useEffect(() => {
    if (checkGroupQuery.data) {
      if (checkGroupQuery.data.exists) {
        setIsReturning(true);
        setReturningStudentId(checkGroupQuery.data.studentId);
        toast.success("Welcome back! 👋");
      } else {
        setIsReturning(false);
        setReturningStudentId(null);
      }
    }
  }, [checkGroupQuery.data]);

  const handleLogin = async () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    setIsLoading(true);
    try {
      if (isReturning && returningStudentId) {
        // Returning student - just login with existing ID
        onLoginSuccess(returningStudentId, groupName);
      } else {
        // New group - create it
        const memberList = members
          .split(",")
          .map((m) => m.trim())
          .filter((m) => m.length > 0);

        await createGroupMutation.mutateAsync({
          groupName: groupName.trim(),
          members: memberList.length > 0 ? memberList : [groupName],
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-4 border-gray-900 shadow-xl">
        <h1 className="text-4xl font-black mb-2 text-center">Fashion PBL</h1>
        <p className="text-center text-gray-600 mb-8">
          How can fashion create social change? / איך אופנה יכולה ליצור שינוי חברתי?
        </p>

        <div className="space-y-4">
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
            {isReturning && (
              <p className="text-sm text-green-600 font-semibold mt-2">
                ✓ We found your group! / ✓ מצאנו את הקבוצה שלך!
              </p>
            )}
          </div>

          {!isReturning && (
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
          )}

          <Button
            onClick={handleLogin}
            disabled={isLoading || !groupName.trim()}
            className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3 font-bold text-lg"
          >
            {isLoading ? "Loading..." : isReturning ? "Continue / המשך" : "Start Project / התחל פרויקט"}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Your group name will be saved so you can return to your work later. /
          שם הקבוצה שלך יישמר כדי שתוכל לחזור לעבודתך מאוחר יותר.
        </p>
      </Card>
    </div>
  );
}
