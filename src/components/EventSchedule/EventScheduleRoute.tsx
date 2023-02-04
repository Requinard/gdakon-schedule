import { useGetEventScheduleQuery } from "../../store/gdakon.service";

import { EventFilterProvider } from "./EventFilter.Provider";
import { EventListVirtualized } from "./EventListVirtualized";

export const EventScheduleRoute = () => {
    const { data = [] } = useGetEventScheduleQuery({});
    return (
        <EventFilterProvider events={data}>
            <EventListVirtualized />
        </EventFilterProvider>
    );
};
