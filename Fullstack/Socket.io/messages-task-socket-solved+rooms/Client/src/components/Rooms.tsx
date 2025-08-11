import React, { useEffect, useMemo, useState } from 'react';
import type { Socket } from 'socket.io-client';

type RoomsProps = {
  socket: Socket | null;
  currentRoom: string;
  onChangeRoom: (roomName: string) => void;
};

const Rooms: React.FC<RoomsProps> = ({ socket, currentRoom, onChangeRoom }) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (!socket) return;
    const handleRooms = (list: string[]) => setRooms(list);
    socket.on('rooms', handleRooms);
    // ask for initial rooms snapshot if not received yet
    socket.emit('getRooms');
    return () => {
      socket.off('rooms', handleRooms);
    };
  }, [socket]);

  const normalizedRooms = useMemo(
    () => rooms.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })),
    [rooms]
  );

  const handleJoin = (roomName: string) => {
    const target = roomName.trim();
    if (!socket) return;
    socket.emit('joinRoom', { roomName: target });
    onChangeRoom(target);
  };

  const handleCreate = () => {
    const target = input.trim();
    if (!target) return;
    handleJoin(target);
    setInput('');
  };

  return (
    <div className="w-full bg-white/60 backdrop-blur border rounded-xl p-3 shadow-sm mb-2">
      <div className="mb-2">
        <h3 className="font-medium text-gray-800">Rooms</h3>
      </div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Create or join room..."
          className="flex-1 px-3 py-2 border rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleCreate}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          title="Type a new name to create, or existing to join"
        >
          {rooms.includes(input.trim()) ? 'Join' : 'Create'}
        </button>
        <button
          onClick={() => handleJoin('')}
          className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          title="Leave room and go to Public"
        >
          Public
        </button>
      </div>
      <ul className="max-h-40 overflow-y-auto divide-y">
        {normalizedRooms.length === 0 && (
          <li className="py-2 text-sm text-gray-500">No rooms yet. Create one above.</li>
        )}
        {normalizedRooms.map((r) => {
          const isActive = currentRoom.trim() === r.trim();
          return (
            <li key={r} className="py-1">
              <button
                onClick={() => handleJoin(r)}
                className={`w-full text-left px-2 py-2 rounded-lg border ${
                  isActive ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{r}</span>
                {isActive && <span className="text-[10px] text-blue-600">(current)</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Rooms;


