import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../../configs/rtk-query";
import {
  CurrentStatusType,
  IDType,
  QueueServiceType,
  QueueTicketListType,
  QueueWindowListType,
} from "../../../../shared/types/queue-ticket";

export const queueAPI = createApi({
  reducerPath: "queueAPI",
  baseQuery: fetchBaseQuery({
    ...baseQuery,
    baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}`,
  }),
  tagTypes: ["Queue"],
  endpoints: (build) => ({
    queue: build.query<QueueTicketListType & RequestError, IDType>({
      query: (branch_id) => `/current_queues/${branch_id}/`,
    }),
    service: build.query<QueueServiceType & RequestError, IDType>({
      query: (service_id) => `/services/${service_id}/`,
    }),
    window: build.query<QueueWindowListType & RequestError, void>({
      query: () => `/windows/`,
    }),
    currentStatus: build.query<CurrentStatusType & RequestError, IDType>({
      query: (branch_id) => `/current_queue_stats/${branch_id}/`,
    }),
  }),
});

export const {
  useQueueQuery,
  useServiceQuery,
  useLazyServiceQuery,
  useLazyWindowQuery,
  useCurrentStatusQuery,
} = queueAPI;
