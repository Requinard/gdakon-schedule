import { Image } from "mui-image";

import BackgroundImage from "../../assets/bg.webp?blur=8&imagetools";

export const BackgroundBanner = () => (
    <Image
        src={BackgroundImage}
        alt={
            "A spooky background banner that shows the organisation being chased by all manner of creepies and crawlies!"
        }
        fit={"cover"}
        height={"100%"}
        width={"100%"}
        duration={500}
    />
);
