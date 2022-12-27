import { Image } from "mui-image";

export const BackgroundBanner = () => (
    <Image
        src={"https://gdakon.org/Images/Convention/bg.webp"}
        alt={
            "A spooky background banner that shows the organisation being chased by all manner of creepies and crawlies!"
        }
        fit={"cover"}
        height={"100%"}
        width={"100%"}
        duration={500}
    />
);
