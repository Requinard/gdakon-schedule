/* eslint-disable import/no-named-as-default-member */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import pl from "./translations/pl.json";
import nl from "./translations/nl.json";

export const defaultNS = "Main";

export const resources = {
    en,
    nl,
    pl,
} as const;

i18n.use(initReactI18next).init({
    defaultNS,
    resources,
    lng: "en",
    fallbackLng: "en",
});
