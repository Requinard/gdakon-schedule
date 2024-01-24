import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {HomeRoutes} from "./modules/Home";
import {EventScheduleRoutes} from "./modules/EventSchedule";
import {Dashboard} from "./modules/Dashboard/components/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Dashboard/>,
        children: [
            {
                index: true,
                element: <Navigate to={"/home"} replace/>
            },
            HomeRoutes,
            EventScheduleRoutes
        ]
    },

])

export const AppRouter = () => <RouterProvider router={router}/>
