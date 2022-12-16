import { useTranslation } from "react-i18next";

import { HomeScreen } from "./HomeScreen";

export const HomeRoute = () => {
    const { t } = useTranslation("Home");
    return <HomeScreen />;
};
