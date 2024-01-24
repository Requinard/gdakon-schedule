export const EventScheduleModel = z.object({
    id: z.string().uuid(),
    name: z.string(),
    desc: z.string(),
    namePl: z.string().nullish(),
    descPl: z.string().nullish(),
    start: z.string(),
    end: z.string(),
    organizers: z.string().array().default([]),
    requiresSignUps: z.boolean().default(false),
    signUpCount: z.number().default(0),
});
import {z} from 'zod'
export type EventScheduleModel = z.infer<typeof EventScheduleModel>
