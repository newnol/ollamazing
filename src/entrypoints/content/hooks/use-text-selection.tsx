import { useContainer } from "../components/container-provider";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "react-use";

export function useTextSelection({ onClose }: { onClose: () => void }) {
  const container = useContainer();
  const [selectedText, setSelectedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mouseStatus, setMouseStatus] = useState<"up" | "down">("up");

  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (!text || text.length === 0) {
      setSelectedText("");
      return;
    }

    setSelectedText(text);
    onClose();

    // Position the UI near the selection
    const range = selection?.getRangeAt(0);
    const rect = range?.getBoundingClientRect();
    if (rect) {
      container.style.position = "absolute";
      container.style.top = `${window.scrollY + rect.bottom - 4}px`; // bottom of the selection container
      container.style.left = `${window.scrollX + rect.left + rect.width / 2 - 40}px`; // center of the selection container
    }
  }, [container, onClose]);

  useDebounce(
    () => {
      if (selectedText.length > 0 && mouseStatus === "up") {
        setIsVisible(true);
        onClose();
      } else if (!selectedText.length) {
        console.log("selectedText", selectedText);
        setIsVisible(false);
      }
    },
    100,
    [selectedText, mouseStatus],
  );

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [handleSelectionChange]);

  useEffect(() => {
    document.addEventListener("mouseup", () => setMouseStatus("up"));
    document.addEventListener("mousedown", () => setMouseStatus("down"));
    return () => {
      document.removeEventListener("mouseup", () => setMouseStatus("up"));
      document.removeEventListener("mousedown", () => setMouseStatus("down"));
    };
  }, []);

  return {
    selectedText,
    isVisible,
    setIsVisible,
  };
}
