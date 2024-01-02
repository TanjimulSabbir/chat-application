import { useState } from "react";
import { useSpecifiedUserQuery } from "../../features/users/usersApi";
import { useSelector } from "react-redux";
import IsValidEmail from "../utils/IsValidEmail";
import toast from "react-hot-toast";
import Error from "../ui/Error";

export default function Modal({ open, control }) {
    const [messageData, setMessageData] = useState({});
    const { data: user, isLoading, error } = useSpecifiedUserQuery(messageData.email, { skip: !messageData.email });

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
            setMessageData((prev) => ({ ...prev, email: event }));
            if (user.length!==0) {
                toast.error("User not found!");
                console.log(user)
            }
        } else {
            toast.error("Invalid Email!")
        }
    }

    const getClicked = debounce(handleEmail, 700)


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
                    <form className="mt-8 space-y-6" onSubmit={() => getClicked()}>
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
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Send Message
                            </button>
                        </div>

                        {user?.length === 0 && <Error message="This email does not exist!" />}
                    </form>
                </div>
            </>
        )
    );
}
