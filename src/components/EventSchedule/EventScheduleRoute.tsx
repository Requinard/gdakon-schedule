import { ScheduleHooks } from "../../modules/EventSchedule";
import { LoadingIndicator } from "../Common/LoadingIndicator";

import { EventFilterProvider } from "./EventFilter.Provider";
import { EventListVirtualized } from "./EventListVirtualized";

export const EventScheduleRoute = () => {
    const { data = [], isLoading } = ScheduleHooks.useSchedule({});
    return (
        <EventFilterProvider events={[]}>
            {isLoading ? <LoadingIndicator /> : <EventListVirtualized />}
        </EventFilterProvider>
    );
};
