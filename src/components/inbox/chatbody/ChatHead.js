import gravatarUrl from "gravatar-url";
import { useSelector } from "react-redux";

export default function ChatHead({ messages }) {
    const { user: { email: myEmail } } = useSelector(state => state.auth) || {};
    const { sender, receiver } = messages || {};
    const partnerEmail = sender?.email !== myEmail ? sender?.email : receiver?.email;
    const partnerName = sender?.email !== myEmail ? sender?.name : receiver?.name;

    return (
        <div className="relative flex items-center p-3 border-b border-gray-300">
            <img
                className="object-cover w-10 h-10 rounded-full"
                src={gravatarUrl(partnerEmail, { size: 80 })}
                alt={partnerName}
            />
           <div className="flex-col relative">
           <span className="block ml-2 font-bold text-gray-600">{partnerName}</span>
            <small className="text-[7px] absolute top-5 left-2 text-green-600 hover:text-lg bold duration-500 transitions">{myEmail}</small>
           </div>
        </div>
    );
}
