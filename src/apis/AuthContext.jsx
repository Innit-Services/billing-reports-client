// src/apis/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import setupInterceptors from './axiosInterceptor';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => 
    {
    const [token, setToken] = useState(null);

    const signIn = (newToken) => {
        console.log('Token Set:', newToken); 
        setToken(newToken);
    };

    const signOut = () => {
        setToken(null);
    };

    const getAccessToken = () => {
        return token;
    };

    return (
        <AuthContext.Provider value={{ token, signIn, signOut, getAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
