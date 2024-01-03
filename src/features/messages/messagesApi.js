import { apiSlice } from "../Api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        messages: builder.query({
            query: (id) => ({
                url: `/messages?conversationId=${id}&_sort=timestamp&_order=dese&_page=1&_limit=${process.env.REACT_APP_API_MESSAGES_PER_PAGE}`,
            })
        }),
        addMessage: builder.mutation({
            query: (data) => ({
                url: `/messages`,
                method: "POST",
                body: data
            })
        })

    })
})

export const { useMessagesQuery, useAddMessageMutation } = messagesApi;