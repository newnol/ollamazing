import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOllama } from "@/hooks/use-ollama";
import { useMutation } from "@tanstack/react-query";
import { DownloadCloud, Loader2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function PullModelInput() {
  const { t } = useTranslation();

  const ollama = useOllama();

  const [model, setModel] = useState("");

  const { mutate: pullModel, isPending: isPulling } = useMutation({
    mutationFn: async () => {
      await ollama.pull({ model: model });
    },
    onSuccess: () => {
      toast.success(t("model pull success"));
    },
    onError: () => {
      toast.error(t("model pull failed"));
    },
  });

  return (
    <div className="flex max-w-sm items-center space-x-2">
      <Input
        placeholder={t("enter model")}
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <Button disabled={!model || isPulling} onClick={() => pullModel()}>
        {isPulling ? <Loader2Icon className="animate-spin" /> : <DownloadCloud />} {t("pull")}
      </Button>
    </div>
  );
}
