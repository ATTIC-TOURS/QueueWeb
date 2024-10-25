import { z } from "zod";

export const TVMarqueeSchema = z.array(
  z.object({
    id: z.string(),
    text: z.string(),
  })
);

export const NowServingListSchema = z.array(
  z.object({
    id: z.string(),
    branch_id: z.string(),
    service_id: z.string(),
    window_id: z.string(),
    queue_no: z.string(),
    status_id: z.string(),
    is_called: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    code: z.string(),
    name: z.string(),
    email: z.string().email(),
  })
);
export const NowServingSchema = z.object({
  id: z.string(),
  branch_id: z.string(),
  service_id: z.string(),
  window_id: z.string(),
  queue_no: z.string(),
  status_id: z.string(),
  is_called: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  code: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const WaitingCallSchema = z.object({
  name: z.string(),
  window_name: z.string(),
  queue_code: z.string(),
});
