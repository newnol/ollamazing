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
import { toast } from "sonner";
import { useSnapshot } from "valtio";
import * as z from "zod";

const formSchema = z.object({
  ollamaHost: z.string().url().default(DEFAULT_OLLAMA_HOST),
});

export function OllamaForm() {
  const { host } = useSnapshot(ollamaState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ollamaHost: host,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    ollamaState.host = values.ollamaHost;
    toast.success("Ollama host updated");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="ollamaHost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ollama host</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
