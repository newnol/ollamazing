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
import { useGetSelectedModel } from "@/hooks/use-get-selected-model";
import { chatHistory, selectedModel } from "@/lib/storage";
import { openOptionsPage } from "@/lib/utils";
import { EXTENSION_NAME } from "@/shared/consts";
import { useMutation } from "@tanstack/react-query";
import { DeleteIcon, EllipsisVerticalIcon, SettingsIcon } from "lucide-react";
import { ModelResponse } from "ollama";

interface HeaderProps {
  models: ModelResponse[];
}

export const Header = ({ models }: HeaderProps) => {
  const selectedModelQuery = useGetSelectedModel();

  const setSelectedModelMutation = useMutation({
    mutationFn: async (model: string) => {
      await selectedModel.setValue(model);
    },
    onSuccess: () => {
      selectedModelQuery.refetch();
    },
  });

  const deleteChatHistoryMutation = useMutation({
    mutationFn: async () => {
      await chatHistory.setValue([]);
    },
    onSuccess: () => {},
  });

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <AssistantAvatar model={selectedModelQuery.data} />
        <div>
          <h1 className="font-semibold">{EXTENSION_NAME}</h1>
          <p className="text-muted-foreground text-xs">{selectedModelQuery.data}</p>
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
          <DropdownMenuItem
            className="text-destructive"
            onSelect={() => deleteChatHistoryMutation.mutate()}
          >
            <DeleteIcon />
            Delete history
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Select model</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedModelQuery.data ?? ""}>
            {models.map((model) => (
              <DropdownMenuRadioItem
                key={model.name}
                value={model.name}
                onSelect={() => setSelectedModelMutation.mutate(model.name)}
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
