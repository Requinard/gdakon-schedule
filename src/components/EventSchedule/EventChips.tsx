import { Avatar, Chip } from "@mui/material";
import { useCallback, useMemo } from "react";
import { noop, size } from "lodash";

import { dayjs } from "../../utilities/dayjs";
import { NormalizedEventScheduleItem } from "../../store/gdakon.types";
import { useAppSelector } from "../../store";

import { useEventFilter } from "./EventFilter.Provider";

import CheckedIcon from "~icons/ic/baseline-check-circle-outline";
import DayIcon from "~icons/mdi/calendar-today";
import RoomIcon from "~icons/ic/baseline-room";
import ResetIcon from "~icons/ic/baseline-refresh";
import BookmarkIcon from "~icons/mdi/bookmark";
import ClockIcon from "~icons/mdi/clock-outline";

export const ResetChip = () => {
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

export const DayFilterChip = ({ timestamp }: { timestamp: number }) => {
    const { isEnabled, toggleFilter } = useEventFilter();

    const name = useMemo(() => dayjs(timestamp).format("L"), [timestamp]);

    const filter = useCallback((it: NormalizedEventScheduleItem) => {
        return dayjs(timestamp).isSame(it.startTime, "day");
    }, []);

    return (
        <Chip
            onClick={() => toggleFilter(name, filter)}
            label={name}
            avatar={
                <Avatar>
                    <DayIcon />
                </Avatar>
            }
            color={isEnabled(name) ? "secondary" : undefined}
            deleteIcon={isEnabled(name) ? <CheckedIcon /> : undefined}
        />
    );
};

export const RoomFilterChip = ({ room }: { room: string | null }) => {
    const { isEnabled, toggleFilter } = useEventFilter();

    const filter = useCallback(
        (it: NormalizedEventScheduleItem) => it.roomName === room,
        [room]
    );

    if (room === null) {
        return null;
    }

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

export const HourChip = ({ timestamp }: { timestamp: number }) => {
    return (
        <Chip
            label={dayjs(timestamp).format("LT")}
            avatar={
                <Avatar>
                    <ClockIcon />
                </Avatar>
            }
        />
    );
};

export const BookmarkedFilterChip = ({ show }: { show: boolean }) => {
    const bookmarks = useAppSelector((state) => state.bookmarks.events);
    const { isEnabled, toggleFilter } = useEventFilter();

    const filter = useCallback(
        (event: NormalizedEventScheduleItem) => bookmarks.includes(event.id),
        [bookmarks]
    );

    if (!show) {
        return null;
    }

    return (
        <Chip
            onClick={() => toggleFilter("bookmarks", filter)}
            label={"Bookmarked"}
            color={isEnabled("bookmarks") ? "secondary" : undefined}
            avatar={
                <Avatar>
                    <BookmarkIcon />
                </Avatar>
            }
        />
    );
};
