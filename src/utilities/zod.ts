import dayjs, {Dayjs} from "dayjs";
import {ZodError} from "zod";

// export const zodDayjs = z.custom<Dayjs>(value => dayjs(value))
export const zodFormattedDayJS = (format: string) => z.custom<Dayjs>(value => typeof value === "string" ? dayjs(value, format, true) : null)
