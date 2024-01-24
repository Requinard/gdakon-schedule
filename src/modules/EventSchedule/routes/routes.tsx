import {Navigate, RouteObject} from "react-router-dom";
import {EventScheduleSearchRoute} from "./EventScheduleSearchRoute";
import {EventScheduleListRoute} from "./EventScheduleListRoute";

export const EventScheduleRoutes: RouteObject = {
    path: "schedule",
    children: [
        {index: true, path: "*", element: <Navigate to={"search"} replace />},
        {path: "search", element: <EventScheduleSearchRoute />},
        {path: "list", element: <EventScheduleListRoute />},
    ]
}
