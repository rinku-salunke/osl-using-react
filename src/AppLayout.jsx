import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar';

function AppLayout() {
  return (
    <div >
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-white-fresh dark:bg-gray-900 transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;