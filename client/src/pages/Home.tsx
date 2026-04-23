import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Lock } from "lucide-react";

const STAGES = [
  { num: 1, title: "Home", titleHe: "בית", color: "#FDE68A" },
  { num: 2, title: "Group Decision", titleHe: "החלטה קבוצתית", color: "#FDBA74" },
  { num: 3, title: "Research", titleHe: "מחקר", color: "#FCA5A5" },
  { num: 4, title: "Design Inquiry", titleHe: "חוקי עיצוב", color: "#D8B4FE" },
  { num: 5, title: "Creating a Logo", titleHe: "יצירת לוגו", color: "#93C5FD" },
  { num: 6, title: "Fashion Item", titleHe: "פריט אופנה", color: "#86EFAC" },
  { num: 7, title: "Presentation", titleHe: "מצגת", color: "#94A3B8" },
];

export default function Home() {
  const [, navigate] = useLocation();
  const { user } = useAuth();

  const handleStageClick = (stageNum: number) => {
    navigate("/project");
  };

  return (
    <div style={{ backgroundColor: "#b79d8a", minHeight: "100vh" }} className="p-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#333333" }} className="mb-4">
            HOW CAN FASHION CREATE SOCIAL CHANGE?
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#555555" }} className="mb-8">
            Fashion can change the world! (אופנה יכולה לשנות את העולם!)
          </p>
        </div>

        {/* Bento Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {STAGES.map((stage) => (
            <div
              key={stage.num}
              onClick={() => handleStageClick(stage.num)}
              style={{
                backgroundColor: stage.color,
                borderRadius: "0.5rem",
                padding: "2rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                {stage.num}
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#333333" }}>
                {stage.title}
              </div>
              <div style={{ fontSize: "0.875rem", color: "#555555", marginTop: "0.5rem" }}>
                {stage.titleHe}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/project")}
            style={{
              backgroundColor: "#333333",
              color: "white",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#555555")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
          >
            Start Your Project →
          </button>
          <button
            onClick={() => navigate("/admin")}
            style={{
              backgroundColor: "white",
              color: "#333333",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "2px solid #333333",
              borderRadius: "0.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
          >
            Teacher Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
