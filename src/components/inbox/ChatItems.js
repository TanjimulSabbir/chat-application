import { useSelector } from "react-redux";
import { useConversationsQuery } from "../../features/conversations/conversationsApi";
import ChatItem from "./ChatItem";
import Error from "../ui/Error";
import moment from "moment";
import PartnerInfo from "../utils/PartnerInfo";
import gravatarUrl from "gravatar-url";

export default function ChatItems() {
    const { user } = useSelector((state) => state.auth)
    const { email: myEmail } = user;
    const { data: conversations, isLoading, isError, error } = useConversationsQuery(myEmail);

    let content = null;

    if (isLoading) content = <>Loading...</>
    if (!isLoading && isError) content = <Error />
    if (!isLoading && !isError && conversations.length === 0) content = <div>No Conversation Found!</div>
    if (!isLoading && !isError && conversations.length > 0) {
        content = conversations.map(conversation => {
            const { id, message, timestamp } = conversation;
            const { name, email } = PartnerInfo({ participants: conversation?.users, email: myEmail })
            return <li>
                <ChatItem
                    id={id}
                    avatar={gravatarUrl(email, { size: 80 })}
                    name={name}
                    lastMessage={message}
                    lastTime={moment(timestamp).fromNow()}
                />
            </li>
        })
    }


    return (
        <ul>
            {content}
        </ul>
    );
}
