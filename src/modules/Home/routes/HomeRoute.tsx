import {Container, useTheme} from "@mui/material";
import {gdakonClient, UpcomingEventCard} from "../../EventSchedule";
import {useQuery} from "@tanstack/react-query";

import {MousePerspective} from "../../common";

export const HomeRoute = () => {
    const theme = useTheme();
    const {data = []} = useQuery({
        queryKey: ['schedule'],
        queryFn: gdakonClient.schedule
    })
    return <Container sx={{
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
        width: "100%",
        display: 'flex'
    }}>
        <MousePerspective>
            <Box width={'800px'} maxWidth={'95%'}  overflow={"auto"}>
                <UpcomingEventCard events={data} />
            </Box>
        </MousePerspective>
    </Container>
}
