import { cn } from "@/lib/utils";
import { ChatMessage } from "@/shared/types";
import dayjs from "dayjs";

interface UserMessageProps {
  message: ChatMessage;
  className?: string;
}

export function UserMessage({ message, className }: UserMessageProps) {
  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[80%] flex-col space-y-1">
        <div className="bg-muted rounded-2xl rounded-br-sm px-3 py-2">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="text-muted-foreground justify-self-end text-xs">
          {dayjs(message.timestamp).fromNow()}
        </div>
      </div>
    </div>
  );
}
