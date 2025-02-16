import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ContentHandledData } from "@/shared/types";
import { XIcon, CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface HandledContentPopupProps {
  data: ContentHandledData;
  onClose: () => void;
}

export function HandledContentPopup({ data, onClose }: HandledContentPopupProps) {
  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const title = useMemo(() => t(data.type), [data, t]);

  const handleCopy = useCallback(async () => {
    if (data.type === "translation") {
      await navigator.clipboard.writeText(data.translatedContent);
    } else if (data.type === "summary") {
      await navigator.clipboard.writeText(data.summary);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, [data]);

  const renderContent = useCallback(() => {
    if (data.type === "translation") {
      return <div className="text-sm whitespace-pre-wrap">{data.translatedContent}</div>;
    } else if (data.type === "summary") {
      return <div className="text-sm whitespace-pre-wrap">{data.summary}</div>;
    }

    return null;
  }, [data]);

  return (
    <div className="bg-background flex w-[300px] flex-col space-y-2 rounded-xl p-3 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="size-6" onClick={handleCopy}>
            {copied ? (
              <CheckIcon className="size-4 text-green-500" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="size-6" onClick={onClose}>
            <XIcon className="size-4" />
          </Button>
        </div>
      </div>

      <Separator />

      <ScrollArea className="bg-background -mr-3 h-[300px] max-h-fit pr-3">
        {renderContent()}
      </ScrollArea>
    </div>
  );
}
