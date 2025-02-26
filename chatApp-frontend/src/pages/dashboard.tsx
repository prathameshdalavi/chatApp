import { useEffect, useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useWebSocket } from "../components/webSocketServer";

export function Dashboard() {
    const InputRef = useRef<HTMLInputElement>(null);
    const ChatContainerRef = useRef<HTMLDivElement>(null);
    const {messages,sendMessage}=useWebSocket()
    const handleSendMessage = () => {
        const message = InputRef.current?.value || "";
        sendMessage({ message});
    };
    console.log(messages)
    useEffect(() => {
        if (ChatContainerRef.current) {
            ChatContainerRef.current.scrollTop = ChatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <div className="flex flex-col items-center justify-center w-full  h-screen bg-slate-900">
            <div className="text-4xl font-bold text-slate-300 mb-2 ">Live Chat</div>
            <div className="text-md font-semibold text-slate-300 mb-4 ">Chat with friends in real time!</div>
            <div className="w-2/5 h-4/5 rounded-2xl border-1  flex flex-col p-2  bg-slate-800">
            <div ref={ChatContainerRef} className="w-full h-full scroll-smooth  border-2 overflow-y-auto p-2 [&::-webkit-scrollbar]:hidden scrollbar-hide rounded-md flex flex-col gap-2">
            {messages.map((message, index) => (
                    <span
                    key={index}
                    className={`border-2 rounded-xl max-w-64 px-4 text-sm py-2 items-center shadow-md text-justify  ${
                        message.isOwnMessage
                            ? "self-end bg-blue-200 text-right border-blue-200"     
                            : "self-start bg-slate-200 text-left"
                    }`}
                >
                    {message.content}
                </span>
                ))}
            </div>
            <div className="flex gap-1 w-full rounded-md border-2 p-2">
                <Input placeholder="Enter your message..." reference={InputRef} />
                <Button text="Send" onClick={handleSendMessage} />
            </div>
            </div>
        </div>
    );
}
