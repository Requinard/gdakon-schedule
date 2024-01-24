import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";

import {EventScheduleModel} from "../../models";
import {TransitionGroup} from "react-transition-group";
import {EventScheduleListItem} from "./EventScheduleListItem";

export type EventScheduleListProps = {
    events: EventScheduleModel[];
};

export const EventScheduleList = ({events}: EventScheduleListProps) => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);

    const [virtualList] = useVirtualList(events, {
        containerTarget: containerRef,
        wrapperTarget: wrapperRef,
        itemHeight: 48,
        overscan: 5,
    });
    return (
        <Box ref={containerRef}>
            <List ref={wrapperRef}>
                <TransitionGroup>
                    {virtualList.map(({index, data}) => (
                        <Collapse key={index}>
                          <EventScheduleListItem event={data} />
                        </Collapse>
                    ))}
                </TransitionGroup>

            </List>
        </Box>
    );
};
