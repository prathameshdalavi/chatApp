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
        <div className="w-full h-screen items-center flex flex-col bg-black " >
            <div className="w-1/2 h-full my-12 rounded-lg  flex flex-col bg-gray-400">
                <div className="text-3xl font-bold text-black">
                    Create Room
                </div>
                <div className="mx-12 flex ">
                    <Input reference={inputRef} placeholder="Enter Room Id" />
                </div>
                <div className="flex items-center justify-center">
                <Button text="Join"  onClick={join} />
                </div>
            </div>
        </div>
    )
}