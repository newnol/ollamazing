import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ollamaState } from "@/lib/states/ollama.state";
import { DEFAULT_OLLAMA_HOST } from "@/shared/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useSnapshot } from "valtio";
import * as z from "zod";

const formSchema = z.object({
  ollamaHost: z.string().url().default(DEFAULT_OLLAMA_HOST),
});

export function OllamaHostForm() {
  const { t } = useTranslation();

  const { host } = useSnapshot(ollamaState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ollamaHost: DEFAULT_OLLAMA_HOST,
    },
  });

  const currentHost = form.watch("ollamaHost");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    ollamaState.host = values.ollamaHost;
    toast.success(t("ollama host updated"));
  };

  useEffect(() => {
    form.reset({
      ollamaHost: host,
    });
  }, [form, host]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="ollamaHost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ollama Server</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || currentHost === host}
                >
                  {t("save")}
                </Button>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
