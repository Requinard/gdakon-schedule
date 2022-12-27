import { ListItem, ListItemText } from "@mui/material";
import { memo } from "react";

type ListSectionProps = {
    title: string;
    subtitle?: string | null;
};
export const ListSection = memo(({ title, subtitle }: ListSectionProps) => (
    <ListItem dense sx={{ bgcolor: "background.default" }}>
        <ListItemText primary={title} secondary={subtitle} />
    </ListItem>
));
