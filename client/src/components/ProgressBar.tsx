import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgressBarProps {
  currentTab: number;
  totalTabs: number;
  completedTabs: number;
  canAccessTab: (tabIndex: number) => boolean;
  onTabChange: (tabIndex: number) => void;
}

export default function ProgressBar({
  currentTab,
  totalTabs,
  completedTabs,
  canAccessTab,
  onTabChange,
}: ProgressBarProps) {
  const progressPercentage = Math.round((completedTabs / totalTabs) * 100);

  const handlePrevious = () => {
    for (let i = currentTab - 1; i >= 0; i--) {
      if (canAccessTab(i)) {
        onTabChange(i);
        return;
      }
    }
  };

  const handleNext = () => {
    for (let i = currentTab + 1; i < totalTabs; i++) {
      if (canAccessTab(i)) {
        onTabChange(i);
        return;
      }
    }
  };

  const canGoPrevious = currentTab > 0 && Array.from({ length: currentTab }).some((_, i) => canAccessTab(i));
  const canGoNext = currentTab < totalTabs - 1 && Array.from({ length: totalTabs - currentTab - 1 }).some((_, i) => canAccessTab(currentTab + 1 + i));

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-lg">
      {/* Progress Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-sm font-semibold opacity-90">התקדמות / Progress</div>
            <div className="text-2xl font-bold">
              {completedTabs}/{totalTabs}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{progressPercentage}%</div>
            <div className="text-xs opacity-75">הושלמו / Completed</div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            variant="outline"
            size="sm"
            className="bg-white/20 hover:bg-white/30 border-white/50 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">אחורה</span>
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canGoNext}
            variant="outline"
            size="sm"
            className="bg-white/20 hover:bg-white/30 border-white/50 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-1">קדימה</span>
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
        <div
          className="bg-white h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Status Message */}
      <div className="mt-3 text-xs opacity-90 flex items-center gap-2">
        {completedTabs === totalTabs ? (
          <span className="text-green-200">✓ כל הטאבים הושלמו! / All tabs completed!</span>
        ) : (
          <>
            <Lock size={14} />
            <span>טאבים נעולים עד להשלמת הטאב הנוכחי / Tabs locked until current tab is completed</span>
          </>
        )}
      </div>
    </div>
  );
}
