import { z } from "zod";
import {
  NowServingListSchema,
  NowServingSchema,
  TVMarqueeSchema,
  WaitingCallSchema,
} from "../validators/tv";

export type TVMarqueeType = z.infer<typeof TVMarqueeSchema>;

export type NowServingType = z.infer<typeof NowServingSchema>;

export type NowServingListType = z.infer<typeof NowServingListSchema>;

export type WaitingCallType = z.infer<typeof WaitingCallSchema>;
