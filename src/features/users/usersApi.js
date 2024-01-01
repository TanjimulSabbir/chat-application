import { apiSlice } from "../Api/apiSlice";
import { useFindCoversationByEmailQuery } from "../conversations/conversationsApi";

const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        specifiedUser: builder.query({
            query: (email) => ({
                url: `/users/${email}`
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result.data.email) {
                        dispatch()
                    }
                } catch (error) {

                }
            }
        })
    })
})

export const { useSpecifiedUserQuery } = usersApi;