import { useEffect, useState } from "react";
import { useEditSpecifiedCoversationMutation } from "../../../features/conversations/conversationsApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Options({ messages }) {
    const [editSpecifiedCoversation, { isSuccess }] = useEditSpecifiedCoversationMutation();
    const { user: loggedInUser } = useSelector(state => state.auth) || {};
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isSuccess) {
            toast.success("Message Sent!")
        }
        setMessage("")
    }, [isSuccess])

    const receiver = messages[0]?.receiver?.email === loggedInUser.email ? messages[0]?.sender : messages[0]?.receiver;

    const handleSubmit = (event) => {
        event.preventDefault();
        editSpecifiedCoversation({
            id: messages[0]?.conversationId,
            sender: loggedInUser,
            receiver: receiver,
            data: {
                participants: `${loggedInUser?.email}-${receiver?.email}`,
                users: [{ ...loggedInUser }, { ...receiver }],
                message,
                timestamp: new Date().getTime()
            }

        })
    }
    return (
        <form className="flex items-center justify-between w-full p-3 border-t border-gray-300"
            onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-300 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-black"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
            />
            <button type="submit">
                <svg
                    className="w-6 h-6 text-green-600 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
        </form>
    );
}
