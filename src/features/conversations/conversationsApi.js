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
    })

})

export const { useConversationsQuery } = conversationsApi;