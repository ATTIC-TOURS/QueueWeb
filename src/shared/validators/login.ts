import { z } from "zod";
// import { branch_names } from "../data/branches";

export const LoginSchema = z.object({
  id: z.string().min(1),
  // TODO 2: Replace Min with 8
  password: z.string().min(1, "Invalid password"),
});

export const Branches = z.object({
  id: z.string().min(1),
  // TODO 3: Replace the branch_name with the branch_names enum
  // branch_name: z.enum(branch_names),
  name: z.string(),
});
