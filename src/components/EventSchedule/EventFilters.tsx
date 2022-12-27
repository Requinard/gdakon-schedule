import { Avatar, Box, Chip } from "@mui/material";
import { useCallback, useMemo } from "react";
import { chain, noop, size } from "lodash";

import { dayjs } from "../../utilities/dayjs";
import { NormalizedEventScheduleItem } from "../../store/gdakon.types";

import { useEventFilter } from "./EventFilter.Provider";

import CheckedIcon from "~icons/ic/baseline-check-circle-outline";
import DayIcon from "~icons/mdi/calendar-today";
import RoomIcon from "~icons/ic/baseline-room";
import ResetIcon from "~icons/ic/baseline-refresh";

export const EventFilters = () => {
    const { original } = useEventFilter();

    const days = useMemo(() => {
        return chain(original)
            .map((it) => dayjs(it.startTime).format("L"))
            .uniq()
            .value();
    }, [original]);

    const rooms = useMemo(() => {
        return chain(original)
            .map((it) => it.roomName)
            .compact()
            .uniq()
            .value();
    }, [original]);

    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            mt={2}
            mb={2}
            gap={2}
        >
            {days.map((day) => (
                <DayFilterChip day={day} key={day} />
            ))}
            {rooms.map((room) => (
                <RoomFilterChip room={room} key={room} />
            ))}

            <ResetChip />
        </Box>
    );
};

const ResetChip = () => {
    const { reset, filters } = useEventFilter();

    if (size(filters) === 0) {
        return null;
    }
    return (
        <Chip
            avatar={
                <Avatar>
                    <ResetIcon />
                </Avatar>
            }
            label={"Reset filters"}
            onClick={reset}
        />
    );
};

const DayFilterChip = ({ day }: { day: string }) => {
    const { isEnabled, toggleFilter } = useEventFilter();

    const filter = useCallback((it: NormalizedEventScheduleItem) => {
        console.debug("comparing", it.startTime, day);
        return dayjs(day, "L").isSame(it.startTime, "day");
    }, []);

    return (
        <Chip
            onClick={() => toggleFilter(day, filter)}
            label={day}
            avatar={
                <Avatar>
                    <DayIcon />
                </Avatar>
            }
            color={isEnabled(day) ? "secondary" : undefined}
            deleteIcon={isEnabled(day) ? <CheckedIcon /> : undefined}
        />
    );
};

const RoomFilterChip = ({ room }: { room: string }) => {
    const { isEnabled, toggleFilter } = useEventFilter();

    const filter = useCallback(
        (it: NormalizedEventScheduleItem) => it.roomName === room,
        [room]
    );

    return (
        <Chip
            onClick={() => toggleFilter(room, filter)}
            avatar={
                <Avatar>
                    <RoomIcon />
                </Avatar>
            }
            label={room}
            color={isEnabled(room) ? "secondary" : undefined}
            onDelete={noop}
            deleteIcon={isEnabled(room) ? <CheckedIcon /> : undefined}
        />
    );
};
