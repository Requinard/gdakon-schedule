import {EventScheduleList, EventScheduleListProps} from "./EventScheduleList";
import {CircularProgress, InputAdornment, TextField} from "@mui/material";
import {size} from "lodash";

import SearchIcon from "~icons/mdi/search"

export const FilterableEventScheduleList = ({events}: EventScheduleListProps) => {
    const [query, {onChange}] = useEventTarget({initialValue: ""});
    const debouncedQuery = useDebounce(query)

    const filteredEvents = useMemo(() => events.filter(it => size(debouncedQuery) > 2 ? it.name.includes(debouncedQuery ?? "") : true), [debouncedQuery, events])

    return <>
        <TextField value={query} onChange={onChange} fullWidth InputProps={{
            startAdornment: <InputAdornment position={'start'}>
                {query === debouncedQuery ? <SearchIcon/> : <CircularProgress size={18}  />}
            </InputAdornment>
        }}/>

        <EventScheduleList events={filteredEvents}/>
    </>;
}
