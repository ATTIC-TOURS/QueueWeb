import { z } from "zod";

export const QueueTicketSchema = z.object({
  branch_id: z.string().min(1),
  created_at: z.string(),
  id: z.string().min(1),
  is_called: z.boolean(),
  queue_no: z.number(),
  service_id: z.string().min(1),
  status_id: z.string().min(1),
  updated_at: z.string(),
  window_id: z.string().min(1),
});

export const QueueServiceSchema = z.object({
  id: z.string().min(1),
  name: z.enum(["Japan Visa", "Korean Visa", "Ticketing"]),
});

export const QueueWindowSchema = z.object({
  id: z.string().min(1),
  name: z.enum([
    "Window 1",
    "Window 2",
    "Japan Visa Window",
    "Korean Visa Window",
  ]),
});