import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../../configs/rtk-query";
import { BranchesType, LoginType } from "../../../../shared/types/login";
import { v4 as uuidv4 } from "uuid";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    ...baseQuery,
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
        const auth_session = {
          id: uuidv4(),
          auth: response.status,
        };

        sessionStorage.setItem("auth_session", JSON.stringify(auth_session));

        return response;
      },
    }),
    branches: build.query<BranchesType & RequestError, void>({
      query: () => `/branches/`,
    }),
  }),
});

export const { useLoginMutation, useBranchesQuery } = authAPI;
