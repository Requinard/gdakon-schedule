import {EventScheduleModel} from "../../models";
import {bindDialog, bindToggle, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {Chip, Dialog, ListItemButton, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {EventItemCard} from "../EventItemCard/EventItemCard";
import CloseIcon from '~icons/mdi/close'

export type EventScheduleListItemProps = {
    event: EventScheduleModel
}
export const EventScheduleListItem = ({event}: EventScheduleListItemProps) => {
    const dialog = usePopupState({variant: "dialog"});

    return <>
        <ListItemButton {...bindTrigger(dialog)}>
            <ListItemText primary={event.name} secondary={`On ${event.start} from ${event.start} to ${event.end}`}/>
            <ListItemSecondaryAction>
                {event.organizers.map(it => <Chip label={it} key={it} />)}
            </ListItemSecondaryAction>
        </ListItemButton>
        <Dialog {...bindDialog(dialog)} fullWidth={true} maxWidth={'lg'}>
            <EventItemCard event={event} action={<IconButton {...bindToggle(dialog)}><CloseIcon/></IconButton>}/>
        </Dialog>
    </>
}
