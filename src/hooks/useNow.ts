import { useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";

import { useAppSelector } from "../store";
import { useLocale } from "../i18n";

export const useNow = () => {
    const { locale } = useLocale();
    const { enabled, amount } = useAppSelector(
        (state) => state.settings.timetravel
    );

    return useMemo((): Dayjs => {
        if (enabled) {
            return dayjs().locale(locale).add(amount, "milliseconds");
        }

        return dayjs();
    }, [enabled, amount, locale]);
};
