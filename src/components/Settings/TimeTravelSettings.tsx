/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    MenuItem,
    Switch,
    TextField,
} from "@mui/material";
import { useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../store";
import {
    setTimeTravelAmount,
    toggleTimeTravel,
} from "../../store/settings.slice";
import { useNow } from "../../hooks/useNow";

export const EnableTimeTravel = () => {
    const { t } = useTranslation("Settings");
    const dispatch = useAppDispatch();

    const enabled = useAppSelector(
        (state) => state.settings.timetravel.enabled
    );

    return (
        <MenuItem
            onClick={() => dispatch(toggleTimeTravel(!enabled))}
            role={"button"}
        >
            <ListItemText
                primary={t("TimeTravelSettings.EnableTimeTravel.title")}
                secondary={t("TimeTravelSettings.EnableTimeTravel.title")}
                secondaryTypographyProps={{
                    noWrap: true,
                }}
            />
            <ListItemSecondaryAction>
                <Switch checked={enabled} color={"secondary"} role={"switch"} />
            </ListItemSecondaryAction>
        </MenuItem>
    );
};

export const TimeTravelPicker = () => {
    const { t } = useTranslation("Settings");
    const now = useNow();
    const dispatch = useAppDispatch();

    const changeTimeTravelAmount = useCallback(
        (value: Dayjs | null) => {
            if (value === null) {
                return;
            }
            const diff = value.diff(dayjs(), "milliseconds");

            dispatch(setTimeTravelAmount(diff));
        },
        [dispatch]
    );

    return (
        <ListItem sx={{ mt: 1, mb: 1 }}>
            <DateTimePicker
                value={now}
                onChange={changeTimeTravelAmount}
                renderInput={(props) => (
                    <TextField
                        fullWidth
                        size={"small"}
                        {...props}
                        label={t("TimeTravelSettings.TimeTravelPicker.label")}
                    />
                )}
            />
        </ListItem>
    );
};
export const TimeTravelSettings = () => {
    const { t } = useTranslation("Settings");
    return (
        <>
            <ListSubheader>{t("TimeTravelSettings.title")}</ListSubheader>
            <EnableTimeTravel />
            <TimeTravelPicker />
        </>
    );
};
