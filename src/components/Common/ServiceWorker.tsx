import { useEffect, useState } from "react";
// @ts-expect-error gotta fix this type
import { registerSW } from "virtual:pwa-register";
import { Alert, Button } from "@mui/material";
import { noop } from "lodash";

export const ServiceWorker = () => {
    const [update, setUpdate] = useState<
        ((reload: boolean) => Promise<void>) | null
    >(null);
    const [needRefresh, setNeedRefresh] = useState(false);

    useEffect(() => {
        setUpdate(
            registerSW({
                onNeedRefresh: () => setNeedRefresh(true),
            })
        );
    }, [setUpdate, setNeedRefresh]);

    if (!needRefresh || update === null) {
        return null;
    }

    return (
        <Alert
            severity={"warning"}
            action={<Button onClick={() => update(true)}>Update</Button>}
        >
            A new version is available
        </Alert>
    );
};
