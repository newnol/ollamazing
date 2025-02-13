import { OllamaHostForm } from "./ollama-host-form";
import { OllamaModelsManagement } from "./ollama-models-management";
import { PullModelInput } from "./pull-model-input";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

export function OllamaContent() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold">{t("general settings")}</div>
        <OllamaHostForm />
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{t("models")}</div>
          <PullModelInput />
        </div>
        <OllamaModelsManagement />
      </div>
    </div>
  );
}
