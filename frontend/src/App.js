import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import LandingPage from './LandingPage';

const App = () => {
    const [authToken, setAuthToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize state from localStorage
    useEffect(() => {
        try {
            const token = localStorage.getItem('authToken');
            const user = JSON.parse(localStorage.getItem('userData') || 'null');

            if (token && user) {
                setAuthToken(token);
                setUserData(user);
            }
        } catch (error) {
            console.error('Error parsing stored user data:', error);
            // Clear invalid data
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSetAuthToken = (token, user) => {
        try {
            setAuthToken(token);
            setUserData(user);
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(user));
        } catch (error) {
            console.error('Error storing auth data:', error);
        }
    };

    const handleLogout = () => {
        setAuthToken(null);
        setUserData(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className="App">
            <div className="container">
                <h1 className="text-center mt-5">Welcome to DevConnect</h1>
                {!authToken ? (
                    <div className="mt-5">
                        {isLogin ? (
                            <div>
                                <LoginPage setAuthToken={handleSetAuthToken} />
                                <div className="text-center mt-3">
                                    <p>Don't have an account? <button className="btn btn-link" onClick={toggleForm}>Register</button></p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <RegistrationPage
                                    setAuthToken={handleSetAuthToken}
                                    switchToLogin={() => setIsLogin(true)}
                                />
                                <div className="text-center mt-3">
                                    <p>Already have an account? <button className="btn btn-link" onClick={toggleForm}>Login</button></p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <LandingPage
                        userData={userData}
                        handleLogout={handleLogout}
                    />
                )}
            </div>
        </div>
    );
};

export default App;