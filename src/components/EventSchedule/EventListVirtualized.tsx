import { GroupedVirtuoso } from "react-virtuoso";
import { useMemo } from "react";
import { flatMap, groupBy, keys, map, values } from "lodash";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";

import { useEventFilter } from "./EventFilter.Provider";
import { EventScheduleItemCard } from "./EventScheduleItemCard";

type VirtuosoProps<T> = {
    groupCounts: number[];
    groups: string[];
    items: T[];
};

export const EventListVirtualized = () => {
    const { t } = useTranslation("EventSchedule");
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
        <GroupedVirtuoso
            groupCounts={groupCounts}
            height={"100%"}
            groupContent={(index) => (
                <Breadcrumbs
                    separator={<Typography variant={"h4"}>{">"}</Typography>}
                    sx={{ bgcolor: "background.default", pt: 3, pb: 3 }}
                >
                    <Typography variant={"h4"}>
                        {t("EventListVirtualized.header")}
                    </Typography>
                    <Typography variant={"h4"}>{groups[index]}</Typography>
                </Breadcrumbs>
            )}
            itemContent={(index) => (
                <Box pt={1}>
                    <EventScheduleItemCard event={items[index]} />
                </Box>
            )}
            components={{}}
        />
    );
};
