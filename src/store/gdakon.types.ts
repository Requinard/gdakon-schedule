import { chain } from "lodash";
import dayjs from "dayjs";

/**
 * This is a date string in the format of "13 Mar @20223"
 */
type AppDateString = string;

/**
 * A time string in the format of HH:mm
 */
type AppTimeString = string;

type UUID = string;

type EventScheduleItem = {
    id: UUID;
    name: string;
    desc: string;

    namePl: string | "";
    descPl: string | "";
    start: AppTimeString;
    end: AppTimeString;
    organizers: string[];
    requiresSignUps: boolean;
    signUpCount: number;
};
type EventScheduleRoom = {
    id: UUID;
    name: string | null;
    namePl: string | null;
    events: EventScheduleItem[];
};

type EventScheduleDay = {
    dayOfWeek: number;
    date: AppDateString;
    rooms: EventScheduleRoom[];
};

type EventScheduleResponse = {
    events: EventScheduleDay[];
};

/**
 * @deprecated use `EventScheduleItemModel` instead
 */
export type NormalizedEventScheduleItem = EventScheduleItem & {
    startTime: number;
    endTime: number;
    roomId: UUID;
    roomName: string | null;
    roomNamePl: string | null;
};

export const normalizeEventScheduleResponse = (
    response: EventScheduleResponse
): NormalizedEventScheduleItem[] => {
    return chain(response.events)
        .flatMap((day) =>
            day.rooms.flatMap((room) =>
                room.events.map((event): NormalizedEventScheduleItem => {
                    const startTime = dayjs(
                        `${day.date} ${event.start}`,
                        "D MMM YYYY HH:mm",
                        "en-gb"
                    );
                    const endTime = dayjs(
                        `${day.date} ${event.end}`,
                        "D MMM YYYY HH:mm",
                        "en-gb"
                    );

                    return {
                        ...event,
                        roomId: room.id,
                        roomName: room.name,
                        roomNamePl: room.namePl,
                        startTime: startTime.valueOf(),
                        endTime: endTime.isAfter(startTime)
                            ? endTime.valueOf()
                            : endTime.add(1, "day").valueOf(),
                    };
                })
            )
        )
        .orderBy((it) => it.startTime, "asc")
        .value();
};
