import { styled } from "@mui/material";

export const Background = styled(Box)({
    background: "url(https://gdakon.org/Images/Convention/banner.jpg)", backgroundSize:"cover", backgroundPositionX: "50%",
    filter: "blur(8px)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right:0,
    zIndex: -1
})
