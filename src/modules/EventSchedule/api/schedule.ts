import { Zodios } from "@zodios/core";

export const gdakonClient = new Zodios("https://gdakon.org", [
    {
        method: "get",
        alias: "schedule",
        path: "/events/presenter.ashx",
        response: z.object({}),
    },
]);
