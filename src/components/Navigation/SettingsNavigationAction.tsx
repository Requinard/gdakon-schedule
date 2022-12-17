import { MouseEvent, useCallback, useState } from "react";
import { BottomNavigationAction } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";

import { SettingsMenu } from "../Settings/SettingsMenu";

export const SettingsNavigationAction = () => {
    const { t } = useTranslation("MainNavigation");

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
                label={t("settings")}
                value={"/settings"}
                onClick={handleClick}
                icon={<SettingsIcon />}
            />
            <SettingsMenu anchorEl={anchor} onClose={handleClose} />
        </>
    );
};
