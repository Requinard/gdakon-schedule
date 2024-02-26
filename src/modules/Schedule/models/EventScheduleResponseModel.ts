import { z } from "zod";

export const EventScheduleResponseModel = z.object({
    events: z.array(
        z.object({
            dayOfWeek: z.number(),
            date: z.string(),
            rooms: z.array(
                z.object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                    namePl: z.string().nullable(),
                    events: z.array(
                        z.object({
                            id: z.string().uuid(),
                            name: z.string(),
                            desc: z.string(),
                            namePl: z.string().default(""),
                            descPl: z.string().default(""),
                            start: z.string(),
                            end: z.string(),
                            organizers: z.string().array(),
                            requiresSignUps: z.boolean().default(false),
                            signUpCount: z.number(),
                        })
                    ),
                })
            ),
        })
    ),
});

export type EventScheduleResponseModel = z.infer<
    typeof EventScheduleResponseModel
>;
