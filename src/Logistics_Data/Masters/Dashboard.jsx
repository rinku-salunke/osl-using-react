import React, { useState } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Command");

  const tabs = [
    "Command",
    "Analytics",
    "Warehouse",
    "Inbound",
    "Outbound",
    "Transport",
    "Dispatch",
    "Accounts",
    "Stock Report",
    "MIS Report",
  ];

  const stats = [
    {
      label: "Total Trips",
      value: "0",
      change: "+12%",
      bg: "bg-blue-50",
      labelColor: "text-blue-700",
      valueColor: "text-gray-900",
      changeColor: "text-blue-600",
    },
    {
      label: "Revenue",
      value: "₹0.0L",
      change: "+18%",
      bg: "bg-green-50",
      labelColor: "text-green-700",
      valueColor: "text-gray-900",
      changeColor: "text-green-600",
    },
    {
      label: "JIT Success Rate",
      value: "92%",
      change: "+5%",
      bg: "bg-yellow-50",
      labelColor: "text-yellow-700",
      valueColor: "text-gray-900",
      changeColor: "text-yellow-700",
    },
    {
      label: "Warehouse Fill",
      value: "87%",
      change: "+3%",
      bg: "bg-gray-100",
      labelColor: "text-gray-700",
      valueColor: "text-gray-900",
      changeColor: "text-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ===== Title ===== */}
      <h1 className="text-2xl font-bold text-gray-900 mb-5">Dashboard</h1>

      {/* ===== Tabs ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-2 mb-6 flex flex-wrap gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              activeTab === tab
                ? "bg-[#1e1b6b] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} rounded-lg p-5 border border-gray-200/50`}
          >
            <p className={`text-sm font-medium ${stat.labelColor} mb-2`}>
              {stat.label}
            </p>
            <p className={`text-3xl font-bold ${stat.valueColor} mb-3`}>
              {stat.value}
            </p>
            <p className={`text-sm font-medium ${stat.changeColor} flex items-center gap-1`}>
              <span>↑</span>
              <span>{stat.change}</span>
            </p>
          </div>
        ))}
      </div>

      {/* ===== Main Grid: Critical Exceptions + Milkrun Tracking ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ===== Critical Exceptions ===== */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Critical Exceptions
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Requires immediate attention
          </p>

          {/* Exception Card */}
          <div className="bg-red-100 border-l-4 border-red-400 rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-red-700">TRK-003</span>
              <span className="text-xs text-red-500 font-medium">
                5 min ago
              </span>
            </div>
            <p className="text-sm text-gray-800">
              Vehicle MH-12-AB-1234 delayed at Stop 2
            </p>
          </div>
        </div>

        {/* ===== Milkrun Live Tracking ===== */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Milkrun Live Tracking - MR-2024-0421
          </h2>

          {/* Tracking Timeline */}
          <div className="flex items-center justify-between px-4 py-8">
            {/* Stop 1 - completed */}
            
            {/* Stop 2 - completed */}
            

           

          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;