import { Message } from "./chat-interface";
import { AssistantAvatar } from "@/components/assistant-avatar";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface AssistantMessageProps {
  className?: string;
  message: Message;
}

export function AssistantMessage({ message, className }: AssistantMessageProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <AssistantAvatar className="size-6 rounded-lg border border-gray-300" model={message.model} />
      <div className="flex-1 items-start space-y-1">
        <p className="text-sm whitespace-pre-wrap px-1">{message.content}</p>
        <span className="text-xs text-muted-foreground px-2">
          {dayjs(message.timestamp).fromNow()}
        </span>
      </div>
    </div>
  );
}
