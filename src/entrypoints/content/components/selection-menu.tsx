import { Button } from "@/components/ui/button";
import { LanguagesIcon, FileTextIcon, Loader2Icon } from "lucide-react";

interface SelectionMenuProps {
  isLoading: boolean;
  onTranslate: () => void;
  onSummarize: () => void;
}

export function SelectionMenu({ isLoading, onTranslate, onSummarize }: SelectionMenuProps) {
  if (isLoading) {
    return (
      <div className="bg-background flex items-center gap-1 rounded-lg border p-1 shadow-lg">
        <Loader2Icon className="size-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background flex w-fit items-center gap-1 rounded-xl border p-1 shadow-lg">
      <Button variant="ghost" size="icon" className="size-8" onClick={onTranslate}>
        <LanguagesIcon className="size-4" />
      </Button>

      <Button variant="ghost" size="icon" className="size-8" onClick={onSummarize}>
        <FileTextIcon className="size-4" />
      </Button>
    </div>
  );
}
