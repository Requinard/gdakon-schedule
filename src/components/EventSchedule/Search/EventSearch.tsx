import { Button, ButtonGroup, Icon, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useTranslation } from "react-i18next";
import { size, some } from "lodash";

import { useEventFilter } from "../EventFilter.Provider";

import { DayFilterMenu } from "./DayFilterMenu";
import { RoomFilterMenu } from "./RoomFilterMenu";

import ClearIcon from "~icons/ic/baseline-clear";
import SearchIcon from "~icons/ic/baseline-search";

export const EventSearch = () => {
    const { t } = useTranslation("EventSchedule", { keyPrefix: "Search" });
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 300);
    const { setFilter, reset, filters } = useEventFilter();

    useEffect(() => {
        setFilter("search", (item) => {
            if (debouncedValue.length < 3) {
                return true;
            }

            const searchValue = debouncedValue.toLocaleLowerCase();

            return some([
                item.name.toLocaleLowerCase().includes(searchValue),
                item.namePl.includes(searchValue),
                item.desc.includes(searchValue),
                item.descPl.includes(searchValue),
            ]);
        });
    }, [debouncedValue, setFilter]);

    return (
        <TextField
            value={value}
            label={t("search_label")}
            placeholder={t("search_placeholder") ?? undefined}
            onChange={(e) => setValue(e.target.value)}
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
                                setValue("");
                                reset();
                            }}
                            disabled={size(filters) === 0}
                        >
                            <ClearIcon fontSize={"1.4rem"} />
                        </Button>
                        <RoomFilterMenu />
                        <DayFilterMenu />
                    </ButtonGroup>
                ),
            }}
            fullWidth
        />
    );
};
