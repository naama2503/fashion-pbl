/*
 * Fashion PBL – Teacher Admin Dashboard
 * Simple password protection + approval system for all 7 tabs
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { translations } from "@/lib/translations";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

const TEACHER_PASSWORD = "teacher123"; // Simple password (in production, use proper auth)

// Mock student data
const MOCK_STUDENTS = [
  {
    id: 1,
    name: "Leah Cohen",
    group: "Group A",
    responses: {
      tab1_groupName: "Helping Homeless",
      tab1_members: ["Leah", "David"],
      tab1_whyChosen: "We want to help people without homes",
      tab2_q1_who: "People who live on the streets",
      tab2_q2_why: "They need our help and support",
      tab2_q3_problem: "They don't have shelter or food",
      tab2_q4_change: "We need more shelters and community support",
      tab3_colorChoices: { Orange: "Friendly", Blue: "Trust" },
      tab3_colorExplanation: "Orange shows we're friendly and caring",
      tab4_logoDescription: "A hand reaching out to help",
      tab4_logoReasoning: "Shows compassion and support",
      tab5_itemType: "Shirt (חולצה)",
      tab5_itemDescription: "Orange shirt with a helping hand",
      tab5_howItHelps: "Raises awareness about homelessness",
      tab6_checklist: { "We chose a group": true, "We researched": true },
      tab7_reflection: "This project taught us about compassion",
    },
    approvals: [true, true, false, false, false, false, false],
  },
  {
    id: 2,
    name: "Yosef Levi",
    group: "Group B",
    responses: {
      tab1_groupName: "Elderly Care",
      tab1_members: ["Yosef", "Miriam", "Noa"],
      tab1_whyChosen: "Elderly people are often lonely",
      tab2_q1_who: "Senior citizens in care homes",
      tab2_q2_why: "They have wisdom and experience",
      tab2_q3_problem: "Many feel isolated and forgotten",
      tab2_q4_change: "We need better community engagement",
      tab3_colorChoices: { Purple: "Creative", Green: "Peace/Growth" },
      tab3_colorExplanation: "Purple for creativity, Green for growth",
      tab4_logoDescription: "Interlocking hands representing connection",
      tab4_logoReasoning: "Shows unity between generations",
      tab5_itemType: "Hat (כובע)",
      tab5_itemDescription: "Purple hat with green accents",
      tab5_howItHelps: "Symbolizes respect and connection",
      tab6_checklist: { "We chose a group": true, "We researched": true, "We created logo": true },
      tab7_reflection: "Learned about intergenerational respect",
    },
    approvals: [true, true, true, true, false, false, false],
  },
];

interface StudentData {
  id: number;
  name: string;
  group: string;
  responses: Record<string, any>;
  approvals: boolean[];
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [students, setStudents] = useState(MOCK_STUDENTS);

  const handleLogin = () => {
    if (password === TEACHER_PASSWORD) {
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
      setPassword("");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleApprove = (studentId: number, tabIndex: number) => {
    setStudents(
      students.map((s) => {
        if (s.id === studentId) {
          const newApprovals = [...s.approvals];
          newApprovals[tabIndex] = true;
          return { ...s, approvals: newApprovals };
        }
        return s;
      })
    );
    toast.success(`Tab ${tabIndex + 1} approved! (מאושר!)`);
  };

  const handleReject = (studentId: number, tabIndex: number) => {
    setStudents(
      students.map((s) => {
        if (s.id === studentId) {
          const newApprovals = [...s.approvals];
          newApprovals[tabIndex] = false;
          return { ...s, approvals: newApprovals };
        }
        return s;
      })
    );
    toast.success(`Tab ${tabIndex + 1} rejected for revision`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 border-2 border-gray-900">
          <h1 className="text-3xl font-black mb-2 text-center">{translations.admin.title}</h1>
          <p className="text-center text-gray-600 mb-6">Teachers only</p>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                placeholder={translations.admin.password}
                className="border-2 border-gray-300 pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button onClick={handleLogin} className="w-full bg-gray-900 text-white hover:bg-gray-800 py-2 font-bold">
              {translations.admin.login}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">Demo password: teacher123</p>
        </Card>
      </div>
    );
  }

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-amber-50 p-4">
        <div className="container">
          <Button onClick={() => setSelectedStudent(null)} variant="outline" className="mb-6">
            ← Back to Students
          </Button>

          <Card className="p-8 border-2 border-gray-300">
            <h2 className="text-3xl font-black mb-2">{selectedStudent.name}</h2>
            <p className="text-gray-600 mb-6">{selectedStudent.group}</p>

            <div className="space-y-8">
              {[
                { tab: 1, label: translations.nav.step1, key: "tab1_groupName" },
                { tab: 2, label: translations.nav.step2, key: "tab2_q1_who" },
                { tab: 3, label: translations.nav.step3, key: "tab3_colorExplanation" },
                { tab: 4, label: translations.nav.step4, key: "tab4_logoDescription" },
                { tab: 5, label: translations.nav.step5, key: "tab5_itemDescription" },
                { tab: 6, label: translations.nav.step6, key: "tab6_checklist" },
                { tab: 7, label: translations.nav.step7, key: "tab7_reflection" },
              ].map((item) => (
                <div key={item.tab} className="border-2 border-gray-300 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{item.label}</h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(selectedStudent.id, item.tab - 1)}
                        className={`flex items-center gap-1 ${
                          selectedStudent.approvals[item.tab - 1]
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-300 hover:bg-gray-400"
                        } text-white`}
                      >
                        <CheckCircle size={16} />
                        {translations.admin.approve}
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedStudent.id, item.tab - 1)}
                        className={`flex items-center gap-1 ${
                          !selectedStudent.approvals[item.tab - 1]
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gray-300 hover:bg-gray-400"
                        } text-white`}
                      >
                        <XCircle size={16} />
                        {translations.admin.reject}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-900">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(selectedStudent.responses[item.key], null, 2)}
                    </p>
                  </div>

                  <div className="mt-3">
                    {selectedStudent.approvals[item.tab - 1] ? (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        <CheckCircle size={14} />
                        {translations.gating.approved}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {translations.gating.pending}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black">{translations.admin.title}</h1>
          <Button onClick={() => setIsLoggedIn(false)} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-4">
          {students.map((student) => {
            const approvedCount = student.approvals.filter(Boolean).length;
            const totalTabs = student.approvals.length;

            return (
              <Card key={student.id} className="p-6 border-2 border-gray-300 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedStudent(student)}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{student.name}</h3>
                    <p className="text-gray-600">{student.group}</p>
                    <div className="mt-2 flex gap-2">
                      {student.approvals.map((approved, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            approved ? "bg-green-500 text-white" : "bg-yellow-400 text-gray-900"
                          }`}
                          title={`Tab ${idx + 1}`}
                        >
                          {idx + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900">
                      {approvedCount}/{totalTabs}
                    </p>
                    <p className="text-sm text-gray-600">Approved</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
