'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './sidebar.css';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
    const pathname = usePathname();
    const { logout } = useAuth();

    const menuItems = [
        { 
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            ),
            label: 'Dashboard',
            path: '/main/dashboard'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <rect x="7" y="12" width="3" height="6" />
                    <rect x="12" y="8" width="3" height="10" />
                    <rect x="17" y="5" width="3" height="13" />
                </svg>
            ),
            label: 'Analytics',
            path: '/main/analytics'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            ),
            label: 'Settings',
            path: '/main/settings'
        },
    ];

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
            </div>
            {/* User Profile Section */}
            <div className="user-profile">
                <img 
                    src="https://ui-avatars.com/api/?name=John+Doe&background=4caf50&color=fff" 
                    alt="User Profile"
                />
                <div className="user-info">
                    <h3>John Doe</h3>
                    <p>Administrator</p>
                </div>
            </div>

            <ul className="sidebar-menu">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <Link 
                            href={item.path}
                            className={pathname === item.path ? 'active' : ''}
                        >
                            <i>{item.icon}</i>
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="logout-container">
                <div className="logout-button" onClick={handleLogout}>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </i>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 