export const EventScheduleModel = z.object({
    id: z.string().uuid(),
    name: z.string(),
    desc: z.string(),
    namePl: z.string(),
    descPl: z.string(),
    start: z.string(),
    end: z.string(),
    organizers: z.string().array().default([]),
    requiresSingUps: z.boolean().default(false),
    signupCount: z.number().default(0),
});
