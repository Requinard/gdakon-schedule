import { MouseEvent, useCallback, useState } from "react";
import {
    BottomNavigationAction,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "react-i18next";
import { match } from "ts-pattern";

import { SettingsMenu } from "../Settings/SettingsMenu";

export const LocaleNavigation = () => {
    const { t, i18n } = useTranslation("MainNavigation");

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const handleClick = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            setAnchor(e.currentTarget);
        },
        [setAnchor]
    );
    const handleClose = useCallback(() => setAnchor(null), [setAnchor]);

    return (
        <>
            <BottomNavigationAction
                label={t("language")}
                onClick={handleClick}
                icon={<TranslateIcon />}
            />
            <SettingsMenu anchorEl={anchor} onClose={handleClose} />
        </>
    );
};
