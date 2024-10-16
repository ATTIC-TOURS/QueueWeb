import { z } from "zod";

export const TVMarqueeSchema = z.array(
  z.object({
    id: z.string(),
    text: z.string(),
  })
);

export const WaitingCallSchema = z.object({
  name: z.string(),
  window_name: z.string(),
  queue_code: z.string(),
});
