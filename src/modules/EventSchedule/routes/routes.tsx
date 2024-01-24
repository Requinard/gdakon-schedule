import {RouteObject} from "react-router-dom";
import {EventScheduleSearchRoute} from "./EventScheduleSearchRoute";
import {EventScheduleListRoute} from "./EventScheduleListRoute";

export const EventScheduleRoutes: RouteObject[] = [
    {
        path: "search", element: <EventScheduleSearchRoute/>
    },
    {path: "schedule", element: <EventScheduleListRoute/>},
]
