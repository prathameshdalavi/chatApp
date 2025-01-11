import { createContext, useContext } from "react";
import { useEffect, useRef, useState } from "react";
interface WebSocketContextType {
    messages: { content: string; isOwnMessage: boolean }[];
    sendMessage: (payload: any) => void;
    joinRoom: (roomId: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const WsRef = useRef<WebSocket>();
    const [messages, setMessages] = useState<{ content: string; isOwnMessage: boolean }[]>([]);

    useEffect(() => {
        const Ws = new WebSocket("ws://localhost:8080");
        WsRef.current = Ws;
        Ws.onmessage = (event) => {
            const messageData = event.data;
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    content: messageData,
                    isOwnMessage: false,
                },
            ]);
        };
        return () => {
            Ws.close();
        };
    }, []);

    const joinRoom = (roomId: string) => {
        WsRef.current?.send(
            JSON.stringify({
                type: "join",
                payload: {
                    roomId: roomId,
                },
            })
        );
    };

    const sendMessage = (payload: any) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                content: payload.message,
                isOwnMessage: true,
            },
        ]);

        WsRef.current?.send(
            JSON.stringify({
                type: "Chat",
                payload: payload,
            })
        );
    };

    return (
        <WebSocketContext.Provider value={{ messages, sendMessage, joinRoom }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
