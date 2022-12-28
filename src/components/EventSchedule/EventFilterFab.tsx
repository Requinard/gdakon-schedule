import { Fab, IconButton } from "@mui/material";
import { size } from "lodash";

import { useEventFilter } from "./EventFilter.Provider";

import RemoveFilterIcon from "~icons/mdi/filter-off-outline";

export const EventFilterFab = () => {
    const { reset, filters } = useEventFilter();

    return (
        <Fab
            sx={{
                position: "absolute",
                bottom: 80,
                right: 32,
            }}
            color={"secondary"}
            disabled={size(filters) === 0}
        >
            <IconButton onClick={reset}>
                <RemoveFilterIcon />
            </IconButton>
        </Fab>
    );
};
