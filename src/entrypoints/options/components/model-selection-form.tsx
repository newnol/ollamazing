import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ollamaState } from "@/lib/states/ollama.state";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModelResponse } from "ollama/browser";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useSnapshot } from "valtio";
import * as z from "zod";

const formSchema = z.object({
  chatModel: z.string().nullable(),
  translationModel: z.string().nullable(),
  summaryModel: z.string().nullable(),
});

interface ModelSelectionFormProps {
  models: ModelResponse[];
}

export function ModelSelectionForm({ models }: ModelSelectionFormProps) {
  const { t } = useTranslation();

  const { chatModel, translationModel, summaryModel } = useSnapshot(ollamaState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chatModel,
      translationModel,
      summaryModel,
    },
  });

  const currentValues = form.watch();

  const hasChanges = useMemo(() => {
    return (
      currentValues.chatModel !== chatModel ||
      currentValues.translationModel !== translationModel ||
      currentValues.summaryModel !== summaryModel
    );
  }, [currentValues, chatModel, translationModel, summaryModel]);

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      ollamaState.chatModel = values.chatModel;
      ollamaState.translationModel = values.translationModel;
      ollamaState.summaryModel = values.summaryModel;

      toast.success(t("select model success"));
    },
    [t],
  );

  useEffect(() => {
    form.reset({
      chatModel: chatModel,
      translationModel: translationModel,
      summaryModel: summaryModel,
    });
  }, [form, chatModel, translationModel, summaryModel]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {["chat", "translation", "summary"].map((modelType) => (
          <FormField
            key={`${modelType}Model`}
            control={form.control}
            name={`${modelType}Model` as keyof z.infer<typeof formSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`${modelType} model` as any)}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("select a model")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.name} value={model.name}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting || !hasChanges}>
            {t("save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
