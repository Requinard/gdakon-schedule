import { GroupedVirtuoso } from "react-virtuoso";
import { useMemo } from "react";
import { flatMap, groupBy, keys, map, values } from "lodash";
import { Box, Container, Typography } from "@mui/material";
import dayjs from "dayjs";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";

import { useEventFilter } from "./EventFilter.Provider";
import { EventScheduleItemCard } from "./EventScheduleItemCard";
import { EventSearch } from "./Search/EventSearch";

type VirtuosoProps<T> = {
    groupCounts: number[];
    groups: string[];
    items: T[];
};

export const EventListVirtualized = () => {
    const { filtered } = useEventFilter();

    const { groupCounts, groups, items } =
        useMemo((): VirtuosoProps<NormalizedEventScheduleItem> => {
            const groups = groupBy(filtered, (it) =>
                dayjs(it.startTime).format("LL")
            );

            const groupCounts = map(groups, (values) => values.length);

            return {
                groupCounts: groupCounts,
                items: flatMap(values(groups)),
                groups: keys(groups),
            };
        }, [filtered]);

    return (
        <Box display={"flex"} flexDirection={"column"} flex={1}>
            <Container>
                <Box pt={3}>
                    <EventSearch />
                </Box>
            </Container>
            <GroupedVirtuoso
                groupCounts={groupCounts}
                height={"100%"}
                groupContent={(index) => (
                    <Container>
                        <Box pt={2} pb={2} pl={1}>
                            <Typography variant={"h4"}>
                                {groups[index]}
                            </Typography>
                        </Box>
                    </Container>
                )}
                itemContent={(index) => (
                    <Container sx={{ pb: 1 }}>
                        <EventScheduleItemCard event={items[index]} />
                    </Container>
                )}
            />
        </Box>
    );
};
