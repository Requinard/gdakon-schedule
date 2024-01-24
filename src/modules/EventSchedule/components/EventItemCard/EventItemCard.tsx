import {EventScheduleModel} from "../../models";
import {CardContent, CardHeader} from "@mui/material";
import {ReactNode} from "react";
import {Remark} from "react-remark";

export type EventItemCardProps = {
    event: EventScheduleModel
    action?: ReactNode
};
export const EventItemCard = ({event, action}: EventItemCardProps) => <Card>
    <CardHeader title={event.name} action={action} />
    <Divider />
    <CardContent>
        <Remark>
            {event.desc}
        </Remark>
    </CardContent>
</Card>
