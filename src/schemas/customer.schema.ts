import { z } from "zod";

export const customerSchema = z.object({
    id: z.string().min(1),
    first_name: z.string().min(1),
    last_name: z.string().optional(),
    email: z.string().email(),
    ip_address: z.string().optional(),
    city: z.string().optional(),
    website: z.string().optional(),
    title: z.string(),
    gender: z.string(),
    company: z.string().optional(),
});

export type CustomerInput = z.infer<typeof customerSchema>;