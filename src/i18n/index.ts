import en from "./langs/en.json";
import vi from "./langs/vi.json";
import { preferencesState } from "@/lib/states/preferences.state";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { subscribe } from "valtio";

i18n.use(initReactI18next).init({
  lng: preferencesState.lang || "vi",
  fallbackLng: "vi",
  initImmediate: true,
  compatibilityJSON: "v4",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  react: {
    useSuspense: false,
  },
});

subscribe(preferencesState, async () => {
  await i18n.changeLanguage(preferencesState.lang);
});

export default i18n;
