import { useGetEventScheduleQuery } from "../../store/gdakon.service";
import { LoadingIndicator } from "../Common/LoadingIndicator";

import { EventFilterProvider } from "./EventFilter.Provider";
import { EventListVirtualized } from "./EventListVirtualized";

export const EventScheduleRoute = () => {
    const { data = [], isLoading } = useGetEventScheduleQuery({});
    return (
        <EventFilterProvider events={data}>
            {isLoading ? <LoadingIndicator /> : <EventListVirtualized />}
        </EventFilterProvider>
    );
};
