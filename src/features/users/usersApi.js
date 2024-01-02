import { apiSlice } from "../Api/apiSlice";

const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        specifiedUser: builder.query({
            query: (email) => ({
                url: `/users?email=${email}`
            }),
        })
    })
})

export const { useSpecifiedUserQuery } = usersApi;