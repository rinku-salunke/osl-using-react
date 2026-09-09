import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';

function AppLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar – overflow-y-auto काढला, आता फक्त nav मध्ये scrollbar */}
        <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
          <Sidebar />
        </aside>

        {/* Main content – scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;