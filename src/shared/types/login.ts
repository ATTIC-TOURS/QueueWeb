import { z } from "zod";
import { Branches, LoginSchema } from "../validators/login";

export type LoginType = z.infer<typeof LoginSchema>;

export type BranchesType = z.infer<typeof Branches>[];

