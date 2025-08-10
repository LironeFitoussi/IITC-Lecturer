import React, { useState} from 'react'
import useSocket from './hooks/useSocket'
function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [messageInput, setMessageInput] = useState("")

  const socket = useSocket()

  function handleSubmitMessage() {
    if (socket && messageInput.trim()) {
      socket.emit('message', messageInput, socket.id)
      setMessageInput('')
    }
  }

  function handleSendMessage (e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmitMessage()
    }
  }

  return (
    <>
      <div className='min-h-screen bg-gray-100 p-4'>
        <div className='max-w-4xl mx-auto '>
          <div className='flex justify-between items-center mb-4 flex-col'>
            <h1 className='text-2xl font-bold'>
              Basice Socket.io Chat
            </h1>

            {/* Chat */}
            <div className='bg-white rounded-lg p-4 mb-4 h-96 overflow-y-auto'>
              {messages.map((msg, idx) => (
                <div key={msg+idx} className='mb-2 p-2 bg-blue-100 rounded'>
                  {msg}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className='flex gap-2'>
              <input 
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder='Type your message...'
                onKeyDownCapture={handleSendMessage}
                className='flex-1 px-3 py-2 border rounded'
              />
              <button 
                onClick={handleSubmitMessage} 
                className='px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-600' 
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
