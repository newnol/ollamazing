import { CONTENT_NAME } from "@/shared/consts";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openOptionsPage() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
}

export function updateTheme(theme?: "dark" | "light" | "system") {
  if (!document) return;

  const content = document.querySelector(CONTENT_NAME);
  const container = content?.shadowRoot?.children?.[0] ?? document.documentElement;

  const isDark =
    theme === "dark" ||
    ((theme === "system" || !theme) && window.matchMedia("(prefers-color-scheme: dark)").matches);

  container.classList.toggle("dark", isDark);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
