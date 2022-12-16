import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";

type EventScheduleItemCardProps = {
    event: NormalizedEventScheduleItem;
};

export const EventScheduleItemCard = ({
    event,
}: EventScheduleItemCardProps) => {
    const { i18n, t } = useTranslation();

    const { name, desc } = useMemo(() => {
        if (i18n.language === "pl") {
            return {
                name: event.namePl === "" ? event.namePl : event.namePl,
                desc: event.descPl === "" ? event.desc : event.descPl,
            };
        }

        return {
            name: event.name,
            desc: event.desc,
        };
    }, [i18n, t]);

    return (
        <Card>
            <CardHeader
                title={name}
                subheader={dayjs(event.startTime).format("LT")}
            />
            <CardContent>
                <Typography paragraph>{desc}</Typography>
            </CardContent>
        </Card>
    );
};
