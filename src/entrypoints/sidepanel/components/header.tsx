import { AssistantAvatar } from "@/components/assistant-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ollamaState } from "@/lib/states/ollama.state";
import { openOptionsPage } from "@/lib/utils";
import { EXTENSION_NAME } from "@/shared/consts";
import { DeleteIcon, EllipsisVerticalIcon, SettingsIcon } from "lucide-react";
import { ModelResponse } from "ollama";
import { useSnapshot } from "valtio";

interface HeaderProps {
  models: ModelResponse[];
}

export const Header = ({ models }: HeaderProps) => {
  const { selectedModel } = useSnapshot(ollamaState);

  const handleDeleteChatHistory = useCallback(() => {
    ollamaState.chatHistory = [];
  }, []);

  const handleSelectModel = useCallback((model: string) => {
    ollamaState.selectedModel = model;
  }, []);

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <AssistantAvatar model={selectedModel} />
        <div>
          <h1 className="font-semibold">{EXTENSION_NAME}</h1>
          <p className="text-muted-foreground text-xs">{selectedModel}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={openOptionsPage}>
            <SettingsIcon />
            Open options
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onSelect={handleDeleteChatHistory}>
            <DeleteIcon />
            Delete history
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Select model</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedModel ?? ""}>
            {models.map((model) => (
              <DropdownMenuRadioItem
                key={model.name}
                value={model.name}
                onSelect={() => handleSelectModel(model.name)}
              >
                {model.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
