import { Button } from "@/components/ui/button";
import { LanguagesIcon, FileTextIcon } from "lucide-react";

interface SelectionMenuProps {
  onTranslate: () => void;
  onSummarize: () => void;
}

export function SelectionMenu({ onTranslate, onSummarize }: SelectionMenuProps) {
  return (
    <div className="bg-background border-highlight z-front flex w-fit items-center gap-1 rounded-xl p-1">
      <Button variant="ghost" size="icon" className="size-8" onClick={onTranslate}>
        <LanguagesIcon className="size-4" />
      </Button>

      <Button variant="ghost" size="icon" className="size-8" onClick={onSummarize}>
        <FileTextIcon className="size-4" />
      </Button>
    </div>
  );
}
