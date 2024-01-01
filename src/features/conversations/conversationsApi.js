import { apiSlice } from "../Api/apiSlice";

const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        conversations: builder.query({
            query: (email) => {
                console.log(email);
                return {
                    url: `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1`,
                };
            },
        }),
        findCoversationByEmail: builder.query({
            query: ({ loginEmail, partnerEmail }) => ({
                url: `/conversations?participants=${loginEmail}-${partnerEmail}&&participants=${partnerEmail}-${loginEmail}`,
            })
        }),
        editSpecifiedCoversation: builder.mutation({
            query: ({ id, data }) => ({
                url: `/conversations/${id}`,
                method: "PATCH",
                body: data
            })
        }),

    })

})

export const {
    useConversationsQuery,
    useFindCoversationByEmailQuery,
    useEditSpecifiedCoversationMutation
} = conversationsApi;