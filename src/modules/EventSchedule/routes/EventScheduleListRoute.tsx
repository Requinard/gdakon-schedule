import {Container, Paper, Tab, Tabs, useTheme} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {gdakonClient} from "../api";
import {EventItemCard} from "../components/EventItemCard/EventItemCard";

export const EventScheduleListRoute = () => {
    const {data = []} = useQuery({
        queryKey: ['schedule'],
        queryFn: gdakonClient.schedule
    })
    const theme = useTheme()
    return <>
        <Tabs variant={'fullWidth'} >
            <Tab label={'monday'}/>
        </Tabs>
        <Container >
            <Stack spacing={2}>
                {data.map(it => <EventItemCard event={it} key={it.id} />)}

            </Stack>
        </Container>
    </>
}
