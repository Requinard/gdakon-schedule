/**
 * Loop through a list in a circular manner.
 */
import { useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";

const getItemsFromTicker = <T>(
    items: T[],
    amount: number,
    index: number
): T[] => {
    if (amount >= items.length) {
        return items;
    }

    // Check how many items we want that are out of bounds
    const overshoot = index - items.length + amount;

    const subItems = items.slice(index, index + amount);

    if (overshoot > 0) {
        subItems.push(...items.slice(0, overshoot));
    }

    return subItems;
};
export const useTicker = <T>(items: T[], amount = 3, interval = 3000): T[] => {
    const tickerRef = useRef(0);
    const [ticker, setTicker] = useState<T[]>([]);

    useEffect(() => {
        setTicker(getItemsFromTicker(items, amount, 0));
    }, [items, setTicker]);

    useInterval(() => {
        const newTicker = getItemsFromTicker(items, amount, tickerRef.current);

        setTicker(newTicker);

        tickerRef.current =
            tickerRef.current >= items.length ? 0 : tickerRef.current + 1;
    }, interval);

    return ticker;
};
