import { useImmer } from "use-immer";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
} from "react";
import { noop, some } from "lodash";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";

import { EventFilterFab } from "./EventFilterFab";

type EventFilterProviderProps = {
    events: NormalizedEventScheduleItem[];
};

type EventFilterFn = (item: NormalizedEventScheduleItem) => boolean;

type EventFilterContextProps = {
    toggleFilter: (key: string, fn: EventFilterFn) => void;
    isEnabled: (key: string) => boolean;
    reset: () => void;
    original: NormalizedEventScheduleItem[];
    filtered: NormalizedEventScheduleItem[];
    filters: Record<string, EventFilterFn>;
};

const EventFilterContext = createContext<EventFilterContextProps>({
    toggleFilter: noop,
    isEnabled: () => false,
    original: [],
    filtered: [],
    reset: noop,
    filters: {},
});

export const useEventFilter = () => useContext(EventFilterContext);

export const EventFilterProvider = ({
    children,
    events,
}: PropsWithChildren<EventFilterProviderProps>) => {
    const [filterStorage, setFilterStorage] = useImmer<
        Record<string, EventFilterFn>
    >({});

    const toggleFilter = useCallback(
        (key: string, fn: EventFilterFn) => {
            setFilterStorage((draft) => {
                if (key in draft) {
                    delete draft[key];
                } else {
                    draft[key] = fn;
                }
            });
        },
        [setFilterStorage]
    );

    const isEnabled = useCallback(
        (key: string) => key in filterStorage,
        [filterStorage]
    );

    const filtered = useMemo(() => {
        const filters = Object.values(filterStorage);

        if (filters.length === 0) {
            return events;
        }

        return events.filter((it) => some(filters, (filter) => filter(it)));
    }, [filterStorage, events]);

    const reset = useCallback(() => setFilterStorage({}), [setFilterStorage]);

    return (
        <EventFilterContext.Provider
            value={{
                toggleFilter,
                isEnabled,
                original: events,
                filtered,
                reset,
                filters: filterStorage,
            }}
        >
            {children}
            <EventFilterFab />
        </EventFilterContext.Provider>
    );
};