import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ollamaState } from "@/lib/states/ollama.state";
import { useMutation } from "@tanstack/react-query";
import { DownloadCloud, Loader2Icon } from "lucide-react";
import { Ollama } from "ollama/browser";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useSnapshot } from "valtio";

export function PullModelInput() {
  const { host } = useSnapshot(ollamaState);
  const { t } = useTranslation();

  const ollama = new Ollama({ host });

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
