import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ollamaState } from "@/lib/states/ollama.state";
import { formatBytes } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Loader2Icon, MoreVerticalIcon, TrashIcon, CloudDownloadIcon } from "lucide-react";
import { Ollama } from "ollama/browser";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useSnapshot } from "valtio";

export function OllamaModelsManagement() {
  const { host } = useSnapshot(ollamaState);
  const ollama = new Ollama({ host });

  const { t } = useTranslation();

  const {
    data: models,
    isLoading: isLoadingModels,
    refetch,
  } = useQuery({
    queryKey: ["ollama-models"],
    queryFn: async () => {
      const response = await ollama.list();
      return response.models;
    },
  });

  const { mutate: deleteModel, isPending: isDeleting } = useMutation({
    mutationFn: (modelName: string) => ollama.delete({ model: modelName }),
    onSuccess: async () => {
      await refetch();
      toast.success(t("model delete success"));
    },
    onError: (error) => {
      toast.error(`${t("model delete failed")}: ${error instanceof Error ? error.message : "NaN"}`);
    },
  });

  const { mutate: pullModel, isPending: isPulling } = useMutation({
    mutationFn: (modelName: string) => ollama.pull({ model: modelName }),
    onSuccess: async () => {
      await refetch();
      toast.success(t("model pull success"));
    },
    onError: (error) => {
      toast.error(`${t("model pull failed")}: ${error instanceof Error ? error.message : "NaN"}`);
    },
  });

  if (isLoadingModels || isDeleting) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("model name")}</TableHead>
            <TableHead>{t("model size")}</TableHead>
            <TableHead>{t("model last modified")}</TableHead>
            <TableHead>{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models?.map((model) => (
            <TableRow key={model.digest}>
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>{formatBytes(model.size)}</TableCell>
              <TableCell>{dayjs(model.modified_at).format("DD/MM/YYYY HH:mm")}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => pullModel(model.name)} disabled={isPulling}>
                      {isPulling ? (
                        <>
                          <Loader2Icon className="animate-spin" />
                          {t("pulling")}...
                        </>
                      ) : (
                        <>
                          <CloudDownloadIcon />
                          {t("pull")}
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive hover:bg-destructive! hover:text-destructive-foreground"
                      onClick={() => deleteModel(model.name)}
                    >
                      <TrashIcon />
                      {t("delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {!models?.length && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {t("no models found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
