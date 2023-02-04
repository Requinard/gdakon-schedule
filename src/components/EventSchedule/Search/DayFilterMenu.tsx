import {
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
import { map, size } from "lodash";
import { useTranslation } from "react-i18next";

import { useEventFilter } from "../EventFilter.Provider";

import DayIcon from "~icons/mdi/calendar-today";
import CheckIcon from "~icons/ic/round-check";

export const DayFilterMenu = () => {
    const { t } = useTranslation("EventSchedule", { keyPrefix: "Search" });

    const { dayFilters, isEnabled, toggleFilter } = useEventFilter();

    const popover = usePopupState({ variant: "popover" });

    if (size(dayFilters) === 0) {
        return null;
    }
    return (
        <Button {...bindToggle(popover)}>
            <DayIcon fontSize={"1.4rem"} />
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

                    {map(dayFilters, (fn, name) => {
                        const enabled = isEnabled(name);
                        return (
                            <MenuItem
                                key={name}
                                onClick={() => toggleFilter(name, fn)}
                            >
                                <ListItemIcon>
                                    {enabled && <CheckIcon />}
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Popover>
        </Button>
    );
};
