/**
 * Loop through a list in a circular manner.
 */
import { useRef, useState } from "react";
import { useInterval } from "usehooks-ts";

export const useTicker = <T>(items: T[], amount = 3, interval = 3000): T[] => {
    const tickerRef = useRef(0);
    const [ticker, setTicker] = useState<T[]>([]);

    useInterval(() => {
        const overshoot = tickerRef.current - items.length + amount;
        const newEvents = items.slice(tickerRef.current, tickerRef.current + 3);

        if (overshoot > 0) {
            newEvents.push(...items.slice(0, overshoot));
        }
        setTicker(newEvents);

        tickerRef.current =
            tickerRef.current >= items.length ? 0 : tickerRef.current + 1;
    }, interval);

    return ticker;
};
