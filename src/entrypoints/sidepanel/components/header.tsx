import { AssistantAvatar } from "../../../components/assistant-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetLocalModels } from "@/hooks/use-get-local-models";
import { useGetSelectedModel } from "@/hooks/use-get-selected-model";
import { selectedModel } from "@/lib/storage";
import { EXTENSION_NAME } from "@/shared/consts";
import { useMutation } from "@tanstack/react-query";
import { EllipsisVerticalIcon } from "lucide-react";

export const Header = () => {
  const getLocalModelsQuery = useGetLocalModels();

  const selectedModelQuery = useGetSelectedModel();

  const setSelectedModelMutation = useMutation({
    mutationFn: async (model: string) => {
      await selectedModel.setValue(model);
    },
    onSuccess: () => {
      selectedModelQuery.refetch();
    },
  });

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-2">
        <AssistantAvatar model={selectedModelQuery.data} />
        <div>
          <h1 className="font-semibold">{EXTENSION_NAME}</h1>
          <p className="text-xs text-muted-foreground">{selectedModelQuery.data}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select model</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedModelQuery.data ?? ""}>
            {getLocalModelsQuery.data?.map((model) => (
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
