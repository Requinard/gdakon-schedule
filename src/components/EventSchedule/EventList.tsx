import { TransitionGroup } from "react-transition-group";
import { Collapse } from "@mui/material";
import { PropsWithChildren, ReactElement, ReactNode } from "react";

import { EventScheduleItem } from "../../store/gdakon.types";
import { useTicker } from "../../hooks/useTicker";

import { EventListItem } from "./EventListItem";

type EventListProps = {
    events: EventScheduleItem[];
    amount?: number;
    emptyComponent?: ReactElement;
};
export const EventList = ({
    events,
    amount = 3,
    emptyComponent,
}: PropsWithChildren<EventListProps>): ReactElement | null => {
    const innerEvents = useTicker(events, amount, 3000);

    if (events.length === 0) {
        if (emptyComponent) {
            return emptyComponent;
        }

        return <> </>;
    }

    return (
        <TransitionGroup>
            {innerEvents.map((event) => (
                <Collapse key={event.id}>
                    <EventListItem event={event} />
                </Collapse>
            ))}
        </TransitionGroup>
    );
};
