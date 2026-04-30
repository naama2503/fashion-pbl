import React, { useState, useMemo } from "react";
import { Lock, AlertCircle, CheckCircle } from "lucide-react";
import { FieldInput, FieldError } from "./FieldError";
import { validateGrammar } from "@/utils/grammarValidator";
import { getGroupNameMessage, getRequiredFieldMessage } from "@/utils/detailedErrorMessages";

interface Tab1Props {
  responses: Record<string, any>;
  updateResponse: (key: string, value: string) => void;
  isLocked: boolean;
  language: "en" | "he";
  tabColor: string;
  onSave: () => void;
  onViewPreviousWork: () => void;
  isLoadingPreviousWork: boolean;
  saveDisabled: boolean;
  images: Record<string, string>;
}

interface FieldErrors {
  [key: string]: string | null;
}

interface DetailedFieldErrors {
  [key: string]: { message: string | null; detailed: string | null };
}

export const Tab1GroupDecision: React.FC<Tab1Props> = ({
  responses,
  updateResponse,
  isLocked,
  language,
  tabColor,
  onSave,
  onViewPreviousWork,
  isLoadingPreviousWork,
  saveDisabled,
  images,
}) => {
  const [shakeFields, setShakeFields] = useState<Set<string>>(new Set());
  const [studentNames, setStudentNames] = useState<string[]>([
    responses.studentName1 || "",
    responses.studentName2 || "",
    responses.studentName3 || "",
  ]);

  const isRTL = language === "he";

  // Validate all fields in real-time
  const fieldErrors = useMemo<FieldErrors>(() => {
    const errors: FieldErrors = {};

    // Validate student names
    [0, 1, 2].forEach((idx) => {
      const name = studentNames[idx];
      const fieldKey = `studentName${idx + 1}`;
      if (!name?.trim()) {
        errors[fieldKey] = language === "en" ? `Student ${idx + 1} name is required.` : `שם סטודנט ${idx + 1} נדרש.`;
      } else if (!/^[A-Z]/.test(name.trim())) {
        errors[fieldKey] = language === "en"
          ? `Fix capitalization in Student ${idx + 1}.`
          : `תקן הון בסטודנט ${idx + 1}.`;
      } else if (!/[.!?]$/.test(name.trim())) {
        errors[fieldKey] = language === "en"
          ? `Fix punctuation in Student ${idx + 1}.`
          : `תקן פיסוק בסטודנט ${idx + 1}.`;
      } else {
        errors[fieldKey] = null;
      }
    });

    // Validate population name
    const populationName = responses.populationName || "";
    if (!populationName?.trim()) {
      errors.populationName = language === "en" ? "Population name is required." : "שם האוכלוסייה נדרש.";
    } else if (!/^[A-Z].*[.!?]$/.test(populationName.trim())) {
      errors.populationName = language === "en"
        ? "Fix capitalization and punctuation in population name."
        : "תקן הון וסימני פיסוק בשם האוכלוסייה.";
    } else {
      errors.populationName = null;
    }

    // Validate table responses (comparison table)
    [0, 1, 2].forEach((rowIdx) => {
      [0, 1, 2].forEach((colIdx) => {
        const key = `table_${rowIdx}_${colIdx}`;
        const value = responses[key] || "";
        if (value?.trim()) {
          if (!/^[A-Z]/.test(value.trim())) {
            errors[key] = language === "en"
              ? `Fix capitalization in row ${rowIdx + 1}, student ${colIdx + 1}.`
              : `תקן הון בשורה ${rowIdx + 1}, סטודנט ${colIdx + 1}.`;
          } else if (!/[.!?]$/.test(value.trim())) {
            errors[key] = language === "en"
              ? `Fix punctuation in row ${rowIdx + 1}, student ${colIdx + 1}.`
              : `תקן פיסוק בשורה ${rowIdx + 1}, סטודנט ${colIdx + 1}.`;
          } else {
            errors[key] = null;
          }
        }
      });
    });

    // Validate chosen population (using populationName field)
    const chosenPopulation = responses.populationName || "";
    if (!chosenPopulation?.trim()) {
      errors.populationName = language === "en" ? "Final population choice is required." : "בחירה סופית של אוכלוסייה נדרשת.";
    } else if (!/^[A-Z]/.test(chosenPopulation.trim())) {
      errors.populationName = language === "en"
        ? "Fix capitalization in population name."
        : "תקן הון בשם האוכלוסייה.";
    } else if (!/[.!?]$/.test(chosenPopulation.trim())) {
      errors.populationName = language === "en"
        ? "Fix punctuation in population name."
        : "תקן פיסוק בשם האוכלוסייה.";
    } else {
      errors.populationName = null;
    }

    // Validate why chosen
    const whyChosen = responses.whyChosen || "";
    if (!whyChosen?.trim()) {
      errors.whyChosen = language === "en" ? "Explanation is required." : "הסבר נדרש.";
    } else if (!/^[A-Z]/.test(whyChosen.trim())) {
      errors.whyChosen = language === "en"
        ? "Fix capitalization in explanation."
        : "תקן הון בהסבר.";
    } else if (!/[.!?]$/.test(whyChosen.trim())) {
      errors.whyChosen = language === "en"
        ? "Fix punctuation in explanation."
        : "תקן פיסוק בהסבר.";
    } else {
      errors.whyChosen = null;
    }

    return errors;
  }, [responses, studentNames, language]);

  // Check if all fields are valid
  const allFieldsValid = Object.values(fieldErrors).every((error) => error === null);

  // Handle student name change with real-time validation
  const handleStudentNameChange = (idx: number, value: string) => {
    const newNames = [...studentNames];
    newNames[idx] = value;
    setStudentNames(newNames);
    updateResponse(`studentName${idx + 1}`, value);
  };

  // Handle save with shake animation on invalid fields
  const handleSaveClick = () => {
    if (!allFieldsValid) {
      // Find first invalid field and shake it
      const invalidFields = Object.keys(fieldErrors).filter((key) => fieldErrors[key] !== null);
      if (invalidFields.length > 0) {
        setShakeFields(new Set(invalidFields));
        setTimeout(() => setShakeFields(new Set()), 500);
      }
    } else {
      onSave();
    }
  };

  return (
    <div style={{ backgroundColor: tabColor, minHeight: "100vh" }}>
      <div style={{ marginLeft: "16rem", paddingTop: "5rem", padding: "2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333333", marginBottom: "0.5rem" }}>
                {language === "en" ? "Group Decision" : "החלטה קבוצתית"}
              </h1>
              <p style={{ color: "#555555", marginBottom: "1.5rem" }}>
                {language === "en"
                  ? "Work in groups of 2-3. Choose a population to help."
                  : "עבדו בקבוצות של 2-3. בחרו אוכלוסיה לעזור."}
              </p>

              {isLocked && (
                <div
                  style={{
                    backgroundColor: "#FEF3C7",
                    border: "2px solid #FCD34D",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    marginBottom: "1.5rem",
                    display: "flex",
                    gap: "0.75rem",
                  }}
                >
                  <Lock size={24} style={{ color: "#D97706" }} />
                  <p style={{ fontWeight: "bold", color: "#92400E" }}>
                    {language === "en"
                      ? "This tab is locked. Get teacher approval for Tab 1 first!"
                      : "טאב זה נעול. קבל אישור ממורה עבור טאב 1 בראשונה!"}
                  </p>
                </div>
              )}

              <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem" }}>
                {/* Assignment Box */}
                <div
                  style={{
                    marginBottom: "2rem",
                    backgroundColor: "#F3F4F6",
                    padding: "1rem",
                    borderRadius: "0.375rem",
                    borderLeft: isRTL ? "none" : "4px solid #333333",
                    borderRight: isRTL ? "4px solid #333333" : "none",
                  }}
                >
                  <p style={{ fontSize: "0.95rem", color: "#333333", lineHeight: "1.6" }}>
                    <strong>
                      {language === "en" ? "Assignment (משימה):" : "משימה:"}
                    </strong>{" "}
                    {language === "en"
                      ? "Think of a group of people in the world today who are suffering and people are not aware enough of their struggle."
                      : "חשבו על קבוצת אנשים בעולם היום שסובלים ואנשים לא מודעים מספיק למאבקם."}
                  </p>
                </div>

                {/* Group Members Section */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "1rem", color: "#333333" }}>
                    {language === "en" ? "Group Members / חברי הקבוצה" : "חברי הקבוצה"}
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                    {[0, 1, 2].map((idx) => (
                      <div key={idx}>
                        <FieldInput
                          type="text"
                          value={studentNames[idx]}
                          onChange={(value) => handleStudentNameChange(idx, value)}
                          error={fieldErrors[`studentName${idx + 1}`]}
                          placeholder={language === "en" ? `Student ${idx + 1}` : `סטודנט ${idx + 1}`}
                          disabled={isLocked}
                          language={language}
                          shake={shakeFields.has(`studentName${idx + 1}`)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Table */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "1rem", color: "#333333" }}>
                    {language === "en" ? "Compare Populations (השווה בין אוכלוסיות)" : "השווה בין אוכלוסיות"}
                  </label>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "2px solid #D1D5DB" }}>
                          <th
                            style={{
                              padding: "0.75rem",
                              textAlign: isRTL ? "right" : "left",
                              fontWeight: "bold",
                              color: "#333333",
                              borderRight: isRTL ? "none" : "1px solid #D1D5DB",
                              borderLeft: isRTL ? "1px solid #D1D5DB" : "none",
                            }}
                          >
                            {language === "en" ? "Population Name" : "שם אוכלוסיה"}
                          </th>
                          {studentNames.map((name, idx) => (
                            <th
                              key={idx}
                              style={{
                                padding: "0.75rem",
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "#333333",
                                borderRight: isRTL ? "none" : "1px solid #D1D5DB",
                                borderLeft: isRTL ? "1px solid #D1D5DB" : "none",
                              }}
                            >
                              {name || `Student ${idx + 1}`}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { en: "Name of Population", he: "שם אוכלוסיה" },
                          { en: "Why they're a good choice?", he: "למה הם בחירה טובה?" },
                          { en: "Why NOT to choose them?", he: "למה לא לבחור אותם?" },
                        ].map((row, rowIdx) => (
                          <tr key={rowIdx} style={{ borderBottom: "1px solid #E5E7EB" }}>
                            <td
                              style={{
                                padding: "0.75rem",
                                fontWeight: "bold",
                                color: "#555555",
                                backgroundColor: "#F9FAFB",
                                borderRight: isRTL ? "none" : "1px solid #D1D5DB",
                                borderLeft: isRTL ? "1px solid #D1D5DB" : "none",
                              }}
                            >
                              {language === "en" ? row.en : row.he}
                            </td>
                            {studentNames.map((name, colIdx) => {
                              const fieldKey = `table_${rowIdx}_${colIdx}`;
                              return (
                                <td
                                  key={colIdx}
                                  style={{
                                    padding: "0.75rem",
                                    borderRight: isRTL ? "none" : "1px solid #D1D5DB",
                                    borderLeft: isRTL ? "1px solid #D1D5DB" : "none",
                                  }}
                                >
                                  <textarea
                                    value={responses[fieldKey] || ""}
                                    onChange={(e) => updateResponse(fieldKey, e.target.value)}
                                    disabled={isLocked}
                                    style={{
                                      width: "100%",
                                      padding: "0.5rem",
                                      border: fieldErrors[fieldKey] ? "2px solid #dc2626" : "1px solid #D1D5DB",
                                      borderRadius: "0.375rem",
                                      fontFamily: "'Alef', 'Assistant', sans-serif",
                                      minHeight: "60px",
                                      resize: "vertical",
                                      backgroundColor: fieldErrors[fieldKey] ? "rgba(220, 38, 38, 0.05)" : "#ffffff",
                                      direction: isRTL ? "rtl" : "ltr",
                                      textAlign: isRTL ? "right" : "left",
                                      animation: shakeFields.has(fieldKey) ? "shake 0.5s ease-in-out" : "none",
                                    }}
                                    className={shakeFields.has(fieldKey) ? "shake" : ""}
                                    placeholder={language === "en" ? "Enter text..." : "הזן טקסט..."}
                                  />
                                  {fieldErrors[fieldKey] && (
                                    <FieldError error={fieldErrors[fieldKey]} isValid={false} language={language} />
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Final Population Choice */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem", color: "#333333" }}>
                    {language === "en" ? "Which population did you choose?" : "איזו אוכלוסייה בחרתם?"}
                  </label>
                  <FieldInput
                    type="text"
                    value={responses.populationName || ""}
                    onChange={(value) => updateResponse("populationName", value)}
                    error={fieldErrors.populationName}
                    placeholder={language === "en" ? "Enter population name..." : "הזן שם אוכלוסיה..."}
                    disabled={isLocked}
                    language={language}
                    shake={shakeFields.has("populationName")}
                  />

                  <label
                    style={{
                      display: "block",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                      marginTop: "1rem",
                      color: "#333333",
                    }}
                  >
                    {language === "en" ? "Why? (at least 2 sentences)" : "למה? (לפחות 2 משפטים)"}
                  </label>
                  <FieldInput
                    type="textarea"
                    value={responses.whyChosen || ""}
                    onChange={(value) => updateResponse("whyChosen", value)}
                    error={fieldErrors.whyChosen}
                    placeholder={language === "en" ? "Explain your choice..." : "הסבר את בחירתך..."}
                    disabled={isLocked}
                    language={language}
                    shake={shakeFields.has("whyChosen")}
                    minHeight="100px"
                  />
                </div>

                {/* Validation Summary */}
                {!allFieldsValid && Object.values(fieldErrors).some((e) => e !== null) && (
                  <div
                    style={{
                      backgroundColor: "#FEE2E2",
                      border: "2px solid #FCA5A5",
                      borderRadius: "0.375rem",
                      padding: "1rem",
                      marginBottom: "1.5rem",
                      direction: isRTL ? "rtl" : "ltr",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    <p style={{ fontWeight: "bold", color: "#DC2626", marginBottom: "0.5rem" }}>
                      {language === "en" ? "⚠️ Please fix the errors below:" : "⚠️ אנא תקן את השגיאות למטה:"}
                    </p>
                    {Object.entries(fieldErrors)
                      .filter(([_, error]) => error !== null)
                      .map(([key, error]) => (
                        <div key={key} style={{ display: "flex", gap: "0.5rem", color: "#DC2626", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                          <AlertCircle size={16} style={{ flexShrink: 0 }} />
                          <span>{error}</span>
                        </div>
                      ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <button
                    onClick={onViewPreviousWork}
                    disabled={isLoadingPreviousWork}
                    style={{
                      backgroundColor: "#E0E7FF",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      border: "2px solid #818CF8",
                      borderRadius: "0.5rem",
                      cursor: isLoadingPreviousWork ? "not-allowed" : "pointer",
                    }}
                  >
                    {isLoadingPreviousWork ? "Loading..." : "📋 View Previous Work"}
                  </button>
                  <button
                    onClick={handleSaveClick}
                    disabled={isLocked || saveDisabled || !allFieldsValid}
                    style={{
                      backgroundColor:
                        isLocked || saveDisabled || !allFieldsValid
                          ? "#D1D5DB"
                          : "#FDBA74",
                      color: "#333333",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "0.5rem",
                      cursor:
                        isLocked || saveDisabled || !allFieldsValid
                          ? "not-allowed"
                          : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {allFieldsValid ? (
                      <>
                        <CheckCircle size={20} />
                        {language === "en" ? "Save & Continue" : "שמור והמשך"}
                      </>
                    ) : (
                      <>
                        <AlertCircle size={20} />
                        {language === "en" ? "Fix grammar and punctuation" : "תקן דקדוק וסימני פיסוק"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <img src={images.groupBottom} alt="Social change" style={{ width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
