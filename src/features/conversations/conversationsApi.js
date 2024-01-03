import { apiSlice } from "../Api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
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
            query: ({ loggedInEmail, partnerEmail }) => ({
                url: `/conversations?participants_like=${loggedInEmail}-${partnerEmail}&&participants_like=${partnerEmail}-${loggedInEmail}`,
            })
        }),
        editSpecifiedCoversation: builder.mutation({
            query: ({ id, data }) => ({
                url: `/conversations/${id}`,
                method: "PATCH",
                body: data
            })
        }),
        addCoversation: builder.mutation({
            query: (data) => ({
                url: `/conversations`,
                method: "PATCH",
                body: data
            })
        }),

    })

})

export const {
    useConversationsQuery,
    useFindCoversationByEmailQuery,
    useEditSpecifiedCoversationMutation,
    useAddCoversationMutation
} = conversationsApi;