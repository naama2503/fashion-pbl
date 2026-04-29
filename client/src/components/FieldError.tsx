import React from "react";
import { AlertCircle } from "lucide-react";

interface FieldErrorProps {
  error: string | null;
  isValid: boolean;
  language?: "en" | "he";
  shake?: boolean;
}

/**
 * Displays field-specific error message with optional shake animation
 */
export const FieldError: React.FC<FieldErrorProps> = ({
  error,
  isValid,
  language = "en",
  shake = false,
}) => {
  if (!error) return null;

  const isRTL = language === "he";

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        marginTop: "0.5rem",
        alignItems: "flex-start",
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left",
        animation: shake ? "shake 0.5s ease-in-out" : "none",
      }}
      className={shake ? "shake" : ""}
    >
      <AlertCircle
        size={18}
        style={{
          color: "#dc2626",
          flexShrink: 0,
          marginTop: "0.125rem",
        }}
      />
      <span
        style={{
          color: "#dc2626",
          fontSize: "0.875rem",
          fontWeight: "500",
          lineHeight: "1.4",
        }}
      >
        {error}
      </span>
    </div>
  );
};

/**
 * Input field wrapper with integrated error display and styling
 */
interface FieldInputProps {
  type?: "text" | "textarea" | "email" | "number";
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  placeholder?: string;
  disabled?: boolean;
  language?: "en" | "he";
  shake?: boolean;
  onShakeComplete?: () => void;
  minHeight?: string;
  rows?: number;
}

export const FieldInput: React.FC<FieldInputProps> = ({
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  language = "en",
  shake = false,
  onShakeComplete,
  minHeight = "auto",
  rows = 3,
}) => {
  const isRTL = language === "he";
  const isValid = !error;

  const baseStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.375rem",
    fontFamily: "'Alef', 'Assistant', sans-serif",
    direction: isRTL ? "rtl" : "ltr",
    textAlign: isRTL ? "right" : "left",
    transition: "all 0.2s ease",
    border: error ? "2px solid #dc2626" : "2px solid #d1d5db",
    backgroundColor: error ? "rgba(220, 38, 38, 0.05)" : "#ffffff",
    animation: shake ? "shake 0.5s ease-in-out" : "none",
  };

  const handleAnimationEnd = () => {
    onShakeComplete?.();
  };

  if (type === "textarea") {
    return (
      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          style={{
            ...baseStyle,
            minHeight,
            resize: "vertical",
          } as React.CSSProperties}
          className={shake ? "shake" : ""}
          onAnimationEnd={handleAnimationEnd}
        />
        <FieldError error={error} isValid={isValid} language={language} />
      </div>
    );
  }

  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        style={baseStyle as React.CSSProperties}
        className={shake ? "shake" : ""}
        onAnimationEnd={handleAnimationEnd}
      />
      <FieldError error={error} isValid={isValid} language={language} />
    </div>
  );
};
