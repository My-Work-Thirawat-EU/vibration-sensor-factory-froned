'use client';

import React from 'react';
import Sidebar from './Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}