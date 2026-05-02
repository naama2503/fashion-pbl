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
import { Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const TEACHER_PASSWORD = "teacher123";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  // Fetch all students from database
  const { data: dbStudents = [], isLoading: isLoadingStudents } = trpc.pbl.getAllStudents.useQuery(undefined, {
    enabled: isLoggedIn,
  });

  // Fetch student responses for selected student
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

          <p className="text-xs text-gray-500 text-center mt-4">Demo password: teacher123 / סיסמה: teacher123</p>
        </Card>
      </div>
    );
  }

  const selectedStudent = dbStudents.find((s) => s.id === selectedStudentId);

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
                      Tab {response.tabNumber} - {["Home", "Group Decision", "Research", "Design Inquiry", "Logo", "Vector Art", "Fashion Item", "Presentation"][response.tabNumber - 1]}
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
            {dbStudents.map((student) => (
              <Card
                key={student.id}
                className="p-6 border-2 border-gray-300 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedStudentId(student.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{student.groupName || `Student ${student.id}`}</h3>
                    <p className="text-gray-600">{student.members ? `Members: ${student.members}` : "No members"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Responses submitted</p>
                    <p className="text-2xl font-bold">{studentResponses.filter((r) => r.studentId === student.id).length}/7</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
