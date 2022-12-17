import { useMemo } from "react";
import { chain } from "lodash-es";
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
import { useTicker } from "../../hooks/useTicker";
import { useNow } from "../../hooks/useNow";

export const CurrentEventCard = () => {
    const { t } = useTranslation("CurrentEvent");
    const now = useNow();
    const { data = [] } = useGetEventScheduleQuery({});

    const currentEvents = useMemo(
        () =>
            chain(data)
                .filter((event) =>
                    now.isBetween(event.startTime, event.endTime)
                )
                .value(),
        [data, now]
    );

    const visibleItems = useTicker(currentEvents);

    return (
        <Card>
            <CardHeader title={t("title")} />
            {visibleItems.length === 0 && (
                <CardContent>
                    <Alert variant={"standard"} severity={"info"}>
                        {t("no_items")}
                    </Alert>
                </CardContent>
            )}
            <List dense>
                <TransitionGroup>
                    {visibleItems.map((event) => (
                        <Collapse key={event.id}>
                            <ListItem>
                                <ListItemText
                                    primary={event.name}
                                    secondary={t("until", {
                                        time: dayjs(event.endTime).format("LT"),
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
