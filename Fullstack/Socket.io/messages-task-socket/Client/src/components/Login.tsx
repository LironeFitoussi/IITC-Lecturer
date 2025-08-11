import { useRef } from 'react';

interface Props {
    setUsername: (username: string) => void;
}

const Login = ({ setUsername }: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    function handleLogin() {
        // TODO: Add basic validation (min length) and show inline error
        setUsername(inputRef.current?.value || '');
    }

    return (
        <div className='bg-white/90 backdrop-blur rounded-xl p-6 border shadow-sm max-w-md mx-auto'>
            <h1 className='text-xl font-semibold mb-4 text-gray-800'>Welcome</h1>
            <div className='flex gap-2'>
                <input 
                    type="text" 
                    placeholder="Username" 
                    className='flex-1 border-2 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200' 
                    ref={inputRef}
                />
                <button
                    onClick={handleLogin}
                    className='bg-blue-600 text-white rounded-md px-4 hover:bg-blue-700'
                >
                    Enter
                </button>
            </div>
        </div>
    )
}

export default Login;