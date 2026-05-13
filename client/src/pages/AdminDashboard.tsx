import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { trpc } from "@/lib/trpc";

const TEACHER_PASSWORD = "teacher123";
const TAB_NAMES = ["Home", "Group Decision", "Research", "Design Inquiry", "Logo", "Vector Art", "Fashion Item", "Reflection"];

function getApprovalBadge(isApproved: boolean | null) {
  if (isApproved === null || isApproved === undefined) {
    return <Badge variant="outline">Pending</Badge>;
  }
  if (isApproved) {
    return <Badge className="bg-green-600">Approved</Badge>;
  }
  return <Badge className="bg-red-600">Rejected</Badge>;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [isRenamingId, setIsRenamingId] = useState<number | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [feedbackNotes, setFeedbackNotes] = useState<{ [key: string]: string }>({});

  const { data: dbStudents = [] } = trpc.pbl.getAllStudents.useQuery(undefined, {
    enabled: isLoggedIn,
  });

  const { data: allStudentResponses = [] } = trpc.pbl.getAllStudentResponses.useQuery(undefined, {
    enabled: isLoggedIn,
  });

  const { data: studentResponses = [] } = trpc.pbl.getStudentResponses.useQuery(
    { studentId: selectedStudentId || 0 },
    { enabled: isLoggedIn && !!selectedStudentId }
  );

  const updateApprovalMutation = trpc.pbl.updateApproval.useMutation({
    onSuccess: () => toast.success("Approval updated!"),
  });

  const addFeedbackMutation = trpc.pbl.addFeedback.useMutation({
    onSuccess: () => toast.success("Feedback saved!"),
  });

  const deleteGroupMutation = trpc.pbl.deleteGroup.useMutation({
    onSuccess: () => {
      toast.success("Group deleted!");
      setSelectedStudentId(null);
    },
  });

  const renameGroupMutation = trpc.pbl.renameGroup.useMutation({
    onSuccess: () => {
      toast.success("Group renamed!");
      setIsRenamingId(null);
      setNewGroupName("");
    },
  });

  const handleLogin = () => {
    if (password === TEACHER_PASSWORD) {
      setIsLoggedIn(true);
      toast.success("Logged in!");
      setPassword("");
    } else {
      toast.error("Incorrect password");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 border-2">
          <h1 className="text-3xl font-black mb-2 text-center">Teacher Admin</h1>
          <p className="text-center text-gray-600 mb-6">Teachers only</p>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border-2 text-lg pr-10"
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

          <p className="text-xs text-gray-500 text-center mt-6">Demo: teacher123</p>
        </Card>
      </div>
    );
  }

  const selectedStudent = dbStudents.find((s) => s.id === selectedStudentId);

  if (selectedStudent && studentResponses.length > 0) {
    return (
      <div className="min-h-screen bg-[#f8f3f3] p-6">
        <div className="max-w-5xl mx-auto">
          <Button onClick={() => setSelectedStudentId(null)} variant="outline" className="mb-6">
            ← Back
          </Button>

          <div className="flex items-center justify-between mb-8">
            {isRenamingId === selectedStudent.id ? (
              <div className="flex gap-2 flex-1 max-w-md">
                <Input
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="New name"
                />
                <Button onClick={() => renameGroupMutation.mutateAsync({ studentId: selectedStudent.id, newName: newGroupName })}>Save</Button>
                <Button onClick={() => setIsRenamingId(null)} variant="outline">Cancel</Button>
              </div>
            ) : (
              <div>
                <h1 className="text-4xl font-black">{selectedStudent.groupName}</h1>
                <p className="text-gray-600 mt-1">{selectedStudent.members || "Group"}</p>
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={() => { setIsRenamingId(selectedStudent.id); setNewGroupName(selectedStudent.groupName || ""); }} variant="outline">✏️ Rename</Button>
              <Button onClick={() => deleteGroupMutation.mutateAsync({ studentId: selectedStudent.id })} className="bg-red-600">🗑️ Delete</Button>
            </div>
          </div>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Progress</h2>
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: 8 }, (_, i) => {
                const response = studentResponses.find(r => r.tabNumber === i + 1);
                return (
                  <div key={i} className="text-center">
                    <div className={`p-3 rounded font-bold ${response ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                      {response ? '✓' : '○'}
                    </div>
                    <p className="text-xs mt-1 text-gray-600">{i + 1}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="space-y-6">
            {studentResponses.map((response: any) => (
              <Card key={response.tabNumber} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Tab {response.tabNumber}: {TAB_NAMES[response.tabNumber - 1]}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => updateApprovalMutation.mutateAsync({ studentId: selectedStudent.id, tabNumber: response.tabNumber, isApproved: true })} className="bg-green-600">✓ Approve</Button>
                    <Button size="sm" onClick={() => updateApprovalMutation.mutateAsync({ studentId: selectedStudent.id, tabNumber: response.tabNumber, isApproved: false })} className="bg-red-600">✗ Reject</Button>
                  </div>
                </div>

                {getApprovalBadge(response.isApproved)}

                <div className="bg-gray-50 p-4 rounded my-4 max-h-64 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                    {JSON.stringify(response.responseData, null, 2)}
                  </pre>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Feedback</label>
                  <Textarea
                    value={feedbackNotes[`${selectedStudent.id}-${response.tabNumber}`] || ""}
                    onChange={(e) => setFeedbackNotes({ ...feedbackNotes, [`${selectedStudent.id}-${response.tabNumber}`]: e.target.value })}
                    placeholder="Add feedback..."
                    className="mb-2"
                  />
                  <Button size="sm" onClick={() => addFeedbackMutation.mutateAsync({ studentId: selectedStudent.id, tabNumber: response.tabNumber, feedback: feedbackNotes[`${selectedStudent.id}-${response.tabNumber}`] || "" })}>Save</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f3f3] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Student Groups</h1>

        <div className="grid gap-4">
          {dbStudents.map((student) => {
            const responses = allStudentResponses.filter(r => r.studentId === student.id);
            const completed = responses.length;
            
            return (
              <Card
                key={student.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedStudentId(student.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{student.groupName}</h3>
                    <p className="text-gray-600 mb-3">{student.members || "No members"}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${(completed / 8) * 100}%` }} />
                      </div>
                      <span className="text-sm font-bold">{completed}/8</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {Array.from({ length: 8 }, (_, i) => {
                      const has = responses.some(r => r.tabNumber === i + 1);
                      return (
                        <div key={i} className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${has ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                          {has ? '✓' : '○'}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {dbStudents.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-600 text-lg">No groups yet</p>
          </Card>
        )}
      </div>
    </div>
  );
}
