import React, { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket';

interface ChatMessage {
    id: string;
    text: string;
    userId: string;
    timestamp: Date;
    username: string;
}

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
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [userTyping, setUserTyping] = useState<string>('')
    const socket = useSocket({ username });

    useEffect(() => {
        if (!socket) return;

        // Handle incoming messages
        socket.on('message', (message: ChatMessage) => {
            setMessages(prev => [...prev, message]);
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
                timestamp: new Date()
            }]);
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
                timestamp: new Date()
            }]);
        });

        socket.on('typing', (data: TypingProps) => {
            setUserTyping(data.username)
        })

        socket.on('stopTyping', () => {
            setUserTyping('')
        })

        // No explicit user count request; rely on live events and initial server emit
        return () => {
            socket.off('message');
            socket.off('userCount');
            socket.off('userJoined');
            socket.off('userLeft');
        };
    }, [socket]);

    const handleSendMessage = () => {
        if (messageInput.trim() && socket) {
            socket.emit('message', { text: messageInput, userId: socket.id });
            setMessageInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const formatTime = (timestamp: Date) => {
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
        <>
            {/* Messages */}
            <div className="bg-white rounded-lg p-4 mb-4 h-96 overflow-y-auto">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-2 p-2 rounded ${message.userId === 'system'
                                ? 'bg-gray-100 text-gray-600 text-center'
                                : message.userId === socket?.id
                                    ? 'bg-blue-100 ml-8'
                                    : 'bg-gray-100 mr-8'
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="font-semibold text-sm">
                                    {message.username}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                    {formatTime(message.timestamp)}
                                </span>
                            </div>
                        </div>
                        <div className="mt-1">{message.text}</div>
                    </div>
                ))}
            </div>

            {/* Typing Notification */}
                { userTyping && (
                    <div>
                        <p className='p-4 bg-amber-500 text-blue-500'>{`${userTyping} is Typing...`}</p>
                    </div>
                )}
            {/* Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={messageInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border rounded"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </>
    )
}

export default Chat;