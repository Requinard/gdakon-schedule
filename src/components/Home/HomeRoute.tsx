import { useTranslation } from "react-i18next";
import { Container, Typography } from "@mui/material";

export const HomeRoute = () => {
    const { t } = useTranslation("Home");
    return (
        <Container>
            <Typography variant={"h1"}>{t("title")}</Typography>
        </Container>
    );
};