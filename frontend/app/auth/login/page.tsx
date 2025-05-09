"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { login } from "../../../service/authService";
import { useAuth } from "@/context/AuthContext";

//css
import "./login.css";
import "../../../styles/globals.css";

export default function LoginPage() {
    const router = useRouter();
    const { syncAuth } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (!username || !password) {
                throw new Error("Please enter both username and password");
            }

            await login(username, password);
            // Force a sync of auth state before navigation
            syncAuth();
            router.push('/main/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="loginbox">
                <div className="maintitle">
                    Login
                </div>
                <form onSubmit={handleLogin}>
                    <div className="sub-container">
                        <div className="input-label">Username</div>
                        <div className="input-wrapper">
                            <svg className="start-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <input
                                type="text"
                                className="custom-input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    
                    <div className="sub-container">
                        <div className="input-label">Password</div>
                        <div className="input-wrapper">
                            <svg className="start-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="custom-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <svg 
                                className="end-icon" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor"
                                onClick={() => !isLoading && setShowPassword(!showPassword)}
                                style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                            >
                                {showPassword ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                )}
                            </svg>
                        </div>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "5px"
                    }}>
                        <a
                            href="/auth/resetpassword"
                            style={{
                                color: "#2cc7ff",
                                fontSize: "16px",
                                textDecoration: "underline",
                                cursor: "pointer"
                            }}
                        >
                            Forgot password?
                        </a>
                    </div>
                    <div className="login-button-container">
                        <button
                            type="submit"
                            className="custom-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                }}>
                    Don't have an account ?
                    <a
                        href="/auth/signup"
                        style={{
                            color: "#2cc7ff",
                            fontSize: "16px",
                            textDecoration: "underline",
                            cursor: "pointer",
                            marginLeft: "10px"
                        }}
                    >
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
} 