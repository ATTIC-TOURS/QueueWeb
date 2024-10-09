import { z } from "zod";
import {
  CurrentStatusSchema,
  QueueServiceSchema,
  QueueTicketSchema,
  QueueWindowSchema,
} from "../validators/queue-ticket";

export type QueueTicketType = z.infer<typeof QueueTicketSchema>;

export type QueueTicketListType = QueueTicketType[];

export type IDType = string;

export type QueueServiceType = z.infer<typeof QueueServiceSchema>;

export type QueueWindowType = z.infer<typeof QueueWindowSchema>;

export type QueueWindowListType = QueueServiceType[];

export type CurrentStatusType = z.infer<typeof CurrentStatusSchema>;

export type ModalTitleType = "Login" | "Call" | "Done" | null;
