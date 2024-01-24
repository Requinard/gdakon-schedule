import {useQuery} from "@tanstack/react-query";
import {gdakonClient} from "../api";
import {FilterableEventScheduleList} from "../components/EventScheduleList/FilterableEventScheduleList";
import {Container} from "@mui/material";

export const EventScheduleSearchRoute = () => {
    const {data = []} = useQuery({
        queryKey: ['schedule'] as const,
        queryFn: gdakonClient.schedule
    });

    return <Container component={Stack} spacing={2} alignItems='stretch' pt={4}>
        <FilterableEventScheduleList events={data} />
    </Container>
}
