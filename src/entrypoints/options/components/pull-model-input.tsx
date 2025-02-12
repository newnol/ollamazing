import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ollamaState } from "@/lib/states/ollama.state";
import { useMutation } from "@tanstack/react-query";
import { DownloadCloud, Loader2Icon } from "lucide-react";
import { Ollama } from "ollama/browser";
import { toast } from "sonner";
import { useSnapshot } from "valtio";

export function PullModelInput() {
  const { host } = useSnapshot(ollamaState);
  const ollama = new Ollama({ host });

  const [model, setModel] = useState("");

  const { mutate: pullModel, isPending: isPulling } = useMutation({
    mutationFn: async () => {
      await ollama.pull({ model: model });
    },
    onSuccess: () => {
      toast.success("Model pulled successfully");
    },
    onError: () => {
      toast.error("Failed to pull model");
    },
  });

  return (
    <div className="flex max-w-sm items-center space-x-2">
      <Input
        placeholder="Model to pull"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <Button disabled={!model || isPulling} onClick={() => pullModel()}>
        {isPulling ? <Loader2Icon className="animate-spin" /> : <DownloadCloud />} Pull
      </Button>
    </div>
  );
}
