import { Zodios } from "@zodios/core";
import dayjs from "dayjs";

import { EventScheduleItemModel, EventScheduleResponseModel } from "../models";

export const scheduleClient = new Zodios("https://gdakon.org", [
    {
        method: "get",
        path: "/events/presenter.ashx",

        response: EventScheduleResponseModel.transform((it) =>
            it.events.flatMap((day) =>
                day.rooms.flatMap((room) =>
                    room.events.map((event) => {
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
                        return EventScheduleItemModel.parse({
                            ...event,
                            roomId: room.id,
                            roomName: room.name,
                            roomNamePl: room.namePl,
                            startTime: startTime.toISOString(),
                            endTime: endTime.isAfter(startTime)
                                ? endTime.toISOString()
                                : endTime.add(1, "day").toISOString(),
                        });
                    })
                )
            )
        ),
        alias: "getSchedule",
    },
]);
