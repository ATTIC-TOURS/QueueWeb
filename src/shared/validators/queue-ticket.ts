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

export const QueueServicesSchema = z.array(
  z.object({
    id: z.string().min(1),
    name: z.string(),
  })
);

export const QueueServiceSchema = z.object({
  id: z.string().min(1),
  name: z.array(z.string()),
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

export const CurrentStatusSchema = z.object({
  cancel: z.number(),
  complete: z.number(),
  finish: z.number(),
  ["in-progress"]: z.number(),
  pending: z.number(),
  waiting: z.number(),
});

export const QueueCallSchema = z.object({
  queue_id: z.string().min(1),
  window_id: z.string().min(1),
});

export const QueueUpdateSchema = z.object({
  queue_id: z.string().min(1),
  status_id: z.string().min(1),
});

export const QueueStatusSchema = z.object({
  id: z.string().min(1),
  name: z.enum(["complete", "pending", "cancel"]),
});
