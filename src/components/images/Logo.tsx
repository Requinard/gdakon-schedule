import { Image } from "mui-image";

import logoUrl from "../Home/gdakon-20230-logo.png";

export const Logo = () => {
    return (
        <Image
            src={logoUrl}
            alt={"A stylized, spooky version of the Gdakon logo."}
            width={"100%"}
            height={"auto"}
        />
    );
};
