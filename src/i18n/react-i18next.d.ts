import { resources } from "./index";

declare module "react-i18next" {
    interface CustomTypeOptions {
        defaultNS: "Main";
        resources: typeof resources["en"];
    }
}
