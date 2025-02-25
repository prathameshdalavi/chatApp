import { Button } from "../components/button"
import { Input } from "../components/input"
import { useWebSocket } from "../components/webSocketServer"
import { useRef } from "react"
import { useNavigate } from 'react-router-dom'
export function RoomCreation() {
    const inputRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()
    const { joinRoom } = useWebSocket()
    function join() {
        const roomId = inputRef.current?.value
        if (roomId) {
            joinRoom(roomId)
            navigate("/dashboard")
        }
        else {
            alert("Please Enter RoomId")
        }
    }
    return (
        <div className="w-full h-screen items-center justify-center flex flex-col bg-gray-800 " >
            <div className="text-4xl font-bold p-2 text-slate-300 text-white">Welcome to the Chat App </div>
            <div className="text-md  font-semibold pb-2 text-slate-300 text-white"  >Create a room to start chatting with friends. </div>
            <div className="w-1/3 h-48 p-2 rounded-2xl  mt-4    flex flex-col gap-3  bg-gray-600">
                <div className="text-3xl font-bold text-slate-300 flex items-center justify-center">
                    Create Room
                </div>
                <div className="flex  mt-2">
                    <Input reference={inputRef} placeholder="Enter Room Id" />
                </div>
                <div className="flex items-center  justify-center">
                <Button  text="Join"  onClick={join} />
                </div>
            </div>
        </div>
    )
}