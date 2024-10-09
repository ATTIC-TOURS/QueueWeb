import { z } from "zod";
import {
  CurrentStatusSchema,
  QueueCallSchema,
  QueueServiceSchema,
  QueueTicketSchema,
  QueueUpdateSchema,
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

export type StatusType = "Complete" | "Pending" | "Cancel";

export type QueueCallType = z.infer<typeof QueueCallSchema>;

export type QueueUpdateType = z.infer<typeof QueueUpdateSchema>;
