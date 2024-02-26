import { Image } from "mui-image";
import { PropsWithChildren } from "react";

import BackgroundImage from "../../assets/bg.png?blur=3&imagetools";

export const BackgroundBanner = ({ children }: PropsWithChildren) => (
    <>
        <Image
            src={BackgroundImage}
            alt={
                "A spooky background banner that shows the organisation being chased by all manner of creepies and crawlies!"
            }
            fit={"cover"}
            height={"100%"}
            width={"100%"}
            duration={500}
        ></Image>
        {children}
    </>
);
