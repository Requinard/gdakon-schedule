import { Route, Routes } from "react-router-dom";

import { HomeRoute } from "./components";
import { EventScheduleRoute } from "./components/EventSchedule/EventScheduleRoute";
import { DevRoute } from "./components/DevRoute";

export const AppRouter = () => (
    <Routes>
        <Route path={"/"} element={<HomeRoute />} />
        <Route path={"/schedule"} element={<EventScheduleRoute />} />
        <Route path={"/dev"} element={<DevRoute />} />
    </Routes>
);
