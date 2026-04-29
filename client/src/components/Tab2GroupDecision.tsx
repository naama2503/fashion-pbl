import React, { useState, useEffect } from "react";
import { validateTab2Fields, getFieldValidationStatus, type Tab2Fields } from "@/utils/tab2Validator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface Tab2GroupDecisionProps {
  onSave: (data: Tab2Fields) => void;
  initialData?: Tab2Fields;
  language: "en" | "he";
  isLoading?: boolean;
}

const labels = {
  en: {
    header: "Group Decision",
    groupMembers: "Group Members",
    studentName: "Student Name",
    comparisonTable: "Comparison Table",
    category: "Category",
    student: "Student",
    populationName: "Population Name",
    whyGood: "Why they're a good choice?",
    whyNotGood: "Why NOT to choose them?",
    finalSelection: "Final Selection",
    whichPopulation: "Which population did you choose?",
    why: "Why? (at least 2 sentences)",
    saveButton: "Save & Continue",
    rubricTitle: "Rubric Checklist",
    validationError: "Check capitalization in",
    validationPunctuation: "Must end with . ! or ?",
    allFieldsRequired: "All fields are required",
  },
  he: {
    header: "החלטה קבוצתית",
    groupMembers: "חברי הקבוצה",
    studentName: "שם הסטודנט",
    comparisonTable: "טבלת השוואה",
    category: "קטגוריה",
    student: "סטודנט",
    populationName: "שם האוכלוסייה",
    whyGood: "למה הם בחירה טובה?",
    whyNotGood: "למה לא לבחור אותם?",
    finalSelection: "בחירה סופית",
    whichPopulation: "איזו אוכלוסייה בחרתם?",
    why: "למה? (לפחות 2 משפטים)",
    saveButton: "שמור והמשך",
    rubricTitle: "רשימת בדיקה",
    validationError: "בדוק כתיבה בראשית",
    validationPunctuation: "חייב להסתיים ב . ! או ?",
    allFieldsRequired: "כל השדות נדרשים",
  },
};

export const Tab2GroupDecision: React.FC<Tab2GroupDecisionProps> = ({
  onSave,
  initialData,
  language,
  isLoading = false,
}) => {
  const t = labels[language];
  const isHebrew = language === "he";

  const [fields, setFields] = useState<Tab2Fields>(
    initialData || {
      studentName1: "",
      studentName2: "",
      studentName3: "",
      populationName: "",
      why1Student1: "",
      why1Student2: "",
      why1Student3: "",
      why2Student1: "",
      why2Student2: "",
      why2Student3: "",
      finalPopulation: "",
      finalWhy: "",
    }
  );

  const [validation, setValidation] = useState(validateTab2Fields(fields, language));

  // Update validation whenever fields change
  useEffect(() => {
    setValidation(validateTab2Fields(fields, language));
  }, [fields, language]);

  const handleFieldChange = (fieldName: keyof Tab2Fields, value: string) => {
    setFields((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    if (validation.isValid) {
      onSave(fields);
    }
  };

  const renderFieldStatus = (fieldName: keyof Tab2Fields) => {
    const status = getFieldValidationStatus(fieldName, fields[fieldName], language);
    return status;
  };

  return (
    <div dir={isHebrew ? "rtl" : "ltr"} className="w-full space-y-6 p-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">{t.header}</h2>
      </div>

      {/* Group Members Section */}
      <Card className="p-6 bg-white">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">{t.groupMembers}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["studentName1", "studentName2", "studentName3"] as const).map((fieldName, idx) => {
            const status = renderFieldStatus(fieldName);
            return (
              <div key={fieldName} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.student} {idx + 1}
                </label>
                <input
                  type="text"
                  value={fields[fieldName] || ""}
                  onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                  placeholder={t.studentName}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    status.isValid
                      ? "border-green-300 focus:ring-green-500"
                      : "border-red-300 focus:ring-red-500"
                  }`}
                />
                {status.error && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {status.error}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Comparison Table */}
      <Card className="p-6 bg-white overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">{t.comparisonTable}</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left font-semibold">{t.category}</th>
              <th className="border border-gray-300 p-3 text-left font-semibold">{t.student} 1</th>
              <th className="border border-gray-300 p-3 text-left font-semibold">{t.student} 2</th>
              <th className="border border-gray-300 p-3 text-left font-semibold">{t.student} 3</th>
            </tr>
          </thead>
          <tbody>
            {/* Population Name Row */}
            <tr>
              <td className="border border-gray-300 p-3 font-medium bg-gray-50">{t.populationName}</td>
              <td colSpan={3} className="border border-gray-300 p-3">
                <input
                  type="text"
                  value={fields.populationName || ""}
                  onChange={(e) => handleFieldChange("populationName", e.target.value)}
                  placeholder={t.populationName}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    renderFieldStatus("populationName").isValid
                      ? "border-green-300 focus:ring-green-500"
                      : "border-red-300 focus:ring-red-500"
                  }`}
                />
              </td>
            </tr>

            {/* Why Good Row */}
            <tr>
              <td className="border border-gray-300 p-3 font-medium bg-gray-50">{t.whyGood}</td>
              {(["why1Student1", "why1Student2", "why1Student3"] as const).map((fieldName) => {
                const status = renderFieldStatus(fieldName);
                return (
                  <td key={fieldName} className="border border-gray-300 p-3">
                    <textarea
                      value={fields[fieldName] || ""}
                      onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                      placeholder={t.whyGood}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-none ${
                        status.isValid
                          ? "border-green-300 focus:ring-green-500"
                          : "border-red-300 focus:ring-red-500"
                      }`}
                    />
                    {status.error && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {status.error}
                      </p>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Why Not Good Row */}
            <tr>
              <td className="border border-gray-300 p-3 font-medium bg-gray-50">{t.whyNotGood}</td>
              {(["why2Student1", "why2Student2", "why2Student3"] as const).map((fieldName) => {
                const status = renderFieldStatus(fieldName);
                return (
                  <td key={fieldName} className="border border-gray-300 p-3">
                    <textarea
                      value={fields[fieldName] || ""}
                      onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                      placeholder={t.whyNotGood}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-none ${
                        status.isValid
                          ? "border-green-300 focus:ring-green-500"
                          : "border-red-300 focus:ring-red-500"
                      }`}
                    />
                    {status.error && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {status.error}
                      </p>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Final Selection */}
      <Card className="p-6 bg-white">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">{t.finalSelection}</h3>
        <div className="space-y-4">
          {/* Final Population */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.whichPopulation}
            </label>
            <input
              type="text"
              value={fields.finalPopulation || ""}
              onChange={(e) => handleFieldChange("finalPopulation", e.target.value)}
              placeholder={t.whichPopulation}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                renderFieldStatus("finalPopulation").isValid
                  ? "border-green-300 focus:ring-green-500"
                  : "border-red-300 focus:ring-red-500"
              }`}
            />
            {renderFieldStatus("finalPopulation").error && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {renderFieldStatus("finalPopulation").error}
              </p>
            )}
          </div>

          {/* Final Why */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.why}</label>
            <textarea
              value={fields.finalWhy || ""}
              onChange={(e) => handleFieldChange("finalWhy", e.target.value)}
              placeholder={t.why}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-none ${
                renderFieldStatus("finalWhy").isValid
                  ? "border-green-300 focus:ring-green-500"
                  : "border-red-300 focus:ring-red-500"
              }`}
            />
            {renderFieldStatus("finalWhy").error && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle size={14} />
                {renderFieldStatus("finalWhy").error}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Rubric Panel */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold mb-4 text-blue-900 flex items-center gap-2">
          {validation.isValid ? (
            <CheckCircle2 size={20} className="text-green-600" />
          ) : (
            <AlertCircle size={20} className="text-red-600" />
          )}
          {t.rubricTitle}
        </h3>
        <div className="space-y-2">
          {validation.errors.length === 0 ? (
            <p className="text-green-700 font-medium flex items-center gap-2">
              <CheckCircle2 size={16} />
              All fields are valid! Ready to save.
            </p>
          ) : (
            <div className="space-y-2">
              {validation.errors.map((error, idx) => (
                <p key={idx} className="text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle size={14} />
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleSave}
          disabled={!validation.isValid || isLoading}
          className={`px-6 py-2 rounded-md font-semibold text-white transition-all ${
            validation.isValid
              ? "bg-green-600 hover:bg-green-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed opacity-50"
          }`}
        >
          {isLoading ? "Saving..." : t.saveButton}
        </Button>
      </div>
    </div>
  );
};
