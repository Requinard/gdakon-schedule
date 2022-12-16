import { Stack } from "@mui/material";
import { chain, map } from "lodash-es";
import dayjs from "dayjs";
import { useMemo } from "react";

import { useGetEventScheduleQuery } from "../../store/gdakon.service";

import { EventScheduleDay } from "./EventScheduleDay";

export const EventSchedulePerDay = () => {
    const { data = [] } = useGetEventScheduleQuery({});

    const eventGroups = useMemo(
        () =>
            chain(data)
                .groupBy((it) => dayjs(it.startTime).format("LL"))
                .value(),
        [data]
    );

    return (
        <>
            {map(eventGroups, (events, day) => (
                <EventScheduleDay day={day} events={events} key={day} />
            ))}
        </>
    );
};
