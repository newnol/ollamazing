export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string | null;
  aborted?: boolean;
  metadata?: any;
}
