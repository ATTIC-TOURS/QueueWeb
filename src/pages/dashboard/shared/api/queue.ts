import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../../configs/rtk-query";
import {
  CurrentStatusType,
  IDType,
  QueueCallType,
  QueueServiceType,
  QueueTicketListType,
  QueueUpdateType,
  QueueWindowListType,
  StatusType,
} from "../../../../shared/types/queue-ticket";

export const queueAPI = createApi({
  reducerPath: "queueAPI",
  baseQuery: fetchBaseQuery({
    ...baseQuery,
    baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}`,
  }),
  tagTypes: ["Queue", "QueueCall", "QueueUpdate"],
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
    viewableStatus: build.query<StatusType[] & RequestError, void>({
      query: () => `/viewable_status/`,
    }),
    queueCall: build.mutation<void & RequestError, QueueCallType>({
      query: (args) => ({
        url: `/queue_call/`,
        method: "PATCH",
        body: args,
        provideTags: ["QueueCall"],
      }),
      invalidatesTags: ["QueueCall"],
    }),
    queueUpdate: build.mutation<void & RequestError, QueueUpdateType>({
      query: (args) => ({
        url: `/queue_update/`,
        method: "PATCH",
        body: args,
        provideTags: ["QueueUpdate"],
      }),
      invalidatesTags: ["QueueUpdate"],
    }),
  }),
});

export const {
  useQueueQuery,
  useLazyServiceQuery,
  useLazyWindowQuery,
  useCurrentStatusQuery,
  useLazyViewableStatusQuery,
  useQueueCallMutation,
  useQueueUpdateMutation,
} = queueAPI;
