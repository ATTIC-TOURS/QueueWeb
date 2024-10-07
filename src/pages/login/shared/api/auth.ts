import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../../configs/rtk-query";
import { BranchesType, LoginType } from "../../../../shared/types/login";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    ...baseQuery,
    baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}`,
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation<{ status: boolean } & RequestError, LoginType>({
      query: (args) => ({
        url: `/branch_login/${args.id}/`,
        method: "POST",
        body: args,
        provideTags: ["Auth"],
      }),
      invalidatesTags: ["Auth"],
      transformResponse: (response: { status: boolean } & RequestError) => {
        if ("error" in response) {
          return {
            status: response.status,
            error: response.error,
          };
        }
        sessionStorage.setItem("is_authenticated", response.status.toString());
        return response;
      },
    }),
    branches: build.query<BranchesType & RequestError, void>({
        query: () => `/branches/`,
    })
  }),
});

export const { useLoginMutation, useBranchesQuery } = authAPI;
