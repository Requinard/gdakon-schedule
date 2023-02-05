import { useMemo } from "react";
import { match } from "ts-pattern";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { NormalizedEventScheduleItem } from "../store/gdakon.types";

import { useNow } from "./useNow";
import { useEventState } from "./useEventState";

export const useEventSubtitle = (
    event: NormalizedEventScheduleItem,
    room: string | null
) => {
    const now = useNow();
    const state = useEventState(event);
    const { t } = useTranslation("EventSchedule");
    return useMemo(() => {
        const timestamp = match(state)
            .with("upcoming", () =>
                t("useEventSubtitle.starting", {
                    start: event.start,
                    time: now.to(event.startTime),
                })
            )
            .with("current", () => t("useEventSubtitle.taking_place"))
            .otherwise(() => dayjs(event.startTime).format("lll"));

        if (room !== null) {
            return [timestamp, room].join(" - ");
        }

        return timestamp;
    }, [now, event, state]);
};
