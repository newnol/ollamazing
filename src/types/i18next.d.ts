import en from "@/i18n/langs/en.json";
import vi from "@/i18n/langs/vi.json";
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      vi: typeof vi;
      en: typeof en;
    };
  }
}
