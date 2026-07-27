/**
 * Vitest coverage for the shared CopyButton.
 *
 * Fixtures:
 *  - success — async Clipboard API resolves; button label flips, toast fires
 *  - fallback — async API is missing; execCommand path used
 *  - fail — both paths fail; error toast fires, label stays idle
 *  - accessibility — aria-label present; native button element
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyButton } from "./copy-button";

const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock("sonner", () => ({
  toast: {
    success: (...a: unknown[]) => toastSuccess(...a),
    error: (...a: unknown[]) => toastError(...a),
  },
}));

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");

beforeEach(() => {
  toastSuccess.mockReset();
  toastError.mockReset();
});

afterEach(() => {
  if (originalClipboard) {
    Object.defineProperty(navigator, "clipboard", originalClipboard);
  } else {
    // @ts-expect-error test teardown
    delete (navigator as { clipboard?: unknown }).clipboard;
  }
});

function stubClipboard(writeText: (t: string) => Promise<void> | undefined) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

describe("CopyButton", () => {
  it("[success] uses async Clipboard API and swaps label", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);
    render(<CopyButton text="hello world" ariaLabel="Copy hello" />);
    const btn = screen.getByRole("button", { name: "Copy hello" });
    await userEvent.click(btn);
    expect(writeText).toHaveBeenCalledWith("hello world");
    expect(toastSuccess).toHaveBeenCalledTimes(1);
    expect(btn).toHaveTextContent("已複製");
  });

  it("[fallback] uses execCommand path when Clipboard API is missing", async () => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
    const exec = vi.fn().mockReturnValue(true);
    // @ts-expect-error legacy API stub for the fallback branch
    document.execCommand = exec;
    render(<CopyButton text="fallback text" ariaLabel="Copy fallback" />);
    await userEvent.click(screen.getByRole("button", { name: "Copy fallback" }));
    expect(exec).toHaveBeenCalledWith("copy");
    expect(toastSuccess).toHaveBeenCalledTimes(1);
  });

  it("[fail] surfaces an error toast when both paths fail", async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    // @ts-expect-error legacy API stub for the fallback branch
    document.execCommand = vi.fn().mockReturnValue(false);
    render(<CopyButton text="x" ariaLabel="Copy x" />);
    await userEvent.click(screen.getByRole("button", { name: "Copy x" }));
    expect(toastError).toHaveBeenCalledTimes(1);
    expect(toastSuccess).not.toHaveBeenCalled();
  });

  it("[accessibility] exposes the provided aria-label on a native button", () => {
    render(<CopyButton text="a" ariaLabel="Copy prompt about semiconductors" />);
    const btn = screen.getByRole("button", { name: "Copy prompt about semiconductors" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("[debounce] rapid clicks only trigger one copy", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);
    render(<CopyButton text="dbg" ariaLabel="Copy dbg" />);
    const btn = screen.getByRole("button", { name: "Copy dbg" });
    await userEvent.click(btn);
    await userEvent.click(btn);
    await userEvent.click(btn);
    expect(writeText).toHaveBeenCalledTimes(1);
  });
});
