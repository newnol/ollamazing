import { AssistantAvatar } from "@/components/assistant-avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Message } from "@/shared/types";
import dayjs from "dayjs";
import "katex/dist/katex.min.css";
import { CopyIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { toast } from "sonner";

interface AssistantMessageProps {
  className?: string;
  message: Message;
}

const MarkdownContent = ({ content }: { content: string }) => (
  <ReactMarkdown
    className="text-sm"
    remarkPlugins={[remarkGfm, remarkMath]}
    rehypePlugins={[rehypeKatex]}
    components={{
      code({ className, children, ...rest }) {
        const match = /language-(\w+)/.exec(className || "");
        return match ? (
          <div className="overflow-hidden rounded-xl bg-zinc-600">
            <div className="flex items-center justify-between py-1 pr-1 pl-2">
              <div className="font-mono text-xs text-white">{match[1]}</div>
              <Button
                size="icon"
                variant="ghost"
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "size-8 cursor-pointer text-white transition-all hover:bg-zinc-500 hover:text-white",
                })}
                onClick={async () => {
                  await navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
                  toast.success("Copied to clipboard");
                }}
              >
                <CopyIcon />
              </Button>
            </div>
            <SyntaxHighlighter
              {...(rest as any)}
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              customStyle={{
                margin: 0,
                overflowX: "auto",
              }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </div>
        ) : (
          <code
            {...rest}
            className={cn("bg-muted overflow-x-auto rounded px-1 py-0.5 text-sm", className)}
          >
            {children}
          </code>
        );
      },
      p({ children }) {
        return <p className="mb-4 whitespace-pre-wrap last:mb-0">{children}</p>;
      },
    }}
  >
    {content}
  </ReactMarkdown>
);

const renderContent = (message: Message) => {
  if (message.model?.includes("deepseek-r1")) {
    const thinkMatch = message.content.match(/<think>(.*?)(<\/think>|$)/s);
    const thinkContent = thinkMatch ? thinkMatch[1] : "";
    const mainContent = message.content.replace(/<think>.*?(<\/think>|$)/s, "").trim();
    console.log(mainContent);
    return (
      <>
        {thinkContent && (
          <div className="bg-muted mb-2 rounded-xl p-2">
            <p className="text-muted-foreground mb-1 text-xs font-medium">
              {mainContent ? "Think result" : "Thinking..."}
            </p>
            <MarkdownContent content={thinkContent} />
          </div>
        )}
        <MarkdownContent content={mainContent} />
      </>
    );
  }

  return <MarkdownContent content={message.content} />;
};

export function AssistantMessage({ message, className }: AssistantMessageProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        <AssistantAvatar
          className="size-8 rounded-xl border border-gray-300 p-0.5"
          model={message.model}
        />
        <div className="font-mono text-xs font-bold">{message.model}</div>
      </div>
      <div className="flex flex-col gap-1">
        {renderContent(message)}
        <div className="text-muted-foreground text-xs">{dayjs(message.timestamp).fromNow()}</div>
      </div>
    </div>
  );
}
