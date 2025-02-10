import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface UserMessageProps {
  content: string;
  timestamp: Date;
  className?: string;
}

export function UserMessage({ content, timestamp, className }: UserMessageProps) {
  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[80%] flex-col space-y-1">
        <div className="bg-muted rounded-2xl rounded-br-sm px-3 py-2">
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        <div className="text-muted-foreground justify-self-end text-xs">
          {dayjs(timestamp).fromNow()}
        </div>
      </div>
    </div>
  );
}
