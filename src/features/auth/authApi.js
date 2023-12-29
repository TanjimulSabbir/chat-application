import toast from "react-hot-toast";
import { apiSlice } from "../Api/apiSlice";
import { userLoggedIn } from "./authSlice";


const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [""],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const authData = {
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }
                    localStorage.setItem("auth", JSON.stringify({ ...authData }))
                    dispatch(userLoggedIn({ ...authData }))
                    toast.success("Register Successful!")
                } catch (error) {
                    console.log(error.message)
                }
            }
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [""],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    const authData = {
                        accessToken: result.data.accessToken,
                        user: result.data.user
                    }
                    localStorage.setItem("auth", JSON.stringify({ ...authData }))
                    dispatch(userLoggedIn({ ...authData }))
                } catch (error) {
                    console.log(error.message)
                }
            }
        }),
    })
})

export const { useRegisterMutation, useLoginMutation } = authApi;