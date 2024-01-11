import { io } from "socket.io-client";
import { apiSlice } from "../Api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        messages: builder.query({
            query: (id) => ({
                url: `/messages?conversationId=${id}&_sort=timestamp&_order=dese&_page=1&_limit=${process.env.REACT_APP_API_MESSAGES_PER_PAGE}`,
                // Create socket
                async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                    const socket = io("http://localhost:9000", {
                        reconnectionDelay: 1000,
                        reconnection: true,
                        reconnectionAttempts: 10,
                        transports: ["websocket"],
                        agent: false,
                        upgrade: false,
                        rejectUnauthorized: false,
                    });

                    try {
                        await cacheDataLoaded;

                        socket.on("message", (data) => {
                            updateCachedData((draft) => {
                                const messages = draft.find(d => d.id === data?.data?.id);
                                if (messages?.id) {
                                    messages.message = data.data.message;
                                    messages.timestamp = data.data.timestamp;
                                } else {
                                    // nothing
                                }
                            })
                        })
                    }
                    catch (err) {

                    }
                }
            })
        }),
        addMessage: builder.mutation({
            query: ({ data }) => ({
                url: `/messages`,
                method: "POST",
                body: data
            })
        })

    })
})

export const { useMessagesQuery, useAddMessageMutation } = messagesApi;