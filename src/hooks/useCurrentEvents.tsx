import { useMemo } from "react";
import { chain } from "lodash";

import { useGetEventScheduleQuery } from "../store/gdakon.service";

import { useNow } from "./useNow";

export const useCurrentEvents = () => {
    const now = useNow();
    const { data = [] } = useGetEventScheduleQuery({});

    return useMemo(
        () =>
            chain(data)
                .filter((event) =>
                    now.isBetween(event.startTime, event.endTime)
                )
                .value(),
        [data, now]
    );
};
