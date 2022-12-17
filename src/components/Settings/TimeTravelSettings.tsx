import {
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    MenuItem,
    Switch,
} from "@mui/material";
import { useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";

import { useAppDispatch, useAppSelector } from "../../store";
import {
    setTimeTravelAmount,
    toggleTimeTravel,
} from "../../store/settings.slice";

const EnableTimeTravel = () => {
    const dispatch = useAppDispatch();

    const enabled = useAppSelector(
        (state) => state.settings.timetravel.enabled
    );

    return (
        <MenuItem
            sx={{ minWidth: 500, maxWidth: "100%" }}
            onClick={() => dispatch(toggleTimeTravel(!enabled))}
        >
            <ListItemText
                primary={"Enable time travel"}
                secondary={"Debug setting to deal with time related issues"}
            />
            <ListItemSecondaryAction>
                <Switch edge={"end"} checked={enabled} color={"secondary"} />
            </ListItemSecondaryAction>
        </MenuItem>
    );
};

const TimeTravelDestinations = () => {
    const dispatch = useAppDispatch();
    const { disabled, amount } = useAppSelector((state) => ({
        disabled: !state.settings.timetravel.enabled,
        amount: state.settings.timetravel.amount,
    }));

    const travelTo = useCallback(
        (timestamp: Dayjs) => {
            const diff = timestamp.diff(dayjs());

            dispatch(setTimeTravelAmount(diff));
        },
        [dispatch]
    );

    return (
        <>
            <MenuItem disabled>
                <ListItemText
                    primary={dayjs().add(amount, "milliseconds").format("LLLL")}
                    secondary={"Date according to time travel"}
                />
            </MenuItem>
            <MenuItem disabled={disabled} onClick={() => travelTo(dayjs())}>
                <ListItemText
                    primary={"Reset"}
                    secondary={"Back to normal time"}
                />
            </MenuItem>
            <MenuItem
                disabled={disabled}
                onClick={() =>
                    travelTo(dayjs("Thu Mar 09 2023 16:30:00 GMT+0100"))
                }
            >
                <ListItemText
                    primary={"Before Opening"}
                    secondary={"30 minutes to opening"}
                />
            </MenuItem>
            <MenuItem
                disabled={disabled}
                onClick={() =>
                    travelTo(dayjs("Thu Mar 09 2023 17:05:00 GMT+0100"))
                }
            >
                <ListItemText
                    primary={"During Opening"}
                    secondary={"Event is ongoing"}
                />
            </MenuItem>
            <MenuItem
                disabled={disabled}
                onClick={() =>
                    travelTo(dayjs("Sun Mar 13 2023 17:45:00 GMT+0100"))
                }
            >
                <ListItemText
                    primary={"After Con"}
                    secondary={"All stuff is done"}
                />
            </MenuItem>
        </>
    );
};

export const TimeTravelSettings = () => {
    return (
        <>
            <ListSubheader>Time Travel</ListSubheader>
            <EnableTimeTravel />
            <TimeTravelDestinations />
        </>
    );
};
