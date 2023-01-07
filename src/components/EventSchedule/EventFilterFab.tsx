import { Fab, Zoom } from "@mui/material";
import { size } from "lodash";

import { useEventFilter } from "./EventFilter.Provider";

import RemoveFilterIcon from "~icons/mdi/filter-off-outline";

export const EventFilterFab = () => {
    const { reset, filters } = useEventFilter();

    return (
        <Zoom in={size(filters) > 0} mountOnEnter unmountOnExit>
            <Fab
                sx={{
                    position: "absolute",
                    bottom: 80,
                    right: 32,
                }}
                color={"secondary"}
                onClick={reset}
            >
                <RemoveFilterIcon fontSize={"1.3rem"} />
            </Fab>
        </Zoom>
    );
};
