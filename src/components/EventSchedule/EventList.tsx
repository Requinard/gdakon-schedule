import { TransitionGroup } from "react-transition-group";
import { Collapse } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

import { useTicker } from "../../hooks/useTicker";

import { EventListItem } from "./EventListItem";

import { EventScheduleItemModel } from "~modules/Schedule";

type EventListProps = {
    events: EventScheduleItemModel[];
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
