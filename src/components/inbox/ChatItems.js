import { useSelector } from "react-redux";
import { useConversationsQuery } from "../../features/conversations/conversationsApi";
import ChatItem from "./ChatItem";
import Error from "../ui/Error";
import moment from "moment";

export default function ChatItems() {
    const { user } = useSelector((state) => state.auth)
    const { email } = user;
    const { data: conversations, isLoading, isError, error } = useConversationsQuery(email);

    let content = null;

    if (isLoading) content = <isLoading />
    if (!isLoading && isError) content = <Error />
    if (!isLoading && !isError && conversations.length === 0) content = <div>No Conversation Found!</div>
    if (!isLoading && !isError && conversations.length > 0) {
        content = conversations.map(conversation => {
            const { message, timestamp } = conversation
            return <li>
                <ChatItem
                    avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                    name="Saad Hasan"
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
