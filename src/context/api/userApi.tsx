import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({ 
        url: '/api/staff/contracts/all', 
        params 
      }),
      providesTags:["User"]
    }),  
    createUsers: build.mutation({
      query: (body) => ({
        url: "/api/staff/contracts/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    createFile: build.mutation({
      query: (body) => ({
        url: "/api/staff/upload/contract/attachment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    signIn: build.mutation({
      query: (body)=> ({
        url: "/api/staff/auth/sign-in",
        method: "POST",
        body
      }),
      invalidatesTags: ["User"]
    }),
    registerUser: build.mutation({
      query: (body)=> ({
        url: "/auth/sign-up",
        method: "POST",
        body
      }),
      invalidatesTags: ["User"]
    }),
  }),
})

export const {
  useGetUsersQuery,
  useRegisterUserMutation,
  useSignInMutation,
  useCreateUsersMutation,
  useCreateFileMutation
} = userApi