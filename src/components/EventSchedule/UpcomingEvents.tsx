import { useMemo } from "react";
import { chain } from "lodash-es";
import { useTranslation } from "react-i18next";
import {
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    Typography,
    ListItemText,
    Alert,
} from "@mui/material";

import { dayjs } from "../../utilities/dayjs";
import { useGetEventScheduleQuery } from "../../store/gdakon.service";

export const UpcomingEventsCard = () => {
    const { t } = useTranslation("UpcomingEvent");
    const { data = [] } = useGetEventScheduleQuery({});

    const current = useMemo(
        () =>
            chain(data)
                .filter((event) => dayjs().isSame(event.startTime, "day"))
                .filter((event) => dayjs().isBefore(event.startTime))
                .value(),
        [data]
    );

    return (
        <Card>
            <CardHeader title={t("title")} />
            {current.length === 0 && (
                <CardContent>
                    <Alert variant={"standard"} severity={"info"}>
                        {t("no_items")}
                    </Alert>
                </CardContent>
            )}
            <List>
                {current.map((event) => (
                    <ListItem key={event.id}>
                        <ListItemText
                            primary={event.name}
                            secondary={t("starting_in", {
                                time: dayjs(event.startTime).fromNow(),
                            })}
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};
