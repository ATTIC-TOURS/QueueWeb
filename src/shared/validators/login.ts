import { z } from "zod";
import { branch_names } from "../data/branches";

export const LoginSchema = z.object({
  id: z.string().min(1),
  password: z.string(),
});

export const Branches = z.object({
  id: z.string().min(1),
  name: z.enum(branch_names),
});
