import { useMemo } from "react";
import { chain } from "lodash";

import { useNow } from "./useNow";

import { EventScheduleItemModel } from "~modules/Schedule";

export const useCurrentEvents = (events: EventScheduleItemModel[]) => {
    const now = useNow();

    return useMemo(
        () =>
            chain(events)
                .filter((event) =>
                    now.isBetween(event.startTime, event.endTime)
                )
                .value(),
        [events, now]
    );
};
