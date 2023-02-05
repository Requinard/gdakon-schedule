import { Button } from "@mui/material";
import { isEqual } from "lodash";

import { defaultEventFilters, useEventFilter } from "../EventFilter.Provider";

import RemoveFilterIcon from "~icons/mdi/filter-off-outline";

export const ResetButton = () => {
    const { filters, reset } = useEventFilter();
    return (
        <Button
            disabled={isEqual(filters, defaultEventFilters)}
            onClick={reset}
        >
            <RemoveFilterIcon fontSize={"1.4rem"} />
        </Button>
    );
};
