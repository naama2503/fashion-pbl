import "@testing-library/jest-dom";
import { expect } from "vitest";

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

interface CustomMatchers<R = void> {
  toBeInTheDocument(): R;
  toHaveAttribute(attr: string, value?: string): R;
  toHaveClass(className: string): R;
  toHaveStyle(css: string | Record<string, any>): R;
  toHaveTextContent(text: string | RegExp): R;
  toBeVisible(): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toBeEmpty(): R;
  toBeEmptyDOMElement(): R;
  toBeInTheDOM(): R;
  toHaveFormValues(values: Record<string, any>): R;
  toBeChecked(): R;
  toHaveErrorMessage(message: string): R;
  toHaveDisplayValue(value: string | string[]): R;
  toBePartiallyChecked(): R;
  toHaveValue(value: string | number | string[]): R;
  toHaveFocus(): R;
}
