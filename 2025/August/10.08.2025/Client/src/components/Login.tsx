import { useRef } from 'react';

interface Props {
    setUsername: (username: string) => void;
}

const Login = ({ setUsername }: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    function handleLogin() {
        setUsername(inputRef.current?.value || '');
    }

    return (
        <div>
            <h1>Login</h1>
            <input 
                type="text" 
                placeholder="Username" 
                className='border-2 border-gray-300 rounded-md p-2' 
                ref={inputRef}
                />
            <button
                onClick={handleLogin}
                className='bg-blue-500 text-white rounded-md p-2'
                >
                Login
            </button>
        </div>
    )
}

export default Login;