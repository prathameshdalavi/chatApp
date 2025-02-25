import { useRef } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useWebSocket } from "../components/webSocketServer";

export function Dashboard() {
    const InputRef = useRef<HTMLInputElement>(null);
    const {messages,sendMessage}=useWebSocket()
    const handleSendMessage = () => {
        const message = InputRef.current?.value || "";
        sendMessage({ message});
    };
    console.log(messages)
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-black">
            <div className="w-1/2 h-full my-12 rounded-lg  flex flex-col bg-gray-400">
            <div className="w-full h-full  border-2 p-2 rounded-md flex flex-col gap-2">
            {messages.map((message, index) => (
                    <span
                    key={index}
                    className={`border-2 rounded-xl flex items-center h-10 shadow-md p-2 ${
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
