import { Card, CardHeader, List, Alert } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { useCurrentEvents } from "../../hooks/useCurrentEvents";
import { useUpcomingEvents } from "../../hooks/useUpcomingEvents";
import { ListSection } from "../Common/ListSection";
import { useGetEventScheduleQuery } from "../../store/gdakon.service";

import { EventList } from "./EventList";

import ScheduleIcon from "~icons/ic/sharp-schedule?width=2rem&height=2rem";

export const OverviewCard = () => {
    const { t } = useTranslation("Schedule", { keyPrefix: "Overview" });
    const { data = [] } = useGetEventScheduleQuery({});
    const current = useCurrentEvents(data);
    const upcoming = useUpcomingEvents(data);

    return (
        <Card>
            <CardHeader
                avatar={<ScheduleIcon />}
                title={t("title")}
                titleTypographyProps={{ variant: "h5" }}
            />

            <List>
                <ListSection
                    title={t("current_title")}
                    subtitle={t("current", { count: current.length })}
                />
                <EventList
                    events={current}
                    emptyComponent={
                        <Alert severity={"info"}>{t("current_none")}</Alert>
                    }
                />
                <ListSection
                    title={t("upcoming_title")}
                    subtitle={t("upcoming", { count: upcoming.length })}
                />
                <EventList
                    events={upcoming}
                    emptyComponent={
                        <Alert severity={"info"}>{t("upcoming_none")}</Alert>
                    }
                />
            </List>
        </Card>
    );
};
