import { defineExtensionMessaging } from "@webext-core/messaging";

type Messages = {
  toggleSidePanel: (open: boolean) => void;
};

export const { onMessage, sendMessage } = defineExtensionMessaging<Messages>();
