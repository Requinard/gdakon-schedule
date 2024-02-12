import {animated, useSpring} from "@react-spring/web";
import {PropsWithChildren} from "react";
import {useGesture} from "@use-gesture/react";

const trans = (x: number, y: number) => `translate3d(${x * -1 / 60}px, ${y * -1 / 40}px,0)`
export const MousePerspective = ({children}: PropsWithChildren) => {
    const [{xy}, api] = useSpring(() => ({
        xy: [0, 0],
        config: {mass: 10, tension: 550, friction: 140},
    }));


    const bind = useGesture({
        onMove: ({xy, movement, ...props}) => {
            return api.start(() => ({xy: movement}));
        }
    })

    return <animated.div {...bind()} style={{
        transform: xy.to(trans),
        perspective: '1500px'
    }}>
        {children}
    </animated.div>
}
