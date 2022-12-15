import { AppRouter } from "./App.routes";
import { MainNavigation } from "./components/Navigation/MainNavigation";

export const App = () => {
    return (
        <>
            <AppRouter />
            <MainNavigation />
        </>
    );
};
