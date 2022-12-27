import { useMemo } from "react";
import { chain } from "lodash";

import { useGetEventScheduleQuery } from "../store/gdakon.service";

import { useNow } from "./useNow";

export const useUpcomingEvents = () => {
    const now = useNow();
    const { data = [] } = useGetEventScheduleQuery({});

    return useMemo(
        () =>
            chain(data)
                .filter((event) => now.isSame(event.startTime, "day"))
                .filter((event) => now.isBefore(event.startTime))
                .value(),
        [data, now]
    );
};
