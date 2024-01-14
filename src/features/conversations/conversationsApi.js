import { io } from "socket.io-client";
import { apiSlice } from "../Api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        conversations: builder.query({
            query: (email) => `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1`,

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
                    socket.on("conversation", (data) => {
                        updateCachedData((draft) => {
                            console.log({ conversationDraft: draft });

                            const conversation = draft.find(d => d.id === data?.data?.id);
                            if (conversation?.id) {
                                conversation.message = data.data.message;
                                conversation.timestamp = data.data.timestamp;
                            } else {
                                // nothing
                            }
                        })
                    })
                }
                catch (err) {
                    await cacheEntryRemoved;
                    socket.close();
                }
            }
        }),

        findCoversationByEmail: builder.query({
            query: ({ loggedInEmail, partnerEmail }) => ({
                url: `/conversations?participants_like=${loggedInEmail}-${partnerEmail}&&participants_like=${partnerEmail}-${loggedInEmail}`,
            })
        }),

        editSpecifiedCoversation: builder.mutation({
            query: ({ id, data, sender, receiver }) => ({
                url: `/conversations/${id}`,
                method: "PATCH",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Data invaliding
                const EditConversatinInvalidated = dispatch(apiSlice.util.updateQueryData("conversations", arg.sender.email, (draft) => {
                    // don't use triple equal (===)due to cach data stored as text not as actual data
                    const draftConversations = draft.find(data => data.id == arg.id)
                    draftConversations.message = arg?.data?.message;
                    draftConversations.timestamp = arg?.data?.timestamp;
                }));

                try {
                    const successResponsed = await queryFulfilled
                    if (successResponsed?.data?.id) {
                        const addMessageDispatchResponse = await dispatch(messagesApi.endpoints.addMessage.initiate(
                            {
                                data:
                                {
                                    conversationId: successResponsed?.data?.id,
                                    sender: arg?.sender,
                                    receiver: arg?.receiver,
                                    message: arg?.data?.message,
                                    timestamp: arg?.data?.timestamp
                                }
                            }
                        )).unwrap();

                        // Pessimistically Messages updating
                        dispatch(apiSlice.util.updateQueryData("messages", addMessageDispatchResponse.conversationId.toString(), (draft) => {
                            draft.push(addMessageDispatchResponse)
                        }));
                    }
                } catch (error) {
                    EditConversatinInvalidated.undo()
                }
            }
        }),
        addCoversation: builder.mutation({
            query: ({ id, data, sender, receiver }) => ({
                url: `/conversations`,
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {

                const addInvalidated = dispatch(apiSlice.util.updateQueryData("conversations", arg.id.toString(), (draft) => {
                    draft.push(arg.data)
                }));

                try {
                    const successResponsed = await queryFulfilled;
                    if (successResponsed?.data?.id) {
                        dispatch(messagesApi.endpoints.addMessage.initiate(
                            {
                                data: {
                                    conversationId: successResponsed?.data?.id,
                                    sender: arg?.sender,
                                    receiver: arg?.receiver,
                                    message: arg?.data?.message,
                                    timestamp: arg?.data?.timestamp
                                }
                            }
                        ))
                    }
                } catch (error) {
                    addInvalidated.undo();
                }
            }
        }),
    })
})

export const {
    useConversationsQuery,
    useFindCoversationByEmailQuery,
    useEditSpecifiedCoversationMutation,
    useAddCoversationMutation
} = conversationsApi;