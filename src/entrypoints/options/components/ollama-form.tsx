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
import { ollamaHost } from "@/lib/storage";
import { DEFAULT_OLLAMA_HOST } from "@/shared/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  ollamaHost: z.string().url().default(DEFAULT_OLLAMA_HOST),
});

export function OllamaForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ollamaHost: DEFAULT_OLLAMA_HOST,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await ollamaHost.setValue(values.ollamaHost);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutateAsync(values);
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
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
