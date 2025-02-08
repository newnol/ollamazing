import { AssistantMessage } from "./assistant-message";
import { ChatInput } from "./chat-input";
import { UserMessage } from "./user-message";
import { AssistantAvatar } from "@/components/assistant-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import ollama from "ollama";
import { useCallback, useRef, useState } from "react";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string | null;
  aborted?: boolean;
}

export function ChatInterface() {
  const { data: selectedModel } = useGetSelectedModel();

  const [messages, setMessages] = useState<Message[]>([]);
  const [curResponseMessage, setCurResponseMessage] = useState<string[]>([]);
  const [chatResponse, setChatResponse] = useState<{ abort: () => void }>();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  const { mutate: mutateSendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: async ({ messageContent, model }: { messageContent: string; model: string }) => {
      const userMessage: Message = {
        role: "user",
        content: messageContent,
        timestamp: new Date(),
        model: selectedModel,
      };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      const response = await ollama.chat({
        model,
        messages: newMessages
          .filter((msg) => !msg.aborted)
          .map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        stream: true,
      });
      setChatResponse(response);

      for await (const part of response) {
        setCurResponseMessage((prev) => [...prev, part.message.content]);
        scrollToBottom();
      }
    },
    onSuccess: (_, variables) => {
      const mergedMessage: Message = {
        role: "assistant",
        content: curResponseMessage.join(""),
        timestamp: new Date(),
        model: variables.model,
      };
      setMessages((prev) => [...prev, mergedMessage]);
      setCurResponseMessage([]);
      scrollToBottom();
    },
    onError: (error, variables) => {
      if (error.name === "AbortError") {
        const mergedMessage: Message = {
          role: "assistant",
          content: curResponseMessage.join(""),
          timestamp: new Date(),
          model: variables.model,
          aborted: true,
        };
        setMessages((prev) => [...prev, mergedMessage]);
        setCurResponseMessage([]);
        scrollToBottom();
      }
    },
  });

  const handleSend = useCallback(
    (messageContent: string) => {
      if (!selectedModel || !messageContent.trim()) return;
      mutateSendMessage({ messageContent, model: selectedModel });
    },
    [selectedModel, mutateSendMessage],
  );

  const handleAbort = useCallback(() => {
    chatResponse?.abort();
  }, [chatResponse]);

  return (
    <div className="relative size-full flex flex-col overflow-hidden">
      {messages.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center h-full">
          <AssistantAvatar model={selectedModel} className="size-24" />
          <p className="text-xl font-semibold mb-4 font-mono">{selectedModel}</p>
        </div>
      ) : (
        <div className="flex-grow overflow-hidden">
          <ScrollArea ref={scrollAreaRef} className="h-full">
            {messages.map((message, index) =>
              message.role === "assistant" ? (
                <AssistantMessage key={index.toString()} message={message} className="p-3" />
              ) : (
                <UserMessage
                  key={index.toString()}
                  content={message.content}
                  timestamp={message.timestamp}
                  className="p-3"
                />
              ),
            )}
            {curResponseMessage.length > 0 && (
              <AssistantMessage
                message={{
                  role: "assistant",
                  content: curResponseMessage.join(""),
                  timestamp: new Date(),
                  model: selectedModel,
                }}
                className="p-3"
              />
            )}
          </ScrollArea>
        </div>
      )}

      <ChatInput onSend={handleSend} onAbort={handleAbort} isGenerating={isSendingMessage} />
    </div>
  );
}
