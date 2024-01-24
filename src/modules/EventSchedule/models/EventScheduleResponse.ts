import {z} from 'zod'

export const EventScheduleResponse = z.object({
    events: z.array(z.object({
        dayOfWeek: z.number(),
        date: z.string(),
        rooms: z.object({
            id: z.string().uuid(),
            name: z.string(),
            namePl: z.string().nullish(),
            events: z.object({
                id: z.string().uuid(),
                name: z.string(),
                desc: z.string(),
                namePl: z.string().nullish(),
                descPl: z.string().nullish(),
                start: z.string(),
                end: z.string(),
                organizers: z.string().array(),
                requiresSignUps: z.boolean().default(false),
                singUpCount: z.number().default(0)
            }).array().default([])
        }).array().default([])
    }))
})

export type EventScheduleResponse = z.infer<typeof EventScheduleResponse>
