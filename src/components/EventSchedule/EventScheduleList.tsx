import { Stack } from "@mui/material";
import { chain, map, partition } from "lodash-es";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useGetEventScheduleQuery } from "../../store/gdakon.service";

import { EventScheduleGroup } from "./EventScheduleGroup";

export const EventScheduleList = () => {
    const { t } = useTranslation("EventSchedule");
    const { data = [] } = useGetEventScheduleQuery({});

    const eventGroups = useMemo(() => {
        const [upcoming, expired] = partition(data, (event) =>
            dayjs().isBefore(event.endTime)
        );

        const upcomingGroups = chain(upcoming)
            .groupBy((it) => dayjs(it.startTime).format("LL"))
            .value();

        if (expired.length > 0) {
            upcomingGroups[t("expired")] = expired;
        }

        return upcomingGroups;
    }, [data]);

    return (
        <>
            {map(eventGroups, (events, day) => (
                <EventScheduleGroup day={day} events={events} key={day} />
            ))}
        </>
    );
};
