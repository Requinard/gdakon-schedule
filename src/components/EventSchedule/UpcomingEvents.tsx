import { useMemo } from "react";
import { chain } from "lodash";
import { useTranslation } from "react-i18next";
import {
    Alert,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";

import { dayjs } from "../../utilities/dayjs";
import { useGetEventScheduleQuery } from "../../store/gdakon.service";
import { useNow } from "../../hooks/useNow";
import { useTicker } from "../../hooks/useTicker";

export const UpcomingEventsCard = () => {
    const { t } = useTranslation("UpcomingEvent");
    const now = useNow();
    const { data = [] } = useGetEventScheduleQuery({});

    const current = useMemo(
        () =>
            chain(data)
                .filter((event) => now.isSame(event.startTime, "day"))
                .filter((event) => now.isBefore(event.startTime))
                .value(),
        [data, now]
    );

    const ticker = useTicker(current);

    return (
        <Card>
            <CardHeader title={t("title")} />
            {ticker.length === 0 && (
                <CardContent>
                    <Alert variant={"standard"} severity={"info"}>
                        {t("no_items")}
                    </Alert>
                </CardContent>
            )}
            <List dense>
                <TransitionGroup>
                    {ticker.map((event) => (
                        <Collapse key={event.id}>
                            <ListItem>
                                <ListItemText
                                    primary={event.name}
                                    secondary={t("starting_in", {
                                        time: dayjs(event.startTime).from(now),
                                    })}
                                />
                            </ListItem>
                        </Collapse>
                    ))}
                </TransitionGroup>
            </List>
        </Card>
    );
};
