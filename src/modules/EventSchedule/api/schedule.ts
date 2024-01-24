import {Zodios} from "@zodios/core";
import {EventScheduleModel, EventScheduleResponse} from "../models";

export const gdakonClient = new Zodios("https://gdakon.org", [
            {
                method: "get",
                alias: "schedule",
                path: "/events/presenter.ashx",
                response: EventScheduleResponse.transform(
                    it => it.events.flatMap(
                        (day) => day.rooms.flatMap(
                            room => room.events.flatMap(
                                (event): EventScheduleModel => ({
                                    ...day,
                                    ...room,
                                    ...event,
                                    signUpCount: 0
                                })
                            )
                        )
                    )
                ).pipe(EventScheduleModel.array()),
            },

        ]
    )
;
