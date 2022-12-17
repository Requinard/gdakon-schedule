import { useMemo } from "react";
import { Dayjs } from "dayjs";

import { useAppSelector } from "../store";
import { dayjs } from "../utilities/dayjs";

export const useNow = () => {
    const { enabled, amount } = useAppSelector(
        (state) => state.settings.timetravel
    );

    return useMemo((): Dayjs => {
        if (enabled) {
            return dayjs().add(amount, "milliseconds");
        }

        return dayjs();
    }, [enabled, amount]);
};
