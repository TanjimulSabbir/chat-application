// import Blank from "./Blank";
import gravatarUrl from "gravatar-url";
import { useMessagesQuery } from "../../../features/messages/messagesApi";
import Error from "../../ui/Error";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ChatBody() {
    const { id } = useParams();
    const { data: messages, isLoading, isError, error } = useMessagesQuery(id);
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    // toast(email)
    let content = null;

    if (isLoading) content = <div>Loading...</div>
    if (!isLoading && isError) content = <Error message={error?.data} />
    if (!isLoading && !isError && messages.length === 0) content = <div>No Conversation Found!</div>
    if (!isLoading && !isError && messages.length > 0) {
        content = <div className="w-full grid conversation-row-grid">
            <ChatHead
                messages={messages && messages[0]}
            />
            <Messages key={messages.id} messages={messages} email={email} />
            <Options />
        </div>
    }

    return (
        <div className="w-full lg:col-span-2 lg:block">
            {content}
        </div>
    );
}
