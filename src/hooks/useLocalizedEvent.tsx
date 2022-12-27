import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import { NormalizedEventScheduleItem } from "../store/gdakon.types";

export const useLocalizedEvent = (event: NormalizedEventScheduleItem) => {
    const { i18n } = useTranslation();

    const name = useMemo(() => {
        if (i18n.language === "pl" && event.namePl !== "") {
            return event.namePl;
        }
        return event.name;
    }, [event, i18n]);

    const description = useMemo(() => {
        if (i18n.language === "pl" && event.descPl !== "") {
            return event.descPl;
        }
        return event.desc;
    }, [event, i18n]);

    const room = useMemo(() => {
        if (i18n.language === "pl" && event.roomNamePl !== "") {
            return event.roomNamePl;
        }
        return event.roomName;
    }, [event, i18n]);

    return {
        name,
        description,
        room,
    };
};
