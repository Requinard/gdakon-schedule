import { Image } from "mui-image";

import logoUrl from "../../assets/gdakon-20230-logo.png?format=webp&imagetools";

export const Logo = () => {
    return (
        <Image
            src={logoUrl}
            alt={"A stylized, spooky version of the Gdakon logo."}
            width={"100%"}
            height={"auto"}
            duration={200}
        />
    );
};
