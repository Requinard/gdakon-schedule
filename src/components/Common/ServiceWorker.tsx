import { useRegisterSW } from "virtual:pwa-register/react";
import { Alert, AlertTitle, Button } from "@mui/material";

export const ServiceWorker = () => {
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
            <AlertTitle> A new version is available</AlertTitle>
            Upgrade to the newest version to stay up to date with Gdakon
        </Alert>
    );
};
