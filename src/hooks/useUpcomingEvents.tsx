import { useMemo } from "react";
import { chain } from "lodash";
import dayjs from "dayjs";

import { NormalizedEventScheduleItem } from "../store/gdakon.types";

import { useNow } from "./useNow";

export const useUpcomingEvents = (events: NormalizedEventScheduleItem[]) => {
    const now = useNow();

    return useMemo(
        () =>
            chain(events)
                .filter(
                    (event) =>
                        now.isBefore(event.startTime) &&
                        now.isAfter(dayjs(event.startTime).subtract(3, "hours"))
                )
                .filter((event) => now.isBefore(event.startTime))
                .value(),
        [events, now]
    );
};
