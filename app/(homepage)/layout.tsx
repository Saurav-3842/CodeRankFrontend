// app/dashboard/layout.tsx
import Sidebar from '@/components/Aside/sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
   
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 bg-white p-6">
        {children}
      </main>
    </div>
  );
}
