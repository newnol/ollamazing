export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
  images?: string[] | readonly string[];
  timestamp: Date;
  model?: string | null;
  aborted?: boolean;
  metadata?: any;
}

export interface ContentSummaryData {
  type: "summary";
  summary: string;
}

export interface ContentTranslationData {
  type: "translation";
  translatedContent: string;
}

export type ContentHandledData = ContentSummaryData | ContentTranslationData;
