import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../../configs/rtk-query";
import { IDType } from "../../../../shared/types/queue-ticket";
import { TVMarqueeType } from "../../../../shared/types/tv";

export const tvAPI = createApi({
  reducerPath: "tvAPI",
  baseQuery: fetchBaseQuery({
    ...baseQuery,
  }),
  tagTypes: ["TV"],
  endpoints: (build) => ({
    marquee: build.query<TVMarqueeType, IDType>({
      query: (branch_id) => `/markqueues/${branch_id}/`,
    }),
  }),
});

export const { useMarqueeQuery } = tvAPI;
