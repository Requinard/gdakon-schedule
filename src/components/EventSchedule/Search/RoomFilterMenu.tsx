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
import { chain, values } from "lodash";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import { useEventFilter } from "../EventFilter.Provider";

import CheckIcon from "~icons/ic/round-check";
import RoomIcon from "~icons/ic/baseline-room";

export const RoomFilterMenu = () => {
    const { t, i18n } = useTranslation("EventSchedule", {
        keyPrefix: "Search",
    });

    const { toggleRoom, original, filters } = useEventFilter();

    const popover = usePopupState({ variant: "popover" });

    const rooms = useMemo(
        () =>
            chain(original)
                .map((it) =>
                    i18n.language.startsWith("pl") && it.roomNamePl
                        ? it.roomNamePl
                        : it.roomName
                )
                .compact()
                .uniq()
                .value(),
        [original]
    );

    if (rooms.length === 0) {
        return null;
    }
    return (
        <Button {...bindToggle(popover)}>
            <RoomIcon fontSize={"1.4rem"} />
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
                    <ListSubheader>{t("room_subheader")}</ListSubheader>
                    {rooms.map((room) => {
                        return (
                            <MenuItem
                                key={room}
                                onClick={() => toggleRoom(room)}
                            >
                                <ListItemIcon>
                                    {values(filters.rooms).includes(room) ? (
                                        <CheckIcon />
                                    ) : null}
                                </ListItemIcon>
                                <ListItemText primary={room} />
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Popover>
        </Button>
    );
};
