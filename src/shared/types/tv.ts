import { z } from "zod";
import { TVMarqueeSchema } from "../validators/tv";

export type TVMarqueeType = z.infer<typeof TVMarqueeSchema>;