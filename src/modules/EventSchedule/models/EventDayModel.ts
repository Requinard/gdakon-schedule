import {z} from 'zod'
export const EventDayModel = z.object({
    date: z.string(),
})
export type EventDayModel = z.infer<typeof EventDayModel>
export const EventRoomModel = z.object({
    name: z.string(),
    namePl: z.string().nullish(),
    id: z.string().uuid()
})
export type EventRoomModel = z.infer<typeof EventDayModel>

