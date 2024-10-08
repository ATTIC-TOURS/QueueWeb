import { z } from "zod";
import { QueueServiceSchema, QueueTicketSchema, QueueWindowSchema } from "../validators/queue-ticket";

export type QueueTicketType = z.infer<typeof QueueTicketSchema>;

export type QueueTicketListType = QueueTicketType[];

export type IDType = string;

export type QueueServiceType = z.infer<typeof QueueServiceSchema>;

export type QueueWindowType = z.infer<typeof QueueWindowSchema>;

export type QueueWindowListType = QueueServiceType[];
