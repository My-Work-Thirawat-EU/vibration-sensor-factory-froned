'use client';

import React from 'react';
import Sidebar from './Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import './sidebar.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#18181B]">
        <Sidebar />
        <main className="flex-1 ml-[100px] p-4">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}