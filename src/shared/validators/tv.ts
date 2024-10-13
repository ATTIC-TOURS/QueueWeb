import { z } from "zod";

export const TVMarqueeSchema = z.array(
  z.object({
    id: z.string(),
    text: z.string(),
  })
);

export const WaitingCallSchema = z.object({
  service: z.string(),
  window: z.string(),
  queue_no: z.number(),
});
