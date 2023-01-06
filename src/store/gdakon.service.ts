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
    }),
    endpoints: (builder) => ({
        getEventSchedule: builder.query<NormalizedEventScheduleItem[], unknown>(
            {
                // query: () => ({
                //     url: "/events/presenter.ashx"
                // }),
                // transformResponse: (data: EventScheduleResponse) => {
                //     console.debug("transforming");
                //     try {
                //         console.debug(data);
                //         return normalizeEventScheduleResponse(data);
                //     } catch (e) {
                //         console.error(e);
                //         return [];
                //     }
                // },
                queryFn: () => ({
                    data: normalizeEventScheduleResponse(gdakonSchedule),
                }),
            }
        ),
    }),
});

export const { useGetEventScheduleQuery } = gdakonService;
