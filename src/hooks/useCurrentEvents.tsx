import { useMemo } from "react";
import { chain } from "lodash";

import { useGetEventScheduleQuery } from "../store/gdakon.service";
import { NormalizedEventScheduleItem } from "../store/gdakon.types";

import { useNow } from "./useNow";

export const useCurrentEvents = (events: NormalizedEventScheduleItem[]) => {
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
