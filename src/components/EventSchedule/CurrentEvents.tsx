import { useMemo } from "react";
import { chain } from "lodash-es";
import { useTranslation } from "react-i18next";
import {
    Alert,
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

import { dayjs } from "../../utilities/dayjs";
import { useGetEventScheduleQuery } from "../../store/gdakon.service";

export const CurrentEventCard = () => {
    const { t } = useTranslation("CurrentEvent");
    const { data = [] } = useGetEventScheduleQuery({});

    const current = useMemo(
        () =>
            chain(data)
                .filter((event) =>
                    dayjs().isBetween(event.startTime, event.endTime)
                )
                .slice(0, 10)
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
            <List dense>
                {current.map((event) => (
                    <ListItem key={event.id}>
                        <ListItemText
                            primary={event.name}
                            secondary={t("until", {
                                time: dayjs(event.endTime).format("LT"),
                            })}
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};
