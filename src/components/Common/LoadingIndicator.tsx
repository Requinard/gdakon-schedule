import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const LoadingIndicator = () => {
    const { t } = useTranslation("LoadingIndicator");
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            flex={1}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
        >
            <CircularProgress size={120} />
            <Typography variant={"h5"}>{t("loading")}</Typography>
        </Box>
    );
};
