// import Blank from "./Blank";
import gravatarUrl from "gravatar-url";
import { useMessagesQuery } from "../../../features/messages/messagesApi";
import Error from "../../ui/Error";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function ChatBody() {
    const { data: messages, isLoading, isError, error } = useMessagesQuery("1");
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    // toast(email)
    let content = null;

    if (isLoading) content = <div>Loading...</div>
    if (!isLoading && isError) content = <Error />
    if (!isLoading && !isError && messages.length === 0) content = <div>No Conversation Found!</div>
    if (!isLoading && !isError && messages.length > 0) {

        content = messages.map(message => {
            const sender = message.sender.email !== email
            toast(sender)
            return <Messages message={message.message} justify={sender ? "start" : "end"} />
        })
    }

    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                <ChatHead
                    avatar={""}
                    name={""}
                />
                {content}
                <Options />
            </div>
        </div>
    );
}
