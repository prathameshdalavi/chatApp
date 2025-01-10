import { createContext, useContext } from "react";
import { useEffect, useRef, useState } from "react";
interface WebSocketContextType{
    messages: string[],
    sendMessage:(payload: any) => void
    joinRoom:(roomId: string) => void
}
const WebSocketContext =createContext<WebSocketContextType | null>(null);
export const WebSocketProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
    const WsRef=useRef<WebSocket>();
    const [messages, setMessages] = useState<string[]>([]);
    useEffect(() => {
        const Ws = new WebSocket("ws://localhost:8080");
        WsRef.current = Ws;
        Ws.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        }
        return () => {
            Ws.close();
        };
    },[])
    const joinRoom = (roomId: string) => {
        WsRef.current?.send(JSON.stringify({
            type: "join",
            payload: {
                roomId: roomId
            }
        }))
    }
    const sendMessage = ( payload: any) => {
        WsRef.current?.send(JSON.stringify({
            type: "Chat",
            payload: payload
        }))
    }
    return <WebSocketContext.Provider value={{messages, sendMessage, joinRoom}}>{children}</WebSocketContext.Provider>;
}
export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context; 
};