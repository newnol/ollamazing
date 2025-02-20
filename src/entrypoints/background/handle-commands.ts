import { backgroundState } from "@/lib/states/background.state.ts";
import { sendMessage } from "@/shared/messaging";
import { subscribeKey } from "valtio/utils";

let sidePanelOpen = false;

subscribeKey(backgroundState, "sidePanelOpen", (v) => {
  sidePanelOpen = v;
});

export async function handleToggleSidePanelCommand() {
  if (sidePanelOpen) {
    sendMessage("toggleSidePanel", false);
    backgroundState.sidePanelOpen = false;
  } else {
    browser.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab?.id) {
        browser.sidePanel.open({ tabId: tab.id });
      }
    });
    backgroundState.sidePanelOpen = true;
  }
}
