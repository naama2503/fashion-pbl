import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tab2GroupDecision } from "./Tab2GroupDecision";

describe("Tab2GroupDecision Component", () => {
  it("renders all form sections", () => {
    const mockOnSave = vi.fn();
    render(
      <Tab2GroupDecision
        onSave={mockOnSave}
        language="en"
      />
    );

    expect(screen.getByText("Group Decision")).toBeInTheDocument();
    expect(screen.getByText("Group Members")).toBeInTheDocument();
    expect(screen.getByText("Comparison Table")).toBeInTheDocument();
    expect(screen.getByText("Final Selection")).toBeInTheDocument();
    expect(screen.getByText("Rubric Checklist")).toBeInTheDocument();
  });

  it("renders all student name inputs", () => {
    const mockOnSave = vi.fn();
    render(
      <Tab2GroupDecision
        onSave={mockOnSave}
        language="en"
      />
    );

    const inputs = screen.getAllByPlaceholderText("Student Name");
    expect(inputs).toHaveLength(3);
  });

  it("disables save button when fields are empty", () => {
    const mockOnSave = vi.fn();
    render(
      <Tab2GroupDecision
        onSave={mockOnSave}
        language="en"
      />
    );

    const saveButton = screen.getByText("Save & Continue");
    expect(saveButton).toBeDisabled();
  });

  it("shows validation errors for invalid input", () => {
    const mockOnSave = vi.fn();
    render(
      <Tab2GroupDecision
        onSave={mockOnSave}
        language="en"
      />
    );

    const inputs = screen.getAllByPlaceholderText("Student Name");
    fireEvent.change(inputs[0], { target: { value: "lowercase" } });

    // Should show error about capitalization
    expect(screen.getByText(/capital letter/i)).toBeInTheDocument();
  });

  it("shows error when text doesn't end with punctuation", () => {
    const mockOnSave = vi.fn();
    render(
      <Tab2GroupDecision
        onSave={mockOnSave}
        language="en"
      />
    );

    const inputs = screen.getAllByPlaceholderText("Student Name");
    fireEvent.change(inputs[0], { target: { value: "Valid Name" } });

    // Should show error about punctuation
    expect(screen.getByText(/punctuation/i)).toBeInTheDocument();
  });

  it("enables save button when all fields are valid", () => {
    const mockOnSave = vi.fn();
    render(
      <Tab2GroupDecision
        onSave={mockOnSave}
        language="en"
      />
    );

    const studentInputs = screen.getAllByPlaceholderText("Student Name");
    studentInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "Student Name." } });
    });

    const populationInputs = screen.getAllByPlaceholderText("Population Name");
    fireEvent.change(populationInputs[0], { target: { value: "Population." } });

    const whyGoodInputs = screen.getAllByPlaceholderText("Why they're a good choice?");
    whyGoodInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "They are good." } });
    });

    const whyNotGoodInputs = screen.getAllByPlaceholderText("Why NOT to choose them?");
    whyNotGoodInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "They have issues." } });
    });

    const finalPopulationInputs = screen.getAllByPlaceholderText("Which population did you choose?");
    fireEvent.change(finalPopulationInputs[0], { target: { value: "Population." } });

    const whyInputs = screen.getAllByPlaceholderText("Why? (at least 2 sentences)");
    fireEvent.change(whyInputs[0], { target: { value: "First reason. Second reason." } });

    const saveButton = screen.getByText("Save & Continue");
    expect(saveButton).not.toBeDisabled();
  });

  it("calls onSave with correct data when save button is clicked", () => {
    const mockOnSave = vi.fn();
    render(
      <Tab2GroupDecision
        onSave={mockOnSave}
        language="en"
      />
    );

    // Fill all fields with valid data
    const studentInputs = screen.getAllByPlaceholderText("Student Name");
    studentInputs.forEach((input, idx) => {
      fireEvent.change(input, { target: { value: `Student ${idx + 1}.` } });
    });

    const populationInputs = screen.getAllByPlaceholderText("Population Name");
    fireEvent.change(populationInputs[0], { target: { value: "Population." } });

    const whyGoodInputs = screen.getAllByPlaceholderText("Why they're a good choice?");
    whyGoodInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "They are good." } });
    });

    const whyNotGoodInputs = screen.getAllByPlaceholderText("Why NOT to choose them?");
    whyNotGoodInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "They have issues." } });
    });

    const finalPopulationInputs = screen.getAllByPlaceholderText("Which population did you choose?");
    fireEvent.change(finalPopulationInputs[0], { target: { value: "Population." } });

    const whyInputs = screen.getAllByPlaceholderText("Why? (at least 2 sentences)");
    fireEvent.change(whyInputs[0], { target: { value: "First reason. Second reason." } });

    const saveButton = screen.getByText("Save & Continue");
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        studentName1: "Student 1.",
        studentName2: "Student 2.",
        studentName3: "Student 3.",
        populationName: "Population.",
      })
    );
  });

  it("renders Hebrew labels when language is 'he'", () => {
    const mockOnSave = vi.fn();
    render(
      <Tab2GroupDecision
        onSave={mockOnSave}
        language="he"
      />
    );

    expect(screen.getByText("החלטה קבוצתית")).toBeInTheDocument();
    expect(screen.getByText("חברי הקבוצה")).toBeInTheDocument();
  });

  it("renders with RTL direction when language is Hebrew", () => {
    const mockOnSave = vi.fn();
    const { container } = render(
      <Tab2GroupDecision
        onSave={mockOnSave}
        language="he"
      />
    );

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveAttribute("dir", "rtl");
  });
});
