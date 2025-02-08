import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, PaperclipIcon, SquareIcon } from "lucide-react";
import { useCallback, useState } from "react";

interface ChatInputProps {
  onSend: (content: string) => void;
  onAbort?: () => void;
  isGenerating?: boolean;
}

export function ChatInput({ onSend, onAbort, isGenerating }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isFocusing, setIsFocusing] = useState(false);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  }, [input, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "";
    element.style.height = `${Math.min(element.scrollHeight, 300)}px`;
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextareaHeight(e.target);
  };

  return (
    <div className="z-10 bg-background px-3 pb-3">
      <div className={cn("border rounded-xl flex flex-col", isFocusing && "ring ring-gray-400")}>
        <textarea
          className="min-h-[42px] resize-none w-full bg-transparent p-3 pb-1.5 text-sm outline-none ring-0 placeholder:text-muted-foreground scrollbar-none"
          value={input}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocusing(true)}
          onBlur={() => setIsFocusing(false)}
          placeholder="Ask something..."
        />

        <div className="flex items-center justify-between gap-2 px-3 pb-2">
          <div className="flex items-center gap-2">
            <label
              htmlFor="file-input"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "size-8 cursor-pointer hover:bg-gray-100",
              })}
            >
              <PaperclipIcon className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Attach file</span>
            </label>
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={(e) => console.log("File selected:", e.target.files?.[0])}
            />
          </div>

          <div className="flex items-center gap-2">
            {isGenerating ? (
              <Button
                size="icon"
                className={buttonVariants({
                  variant: "ghost",
                  className: "size-8 cursor-pointer animate-pulse",
                })}
                onClick={onAbort}
              >
                <SquareIcon className="text-current" />
                <span className="sr-only">Stop generating</span>
              </Button>
            ) : (
              <Button
                size="icon"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className:
                    "size-8 cursor-pointer disabled:bg-gray-200 disabled:ring disabled:ring-gray-300 disabled:text-gray-400 transition-all",
                })}
                disabled={!input.trim()}
                onClick={handleSend}
              >
                <ArrowUpIcon className="text-current" />
                <span className="sr-only">Send message</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
