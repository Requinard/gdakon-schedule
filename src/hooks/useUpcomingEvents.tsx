import { useMemo } from "react";
import { chain } from "lodash";

import { NormalizedEventScheduleItem } from "../store/gdakon.types";

import { useNow } from "./useNow";

export const useUpcomingEvents = (events: NormalizedEventScheduleItem[]) => {
    const now = useNow();

    return useMemo(
        () =>
            chain(events)
                .filter((event) => now.isSame(event.startTime, "day"))
                .filter((event) => now.isBefore(event.startTime))
                .value(),
        [events, now]
    );
};
