import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import AdminDashboard from "./pages/AdminDashboard";
import { StudentLogin } from "./components/StudentLogin";

function Router({ studentId, startTab, onStudentLogin }: { studentId: number | null; startTab: number | null; onStudentLogin: (id: number, name: string, tab?: number) => void }) {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/project"}>
        {studentId ? <ProjectPage studentId={studentId} startTab={startTab} /> : <StudentLogin onLoginSuccess={onStudentLogin} />}
      </Route>
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [startTab, setStartTab] = useState<number | null>(null);

  // Load student from localStorage on mount
  useEffect(() => {
    const savedStudentId = localStorage.getItem("studentId");
    const savedStudentName = localStorage.getItem("studentName");
    const savedGroupName = localStorage.getItem("groupName");
    if (savedStudentId) {
      setStudentId(parseInt(savedStudentId));
      setStudentName(savedStudentName);
    }
  }, []);

  const handleStudentLogin = (id: number, name: string, tab?: number) => {
    setStudentId(id);
    setStudentName(name);
    if (tab !== undefined) {
      setStartTab(tab);
    }
    localStorage.setItem("studentId", id.toString());
    localStorage.setItem("studentName", name);
    localStorage.setItem("groupName", name); // Store group name for database
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router studentId={studentId} startTab={startTab} onStudentLogin={handleStudentLogin} />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
