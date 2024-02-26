import { z } from "zod";

export const EventScheduleItemModel = z.object({
    id: z.string().uuid(),
    name: z.string(),
    desc: z.string(),
    namePl: z.string().default(""),
    descPl: z.string().default(""),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    organizers: z.string().array().default([]),
    requiresSignUps: z.boolean().default(false),
    signUpCount: z.number().default(0),
    roomName: z.string().nullable(),
    roomNamePl: z.string().nullable(),
    roomId: z.string().uuid().nullable(),
    start: z.string(),
    end: z.string(),
});

export type EventScheduleItemModel = z.infer<typeof EventScheduleItemModel>;
