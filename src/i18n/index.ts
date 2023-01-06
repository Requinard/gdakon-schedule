/* eslint-disable import/no-named-as-default-member */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import * as en from "./translations/en.json";
import * as pl from "./translations/pl.json";

export const defaultNS = "Default";
export const resources = {
    en,
    pl,
} as const;

// eslint-disable-next-line import/no-default-export
export default i18n.use(initReactI18next).init({
    defaultNS,
    resources,
    lng: "en",
    fallbackLng: "en",
});
