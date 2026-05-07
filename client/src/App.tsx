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

function Router({ studentId, onStudentLogin, forceLogin }: { studentId: number | null; onStudentLogin: (id: number, name: string) => void; forceLogin: boolean }) {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/project"}>
        {studentId && !forceLogin ? <ProjectPage studentId={studentId} /> : <StudentLogin onLoginSuccess={onStudentLogin} />}
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
  const [forceLogin, setForceLogin] = useState(false);

  // Load student from localStorage on mount
  useEffect(() => {
    // Check if URL has newProject parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get("newProject") === "1") {
      setForceLogin(true);
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const savedStudentId = localStorage.getItem("studentId");
      const savedStudentName = localStorage.getItem("studentName");
      const savedGroupName = localStorage.getItem("groupName");
      if (savedStudentId) {
        setStudentId(parseInt(savedStudentId));
        setStudentName(savedStudentName);
      }
    }
  }, []);

  const handleStudentLogin = (id: number, name: string) => {
    setStudentId(id);
    setStudentName(name);
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
            <Router studentId={studentId} onStudentLogin={handleStudentLogin} forceLogin={forceLogin} />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
