import { z } from "zod";
import {
  CurrentStatusSchema,
  QueueCallSchema,
  QueueServiceSchema,
  QueueServicesSchema,
  QueueStatusSchema,
  QueueTicketSchema,
  QueueUpdateSchema,
  QueueWindowSchema,
} from "../validators/queue-ticket";

export type QueueTicketType = z.infer<typeof QueueTicketSchema>;

export type QueueTicketListType = QueueTicketType[];

export type IDType = string;

export type QueueServicesType = z.infer<typeof QueueServicesSchema>;

export type QueueServiceType = z.infer<typeof QueueServiceSchema>;

export type QueueWindowType = z.infer<typeof QueueWindowSchema>;

export type QueueWindowListType = QueueServiceType[];

export type CurrentStatusType = z.infer<typeof CurrentStatusSchema>;

export type ModalTitleType =
  | "Login"
  | "Call"
  | "Done"
  | "waiting"
  | "in-progress"
  | "table-filter"
  | null;

export type StatusType = z.infer<typeof QueueStatusSchema>;

export type QueueCallType = z.infer<typeof QueueCallSchema>;

export type QueueUpdateType = z.infer<typeof QueueUpdateSchema>;
