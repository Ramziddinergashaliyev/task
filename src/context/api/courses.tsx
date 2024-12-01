import { api } from './index'

export const coursesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query({
      query: (params) => ({ 
        url: '/api/staff/courses', 
        params 
      }),
      providesTags:["Course"]
    })
  }),
})

export const {
  useGetCoursesQuery,
} = coursesApi