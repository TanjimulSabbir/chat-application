import { apiSlice } from "../Api/apiSlice";

const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        conversations: builder.query({
            query: (email) => {
                console.log(email);
                return {
                    url: `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_API_CONVERSATION_PER_PAGE}`,
                };
            },
        }),
    })

})

export const { useConversationsQuery } = conversationsApi;