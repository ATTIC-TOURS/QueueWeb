import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../../configs/rtk-query";
import {
  IDType,
  QueueCallType,
  QueueServicesType,
  QueueServiceType,
  QueueUpdateType,
  QueueWindowListType,
  StatusType,
} from "../../../../shared/types/queue-ticket";

export const queueAPI = createApi({
  reducerPath: "queueAPI",
  baseQuery: fetchBaseQuery({
    ...baseQuery,
  }),
  tagTypes: ["Queue", "QueueCall", "QueueUpdate"],
  endpoints: (build) => ({
    services: build.query<QueueServicesType & RequestError, void>({
      query: () => `/services/`,
    }),
    service: build.query<QueueServiceType & RequestError, IDType>({
      query: (service_id) => `/services/${service_id}/`,
    }),
    window: build.query<QueueWindowListType & RequestError, void>({
      query: () => `/windows/`,
    }),
    viewableStatus: build.query<StatusType[] & RequestError, void>({
      query: () => `/viewable_status/`,
    }),
    queueCall: build.mutation<
      QueueCallType & RequestError,
      QueueCallType & { branch_id: IDType }
    >({
      query: ({ queue_id, window_id, branch_id }) => ({
        url: `/queue_call/${branch_id}/${queue_id}/`,
        method: "PATCH",
        body: { queue_id, window_id },
        provideTags: ["QueueCall"],
      }),
      invalidatesTags: ["QueueCall"],
    }),
    queueUpdate: build.mutation<void & RequestError, QueueUpdateType & {branch_id: IDType}>({
      query: ({ queue_id, status_id, branch_id }) => ({
        url: `/queue_update/${branch_id}/`,
        method: "PATCH",
        body: { queue_id, status_id },
        provideTags: ["QueueUpdate"],
      }),
      invalidatesTags: ["QueueUpdate"],
    }),
  }),
});

export const {
  useServicesQuery,
  useLazyServiceQuery,
  useLazyWindowQuery,
  useLazyViewableStatusQuery,
  useQueueCallMutation,
  useQueueUpdateMutation,
} = queueAPI;
