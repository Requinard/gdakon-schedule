import {CardHeader, Typography} from "@mui/material";
import {EventScheduleList} from "../EventScheduleList";
import {EventScheduleModel} from "../../models";
import ScheduleIcon from '~icons/mdi/book-schedule'
export const UpcomingEventCard = ({events}: { events: EventScheduleModel[] }) => {
    return <Card>
        <CardHeader avatar={<ScheduleIcon width={32} height={32} />} title={'Event Schedule'}/>
        <Divider/>

        <Stack>
            <Typography variant={'subtitle1'} px={3} py={2}>Current Events</Typography>

            <EventScheduleList events={[]}/>
            <Divider/>
            <Typography variant={'subtitle1'} px={3} py={2}>Upcoming Events</Typography>
            <EventScheduleList events={[]}/>
        </Stack>

    </Card>
}
