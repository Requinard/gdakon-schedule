import { Avatar, Chip } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { useEventFilter } from "./EventFilter.Provider";

import CheckedIcon from "~icons/ic/baseline-check-circle-outline";
import DayIcon from "~icons/mdi/calendar-today";
import RoomIcon from "~icons/ic/baseline-room";
import BookmarkIcon from "~icons/mdi/bookmark";
import ClockIcon from "~icons/mdi/clock-outline";
import PawIcon from "~icons/mdi/paw";
import SignUprequiredIcon from "~icons/mdi/lock";
import { EventScheduleItemModel } from "~modules/Schedule";

export const DayFilterChip = ({ timestamp }: { timestamp: string }) => {
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
            deleteIcon={roomEnabled(room) ? <CheckedIcon /> : undefined}
        />
    );
};

export const HourChip = ({ timestamp }: { timestamp: string }) => {
    return (
        <Chip
            color={"primary"}
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
                    <BookmarkIcon fontSize={"1.1rem"} />
                </Avatar>
            }
        />
    );
};
export const OrganizerChips = ({ organizers }: { organizers: string[] }) => {
    const { t } = useTranslation("EventChips");
    return (
        <>
            {organizers.map((organizer) => (
                <Chip
                    key={organizer}
                    label={organizer}
                    title={t("organizer_tooltip")}
                    color={"primary"}
                    avatar={
                        <Avatar>
                            <PawIcon fontSize={"1.1rem"} />
                        </Avatar>
                    }
                />
            ))}
        </>
    );
};

export const SignUpChip = ({ event }: { event: EventScheduleItemModel }) => {
    const { t } = useTranslation("EventChips");

    if (!event.requiresSignUps) {
        return null;
    }

    return (
        <Chip
            title={t("signup_required_tooltip")}
            color={"warning"}
            avatar={
                <Avatar sx={{ bgcolor: "warning.dark" }}>
                    <SignUprequiredIcon />
                </Avatar>
            }
            label={t("signup_required")}
        />
    );
};
