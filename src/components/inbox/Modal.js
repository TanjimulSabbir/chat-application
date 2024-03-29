import { useEffect, useState } from "react";
import { useSpecifiedUserQuery } from "../../features/users/usersApi";
import { useDispatch, useSelector } from "react-redux";
import IsValidEmail from "../utils/IsValidEmail";
import toast from "react-hot-toast";
import Error from "../ui/Error";
import { conversationsApi, useAddCoversationMutation, useConversationsQuery, useEditSpecifiedCoversationMutation } from "../../features/conversations/conversationsApi";

export default function Modal({ open, control }) {
    const [messageData, setMessageData] = useState({});
    const [searchedConversations, setSearchedConversations] = useState(null);
    const { data: user, isLoading, error } = useSpecifiedUserQuery(messageData.email, { skip: !messageData.email });
    const [addCoversation, { isSuccess: addedSuccessfully }] = useAddCoversationMutation();
    const [editSpecifiedCoversation, { isSuccess: editedSuccessfully }] = useEditSpecifiedCoversationMutation();
    const { user: loggedInUser } = useSelector(state => state.auth) || {};
    const dispatch = useDispatch();

   
    useEffect(() => {
        if (user?.length > 0 && loggedInUser?.email !== messageData.email) {
            dispatch(conversationsApi.endpoints.findCoversationByEmail.initiate({ loggedInEmail: loggedInUser.email, partnerEmail: messageData.email })).unwrap().then((data) => {
                setSearchedConversations(data)
            }).catch((err) => {

            })
        }
    }, [user, dispatch, messageData, loggedInUser]);

    useEffect(() => {
        if (addedSuccessfully || editedSuccessfully) {
            control()
        }
    }, [addedSuccessfully, editedSuccessfully]);


    const debounce = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                fn(...args)
            }, delay);
        }
    }
    const handleEmail = (event) => {
        const checkedEmail = IsValidEmail(event);
        if (checkedEmail) {
            setMessageData((prev) => ({ ...prev, email: event, isEmailValid: true }));
        } else {
            setMessageData((prev) => ({ ...prev, isEmailValid: false }));
            // toast.error("Invalid Email!")
        }
    }

    const getClicked = debounce(handleEmail, 700);

    const handleMessages = (event) => {
        event.preventDefault();
        if (searchedConversations.length > 0) {
            editSpecifiedCoversation(
                {
                    id: searchedConversations[0].id,
                    sender: loggedInUser, receiver: user[0],
                    data: {
                        participants: `${loggedInUser.email}-${messageData.email}`,
                        users: [{ ...loggedInUser }, { ...user[0] }],
                        message: messageData.text,
                        timestamp: new Date().getTime()
                    }
                }
            )
        } else {
            addCoversation(
                {
                    id: searchedConversations[0]?.id,
                    sender: loggedInUser, receiver: user[0],
                    data: {
                        participants: `${loggedInUser.email}-${messageData.email}`,
                        users: [{ ...loggedInUser }, { ...user[0] }],
                        message: messageData.text,
                        timestamp: new Date().getTime()
                    }
                })
        }
    }

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleMessages}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    onChange={(event) => getClicked(event.target.value)}
                                    id="to"
                                    name="to"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Send to"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    onChange={(event) => setMessageData((prev) => ({ ...prev, text: event.target.value }))}
                                    id="message"
                                    name="message"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 ${!messageData?.isEmailValid || user?.length === 0 || loggedInUser?.email === messageData.email ? "bg-gray-300 text-blck" : "bg-green-600 hover:bg-green-700"}`}
                                disabled={!messageData?.isEmailValid || user?.length < 0 || loggedInUser?.email === messageData.email}
                            >
                                Send Message
                            </button>
                        </div>

                        {messageData?.isEmailValid || <Error message="Invalid email address!" />}
                        {messageData?.isEmailValid && user?.length === 0 && <Error message="This email does not exist!" />}
                        {loggedInUser?.email === messageData.email && <Error message="You can not send message to yourself!" />}

                    </form>
                </div>
            </>
        )
    );
}
