import { chain } from "lodash";

import { dayjs } from "../utilities/dayjs";

/**
 * This is a date string in the format of "13 Mar 20223"
 */
type AppDateString = string;

/**
 * A time string in the format of HH:mm
 */
type AppTimeString = string;

type UUID = string;

export type EventScheduleItem = {
    id: UUID;
    name: string;
    desc: string;

    namePl: string | "";
    descPl: string | "";
    start: AppTimeString;
    end: AppTimeString;
};
export type EventScheduleRoom = {
    id: UUID;
    name: string | null;
    namePl: string | null;
    events: EventScheduleItem[];
};

export type EventScheduleDay = {
    dayOfWeek: number;
    date: AppDateString;
    rooms: EventScheduleRoom[];
};

export type EventScheduleResponse = {
    events: EventScheduleDay[];
};

export type NormalizedEventScheduleItem = EventScheduleItem & {
    startTime: number;
    endTime: number;
    roomId: UUID;
    roomName: string | null;
    roomNamePl: string | null;
};

export const normalizeEventScheduleResponse = (
    response: EventScheduleResponse
): NormalizedEventScheduleItem[] =>
    chain(response.events)
        .flatMap((day) =>
            day.rooms.flatMap((room) =>
                room.events.map(
                    (event): NormalizedEventScheduleItem => ({
                        ...event,
                        roomId: room.id,
                        roomName: room.name,
                        roomNamePl: room.namePl,
                        startTime: dayjs(
                            `${day.date} ${event.start}`,
                            "D MMM YYYY HH:mm"
                        ).valueOf(),
                        endTime: dayjs(
                            `${day.date} ${event.end}`,
                            "D MMM YYYY HH:mm"
                        ).valueOf(),
                    })
                )
            )
        )
        .orderBy((it) => it.startTime, "asc")
        .value();
