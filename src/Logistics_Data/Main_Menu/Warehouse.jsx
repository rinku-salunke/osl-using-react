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
import { FaTruck } from "react-icons/fa";
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
  FiArrowUp,
  FiArrowDown,
  FiMaximize,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle
} from 'react-icons/fi';
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoRefreshSharp } from "react-icons/io5";
import { FiChevronDown, FiBarChart2 } from 'react-icons/fi';

const stats = [
  { id: 'total-inventory', label: 'Total Inventory', value: '24,567', change: '5% from last week', changeColor: 'text-green-600', icon: FiPackage, bg: 'bg-blue-100', iconColor: 'text-blue-600', changeIcon: 'up' },
  { id: 'active-tasks', label: 'Active Tasks', value: '12', change: '8 pending pickup', changeColor: 'text-red-500', icon: FiClipboard, bg: 'bg-orange-100', iconColor: 'text-orange-500', changeIcon: 'dot' },
  { id: 'warehouse-utilization', label: 'Warehouse Utilization', value: '78%', change: 'Optimal range', changeColor: 'text-blue-600', icon: FiPieChart, bg: 'bg-green-100', iconColor: 'text-green-600', changeIcon: 'dot' },
  { id: 'items-processed', label: 'Items Processed', value: '1,456', change: '12% from yesterday', changeColor: 'text-green-600', icon: FiCheckSquare, bg: 'bg-purple-100', iconColor: 'text-purple-500', changeIcon: 'up' },
];

const quickActions = [
  { id: 'receive', label: 'Receive Items', icon: FiPackage, bg: 'bg-blue-100', iconColor: 'text-blue-900' },
  { id: 'pick', label: 'Pick Items', icon: LuHand, bg: 'bg-green-100', iconColor: 'text-green-800' },
  { id: 'pack', label: 'Pack Orders', icon: FiBox, bg: 'bg-purple-100', iconColor: 'text-purple-900' },
  { id: 'qr-scan', label: 'QR Scan', icon: FiCamera, bg: 'bg-yellow-100', iconColor: 'text-yellow-900' },
  { id: 'audit', label: 'Audit Stock', icon: FiClipboard, bg: 'bg-red-100', iconColor: 'text-red-900' },
  { id: 'load', label: 'Load Vehicle', icon: FiTruck, bg: 'bg-indigo-100', iconColor: 'text-indigo-900' },
];

const orders = [
  {
    id: 'LG-001247',
    title: 'Pick Order #LG-001247',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Sarah Johnson',
    items: 24,
    total: 24,
    location: 'Zone A-12',
    started: '2 hours ago',
    progress: 18,
    actionLabel: 'View Details',
    btnColor: 'bg-dark-navy-blue',
    progressColor: 'bg-green-500',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    btnIcon: FiEye
  },
  {
    id: 'LG-001245',
    title: 'Pick Order #LG-001245',
    priority: 'Medium',
    status: 'Pending',
    assignee: 'Mike Wilson',
    items: 12,
    total: 12,
    location: 'Packing Station 3',
    due: 'In 30 mins',
    progress: 0,
    actionLabel: 'Start Task',
    btnColor: 'bg-orange-500',
    progressColor: 'bg-orange-500',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    btnIcon: FiPlay
  },
  {
    id: 'SH-2024-089',
    title: 'Receive Shipment #SH-2024-089',
    priority: 'High',
    status: 'Scheduled',
    assignee: 'John Doe',
    items: 156,
    total: 156,
    location: 'Loading Bay 2',
    eta: '15 mins',
    progress: 156,
    actionLabel: 'Track Arrival',
    btnColor: 'bg-dark-navy-blue',
    progressColor: 'bg-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    btnIcon: FiTruck
  },
  {
    id: 'Stock Audit - Zone C',
    title: 'Stock Audit - Zone C',
    priority: 'Low',
    status: 'Ongoing',
    assignee: 'Team Alpha',
    items: 450,
    total: 450,
    location: 'Zone C (Aisles 15-20)',
    started: '4 hours ago',
    progress: 280,
    actionLabel: 'View Report',
    btnColor: 'bg-purple-600',
    progressColor: 'bg-purple-500',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    btnIcon: FiClipboard
  },
];

const inventoryLevels = [
  {
    label: 'Optimal Stock',
    value: '18,456 items',
    percentage: 75,
    color: 'text-green-600',
    icon: FiCheckCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: 'Low Stock',
    value: '4,234 items',
    percentage: 17,
    color: 'text-orange-500',
    icon: FiAlertTriangle,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500'
  },
  {
    label: 'Out Of Stock',
    value: '1,877 items',
    percentage: 8,
    color: 'text-red-600',
    icon: FiXCircle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  },
];

const warehouseZones = [
  { name: 'Zone A', category: 'Electronics', capacity: '85% capacity', bg: 'bg-blue-100', textColor: 'text-blue-500' },
  { name: 'Zone B', category: 'Textiles', capacity: '72% capacity', bg: 'bg-green-100', textColor: 'text-green-500' },
  { name: 'Zone C', category: 'Food & Beverage', capacity: '91% capacity', bg: 'bg-orange-100', textColor: 'text-orange-500' },
  { name: 'Zone D', category: 'Automotive', capacity: '68% capacity', bg: 'bg-purple-100', textColor: 'text-purple-500' },
];

const activities = [
  { id: 1, icon: LuChevronRight, iconBg: 'bg-green-100', iconColor: 'text-green-700', title: 'Order #LG-2024-001247 delivered successfully', detail: 'Vehicle TRK-001 completed delivery to Acme Corporation', time: '2 minutes ago' },
  { id: 2, icon: CiDeliveryTruck, iconBg: 'bg-blue-100', iconColor: 'text-blue-700', title: 'Vehicle VAN-045 assigned to new order', detail: 'Order #LG-2024-001248 assigned to Mike Wilson', time: '15 minutes ago' },
  { id: 3, icon: RiAlertFill, iconBg: 'bg-orange-100', iconColor: 'text-orange-700', title: 'Delay reported for Order #LG-2024-001245', detail: 'Traffic congestion causing 2-hour delay', time: '1 hour ago' },
  { id: 4, icon: IoPersonAddSharp, iconBg: 'bg-purple-100', iconColor: 'text-purple-700', title: 'New client registered', detail: 'TechFlow Enterprises added to client database', time: '3 hours ago' },
];

const performanceMetrics = [
  {
    value: '98.5%',
    title: 'Pick Accuracy',
    change: '1.2%',
    changeType: 'up',
    changeColor: 'text-green-600',
    bg: 'bg-blue-100',
    textColor: 'text-blue-900'
  },
  {
    value: '2.3h',
    title: 'Avg Processing Time',
    change: '-0.5h',
    changeType: 'down',
    changeColor: 'text-green-600',
    bg: 'bg-green-100',
    textColor: 'text-green-700'
  },
  {
    value: '156',
    title: 'Items/Hour',
    change: '+12',
    changeType: 'up',
    changeColor: 'text-green-600',
    bg: 'bg-orange-100',
    textColor: 'text-orange-600'
  },
  {
    value: '99.1%',
    title: 'On-time Fulfillment',
    change: '+0.3%',
    changeType: 'up',
    changeColor: 'text-green-600',
    bg: 'bg-purple-100',
    textColor: 'text-purple-700'
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'In Progress': return 'bg-green-100 text-green-700';
    case 'Pending': return 'bg-orange-100 text-orange-700';
    case 'Scheduled': return 'bg-blue-100 text-blue-700';
    case 'Ongoing': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

function Warehouse() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-300 flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-black text-2xl">Warehouse Operations</h1>
          <span className="text-sm text-gray-500 mt-1">Manage inventory picking, packing and warehouse tasks</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="text-gray-600 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 inline-flex items-center gap-2" aria-label="Scan QR code">
            <BiQrScan size={18} />
            Scan QR
          </button>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:opacity-90">
            + New Task
          </button>
        </div>
      </header>

      {/* Main Content — Same wrapper as Orders.jsx */}
      <div className="flex-1 px-6 py-8 bg-gray-50 space-y-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="border border-gray-300 rounded-md p-5 bg-white flex items-center justify-between gap-4">
                <div className="flex flex-col justify-between h-full">
                  <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                  <div className="text-2xl font-bold text-gray-800 my-1">{stat.value}</div>
                  <div className={`text-xs flex items-center gap-1 font-medium ${stat.changeColor}`}>
                    {stat.changeIcon === 'up' && <FiArrowUp size={12} />}
                    {stat.changeIcon === 'dot' && <span className="inline-block w-2 h-2 rounded-full bg-current"></span>}
                    {stat.change}
                  </div>
                </div>
                <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg}`}>
                  <Icon className={`text-xl ${stat.iconColor}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-300 p-6 rounded-md">
          <h2 className="text-base font-bold text-gray-800 mb-5">Quick Actions</h2>
          <div className="flex flex-nowrap gap-5 overflow-x-auto pb-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.id} className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 h-24 min-w-[120px] flex-1 hover:shadow-md transition" aria-label={action.label}>
                  <div className={`flex items-center justify-center w-12 h-12 ${action.bg} rounded-lg mb-2`}>
                    <Icon className={`text-2xl ${action.iconColor}`} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 text-center">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Warehouse Tasks */}
        <div className="bg-white border border-gray-300 rounded-md">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="font-bold text-base text-gray-800">Active Warehouse Tasks</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition">
                All Tasks <span className="text-xs"><RiArrowDropDownLine size={20} /></span>
              </button>
              <button className="flex items-center gap-1 text-sm text-white bg-blue-900 hover:opacity-90 px-3 py-1.5 rounded-md transition">
                <span className="text-base leading-none">+</span> Add Task
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 w-full">
            {orders.map((order) => {
              const progressPercent = Math.round((order.progress / order.total) * 100);
              const isComplete = order.progress === order.total;
              const BtnIcon = order.btnIcon;

              return (
                <div key={order.id} className="border border-gray-300 rounded-md p-5 bg-white shadow-sm h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${order.iconBg}`}>
                          <FaTruck className={`${order.iconColor}`} size={18} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-800">{order.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">Priority: {order.priority}</div>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <span className="text-gray-500">Assigned to:</span>
                      <span className="text-gray-900 font-medium text-right">{order.assignee}</span>
                      <span className="text-gray-500">Items:</span>
                      <span className="text-gray-900 font-medium text-right">{order.items} items</span>
                      <span className="text-gray-500">Location:</span>
                      <span className="text-gray-900 font-medium text-right">{order.location}</span>
                      {order.due && (
                        <>
                          <span className="text-gray-500">Due:</span>
                          <span className="font-medium text-right text-orange-500">{order.due}</span>
                        </>
                      )}
                      {order.eta && (
                        <>
                          <span className="text-gray-500">ETA:</span>
                          <span className="text-gray-900 font-medium text-right">{order.eta}</span>
                        </>
                      )}
                      {order.started && (
                        <>
                          <span className="text-gray-500">Started:</span>
                          <span className="text-gray-900 font-medium text-right">{order.started}</span>
                        </>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                        <span>Progress</span>
                        <span>{isComplete ? 'Ready' : `${order.progress}/${order.total} items`}</span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full w-full">
                        <div className={`h-2 rounded-full ${order.progressColor}`} style={{ width: `${Math.min(progressPercent, 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <button className={`flex-1 text-white py-2 rounded-lg ${order.btnColor} hover:opacity-90 transition flex items-center justify-center gap-2 text-sm font-medium`}>
                      <BtnIcon size={14} />
                      <span>{order.actionLabel}</span>
                    </button>

                    <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer flex-shrink-0 hover:bg-gray-200 transition-colors">
                      <FiMaximize size={14} className="text-gray-700" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inventory Levels + Warehouse Zones */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Inventory Levels */}
          <div className="bg-white border border-gray-300 p-6 rounded-md flex-1">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-base text-gray-800">Inventory Levels</h3>
              <button className="font-medium text-sm text-blue-900 hover:underline flex items-center gap-1.5">
                <GoReport className="h-4 w-4" aria-hidden="true" />
                View Full Report
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {inventoryLevels.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-gray-50 p-5 rounded-md flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center ${item.iconBg}`}>
                        <Icon className={`text-xl ${item.iconColor}`} />
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.value}</div>
                      </div>
                    </div>
                    <span className={`font-bold text-lg ${item.color}`}>{item.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Warehouse Zones */}
          <div className="bg-white border border-gray-300 p-6 rounded-md flex-1">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-base text-gray-800">Warehouse Zones</h3>
              <button className="font-medium text-sm text-blue-900 hover:underline flex items-center gap-1.5">
                <IoMapSharp className="h-4 w-4" aria-hidden="true" />
                Zone Map
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {warehouseZones.map((zone, index) => (
                <div key={index} className={`${zone.bg} rounded-md p-4 text-center`}>
                  <div className={`font-bold text-sm ${zone.textColor}`}>{zone.name}</div>
                  <div className="text-xs text-gray-700 mt-1">{zone.category}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{zone.capacity}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-5 mt-5 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Utilization</span>
                <span className="text-blue-900 font-bold">79%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-900 h-2 rounded-full" style={{ width: '79%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Warehouse Activity */}
        <div className="bg-white border border-gray-300 p-6 rounded-md">
          <div className='flex justify-between items-center mb-5'>
            <h2 className="font-bold text-base text-gray-800">Recent Warehouse Activity</h2>
            <button className="flex items-center gap-1.5 text-blue-900 hover:text-purple-800 text-sm font-medium cursor-pointer">
              <IoRefreshSharp size={16} />
              View All Activity
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-4 items-start p-5 bg-gray-50 rounded-md">
                  <div className={`rounded-full p-1.5 mt-0.5 flex-shrink-0 ${activity.iconBg} ${activity.iconColor}`}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{activity.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{activity.detail}</div>
                    <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Warehouse Performance Metrics */}
        <div className="bg-white border border-gray-300 p-6 rounded-md">
          <div className='flex justify-between items-center mb-5'>
            <h2 className="font-bold text-base text-gray-800">Warehouse Performance Metrics</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                Today
                <FiChevronDown className="text-gray-500" size={14} />
              </button>

              <button className="flex items-center gap-1.5 text-sm font-medium text-blue-900 hover:underline cursor-pointer">
                <FiBarChart2 size={16} />
                Detailed Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {performanceMetrics.map((metric, index) => (
              <div
                key={index}
                className={`${metric.bg} rounded-lg p-5 border text-center`}
                style={{ borderColor: 'rgba(0,0,0,0.05)' }}
              >
                <div className={`text-2xl font-bold ${metric.textColor}`}>{metric.value}</div>
                <div className="text-sm font-medium text-gray-700 mt-1.5">{metric.title}</div>
                <div className={`flex items-center justify-center gap-1 text-sm font-semibold mt-2 ${metric.changeColor}`}>
                  {metric.changeType === 'up' && <FiArrowUp size={12} />}
                  {metric.changeType === 'down' && <FiArrowDown size={12} />}
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Warehouse;