import { Route, Routes } from "react-router-dom";

import { HomeRoute } from "./components";

export const AppRouter = () => (
    <Routes>
        <Route path={"/"} element={<HomeRoute />} />
    </Routes>
);
