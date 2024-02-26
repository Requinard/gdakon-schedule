import { useMemo } from "react";
import { chain } from "lodash";
import dayjs from "dayjs";

import { useNow } from "./useNow";

import { EventScheduleItemModel } from "~modules/Schedule";

export const useUpcomingEvents = (events: EventScheduleItemModel[]) => {
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
