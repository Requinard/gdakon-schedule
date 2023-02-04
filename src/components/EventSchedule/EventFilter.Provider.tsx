import { useImmer } from "use-immer";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
} from "react";
import { chain, every, noop } from "lodash";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";

import { EventFilterFab } from "./EventFilterFab";

type EventFilterProviderProps = {
    events: NormalizedEventScheduleItem[];
};

type EventFilterFn = (item: NormalizedEventScheduleItem) => boolean;

type EventFilterContextProps = {
    toggleFilter: (key: string, fn: EventFilterFn) => void;
    setFilter: (key: string, fn: EventFilterFn) => void;
    isEnabled: (key: string) => boolean;
    reset: () => void;
    original: NormalizedEventScheduleItem[];
    filtered: NormalizedEventScheduleItem[];
    filters: Record<string, EventFilterFn>;
    dayFilters: Record<string, EventFilterFn>;
    roomFilters: Record<string, EventFilterFn>;
};

const EventFilterContext = createContext<EventFilterContextProps>({
    toggleFilter: noop,
    setFilter: noop,
    isEnabled: () => false,
    original: [],
    filtered: [],
    reset: noop,
    filters: {},
    dayFilters: {},
    roomFilters: {},
});

export const useEventFilter = () => useContext(EventFilterContext);

export const EventFilterProvider = ({
    children,
    events,
}: PropsWithChildren<EventFilterProviderProps>) => {
    const { i18n } = useTranslation();
    const [filterStorage, setFilterStorage] = useImmer<
        Record<string, EventFilterFn>
    >({});

    const dayFilters = useMemo(() => {
        return chain(events)
            .groupBy((it) => dayjs(it.startTime).format("LL"))
            .mapValues(
                (value, key) => (item: NormalizedEventScheduleItem) =>
                    dayjs(item.startTime).isSame(key, "date")
            )
            .value();
    }, [events]);

    const roomFilters = useMemo(() => {
        return chain(events)
            .groupBy((event) =>
                i18n.language.startsWith("pl") && event.roomNamePl !== null
                    ? event.roomNamePl
                    : event.roomName
            )
            .omitBy((value, key) => key === "null")
            .mapValues(
                (values, key) => (item: NormalizedEventScheduleItem) =>
                    item.roomName === key || item.roomNamePl === key
            )
            .value();
    }, [i18n, events]);

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

    const setFilter = useCallback(
        (key: string, fn: EventFilterFn) =>
            setFilterStorage((draft) => {
                draft[key] = fn;
            }),
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

        return events.filter((it) => every(filters, (filter) => filter(it)));
    }, [filterStorage, events]);

    const reset = useCallback(() => setFilterStorage({}), [setFilterStorage]);

    const value = useMemo(
        (): EventFilterContextProps => ({
            toggleFilter,
            setFilter,
            isEnabled,
            original: events,
            filtered,
            reset,
            filters: filterStorage,
            dayFilters,
            roomFilters,
        }),
        [
            toggleFilter,
            setFilter,
            isEnabled,
            events,
            filtered,
            reset,
            filterStorage,
            dayFilters,
            roomFilters,
        ]
    );

    return (
        <EventFilterContext.Provider value={value}>
            {children}
            <EventFilterFab />
        </EventFilterContext.Provider>
    );
};
