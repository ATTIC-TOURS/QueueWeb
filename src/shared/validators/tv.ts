import { z } from "zod";

export const TVMarqueeSchema = z.array(
  z.object({
    id: z.string(),
    text: z.string(),
  })
);
