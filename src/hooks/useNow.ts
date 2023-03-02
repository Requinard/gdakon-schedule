import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useInterval } from "usehooks-ts";

import { useAppSelector } from "../store";
import { useLocale } from "../i18n";

const calculateNow = (
    enabled: boolean,
    amount: number,
    locale: string
): Dayjs =>
    enabled
        ? dayjs().locale(locale).add(amount, "milliseconds")
        : dayjs().locale(locale);

export const useNow = (): Dayjs => {
    const { locale } = useLocale();
    const { enabled, amount } = useAppSelector(
        (state) => state.settings.timetravel
    );

    const [now, setNow] = useState(calculateNow(enabled, amount, locale));

    useEffect(() => {
        setNow(calculateNow(enabled, amount, locale));
    }, [setNow, enabled, amount, locale]);

    useInterval(() => {
        const newNow = calculateNow(enabled, amount, locale);

        setNow(newNow);
    }, 30_000);

    return now;
};
