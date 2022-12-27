import { PropsWithChildren } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const LocaleProvider = ({ children }: PropsWithChildren) => {
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={"en-gb"}
        >
            {children}
        </LocalizationProvider>
    );
};
