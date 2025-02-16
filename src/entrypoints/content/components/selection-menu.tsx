import { Button } from "@/components/ui/button";
import { LanguagesIcon, FileTextIcon } from "lucide-react";

interface SelectionMenuProps {
  onTranslate: () => void;
  onSummarize: () => void;
}

export function SelectionMenu({ onTranslate, onSummarize }: SelectionMenuProps) {
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
