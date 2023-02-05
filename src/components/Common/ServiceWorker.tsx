import { useEffect, useState } from "react";
// @ts-expect-error gotta fix this type
import { registerSW } from "virtual:pwa-register";
import { Alert, Button } from "@mui/material";
import { noop } from "lodash";
export const ServiceWorker = () => {
    const [update, setUpdate] = useState<() => void>(noop);
    const [needRefresh, setNeedRefresh] = useState(false);

    useEffect(() => {
        setUpdate(
            registerSW({
                onNeedRefresh: () => setNeedRefresh(true),
            })
        );
    });

    if (!needRefresh && update !== undefined) {
        return null;
    }

    return (
        <Alert
            severity={"warning"}
            action={<Button onClick={update}>Update</Button>}
        >
            A new version is available
        </Alert>
    );
};
