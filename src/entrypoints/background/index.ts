import { handleToggleSidePanelCommand } from "./handle-commands.ts";
import { backgroundState } from "@/lib/states/background.state.ts";
import { onMessage } from "@/shared/messaging.ts";
import { Command } from "@/shared/types.ts";

export default defineBackground(() => {
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

  onMessage("toggleSidePanel", (message) => {
    backgroundState.sidePanelOpen = message.data;
  });

  browser.commands.onCommand.addListener(async (command) => {
    switch (command as Command) {
      case "toggle-sidepanel":
        await handleToggleSidePanelCommand();
        break;
    }
  });
});
