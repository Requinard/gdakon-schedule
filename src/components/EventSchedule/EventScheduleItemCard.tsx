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

    const { name, desc, room } = useMemo(() => {
        if (i18n.language === "pl") {
            return {
                name: event.namePl === "" ? event.namePl : event.namePl,
                desc: event.descPl === "" ? event.desc : event.descPl,
                room:
                    event.roomNamePl === null
                        ? event.roomName
                        : event.roomNamePl,
            };
        }

        return {
            name: event.name,
            desc: event.desc,
            room: event.roomName,
        };
    }, [i18n, t]);

    const subheader = useMemo(() => {
        if (room) {
            return `${room} - ${dayjs(event.startTime).format("LT")}`;
        }
        return dayjs(event.startTime).format("LT");
    }, [event, room]);

    return (
        <Card>
            <CardHeader title={name} subheader={subheader} />
            <CardContent>
                <Typography paragraph>{desc}</Typography>
            </CardContent>
        </Card>
    );
};
