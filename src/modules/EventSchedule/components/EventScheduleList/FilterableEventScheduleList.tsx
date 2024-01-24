import {EventScheduleList, EventScheduleListProps} from "./EventScheduleList";
import {ButtonGroup, CircularProgress, InputAdornment, TextField} from "@mui/material";
import {size} from "lodash";

import SearchIcon from "~icons/mdi/search"
import ClearIcon from '~icons/mdi/clear'
export const FilterableEventScheduleList = ({events}: EventScheduleListProps) => {
    const [query, {onChange, reset}] = useEventTarget({initialValue: ""});
    const debouncedQuery = useDebounce(query)

    const filteredEvents = useMemo(() => events.filter(it => size(debouncedQuery) > 2 ? it.name.includes(debouncedQuery ?? "") : true), [debouncedQuery, events])

    return <>
        <TextField value={query} onChange={onChange} fullWidth InputProps={{
            startAdornment: <InputAdornment position={'start'}>
                {query === debouncedQuery ? <SearchIcon/> : <CircularProgress size={18}  />}
            </InputAdornment>,
            endAdornment: <InputAdornment position={'end'}>
                <ButtonGroup color={'inherit'} variant={'text'}>
                    <Button onClick={reset} disabled={size(query) === 0}>
                        <ClearIcon />
                    </Button>
                </ButtonGroup>
            </InputAdornment>
        }}/>

        <EventScheduleList events={filteredEvents}/>
    </>;
}
