import {Container, Stack} from "@mui/material";
import { Logo } from "../../../components/images/Logo";

export const HomeRoute = () => {
    return <Container>
        <Stack gap={2} alignItems={'center'} height={'100%'}>
            <Logo />
        </Stack>
    </Container>
}
