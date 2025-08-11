import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";

interface RoomsProps {
    username: string
}

function Rooms({username}: RoomsProps) {
    const socket = useSocket({username})
    const roomInputRef = useRef<HTMLInputElement | null>(null)
    const [availableRooms, setAvailableRooms] = useState<string[]>([])
    
    useEffect(() => {
        if (!socket) return 
        
        socket.on('roomsMap', (roomsMap: string[]) => {
            setAvailableRooms(roomsMap)
        })
    }, [socket])

    console.log("Available Rooms: ", availableRooms);
    
    function handleJoinRoom () {
        let roomName = roomInputRef?.current
        if (!socket || !roomName?.value) {
            console.log(socket);
            console.log(roomName);
            return
        } 

        if (availableRooms.includes(roomName.value)) throw new Error('Room Already Exists')
        socket.emit('joinRoom', roomName.value)
        roomName.value = ""
    }

    function selectExisitngRoom (roomName: string) {
        if (!socket) return
        socket.emit('joinRoom', roomName)
    }
    function handleClick (color: string){
        console.log("Selected Color: ", color);
    }
    return (
        <div>
            <p>
                This is the rooms component
            </p>

            <div>
                <div>
                    <h1>Availble Rooms</h1>
                    <div className="flex ">
                        {availableRooms.map((room) => {
                                return (
                                    <button  
                                        onClick={selectExisitngRoom.bind(null, room)}
                                        className="p-2 ml-3 bg-amber-300 rounded hover:cursor-pointer">{room}</button>
                                )
                        })}
                    </div>
                </div>
                <div>
                    <input 
                    ref={roomInputRef}
                    type="text" />
                    <button type="button" onClick={handleJoinRoom} className="bg-green-500 p-2 text-white rounded">Add Room</button>
                </div>
            </div>
            <div
                className="py-4 bg-blue-200 rounded"
            >
                <button onClick={handleClick.bind(null, "green")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-1">Green</button>
                <button onClick={handleClick.bind(null, "red")} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-1">Red</button>
                <button onClick={handleClick.bind(null, "blue")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-1">Blue</button>
                <button onClick={handleClick.bind(null, "yellow")} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded m-1">Yellow</button>
            </div>
        </div>
    )

}

export default Rooms