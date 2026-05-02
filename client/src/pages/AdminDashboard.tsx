/*
 * Fashion PBL – Teacher Admin Dashboard
 * Connected to real database via tRPC queries
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { translations } from "@/lib/translations";
import { Eye, EyeOff, CheckCircle, XCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { trpc } from "@/lib/trpc";

const TEACHER_PASSWORD = "teacher123";
const TAB_NAMES = ["Home", "Group Decision", "Research", "Design Inquiry", "Logo", "Vector Art", "Fashion Item"];

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [expandedStudentId, setExpandedStudentId] = useState<number | null>(null);

  // Fetch all students from database
  const { data: dbStudents = [], isLoading: isLoadingStudents } = trpc.pbl.getAllStudents.useQuery(undefined, {
    enabled: isLoggedIn,
  });

  // Fetch ALL student responses for list view status display
  const { data: allStudentResponses = [] } = trpc.pbl.getAllStudentResponses.useQuery(undefined, {
    enabled: isLoggedIn,
  });

  // Fetch student responses for selected student (detail view)
  const { data: studentResponses = [] } = trpc.pbl.getStudentResponses.useQuery(
    { studentId: selectedStudentId || 0 },
    { enabled: isLoggedIn && !!selectedStudentId }
  );

  // Fetch approval status for each tab
  const { data: approvalStatuses = {} } = trpc.pbl.getApprovalStatus.useQuery(
    { studentId: selectedStudentId || 0, tabNumber: 1 },
    { enabled: isLoggedIn && !!selectedStudentId }
  );

  // Update approval mutation
  const updateApprovalMutation = trpc.pbl.updateApproval.useMutation({
    onSuccess: () => {
      toast.success("Approval updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update approval");
    },
  });

  const handleLogin = () => {
    if (password === TEACHER_PASSWORD) {
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
      setPassword("");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleApprove = async (studentId: number, tabNumber: number) => {
    try {
      await updateApprovalMutation.mutateAsync({
        studentId,
        tabNumber,
        isApproved: true,
      });
      toast.success(`Tab ${tabNumber} approved!`);
    } catch (error) {
      console.error("Error approving:", error);
      toast.error("Failed to approve tab");
    }
  };

  const handleReject = async (studentId: number, tabNumber: number) => {
    try {
      await updateApprovalMutation.mutateAsync({
        studentId,
        tabNumber,
        isApproved: false,
      });
      toast.success(`Tab ${tabNumber} rejected for revision`);
    } catch (error) {
      console.error("Error rejecting:", error);
      toast.error("Failed to reject tab");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 border-2 border-gray-900">
          <h1 className="text-3xl font-black mb-2 text-center">{translations.admin.title}</h1>
          <p className="text-center text-gray-600 mb-6">Teachers only / רק מורים</p>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="border-2 border-gray-300 text-lg pr-10"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3 font-bold text-lg"
            >
              Login
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Demo password: teacher123 / סיסמה: teacher123
          </p>
        </Card>
      </div>
    );
  }

  const selectedStudent = dbStudents.find((s) => s.id === selectedStudentId);
  const isExpanded = expandedStudentId === selectedStudentId;

  if (selectedStudent && studentResponses.length > 0) {
    return (
      <div className="min-h-screen bg-amber-50 p-4">
        <div className="container">
          <Button onClick={() => setSelectedStudentId(null)} variant="outline" className="mb-6">
            ← Back to Students / חזור לתלמידים
          </Button>

          <Card className="p-8 border-2 border-gray-300">
            <h2 className="text-3xl font-black mb-2">{selectedStudent.groupName || `Student ${selectedStudent.id}`}</h2>
            <p className="text-gray-600 mb-6">{selectedStudent.members ? `Members: ${selectedStudent.members}` : "Group"}</p>

            <div className="space-y-8">
              {studentResponses.map((response, idx) => (
                <div key={response.id} className="border-2 border-gray-300 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">
                      Tab {response.tabNumber} - {TAB_NAMES[response.tabNumber - 1]}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(selectedStudent.id, response.tabNumber)}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle size={16} />
                        {translations.admin.approve}
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedStudent.id, response.tabNumber)}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        <XCircle size={16} />
                        {translations.admin.reject}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-900">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(response.responseData, null, 2)}
                    </p>
                  </div>

                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {translations.gating.pending}
                    </span>
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

        {isLoadingStudents ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin mr-2" />
            <p>Loading students...</p>
          </div>
        ) : dbStudents.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">No students found. Students will appear here after they submit their work.</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {dbStudents.map((student) => {
              // Use allStudentResponses for list view, studentResponses for detail view
              const studentTabs = (selectedStudentId === student.id ? studentResponses : allStudentResponses).filter((r) => r.studentId === student.id);
              const tabStatuses = Array.from({ length: 7 }, (_, i) => {
                const tabNum = i + 1;
                const response = studentTabs.find(r => r.tabNumber === tabNum);
                return {
                  tabNum,
                  submitted: !!response,
                  label: TAB_NAMES[i]
                };
              });

              return (
                <Card
                  key={student.id}
                  className="p-6 border-2 border-gray-300 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{student.groupName || `Student ${student.id}`}</h3>
                      <p className="text-gray-600">{student.members ? `Members: ${student.members}` : "No members"}</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-sm text-gray-600">Responses submitted</p>
                      <p className="text-2xl font-bold">{studentTabs.length}/7</p>
                    </div>
                    <button
                      onClick={() => setExpandedStudentId(isExpanded ? null : student.id)}
                      className="p-2 hover:bg-gray-200 rounded"
                    >
                      {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </button>
                  </div>

                  {/* Tab Status Indicators */}
                  <div className="grid grid-cols-7 gap-2 mt-4">
                    {tabStatuses.map((tab) => (
                      <div
                        key={tab.tabNum}
                        className={`p-2 rounded text-center text-xs font-semibold cursor-pointer hover:shadow-md transition-shadow ${
                          tab.submitted
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                        title={tab.label}
                        onClick={() => {
                          if (tab.submitted) {
                            setSelectedStudentId(student.id);
                          }
                        }}
                      >
                        {tab.submitted ? '✓' : '○'} {tab.tabNum}
                      </div>
                    ))}
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && studentTabs.length > 0 && (
                    <div className="mt-6 pt-6 border-t-2 border-gray-300 space-y-4">
                      <h4 className="font-bold text-lg">Submitted Work:</h4>
                      {studentTabs.map((response) => (
                        <div
                          key={response.id}
                          className="bg-white p-4 rounded border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedStudentId(student.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold">Tab {response.tabNumber} - {TAB_NAMES[response.tabNumber - 1]}</h5>
                            <span className="text-xs text-gray-500">
                              {new Date(response.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {typeof response.responseData === 'string'
                              ? response.responseData
                              : JSON.stringify(response.responseData).substring(0, 100)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
