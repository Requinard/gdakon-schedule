import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import * as gdakonEvents from "./gdakon.events.json";
import {
    NormalizedEventScheduleItem,
    normalizeEventScheduleResponse,
} from "./gdakon.types";

export const gdakonService = createApi({
    reducerPath: "gdakon.service",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://gdakon.org/api",
    }),
    endpoints: (builder) => ({
        getEventSchedule: builder.query<NormalizedEventScheduleItem[], unknown>(
            {
                queryFn: () => ({
                    data: normalizeEventScheduleResponse(gdakonEvents),
                }),
            }
        ),
    }),
});

export const { useGetEventScheduleQuery } = gdakonService;
