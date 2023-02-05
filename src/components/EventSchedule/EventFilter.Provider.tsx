import { useImmer } from "use-immer";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { every, isEqual, noop, some } from "lodash";
import { Dayjs } from "dayjs";
import { useDebounce } from "usehooks-ts";

import { NormalizedEventScheduleItem } from "../../store/gdakon.types";
import { useAppSelector } from "../../store";

type EventFilterProviderProps = {
    events: NormalizedEventScheduleItem[];
};

type EventFilters = {
    search: string | "";
    dates: Dayjs[];
    rooms: string[];
    bookmarked: boolean;
};

export const defaultEventFilters = {
    search: "",
    dates: [],
    rooms: [],
    bookmarked: false,
};

type EventFilterContextProps = {
    reset: () => void;
    original: NormalizedEventScheduleItem[];
    filtered: NormalizedEventScheduleItem[];
    filters: EventFilters;
    setSearch: (search: string) => void;
    toggleDate: (date: Dayjs) => void;
    dayEnabled: (date: Dayjs) => boolean;
    toggleRoom: (room: string) => void;
    roomEnabled: (room: string) => boolean;
    toggleBookmarked: () => void;
};

const EventFilterContext = createContext<EventFilterContextProps>({
    original: [],
    filtered: [],
    reset: noop,
    filters: defaultEventFilters,
    setSearch: noop,
    toggleDate: noop,
    dayEnabled: () => false,
    toggleRoom: noop,
    roomEnabled: () => false,
    toggleBookmarked: noop,
});

export const useEventFilter = () => useContext(EventFilterContext);

export const EventFilterProvider = ({
    children,
    events,
}: PropsWithChildren<EventFilterProviderProps>) => {
    const bookmarks = useAppSelector((state) => state.bookmarks.events);
    const [filters, setFilters] = useImmer<EventFilters>(defaultEventFilters);
    const debouncedFilters = useDebounce(filters, 200);

    const filtered = useMemo(() => {
        if (isEqual(debouncedFilters, defaultEventFilters)) {
            return events;
        }

        const searchLowered = debouncedFilters.search.toLocaleLowerCase();

        return events.filter((event) =>
            every([
                debouncedFilters.search.length > 2
                    ? event.name.toLocaleLowerCase().includes(searchLowered)
                    : true,
                debouncedFilters.dates.length > 0
                    ? some(debouncedFilters.dates, (it) =>
                          it.isSame(event.startTime, "day")
                      )
                    : true,
                debouncedFilters.rooms.length > 0
                    ? some(
                          debouncedFilters.rooms,
                          (it) =>
                              it === event.roomName || it === event.roomNamePl
                      )
                    : true,
                debouncedFilters.bookmarked
                    ? bookmarks.includes(event.id)
                    : true,
            ])
        );
    }, [debouncedFilters, events, bookmarks]);

    const value = useMemo((): EventFilterContextProps => {
        const dayEnabled = (date: Dayjs, filters: EventFilters) =>
            some(filters.dates, (it) => it.isSame(date, "day"));
        const roomEnabled = (room: string, filters: EventFilters) =>
            filters.rooms.includes(room);

        return {
            original: events,
            filtered,
            reset: () => setFilters(defaultEventFilters),
            filters,
            setSearch: (search) =>
                setFilters((draft) => {
                    draft.search = search;
                }),
            toggleDate: (date) =>
                setFilters((draft) => {
                    if (dayEnabled(date, draft)) {
                        draft.dates = draft.dates.filter(
                            (it) => !it.isSame(date, "day")
                        );
                    } else {
                        draft.dates.push(date);
                    }
                }),
            dayEnabled: (date) => dayEnabled(date, filters),
            toggleRoom: (room) =>
                setFilters((draft) => {
                    if (roomEnabled(room, draft)) {
                        draft.rooms = draft.rooms.filter((it) => it !== room);
                    } else {
                        draft.rooms.push(room);
                    }
                }),
            roomEnabled: (room) => roomEnabled(room, filters),
            toggleBookmarked: () =>
                setFilters((draft) => {
                    draft.bookmarked = !draft.bookmarked;
                }),
        } as EventFilterContextProps;
    }, [events, filtered, filters]);

    return (
        <EventFilterContext.Provider value={value}>
            {children}
        </EventFilterContext.Provider>
    );
};
