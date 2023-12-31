import Message from "./Message";

export default function Messages({ messages, email }) {

    return (
        <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
            <ul className="space-y-2">
                {
                    messages.slice().sort((a,b)=>a.timestapm-b.timestamp).map(msg => {
                        const { message, id,sender } = msg;
                        const justify = sender.email !== email;
                        return <Message key={id} justify={justify ? "start" : "end"} message={message} />
                    })
                }
            </ul>
        </div>
    );
}
