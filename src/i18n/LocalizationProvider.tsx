import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocalStorage } from "usehooks-ts";
import { useTranslation } from "react-i18next";
import { find, noop } from "lodash";
import { match } from "ts-pattern";
import dayjs from "dayjs";

import { resources } from "./i18next";

type Locale = keyof typeof resources;

type LocaleContextType = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
};
const LocaleContext = createContext<LocaleContextType>({
    locale: "en",
    setLocale: noop,
});

export const useLocale = () => useContext(LocaleContext);

const getInitialLangauge = (): Locale => {
    const firstLang = navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;

    return (
        find(Object.keys(resources), (it): it is Locale =>
            firstLang.startsWith(it)
        ) ?? "en"
    );
};

const initialLangauge = getInitialLangauge();

export const LocaleProvider = ({ children }: PropsWithChildren) => {
    const { i18n } = useTranslation();
    const [locale, setLocale] = useLocalStorage<Locale>(
        "localeSettings",
        initialLangauge
    );

    useEffect(() => {
        i18n.changeLanguage(locale).catch(() =>
            console.error("failed to update locale")
        );
    }, [locale]);

    const dayjsLocale = useMemo(
        () =>
            match(locale)
                .with("en", () => "en-gb")
                .otherwise((v) => v),
        [locale]
    );

    useEffect(() => {
        dayjs.locale(dayjsLocale);
    }, [dayjsLocale]);

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={dayjsLocale}
            >
                {children}
            </LocalizationProvider>
        </LocaleContext.Provider>
    );
};
