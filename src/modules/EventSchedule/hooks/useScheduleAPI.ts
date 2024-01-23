import { ZodiosHooks } from "@zodios/react";

import { gdakonClient } from "../api";

export const ScheduleHooks = new ZodiosHooks("gdakon", gdakonClient);
