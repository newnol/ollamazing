import { state, Actions, ExtensionState } from "@/lib/extension-state";

interface MessageWithoutPayload {
  type: Actions.GET_STATE;
  payload?: never;
}

interface MessageWithPayload {
  type: Actions.SET_STATE;
  payload: Partial<ExtensionState>;
}

type Message = MessageWithoutPayload | MessageWithPayload;

export default defineBackground(() => {
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

  browser.runtime.onInstalled.addListener(() => {
    browser.storage.local.set(state);

    browser.runtime.onMessage.addListener((message: Message, _, sendResponse) => {
      if (message.type === Actions.GET_STATE) {
        sendResponse(state);
      }

      if (message.type === Actions.SET_STATE) {
        Object.assign(state, message.payload);
        browser.storage.local.set(state);
      }
    });
  });
});
