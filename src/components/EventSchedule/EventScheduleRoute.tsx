import { useQuery } from "@tanstack/react-query";

import { LoadingIndicator } from "../Common/LoadingIndicator";
import { scheduleClient } from "../../modules/Schedule";

import { EventFilterProvider } from "./EventFilter.Provider";
import { EventListVirtualized } from "./EventListVirtualized";

export const EventScheduleRoute = () => {
    const { data = [], isLoading } = useQuery({
        queryKey: ["schedule"],
        queryFn: scheduleClient.getSchedule,
    });
    return (
        <EventFilterProvider events={data}>
            {isLoading ? <LoadingIndicator /> : <EventListVirtualized />}
        </EventFilterProvider>
    );
};
