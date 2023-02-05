import { Avatar, Chip } from "@mui/material";
import { useMemo } from "react";
import { noop } from "lodash";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { useEventFilter } from "./EventFilter.Provider";

import CheckedIcon from "~icons/ic/baseline-check-circle-outline";
import DayIcon from "~icons/mdi/calendar-today";
import RoomIcon from "~icons/ic/baseline-room";
import BookmarkIcon from "~icons/mdi/bookmark";
import ClockIcon from "~icons/mdi/clock-outline";

export const DayFilterChip = ({ timestamp }: { timestamp: number }) => {
    const { toggleDate, dayEnabled } = useEventFilter();

    const day = useMemo(() => dayjs(timestamp), [timestamp]);

    return (
        <Chip
            onClick={() => toggleDate(day)}
            label={day.format("LL")}
            avatar={
                <Avatar>
                    <DayIcon />
                </Avatar>
            }
            color={dayEnabled(day) ? "secondary" : undefined}
            deleteIcon={dayEnabled(day) ? <CheckedIcon /> : undefined}
        />
    );
};

export const RoomFilterChip = ({ room }: { room: string | null }) => {
    const { roomEnabled, toggleRoom } = useEventFilter();

    if (room === null) {
        return null;
    }

    return (
        <Chip
            onClick={() => toggleRoom(room)}
            avatar={
                <Avatar>
                    <RoomIcon />
                </Avatar>
            }
            label={room}
            color={roomEnabled(room) ? "secondary" : undefined}
            onDelete={noop}
            deleteIcon={roomEnabled(room) ? <CheckedIcon /> : undefined}
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
    const { t } = useTranslation("EventSchedule");
    const { filters, toggleBookmarked } = useEventFilter();

    if (!show) {
        return null;
    }

    return (
        <Chip
            onClick={() => toggleBookmarked()}
            label={t("EventChips.BookmarkChip.label")}
            color={filters.bookmarked ? "secondary" : undefined}
            avatar={
                <Avatar>
                    <BookmarkIcon />
                </Avatar>
            }
        />
    );
};
