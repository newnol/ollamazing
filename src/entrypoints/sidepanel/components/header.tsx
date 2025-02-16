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
import { useTranslation } from "react-i18next";
import { useSnapshot } from "valtio";

interface HeaderProps {
  models: ModelResponse[];
}

export const Header = ({ models }: HeaderProps) => {
  const { t } = useTranslation();
  const { chatModel } = useSnapshot(ollamaState);

  const handleDeleteChatHistory = useCallback(() => {
    ollamaState.chatHistory = [];
  }, []);

  const handleSelectModel = useCallback((model: string) => {
    ollamaState.chatModel = model;
  }, []);

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <AssistantAvatar
          model={chatModel}
          className="ring-border size-8 rounded-xl bg-white p-0.5 ring"
        />
        <div>
          <h1 className="font-semibold">{EXTENSION_NAME}</h1>
          <p className="text-muted-foreground text-xs">{chatModel}</p>
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
            {t("open settings")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive hover:bg-destructive! hover:text-destructive-foreground!"
            onSelect={handleDeleteChatHistory}
          >
            <DeleteIcon />
            {t("delete history")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{t("select model")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={chatModel ?? ""}>
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
