import Message from "./Message";

export default function Messages({ message, justify }) {

    return (
        <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
            <ul className="space-y-2">
                <Message justify={justify} message={message} />
            </ul>
        </div>
    );
}
