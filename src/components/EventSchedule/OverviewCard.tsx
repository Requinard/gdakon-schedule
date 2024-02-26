import { Alert, Card, CardHeader, List, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { useCurrentEvents } from "../../hooks/useCurrentEvents";
import { useUpcomingEvents } from "../../hooks/useUpcomingEvents";
import { ListSection } from "../Common/ListSection";
import { ServiceWorker } from "../Common/ServiceWorker";

import { EventList } from "./EventList";

import ScheduleIcon from "~icons/ic/sharp-schedule";
import { scheduleClient } from "~modules/Schedule";

export const OverviewCard = () => {
    const theme = useTheme();
    const { t } = useTranslation("EventSchedule");
    const { data = [] } = useQuery({
        queryKey: ["schedule"],
        queryFn: scheduleClient.getSchedule,
    });
    const current = useCurrentEvents(data);
    const upcoming = useUpcomingEvents(data);

    return (
        <Card
            sx={{
                [theme.breakpoints.down("sm")]: {
                    m: 1,
                },
            }}
        >
            <CardHeader
                avatar={<ScheduleIcon style={{ fontSize: "1.8rem" }} />}
                title={t("title")}
                titleTypographyProps={{ variant: "h5" }}
            />
            <ServiceWorker />
            <List>
                <ListSection
                    title={t("Overview.current.title")}
                    subtitle={t("Overview.current.subtitle", {
                        count: current.length,
                    })}
                />
                <EventList
                    events={current}
                    emptyComponent={
                        <Alert severity={"info"}>
                            {t("Overview.current.empty")}
                        </Alert>
                    }
                />
                <ListSection
                    title={t("Overview.upcoming.title")}
                    subtitle={t("Overview.upcoming.subtitle", {
                        count: upcoming.length,
                    })}
                />
                <EventList
                    events={upcoming}
                    emptyComponent={
                        <Alert severity={"info"}>
                            {t("Overview.upcoming.empty")}
                        </Alert>
                    }
                />
            </List>
        </Card>
    );
};
