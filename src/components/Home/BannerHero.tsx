import { Box, Container, styled } from "@mui/material";
import { PropsWithChildren } from "react";

import BGImage from "../../assets/bg.webp?blur&imagetools";

export const BannerHeroContainer = styled(Box)({
    backgroundImage: `url(${BGImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 600,
    maxHeight: "40vh",
    marginTop: "-32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
});

const BannerContentContainer = styled(Box)(({ theme }) => ({
    backgroundColor: `${theme.palette.background.default}80`,
}));

export const BannerHero = ({ children }: PropsWithChildren) => (
    <BannerHeroContainer>
        <BannerContentContainer>
            <Container>{children}</Container>
        </BannerContentContainer>
    </BannerHeroContainer>
);
