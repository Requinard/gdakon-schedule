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

import { useAppDispatch, useAppSelector } from "../../store";
import {
    setTimeTravelAmount,
    toggleTimeTravel,
} from "../../store/settings.slice";
import { useNow } from "../../hooks/useNow";

const EnableTimeTravel = () => {
    const dispatch = useAppDispatch();

    const enabled = useAppSelector(
        (state) => state.settings.timetravel.enabled
    );

    return (
        <MenuItem onClick={() => dispatch(toggleTimeTravel(!enabled))}>
            <ListItemText
                primary={"Enable time travel"}
                secondary={"Move time (for debugging)"}
                secondaryTypographyProps={{
                    noWrap: true,
                }}
            />
            <ListItemSecondaryAction>
                <Switch checked={enabled} color={"secondary"} />
            </ListItemSecondaryAction>
        </MenuItem>
    );
};

const TimeTravelPicker = () => {
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
                        label={"Time Travel Date"}
                    />
                )}
            />
        </ListItem>
    );
};
export const TimeTravelSettings = () => {
    return (
        <>
            <ListSubheader>Time Travel</ListSubheader>
            <EnableTimeTravel />
            <TimeTravelPicker />
        </>
    );
};
