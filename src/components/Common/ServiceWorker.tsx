import { useRegisterSW } from "virtual:pwa-register/react";
import { Alert, AlertTitle, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export const ServiceWorker = () => {
    const { t } = useTranslation("ServiceWorker");
    const { needRefresh, updateServiceWorker } = useRegisterSW();
    const [needRefreshState] = needRefresh;

    if (!needRefreshState) {
        return null;
    }

    return (
        <Alert
            severity={"warning"}
            action={
                <Button
                    onClick={() => updateServiceWorker(true)}
                    color={"inherit"}
                >
                    Update
                </Button>
            }
        >
            <AlertTitle>{t("update_available_title")}</AlertTitle>
            {t("update_available_subtitle")}
        </Alert>
    );
};
