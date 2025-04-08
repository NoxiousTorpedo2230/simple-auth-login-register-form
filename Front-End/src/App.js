
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Component/Login';
import Register from './Component/Register';
import Header from './Component/Header';
import Footer from './Component/Footer';
import ForgotPassword from './Component/ForgotPassword';
import ResetPassword from './Component/ResetPassword';
import VerifyAccount from './Component/VerifyAccount';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is actually authenticated with the server
        const verifyAuth = async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/auth/is-auth', {}, {
                    withCredentials: true
                });
                
                const authStatus = response.data.success;
                localStorage.setItem('isAuthenticated', authStatus);
                setIsAuthenticated(authStatus);
            } catch (error) {
                console.error('Auth verification error:', error);
                // If server check fails, clear auth state
                localStorage.removeItem('isAuthenticated');
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    const setAuth = (status) => {
        localStorage.setItem('isAuthenticated', status);
        setIsAuthenticated(status);
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="app">
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
            <div className="content">
                <Routes>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setAuth={setAuth} />} />
                    <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register setAuth={setAuth} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify-account" element={<VerifyAccount />} />
                    <Route path="/dashboard" element={isAuthenticated ? <div className="dashboard">Welcome to Dashboard!</div> : <Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;