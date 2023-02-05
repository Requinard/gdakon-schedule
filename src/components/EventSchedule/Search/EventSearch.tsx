import { Button, ButtonGroup, Icon, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { sample } from "lodash";

import { useEventFilter } from "../EventFilter.Provider";

import { DayFilterMenu } from "./DayFilterMenu";
import { RoomFilterMenu } from "./RoomFilterMenu";
import { BookmarkFilterButton } from "./BookmarkFilterButton";
import { ResetButton } from "./ResetButton";

import ClearIcon from "~icons/ic/baseline-clear";
import SearchIcon from "~icons/ic/baseline-search";

export const EventSearch = () => {
    const { t, i18n } = useTranslation("EventSchedule", {
        keyPrefix: "Search",
    });
    const { setSearch, filters, original } = useEventFilter();

    const placeholder = useMemo(() => {
        const item = sample(original);

        const name =
            i18n.language.startsWith("pl") && item?.namePl !== null
                ? item?.namePl
                : item?.name;

        return `${name} . . .`;
    }, [original, i18n]);

    return (
        <TextField
            value={filters.search}
            label={t("search_label")}
            placeholder={placeholder}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
                startAdornment: (
                    <Icon sx={{ pr: 4 }}>
                        <SearchIcon fontSize={"1.3rem"} />
                    </Icon>
                ),
                endAdornment: (
                    <ButtonGroup
                        size={"large"}
                        variant={"text"}
                        color={"inherit"}
                    >
                        <Button
                            onClick={() => {
                                setSearch("");
                            }}
                            disabled={filters.search.length === 0}
                        >
                            <ClearIcon fontSize={"1.4rem"} />
                        </Button>
                        <ResetButton />
                        <BookmarkFilterButton />
                        <RoomFilterMenu />
                        <DayFilterMenu />
                    </ButtonGroup>
                ),
            }}
            fullWidth
        />
    );
};
