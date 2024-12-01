import { createApi, fetchBaseQuery, retry, FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query/react";
import { logout } from "../slices/authSlice";

const baseQuery = async (
  args: string | FetchArgs, 
  api: BaseQueryApi, 
  extraOptions: {} = {}
) => {
  const { dispatch } = api;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "https://dev.api-erp.najotedu.uz",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("x-auth-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;
    if (status === 401 || status === 403) {
      console.error("Unauthorized access - Redirecting to login...");
      dispatch(logout());
    }
  }
  return result;
};

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: "myApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["User", "Product", "Course" ],
  endpoints: () => ({}),
});
