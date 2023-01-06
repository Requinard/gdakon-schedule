import { Menu } from "@mui/material";

import { LanguageSettings } from "./LanguageSettings";
import { TimeTravelSettings } from "./TimeTravelSettings";

type SettingsMenuProps = {
    anchorEl: HTMLElement | null;
    onClose: () => void;
};
export const SettingsMenu = ({ anchorEl, onClose }: SettingsMenuProps) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={anchorEl !== null}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            PaperProps={{
                style: {
                    width: 500,
                    maxWidth: "95%",
                },
            }}
        >
            <LanguageSettings />
            <TimeTravelSettings />
        </Menu>
    );
};
