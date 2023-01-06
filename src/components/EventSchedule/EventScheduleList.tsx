import { chain, map, partition } from "lodash";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useNow } from "../../hooks/useNow";

import { EventScheduleGroup } from "./EventScheduleGroup";
import { useEventFilter } from "./EventFilter.Provider";

export const EventScheduleList = () => {
    const { t } = useTranslation("EventSchedule");
    const now = useNow();
    const { filtered } = useEventFilter();

    const eventGroups = useMemo(() => {
        const [upcoming, expired] = partition(filtered, (event) =>
            now.isBefore(event.endTime)
        );

        const upcomingGroups = chain(upcoming)
            .groupBy((it) => dayjs(it.startTime).format("LL"))
            .value();

        if (expired.length > 0) {
            upcomingGroups[t("expired")] = expired;
        }

        return upcomingGroups;
    }, [filtered, now]);

    return (
        <>
            {map(eventGroups, (events, day) => (
                <EventScheduleGroup day={day} events={events} key={day} />
            ))}
        </>
    );
};
