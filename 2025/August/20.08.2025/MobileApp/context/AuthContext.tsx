import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAuthenticated: false,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [ user, setUser ] = useState<User | null>(null) 
    const [ loading, setLoading] = useState(true)

    const isAuthenticated = !!user

    useEffect(() => {
        initializeAuth()
    }, [])

    const initializeAuth  = async () => {
        try {
            const [ storedToken, storedUser ] = await Promise.all([
                AsyncStorage.getItem('authToken'),
                AsyncStorage.getItem('user')
            ])

            if (storedToken && storedUser) {
                const userData = JSON.parse(storedUser)
                setUser(userData)
            }

        } catch (error) {
            
        }
    }

}

