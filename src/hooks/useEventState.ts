import { useMemo } from "react";

import { useNow } from "./useNow";

import { EventScheduleItemModel } from "~modules/Schedule";

type EventState = "upcoming" | "current" | "scheduled" | "expired";
export const useEventState = (event: EventScheduleItemModel): EventState => {
    const now = useNow();
    return useMemo((): EventState => {
        if (
            now.isSame(event.startTime, "day") &&
            now.isBefore(event.startTime)
        ) {
            return "upcoming";
        } else if (now.isBetween(event.startTime, event.endTime)) {
            return "current";
        } else if (now.isAfter(event.endTime)) {
            return "expired";
        }

        return "scheduled";
    }, [event, now]);
};
