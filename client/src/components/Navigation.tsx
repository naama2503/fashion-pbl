import { useState } from "react";
import { Menu, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import ProgressBar from "./ProgressBar";

interface NavigationProps {
  currentTab: number;
  onTabChange: (tabIndex: number) => void;
  canAccessTab: (tabIndex: number) => boolean;
  tabs: { label: string; labelHe: string }[];
  completedTabs?: number;
}

export default function Navigation({
  currentTab,
  onTabChange,
  canAccessTab,
  tabs,
  completedTabs = 0,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();

  const tabColors = [
    "bg-yellow-400", // 1. Home
    "bg-orange-400", // 2. Group Decision
    "bg-red-400", // 3. Research
    "bg-purple-400", // 4. Design Inquiry
    "bg-blue-400", // 5. Creating a Logo
    "bg-green-400", // 6. Fashion Item
    "bg-teal-400", // 7. Presentation
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:bg-gray-900 md:text-white md:overflow-y-auto md:z-40">
        <div className="p-6">
          <h1 className="text-2xl font-black mb-4">Fashion PBL</h1>
          <ProgressBar
            currentTab={currentTab}
            totalTabs={tabs.length}
            completedTabs={completedTabs}
            canAccessTab={canAccessTab}
            onTabChange={onTabChange}
          />
          <div className="mt-6"></div>
          <nav className="space-y-2">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => onTabChange(idx)}
                disabled={!canAccessTab(idx)}
                className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all ${
                  currentTab === idx
                    ? `${tabColors[idx]} text-gray-900 shadow-lg`
                    : canAccessTab(idx)
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                <div className="text-sm">
                  {idx + 1}. {tab.label}
                </div>
                <div className="text-xs opacity-75">{tab.labelHe}</div>
              </button>
            ))}
          </nav>
          
          {/* Admin Link */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <button
              onClick={() => navigate("/admin")}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-all"
            >
              <Settings size={20} />
              <span>Teacher Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-40 p-4 flex items-center justify-between">
        <h1 className="text-xl font-black">Fashion PBL</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-gray-900 text-white z-30 p-4 max-h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="space-y-2">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onTabChange(idx);
                  setIsOpen(false);
                }}
                disabled={!canAccessTab(idx)}
                className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all ${
                  currentTab === idx
                    ? `${tabColors[idx]} text-gray-900 shadow-lg`
                    : canAccessTab(idx)
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                <div className="text-sm">
                  {idx + 1}. {tab.label}
                </div>
                <div className="text-xs opacity-75">{tab.labelHe}</div>
              </button>
            ))}
          </nav>
          
          {/* Admin Link */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <button
              onClick={() => {
                navigate("/admin");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-all"
            >
              <Settings size={20} />
              <span>Teacher Admin</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
