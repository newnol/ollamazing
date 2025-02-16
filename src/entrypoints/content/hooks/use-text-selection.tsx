import { useContainer } from "../components/container-provider";
import { useEffect, useState, useCallback } from "react";

export function useTextSelection() {
  const container = useContainer();
  const [selectedText, setSelectedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mouseStatus, setMouseStatus] = useState<"up" | "down">("up");

  const onSelectionChange = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (!text || text.length === 0) {
      setSelectedText("");
      return;
    }

    setSelectedText(text);

    // Position the UI near the selection
    const range = selection?.getRangeAt(0);
    const rect = range?.getBoundingClientRect();
    if (rect) {
      container.style.position = "absolute";
      container.style.top = `${window.scrollY + rect.bottom - 4}px`; // bottom of the selection container
      container.style.left = `${window.scrollX + rect.left + rect.width / 2 - 40}px`; // center of the selection container
    }
  }, [container]);

  const onMouseUp = useCallback(() => {
    setMouseStatus("up");
  }, []);

  const onMouseDown = useCallback(() => {
    setMouseStatus("down");
  }, []);

  useEffect(() => {
    if (selectedText.length > 0 && mouseStatus === "up") {
      setIsVisible(true);
    } else if (!selectedText.length) {
      setIsVisible(false);
    }
  }, [selectedText, mouseStatus]);

  useEffect(() => {
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [onSelectionChange]);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [onMouseUp, onMouseDown]);

  return {
    selectedText,
    isVisible,
    setIsVisible,
  };
}
