import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

type OnlineCheckProps = {
    showIfOnline?: boolean;
};
export const OnlineCheck = ({ showIfOnline }: OnlineCheckProps) => {
    const { t } = useTranslation("Home");
    const [offline, setOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const online = () => setOffline(!navigator.onLine);
        const offline = () => setOffline(!navigator.onLine);

        window.addEventListener("online", online);
        window.addEventListener("offline", offline);

        return () => {
            window.removeEventListener("online", online);
            window.removeEventListener("offline", offline);
        };
    }, []);

    if (showIfOnline || offline) {
        return (
            <Alert severity={offline ? "warning" : "success"}>
                <AlertTitle>
                    {t(
                        offline
                            ? "OnlineCheck.offline.title"
                            : "OnlineCheck.online.title"
                    )}
                </AlertTitle>
                {t(
                    offline
                        ? "OnlineCheck.offline.description"
                        : "OnlineCheck.online.description"
                )}
            </Alert>
        );
    }

    return null;
};
