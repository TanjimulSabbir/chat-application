import { apiSlice } from "../Api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        conversations: builder.query({
            query: (email) => {
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
            query: ({ id, data, sender, receiver }) => ({
                url: `/conversations/${id}`,
                method: "PATCH",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                apiSlice.util.updateQueryData("conversations", arg.sender.email, (draft) => {
                    // don't use triple equal (===)due to cach data stored as text not as actual data
                    const draftConversations = draft.find(data => data.id == arg.id)
                    draftConversations.message = arg?.data?.message;
                    draftConversations.message = arg?.data?.timestamp;
                })
                const successResponsed = await queryFulfilled
                if (successResponsed?.data?.id) {
                    dispatch(messagesApi.endpoints.addMessage.initiate(
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
                    ))
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