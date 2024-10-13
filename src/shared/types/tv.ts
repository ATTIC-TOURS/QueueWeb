import { z } from "zod";
import { TVMarqueeSchema, WaitingCallSchema } from "../validators/tv";

export type TVMarqueeType = z.infer<typeof TVMarqueeSchema>;

export type WaitingCallType = z.infer<typeof WaitingCallSchema>;