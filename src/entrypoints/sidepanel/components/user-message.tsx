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
      <div className="max-w-[80%] items-end space-y-1">
        <div className="rounded-2xl px-4 py-2 bg-primary text-primary-foreground rounded-br-sm">
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        <span className="text-xs text-muted-foreground px-2">{dayjs(timestamp).fromNow()}</span>
      </div>
    </div>
  );
}
