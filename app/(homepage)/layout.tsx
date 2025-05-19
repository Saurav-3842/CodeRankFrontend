// app/dashboard/layout.tsx
import Sidebar from '@/components/Aside/sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
   
  return (
    <div className="flex min-h-screen">
  <aside className="print:hidden bg-gray-800 text-white p-4">
    <Sidebar />
  </aside>

  <main className="flex-1 bg-gray-100 p-6">
    {children} {/* Your dashboard page content */}
  </main>
</div>

  );
}
