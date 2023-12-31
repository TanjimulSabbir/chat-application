import { apiSlice } from "../Api/apiSlice";

const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        messages: builder.query({
            query: (id) => ({
                url: `/messages?conversationId=${id}&_sort=timestamp&_order=dese&_page=1&_limit=${process.env.REACT_APP_API_MESSAGES_PER_PAGE}`,
            })
        })

    })
})

export const { useMessagesQuery } = messagesApi;