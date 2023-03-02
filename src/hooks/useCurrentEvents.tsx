import { useMemo } from "react";
import { chain } from "lodash";

import { NormalizedEventScheduleItem } from "../store/gdakon.types";

import { useNow } from "./useNow";

export const useCurrentEvents = (events: NormalizedEventScheduleItem[]) => {
    const now = useNow();

    return useMemo(
        () =>
            chain(events)
                .filter(
                    (event) =>
                        now.isBefore(event.endTime) &&
                        now.isAfter(event.startTime)
                )
                .value(),
        [events, now]
    );
};
