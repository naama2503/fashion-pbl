/*
 * Fashion PBL – Teacher Admin Dashboard
 * Connected to real database via tRPC queries
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { translations } from "@/lib/translations";
import { Eye, EyeOff, CheckCircle, XCircle, Loader2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";

const TEACHER_PASSWORD = "teacher123";
const TAB_NAMES = ["Home", "Group Decision", "Research", "Design Inquiry", "Logo", "Vector Art", "Fashion Item", "Product Choice", "Reflection"];
const TAB_NAMES_HE = ["בית", "החלטה קבוצתית", "מחקר", "חוקי עיצוב", "יצירת לוגו", "וקטור אמנות", "פריט אופנה", "בחירת מוצר", "רפלקציה"];

// Helper function to extract key data from responses
function extractSummaryData(studentResponses: any[]) {
  const tab2Response = studentResponses.find(r => r.tabNumber === 2);
  const tab3Response = studentResponses.find(r => r.tabNumber === 3);
  
  let tab2Data = tab2Response?.responseData || {};
  let tab3Data = tab3Response?.responseData || {};
  
  // Parse JSON string if responseData is a string
  if (typeof tab2Data === 'string') {
    try {
      tab2Data = JSON.parse(tab2Data);
    } catch (e) {
      tab2Data = {};
    }
  }
  
  if (typeof tab3Data === 'string') {
    try {
      tab3Data = JSON.parse(tab3Data);
    } catch (e) {
      tab3Data = {};
    }
  }

  return {
    suggestedGroups: tab2Data?.table_0_0 || tab2Data?.table_1_0 || tab2Data?.suggestedGroups || "Not provided",
    finalDecision: tab2Data?.populationName || tab2Data?.chosenPopulation || tab2Data?.finalDecision || "Not provided",
    reason: tab2Data?.explanation || tab2Data?.reason || tab2Data?.whyChosen || "Not provided",
    researchParagraph: tab3Data?.researchText || tab3Data?.paragraph || tab3Data?.research || "Not provided",
  };
}

// Helper function to extract file links from responses
function extractFileLinks(responseData: any) {
  let data = responseData || {};
  
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = {};
    }
  }

  return {
    canvaLink: data?.canvaLink || data?.canva_link,
    vectorFileUrl: data?.vectorFileUrl || data?.vector_file_url,
    productChoice: data?.productChoice || data?.product_choice,
    reflectionData: data?.reflectionData || data?.reflection_data,
  };
}

// Helper function to get approval status badge
function getApprovalBadge(isApproved: boolean | null) {
  if (isApproved === null || isApproved === undefined) {
    return <Badge variant="outline">{translations.admin.pending}</Badge>;
  }
  if (isApproved) {
    return <Badge className="bg-green-600">{translations.admin.approved}</Badge>;
  }
  return <Badge className="bg-red-600">{translations.admin.rejected}</Badge>;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [expandedStudentId, setExpandedStudentId] = useState<number | null>(null);
  const [feedbackNotes, setFeedbackNotes] = useState<{ [key: string]: string }>({});

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
      const notes = feedbackNotes[`${studentId}-${tabNumber}`] || "";
      await updateApprovalMutation.mutateAsync({
        studentId,
        tabNumber,
        isApproved: false,
      });
      toast.success(`Tab ${tabNumber} rejected for revision${notes ? " with feedback" : ""}`);
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

  // Detail view when student is selected
  if (selectedStudent && studentResponses.length > 0) {
    return (
      <div className="min-h-screen bg-amber-50 p-4">
        <div className="container max-w-4xl">
          <Button onClick={() => setSelectedStudentId(null)} variant="outline" className="mb-6">
            ← Back to Students / חזור לתלמידים
          </Button>

          <Card className="p-8 border-2 border-gray-300">
            <h2 className="text-3xl font-black mb-2">{selectedStudent.groupName || `Student ${selectedStudent.id}`}</h2>
            <p className="text-gray-600 mb-6">{selectedStudent.members ? `Members: ${selectedStudent.members}` : "Group"}</p>

            {/* Tab Status Indicators with Approval Badges */}
            <div className="grid grid-cols-9 gap-2 mb-8">
              {Array.from({ length: 9 }, (_, i) => {
                const tabNum = i + 1;
                const response = studentResponses.find(r => r.tabNumber === tabNum);
                return (
                  <div
                    key={tabNum}
                    className="flex flex-col items-center gap-1"
                    title={TAB_NAMES[i]}
                  >
                    <div
                      className={`w-full p-3 rounded text-center text-sm font-semibold ${
                        response
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {response ? '✓' : '○'} {tabNum}
                    </div>
                    {response && getApprovalBadge((response as any).isApproved)}
                  </div>
                );
              })}
            </div>

            {/* Summary Section */}
            {studentResponses.length > 0 && (
              <div className="space-y-6 mb-8">
                {(() => {
                  const summary = extractSummaryData(studentResponses);
                  return (
                    <>
                      <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-bold text-lg mb-2">Groups They Suggested</h3>
                        <p className="text-gray-700">{summary.suggestedGroups}</p>
                      </div>

                      <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
                        <h3 className="font-bold text-lg mb-2">Final Decision</h3>
                        <p className="text-gray-700">{summary.finalDecision}</p>
                      </div>

                      <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500">
                        <h3 className="font-bold text-lg mb-2">Their Reason</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{summary.reason}</p>
                      </div>

                      <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                        <h3 className="font-bold text-lg mb-2">Research Paragraph</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{summary.researchParagraph}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Tabs 5-7 Details with File Links */}
            <div className="space-y-6">
              {studentResponses.filter(r => r.tabNumber >= 5).map((response) => {
                const files = extractFileLinks(response.responseData);
                return (
                  <div key={response.id} className="bg-white p-6 rounded-lg border-2 border-gray-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">
                          Tab {response.tabNumber} - {TAB_NAMES[response.tabNumber - 1]}
                        </h3>
                        {getApprovalBadge((response as any).isApproved)}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(selectedStudent.id, response.tabNumber)}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle size={16} />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(selectedStudent.id, response.tabNumber)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
                        >
                          <XCircle size={16} />
                          Reject
                        </Button>
                      </div>
                    </div>

                    {/* File Links */}
                    {(files.canvaLink || files.vectorFileUrl || files.productChoice) && (
                      <div className="mb-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500 space-y-2">
                        {files.canvaLink && (
                          <a
                            href={files.canvaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                          >
                            <ExternalLink size={16} />
                            {translations.admin.viewCanva}
                          </a>
                        )}
                        {files.vectorFileUrl && (
                          <a
                            href={files.vectorFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                          >
                            <ExternalLink size={16} />
                            {translations.admin.downloadFile}
                          </a>
                        )}
                        {files.productChoice && (
                          <div className="text-sm text-gray-700">
                            <strong>Product Choice:</strong> {files.productChoice}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Feedback Notes */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">{translations.admin.feedbackNotes}</label>
                      <Textarea
                        value={feedbackNotes[`${selectedStudent.id}-${response.tabNumber}`] || ""}
                        onChange={(e) => setFeedbackNotes({
                          ...feedbackNotes,
                          [`${selectedStudent.id}-${response.tabNumber}`]: e.target.value
                        })}
                        placeholder={translations.admin.feedbackPlaceholder}
                        className="border-2 border-gray-300 min-h-24"
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-900">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(response.responseData, null, 2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tabs 1-4 Approval Buttons */}
            <div className="mt-8 pt-8 border-t-2 border-gray-300">
              <h3 className="font-bold text-lg mb-4">Approve/Reject Tabs 1-4</h3>
              <div className="grid grid-cols-2 gap-4">
                {studentResponses.filter(r => r.tabNumber <= 4).map((response) => (
                  <div key={response.id} className="flex items-center justify-between p-4 bg-gray-50 rounded border-l-4 border-gray-300">
                    <div className="flex-1">
                      <span className="font-semibold">Tab {response.tabNumber} - {TAB_NAMES[response.tabNumber - 1]}</span>
                      <div className="mt-1">{getApprovalBadge((response as any).isApproved)}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(selectedStudent.id, response.tabNumber)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedStudent.id, response.tabNumber)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="container max-w-6xl">
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
              const studentTabs = allStudentResponses.filter((r) => r.studentId === student.id);
              const tabStatuses = Array.from({ length: 9 }, (_, i) => {
                const tabNum = i + 1;
                const response = studentTabs.find(r => r.tabNumber === tabNum);
                return {
                  tabNum,
                  submitted: !!response,
                  label: TAB_NAMES[i],
                  isApproved: (response as any)?.isApproved
                };
              });

              const summary = extractSummaryData(studentTabs);

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

                  {/* Tab Status Indicators with Badges */}
                  <div className="grid grid-cols-7 gap-2 mt-4">
                    {tabStatuses.map((tab) => (
                      <div
                        key={tab.tabNum}
                        className="flex flex-col items-center gap-1"
                        title={tab.label}
                      >
                        <div
                          className={`w-full p-2 rounded text-center text-xs font-semibold cursor-pointer hover:shadow-md transition-shadow ${
                            tab.submitted
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                          onClick={() => {
                            if (tab.submitted) {
                              setSelectedStudentId(student.id);
                            }
                          }}
                        >
                          {tab.submitted ? '✓' : '○'} {tab.tabNum}
                        </div>
                        {tab.submitted && getApprovalBadge((tab as any).isApproved)}
                      </div>
                    ))}
                  </div>

                  {/* Expanded Summary View */}
                  {isExpanded && studentTabs.length > 0 && (
                    <div className="mt-6 pt-6 border-t-2 border-gray-300 space-y-4">
                      <h4 className="font-bold text-lg">Summary:</h4>
                      
                      <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                        <p className="text-xs text-gray-600 font-semibold mb-1">GROUPS SUGGESTED</p>
                        <p className="text-sm text-gray-800">{summary.suggestedGroups}</p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-500">
                        <p className="text-xs text-gray-600 font-semibold mb-1">FINAL DECISION</p>
                        <p className="text-sm text-gray-800">{summary.finalDecision}</p>
                      </div>

                      <div className="bg-orange-50 p-4 rounded border-l-4 border-orange-500">
                        <p className="text-xs text-gray-600 font-semibold mb-1">THEIR REASON</p>
                        <p className="text-sm text-gray-800 line-clamp-3">{summary.reason}</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                        <p className="text-xs text-gray-600 font-semibold mb-1">RESEARCH PARAGRAPH</p>
                        <p className="text-sm text-gray-800 line-clamp-3">{summary.researchParagraph}</p>
                      </div>

                      <Button
                        onClick={() => setSelectedStudentId(student.id)}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        View Full Details & Approve/Reject
                      </Button>
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
