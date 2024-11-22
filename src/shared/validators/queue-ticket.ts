import { z } from "zod";

export const QueueTicketSchema = z.object({
  branch_id: z.string().min(1),
  code: z.string(),
  created_at: z.string(),
  email: z.string().email().nullable(),
  id: z.string().min(1),
  is_called: z.boolean(),
  name: z.string().min(2),
  queue_no: z.number(),
  service_id: z.string().min(1),
  status_id: z.string().min(1),
  updated_at: z.string(),
  window_id: z.string().min(1),
  category_id: z.string(),
});

export const QueueCategoriesSchema = z.array(
  z.object({
    display_name: z.string(),
    id: z.string().min(1),
    name: z.string(),
  })
);

export const QueueCategorySchema = z.object({
  display_name: z.string(),
  id: z.string().min(1),
  name: z.string(),
});

export const QueueServicesSchema = z.array(
  z.object({
    category_id: z.string().min(1),
    id: z.string().min(1),
    name: z.string(),
    service_type_id: z.string().min(1),
  })
);

export const QueueServiceSchema = z.object({
  category_id: z.string().min(1),
  id: z.string().min(1),
  name: z.array(z.string()),
  service_type_id: z.string().min(1),
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
