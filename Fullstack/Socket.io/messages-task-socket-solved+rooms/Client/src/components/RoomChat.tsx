import React, { useEffect, useMemo, useState } from 'react';
import type { Socket } from 'socket.io-client';
import type { PublicMessage, UiMessage } from '../types/chat';

type RoomChatProps = {
  socket: Socket | null;
  roomName: string; // assumed trimmed non-empty
  username: string;
};

const RoomChat: React.FC<RoomChatProps> = ({ socket, roomName, username }) => {
  const [messages, setMessages] = useState<UiMessage[]>([{
    id: 'room-welcome',
    text: `Welcome to ${roomName}`,
    userId: 'system',
    username: 'System',
    timestamp: new Date().toISOString(),
  } as PublicMessage]);
  const [messageInput, setMessageInput] = useState('');
  const [userTyping, setUserTyping] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: any) => {
      const msgRoom = (message.roomName || '').trim();
      if (!msgRoom || msgRoom !== roomName) return;
      const normalized: PublicMessage = {
        id: message.id ?? Date.now().toString(),
        text: message.text,
        userId: message.userId,
        username: message.username,
        timestamp: new Date(message.timestamp ?? Date.now()).toISOString(),
        roomName: msgRoom,
      };
      setMessages(prev => [...prev, normalized]);
    };

    const handleTyping = (data: { username: string }) => setUserTyping(data.username);
    const handleStopTyping = () => setUserTyping('');

    socket.on('message', handleMessage);
    socket.on('typing', handleTyping);
    socket.on('stopTyping', handleStopTyping);

    return () => {
      socket.off('message', handleMessage);
      socket.off('typing', handleTyping);
      socket.off('stopTyping', handleStopTyping);
    };
  }, [socket, roomName]);

  const selfId = socket?.id ?? 'u-self';

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!text) {
      setInputError('Message cannot be empty');
      return;
    }
    if (!socket) return;
    socket.emit('message', { text, userId: selfId, roomName });
    setMessageInput('');
    setInputError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  let typingTimeout: ReturnType<typeof setTimeout>;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
    if (inputError) setInputError('');
    if (socket) {
      socket.emit('typing', { username, roomName });
    }
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket?.emit('stopTyping', { username, roomName });
    }, 5000);
  };

  const formatTime = (timestamp: string | Date) =>
    new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 text-gray-700 border shadow-xs">
          <span className="text-sm">Room: {roomName}</span>
        </div>
      </div>
      <div className="bg-gray-50 border rounded-xl p-4 mb-2 h-96 overflow-y-auto">
        {messages.map((message) => {
          const isSystem = (message as any).userId === 'system';
          const isOwn = (message as any).userId === selfId;
          return (
            <div
              key={message.id}
              className={`mb-3 p-3 rounded-xl ${isSystem
                ? 'bg-white text-gray-600 text-center border'
                : isOwn
                  ? 'bg-blue-50 ml-8 border border-blue-100'
                  : 'bg-white mr-8 border'
                }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-800">
                    {message.username}
                  </span>
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {formatTime((message as any).timestamp)}
                </span>
              </div>
              <div className="mt-1">{message.text}</div>
            </div>
          );
        })}
      </div>

      {userTyping && (
        <div>
          <p className='p-2 text-sm text-gray-600'>{`${userTyping} is typing…`}</p>
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${roomName}…`}
          className="flex-1 px-3 py-2 border rounded-lg bg-white/80 backdrop-blur focus:ring-2 focus:ring-blue-200"
        />
        {inputError && (
          <span className="self-center text-xs text-red-600">{inputError}</span>
        )}
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RoomChat;


