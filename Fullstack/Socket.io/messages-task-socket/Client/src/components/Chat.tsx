import React, { useState, useEffect, useMemo } from 'react';
import useSocket from '../hooks/useSocket';
import UsersSidebar from './UsersSidebar';
import type { UiMessage, User, PublicMessage, PrivateMessage } from '../types/chat';

interface UserEvent {
    userId: string;
    userCount: number;
    username: string;
}

interface TypingProps {
    username: string
}

interface Props {
    setUserCount: (count: number) => void;
    username: string;
}

const Chat = ({ setUserCount, username }: Props) => {
    const [users, setUsers] = useState<User[]>([]);

    // TODO: Replace with live messages (public + private) from server events
    const [messages, setMessages] = useState<UiMessage[]>([]);

    const [messageInput, setMessageInput] = useState('');
    const [userTyping, setUserTyping] = useState<string>('');
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const socket = useSocket({ username });

    // Self id from socket when available (fallback for demo)
    const selfId = socket?.id ?? 'u-self';

    useEffect(() => {
        if (!socket) return;

        // Handle incoming messages
        socket.on('message', (message: any) => {
            // TODO: Define strong runtime typing for server payloads
            const normalized: PublicMessage = {
                id: message.id ?? Date.now().toString(),
                text: message.text,
                userId: message.userId,
                username: message.username,
                timestamp: new Date(message.timestamp ?? Date.now()).toISOString(),
            };
            setMessages(prev => [...prev, normalized]);
        });

        // Handle user count updates
        socket.on('userCount', (count: number) => {
            console.log("New user count received:", count);
            setUserCount(count);
        });

        // Handle user joined events
        socket.on('userJoined', (data: UserEvent) => {
            console.log("User joined:", data.userId, "New count:", data.userCount);
            setUserCount(data.userCount);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: `User ${data.username} joined the chat`,
                userId: 'system',
                username: 'System',
                timestamp: new Date().toISOString()
            } as PublicMessage]);
        });

        // Handle user left events
        socket.on('userLeft', (data: UserEvent) => {
            console.log("User left:", data.userId, "New count:", data.userCount);
            setUserCount(data.userCount);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: `User ${data.username} left the chat`,
                userId: 'system',
                username: 'System',
                timestamp: new Date().toISOString()
            } as PublicMessage]);
        });

        socket.on('typing', (data: TypingProps) => {
            setUserTyping(data.username)
        })

        socket.on('stopTyping', () => {
            setUserTyping('')
        })

        socket.on('users', (list: User[]) => setUsers(list));

        socket.on('privateMessage', (payload: PrivateMessage) => {
          setMessages(prev => [...prev, { ...payload, isPrivate: true }]);
        });

        // No explicit user count request; rely on live events and initial server emit
        return () => {
            socket.off('message');
            socket.off('userCount');
            socket.off('userJoined');
            socket.off('userLeft');
            socket.off('typing');
            socket.off('stopTyping');
            socket.off('users');
            socket.off('privateMessage');
        };
    }, [socket]);

    const selectedUser = useMemo(
        () => users.find(u => u.id === selectedUserId) || null,
        [users, selectedUserId]
    );

    const handleSendMessage = () => {
        const text = messageInput.trim();
        if (!text) return; 

        if (!socket) return;
        // Private DM flow (UI only; TODO: wire to server)
        if (selectedUserId) {
            if (selectedUserId === selfId) {
                // TODO: block selecting self in UsersSidebar and here
                alert("You cant select yourself")
                return;
            }

            const payload: PrivateMessage & { isPrivate: true } = {
                id: Date.now().toString(),
                text,
                fromUserId: selfId,
                toUserId: selectedUserId,
                username: username,
                timestamp: new Date().toISOString(),
                isPrivate: true,
            };

            socket.emit('privateMessage', { toUserId: selectedUserId, text })
            setMessages(prev => [...prev, payload]);
            setMessageInput('');
            return;
        }

        // Public message flow (existing behavior)
        if (socket) {
            socket.emit('message', { text: messageInput, userId: socket.id });
            setMessageInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const formatTime = (timestamp: string | Date) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    let typingTimeout: ReturnType<typeof setTimeout>

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageInput(e.target.value);
        if (socket) {
            // Is Typing Logic
            socket.emit('typing', { username })
        }

        clearTimeout(typingTimeout)

        typingTimeout = setTimeout(() => {
            socket?.emit('stopTyping', {username})
        }, 5000)
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[minmax(240px,1fr)_3fr] gap-4">
            {/* Sidebar */}
            <div>
                <UsersSidebar
                    users={[{ id: selfId, username }, ...users.filter(u => u.id !== selfId)]}
                    selfId={selfId}
                    selectedUserId={selectedUserId}
                    onSelect={setSelectedUserId}
                />
            </div>

            {/* Chat column */}
            <div className="flex flex-col">
                {/* Send mode banner */}
                <div className="mb-2">
                    {selectedUser ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
                            <span role="img" aria-label="lock">🔒</span>
                            <span className="text-sm">Private to: {selectedUser.username}</span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 text-gray-700 border shadow-xs">
                            <span className="text-sm">Public</span>
                        </div>
                    )}
                </div>

                {/* Messages */}
                <div className="bg-gray-50 border rounded-xl p-4 mb-2 h-96 overflow-y-auto">
                    {messages.map((message) => {
                        const isSystem = (message as any).userId === 'system';
                        const isOwnPublic = (message as any).userId === socket?.id;
                        const isPrivate = (message as any).isPrivate === true;
                        return (
                            <div
                                key={message.id}
                                className={`mb-3 p-3 rounded-xl ${isSystem
                                    ? 'bg-white text-gray-600 text-center border'
                                    : isOwnPublic
                                        ? 'bg-blue-50 ml-8 border border-blue-100'
                                        : 'bg-white mr-8 border'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm text-gray-800">
                                            {message.username}
                                        </span>
                                        {isPrivate && (
                                            <span className="text-[10px] uppercase tracking-wide bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">Private</span>
                                        )}
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

                {/* Typing Notification */}
                {userTyping && (
                    <div>
                        <p className='p-2 text-sm text-gray-600'>{`${userTyping} is typing…`}</p>
                    </div>
                )}

                {/* Input */}
                <div className="flex gap-2 mt-auto">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={selectedUser ? `כתוב הודעה ל־${selectedUser.username}… (פרטי)` : 'כתוב הודעה לכולם…'}
                        className="flex-1 px-3 py-2 border rounded-lg bg-white/80 backdrop-blur focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
                    >
                        Send
                    </button>
                </div>

                {/* TODO: If selected user disconnects, show small system hint and clear selection */}
            </div>
        </div>
    )
}

export default Chat;