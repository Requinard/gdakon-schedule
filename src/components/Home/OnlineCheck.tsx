import { useEventListener } from "usehooks-ts";
import { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

export const OnlineCheck = () => {
    const { t } = useTranslation("OnlineCheck");
    const [offline, setOffline] = useState(false);

    useEventListener("offline", () => setOffline(true));

    useEventListener("online", () => setOffline(false));

    if (!offline) {
        return null;
    }

    return (
        <Alert severity={"warning"}>
            <AlertTitle>{t("title")}</AlertTitle>
            {t("description")}
        </Alert>
    );
};
