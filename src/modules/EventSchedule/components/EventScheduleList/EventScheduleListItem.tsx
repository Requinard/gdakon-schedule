import {EventScheduleModel} from "../../models";
import {bindDialog, bindToggle, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {Chip, Dialog, ListItemButton, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {EventItemCard} from "../EventItemCard/EventItemCard";
import CloseIcon from '~icons/mdi/close'
import {useEventBookmarks} from "../../state/useEventBookmarks";

export type EventScheduleListItemProps = {
    event: EventScheduleModel
}
export const EventScheduleListItem = ({event}: EventScheduleListItemProps) => {
    const {bookmarks, toggleBookmark, } = useEventBookmarks()
    const dialog = usePopupState({variant: "dialog"});

    return <>
        <ListItem>
            <ListItemText primary={event.name} secondary={`On ${event.start} from ${event.start} to ${event.end}`}/>
            <ListItemSecondaryAction>
                <ButtonGroup variant={'text'}>
                    <Button onClick={() => toggleBookmark(event.id)} color={bookmarks.has(event.id) ? "success" : "error"} >
                        bookmark
                    </Button>
                    <Button {...bindTrigger(dialog)}>
                        open
                    </Button>
                </ButtonGroup>
            </ListItemSecondaryAction>
        </ListItem>
        <Dialog {...bindDialog(dialog)} fullWidth={true} maxWidth={'lg'}>
            <EventItemCard event={event} action={<IconButton {...bindToggle(dialog)}><CloseIcon/></IconButton>}/>
        </Dialog>
    </>
}
