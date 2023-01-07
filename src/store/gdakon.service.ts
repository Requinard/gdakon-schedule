import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import gdakonSchedule from "./gdakon.events.json";
import {
    NormalizedEventScheduleItem,
    normalizeEventScheduleResponse,
} from "./gdakon.types";

export const gdakonService = createApi({
    reducerPath: "gdakon.service",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://gdakon.org",
        mode: "no-cors",
    }),
    endpoints: (builder) => ({
        getEventSchedule: builder.query<NormalizedEventScheduleItem[], unknown>(
            {
                // query: () => ({
                //     url: "/events/presenter.ashx",
                // }),
                // transformResponse: (data: EventScheduleResponse) => {
                //     return normalizeEventScheduleResponse(data);
                // },
                // #TODO Manual until cors is implemented
                queryFn: () =>
                    fetch("https://gdakon.org/events/presenter.ashx")
                        .then((res) => {
                            console.log(res);
                            return res.ok
                                ? res.json()
                                : Promise.reject("invalid status");
                        })
                        .then((res) => ({
                            data: normalizeEventScheduleResponse(res.json()),
                        }))
                        .catch((e) => {
                            console.error(
                                "Failed to get data. Falling back to provided JSON",
                                e
                            );
                            return {
                                data: normalizeEventScheduleResponse(
                                    gdakonSchedule
                                ),
                            };
                        }),
            }
        ),
    }),
});

export const { useGetEventScheduleQuery } = gdakonService;
