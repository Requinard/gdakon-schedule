import { useMemo } from "react";

import { NormalizedEventScheduleItem } from "../store/gdakon.types";

import { useNow } from "./useNow";

type EventState = "upcoming" | "current" | "scheduled" | "expired";
export const useEventState = (
    event: NormalizedEventScheduleItem
): EventState => {
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
