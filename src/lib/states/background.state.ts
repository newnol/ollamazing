import { proxy } from "valtio";

type BackgroundState = {
  sidePanelOpen: boolean;
};

export const backgroundState = proxy<BackgroundState>({
  sidePanelOpen: false,
});
