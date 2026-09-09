import React from 'react';
import {
  LuChevronRight,
  LuHand
} from "react-icons/lu";
import { RiAlertFill } from "react-icons/ri";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoPersonAddSharp } from "react-icons/io5";
import { GoReport } from "react-icons/go";
import { IoMapSharp } from "react-icons/io5";
import { BiQrScan } from "react-icons/bi";
import {
  FiPackage,
  FiClipboard,
  FiPieChart,
  FiCheckSquare,
  FiBox,
  FiCamera,
  FiTruck,
  FiEye,
  FiPlay,
  FiSettings,
  FiChevronDown,
  FiPlus
} from 'react-icons/fi';

const stats = [
  {
    id: 'total-inventory',
    label: 'Total Inventory',
    value: '24,567',
    change: '↑ 5% from last week',
    changeColor: 'text-green-600',
    icon: FiPackage,
  },
  {
    id: 'active-tasks',
    label: 'Active Tasks',
    value: '12',
    change: '8 pending pickup',
    changeColor: 'text-red-500',
    icon: FiClipboard,
  },
  {
    id: 'warehouse-utilization',
    label: 'Warehouse Utilization',
    value: '78%',
    change: 'Optimal range',
    changeColor: 'text-blue-600',
    icon: FiPieChart,
  },
  {
    id: 'items-processed',
    label: 'Items Processed',
    value: '1,456',
    change: '↑ 12% from yesterday',
    changeColor: 'text-green-600',
    icon: FiCheckSquare,
  },
];

const quickActions = [
  { id: 'receive', label: 'Receive Items', icon: FiPackage, bg: 'bg-blue-100', iconColor: 'text-blue-900' },
  { id: 'pick', label: 'Pick Items', icon: LuHand, bg: 'bg-green-100', iconColor: 'text-green-800' },
  { id: 'pack', label: 'Pack Orders', icon: FiBox, bg: 'bg-purple-100', iconColor: 'text-purple-900' },
  { id: 'qr-scan', label: 'QR Scan', icon: FiCamera, bg: 'bg-yellow-100', iconColor: 'text-yellow-900' },
  { id: 'audit', label: 'Audit Stock', icon: FiClipboard, bg: 'bg-red-100', iconColor: 'text-red-900' },
  { id: 'load', label: 'Load Vehicle', icon: FiTruck, bg: 'bg-indigo-100', iconColor: 'text-indigo-900' },
];

// ✅ Updated orders to match the four cards from hundred.jpg
const orders = [
  {
    id: 'LG-001247',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Sarah Johnson',
    items: 24,
    total: 24,
    location: 'Zone A-12',
    started: '2 hours ago',
    progress: 18,
    actionLabel: 'View Details',
    btnColor: 'bg-blue-600',
  },
  {
    id: 'LG-001245',
    priority: 'Medium',
    status: 'Pending',
    assignee: 'Mike Wilson',
    items: 12,
    total: 12,
    location: 'Packing Station 3',
    due: 'In 30 mins',
    progress: 0,
    actionLabel: 'Start Task',
    btnColor: 'bg-green-600',
  },
  {
    id: 'SH-2024-089',
    priority: 'High',
    status: 'Scheduled',
    assignee: 'John Doe',
    items: 156,
    total: 156,
    location: 'Loading Bay 2',
    eta: '15 mins',
    progress: 156,          // fully prepared => shows "Ready"
    actionLabel: 'Track Arrival',
    btnColor: 'bg-purple-600',
  },
  {
    id: 'Stock Audit - Zone C',
    priority: 'Low',
    status: 'Ongoing',
    assignee: 'Team Alpha',
    items: 450,
    total: 450,
    location: 'Zone C (Aisles 15-20)',
    started: '4 hours ago',
    progress: 280,
    actionLabel: 'View Report',
    btnColor: 'bg-gray-700',
  },
];

const inventoryLevels = [
  { label: 'Optimal Stock', value: '18,456 items', percentage: 75, color: 'text-green-500' },
  { label: 'Low Stock', value: '4,234 items', percentage: 17, color: 'text-orange-300' },
  { label: 'Out Of Stock', value: '1,877 items', percentage: 8, color: 'text-red-600' },
];

const warehouseZones = [
  { name: 'Zone A', category: 'Electronics', capacity: '85% capacity', bg: 'bg-blue-100', textColor: 'text-blue-500' },
  { name: 'Zone B', category: 'Textiles', capacity: '72% capacity', bg: 'bg-green-100', textColor: 'text-green-500' },
  { name: 'Zone C', category: 'Food & Beverage', capacity: '91% capacity', bg: 'bg-orange-100', textColor: 'text-orange-500' },
  { name: 'Zone D', category: 'Automotive', capacity: '68% capacity', bg: 'bg-purple-100', textColor: 'text-purple-500' },
];

const activities = [
  {
    id: 1,
    icon: LuChevronRight,
    iconBg: 'bg-green-300',
    title: 'Order #LG-2024-001247 delivered successfully',
    detail: 'Vehicle TRK-001 completed delivery to Acme Corporation',
    time: '2 minutes ago',
  },
  {
    id: 2,
    icon: CiDeliveryTruck,
    iconBg: 'bg-blue-300',
    title: 'Vehicle VAN-045 assigned to new order',
    detail: 'Order #LG-2024-001248 assigned to Mike Wilson',
    time: '15 minutes ago',
  },
  {
    id: 3,
    icon: RiAlertFill,
    iconBg: 'bg-orange-300',
    title: 'Delay reported for Order #LG-2024-001245',
    detail: 'Traffic congestion causing 2-hour delay',
    time: '1 hour ago',
  },
  {
    id: 4,
    icon: IoPersonAddSharp,
    iconBg: 'bg-purple-300',
    title: 'New client registered',
    detail: 'TechFlow Enterprises added to client database',
    time: '3 hours ago',
  },
];

const performanceMetrics = [
  { label: 'lorem', bg: 'bg-blue-300' },
  { label: 'lorem', bg: 'bg-green-300' },
  { label: 'lorem', bg: 'bg-orange-300' },
  { label: 'lorem', bg: 'bg-purple-300' },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'In Progress': return 'bg-blue-100 text-blue-700';
    case 'Pending':     return 'bg-yellow-100 text-yellow-700';
    case 'Scheduled':   return 'bg-indigo-100 text-indigo-700';
    case 'Ongoing':     return 'bg-orange-100 text-orange-700';
    default:            return 'bg-gray-100 text-gray-700';
  }
};

// ----- Component -----
function Warehouse() {
  return (
    <div>
      {/* Header */}
      <header className="border-b border-gray-200 pb-2 -mx-8 px-8 flex justify-between bg-white">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">Warehouse Operations</h1>
          <span className="text-sm text-gray-600">manage inventory picking, packing and warehouse tasks</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            className="text-gray-600 border border-gray-300 rounded-md px-4 py-1.5 font-medium cursor-pointer hover:bg-gray-50 inline-flex items-center gap-2"
            aria-label="Scan QR code"
          >
            <BiQrScan size={20} />
            Scan QR
          </button>
          <button className="bg-dark-navy-blue text-white px-4 py-1.5 rounded-md font-medium cursor-pointer hover:opacity-90">
            + New Task
          </button>
        </div>
      </header>

      <main className="bg-gray-50 min-h-screen -mx-8">
        {/* Stats Cards */}
        <section className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                  <Icon className="text-base text-gray-400" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className={`text-xs flex items-center font-medium ${stat.changeColor}`}>
                  {stat.change}
                </div>
              </div>
            );
          })}
        </section>

        {/* Quick Actions */}
        <section className="bg-white border border-gray-300 ml-8 p-4 m-4 rounded-md">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h2>
          <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 h-24 min-w-[120px] flex-1 hover:shadow-md transition"
                  aria-label={action.label}
                >
                  <div className={`flex items-center justify-center w-12 h-12 ${action.bg} rounded-lg mb-2`}>
                    <Icon className={`text-2xl ${action.iconColor}`} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 text-center">{action.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Active Warehouse Tasks */}
        <section className="bg-white border border-gray-300 ml-8 m-4 rounded-md">
          {/* Header Row */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800 text-lg">Active Warehouse Tasks</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition">
                All Tasks <span className="text-xs">▼</span>
              </button>
              <button className="flex items-center gap-1 text-sm text-white bg-dark-navy-blue hover:bg-blue-700 px-3 py-1.5 rounded-md transition">
                <span className="text-base leading-none">+</span> Add Task
              </button>
            </div>
          </div>

          {/* Grid of cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full">
            {orders.map((order) => {
              const progressPercent = Math.round((order.progress / order.total) * 100);
              const isComplete = order.progress === order.total;

              return (
                <div key={order.id} className="border border-gray-300 rounded-md p-4 flex flex-col justify-between h-67">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-semibold">
                          {order.id.startsWith('LG') ? 'Pick Order' : 
                           order.id.startsWith('SH') ? 'Receive Shipment' : 
                           order.id}
                        </span>
                        <div className="flex flex-wrap gap-2 items-center mt-0.5">
                          <span className="text-xs text-gray-500">Priority: {order.priority}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusClass(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      {order.due && <span className="text-sm text-gray-500">Due: {order.due}</span>}
                      {order.eta && <span className="text-sm text-gray-500">ETA: {order.eta}</span>}
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-1 text-sm mt-2">
                      <span className="text-gray-500">Assigned to:</span>
                      <span className="font-medium">{order.assignee}</span>

                      <span className="text-gray-500">
                        {order.id.startsWith('SH') ? 'Expected Items:' : 'Items:'}
                      </span>
                      <span className="font-medium">{order.items} items</span>

                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">{order.location}</span>

                      {order.started && (
                        <>
                          <span className="text-gray-500">Started:</span>
                          <span className="font-medium">{order.started}</span>
                        </>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{isComplete ? 'Ready' : `${order.progress}/${order.total} items`}</span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded mt-1 w-full">
                        <div
                          className={`h-2 rounded transition-all ${isComplete ? 'bg-green-600' : 'bg-blue-600'}`}
                          style={{ width: `${Math.min(progressPercent, 100)}%` }}
                          role="progressbar"
                          aria-valuenow={progressPercent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`mt-3 w-full text-white py-2 rounded-md ${order.btnColor} hover:opacity-90 transition flex items-center justify-center gap-1`}
                  >
                    {order.actionIcon && <span>{order.actionIcon}</span>}
                    {order.actionLabel}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Inventory Levels & Warehouse Zones */}
        <div className="flex flex-col lg:flex-row gap-4 px-4">
          {/* Left: Inventory Levels */}
          <section className="bg-white border border-gray-300 p-4 rounded-md flex-1 h-auto lg:h-100 ml-3.5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700 text-sm tracking-wider">Inventory Levels</h3>
              <button className="font-semibold text-sm text-blue-500 hover:underline flex items-center gap-1">
                <GoReport className="h-3 w-3" aria-hidden="true" />
                View Full Report
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {inventoryLevels.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-600">{item.value}</div>
                  </div>
                  <span className={`font-bold ${item.color}`}>{item.percentage}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Warehouse Zones */}
          <section className="bg-white border border-gray-300 p-4 rounded-md flex-1 h-auto lg:h-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700 text-sm tracking-wider">Warehouse Zones</h3>
              <button className="font-semibold text-sm text-blue-500 hover:underline flex items-center gap-1">
                <IoMapSharp className="h-3 w-3" aria-hidden="true" />
                Zone Map
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {warehouseZones.map((zone, index) => (
                <div key={index} className={`${zone.bg} rounded-md p-3 text-center`}>
                  <div className={`font-bold ${zone.textColor}`}>{zone.name}</div>
                  <div className="text-sm">{zone.category}</div>
                  <div className="text-xs text-gray-600">{zone.capacity}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-3 mt-4 rounded-md">
              <div className="flex justify-between">
                <span className="text-black">Overall Utilization</span>
                <span className="text-blue-950 font-bold">79%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-md h-2 mt-1">
                <div className="bg-blue-900 h-2 rounded-md" style={{ width: '79%' }} />
              </div>
            </div>
          </section>
        </div>

        {/* Recent Activity */}
        <section className="bg-white border border-gray-300 ml-8 p-4 m-4 rounded-md">
          <h2 className="font-bold text-lg mb-4">Recent Warehouse Activity</h2>
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-3 items-start px-4 py-2 bg-gray-50 rounded-md">
                  <div className={`rounded-full p-1 flex-shrink-0 mt-1 ${activity.iconBg}`}>
                    <Icon className="w-4 h-4 text-gray-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{activity.title}</div>
                    <div className="text-xs text-gray-600">{activity.detail}</div>
                    <div className="text-xs text-gray-400">{activity.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="bg-white border border-gray-300 ml-8 p-4 m-4 rounded-md">
          <h2 className="font-bold text-lg mb-2">Warehouse Performance Metrics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {performanceMetrics.map((metric, index) => (
              <div
                key={index}
                className={`${metric.bg} rounded-md p-4 flex items-center justify-center border border-gray-200 text-xs text-gray-500 font-medium h-20`}
              >
                {metric.label}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Warehouse;