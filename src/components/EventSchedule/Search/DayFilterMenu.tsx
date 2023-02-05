import {
    Badge,
    Button,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    MenuItem,
    MenuList,
    Popover,
} from "@mui/material";
import {
    bindPopover,
    bindToggle,
    usePopupState,
} from "material-ui-popup-state/hooks";
import { chain, some } from "lodash";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import dayjs from "dayjs";

import { useEventFilter } from "../EventFilter.Provider";

import DayIcon from "~icons/mdi/calendar-today";
import CheckIcon from "~icons/ic/round-check";

export const DayFilterMenu = () => {
    const { t } = useTranslation("EventSchedule", { keyPrefix: "Search" });

    const { toggleDate, original, filters } = useEventFilter();

    const popover = usePopupState({ variant: "popover" });

    const dates = useMemo(
        () =>
            chain(original)
                .map((it) => dayjs(it.startTime))
                .uniqBy((it) => it.format("LL"))
                .value(),
        [original]
    );
    return (
        <Button {...bindToggle(popover)}>
            <Badge badgeContent={filters.dates.length} color={"warning"}>
                <DayIcon fontSize={"1.4rem"} />
            </Badge>
            <Popover
                {...bindPopover(popover)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuList>
                    <ListSubheader>{t("date_subheader")}</ListSubheader>

                    {dates.map((date) => {
                        return (
                            <MenuItem
                                key={date.format("LL")}
                                onClick={() => toggleDate(date)}
                            >
                                <ListItemIcon>
                                    {some(filters.dates, (it) =>
                                        it.isSame(date, "day")
                                    ) && <CheckIcon />}
                                </ListItemIcon>
                                <ListItemText primary={date.format("LL")} />
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Popover>
        </Button>
    );
};
