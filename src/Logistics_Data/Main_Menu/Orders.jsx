import React, { useState } from 'react';
import { MdOutlineClear } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiAlertFill } from "react-icons/ri";
import { LuChevronRight } from "react-icons/lu";
import { IoTrendingDownSharp } from "react-icons/io5";
import { GrView } from "react-icons/gr";

function Orders() {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const orderData = [
    {
      id: '#LG-2024-001247',
      client: 'AC',
      date: 'Jan 15, 2024 09:30 AM',
      route: 'Mumbai → Delhi 850 km',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: '#LG-2024-001246',
      client: 'GI',
      date: 'Jan 15, 2024 08:15 AM',
      route: 'Chennai → Bangalore 350 km',
      priority: 'Medium',
      status: 'Assigned'
    },
    {
      id: '#LG-2024-001245',
      client: 'ST',
      date: 'Jan 14, 2024 03:45 PM',
      route: 'Pune → Hyderabad 560 km',
      priority: 'Low',
      status: 'Issue'
    },
    {
      id: '#LG-2024-001244',
      client: 'TechFlow Enterprises',
      date: 'Jan 14, 2024 11:20 AM',
      route: 'Kolkata → Bhubaneswar 440 km',
      priority: 'High',
      status: 'In Transit'
    }
  ];

  const splitRoute = (route) => {
    const match = route.match(/^(.*?)(\d+\s*km)$/);
    if (match) {
      return { city: match[1].trim(), distance: match[2] };
    }
    return { city: route, distance: '' };
  };

  const toggleOrder = (id) => {
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-gray-200 text-gray-700';
      case 'Assigned': return 'bg-blue-100 text-blue-700';
      case 'In Transit': return 'bg-purple-100 text-purple-700';
      case 'Issue': return 'bg-red-200 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b border-gray-200 pb-2 -mx-8 px-8">
        <div className="text-xl font-semibold">Order Management</div>
        <h1 className="text-sm text-gray-500">manage and track all logistic orders</h1>
      </div>

      <div className="border-b border-gray-200 py-3 -mx-8 px-8">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {/* Box: Last 7 days */}
          <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 hover:border-gray-400 transition-colors">
            <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-5 text-gray-700">
              <option>Last 7 days</option>
              <option>Last 14 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <span className="pointer-events-none text-gray-400 text-[10px] absolute right-2">▼</span>
          </div>

          {/* Box: All Locations */}
          <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 hover:border-gray-400 transition-colors">
            <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-5 text-gray-700">
              <option>All Locations</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Chennai</option>
            </select>
            <span className="pointer-events-none text-gray-400 text-[10px] absolute right-2">▼</span>
          </div>

          {/* Box: All Status */}
          <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 hover:border-gray-400 transition-colors">
            <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-5 text-gray-700">
              <option>All Status</option>
              <option>Pending</option>
              <option>Assigned</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Issue</option>
            </select>
            <span className="pointer-events-none text-gray-400 text-[10px] absolute right-2">▼</span>
          </div>

          <button className="text-black-600 hover:underline flex items-center gap-1">
            Clear all <MdOutlineClear />
          </button>
        </div>
      </div>

      <div className="flex-1 -mx-8 px-8 bg-light-gray">
        <div className="py-4">
          {/* Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white h-24 p-3 border border-gray-300 rounded-md">
              <div className="text-xs text-gray-500 tracking-wide">Total Orders</div>
            </div>
            <div className="bg-white h-24 p-3 border border-gray-300 rounded-md">
              <div className="text-xs text-gray-500 tracking-wide">Pending Assignment</div>
            </div>
            <div className="bg-white h-24 p-3 border border-gray-300 rounded-md">
              <div className="text-xs text-gray-500 tracking-wide">In Transit</div>
            </div>
            <div className="bg-white h-24 p-3 border border-gray-300 rounded-md">
              <div className="text-xs text-gray-500 tracking-wide">Delivered Today</div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="bg-white p-4 mb-4 rounded-md shadow-sm border border-gray-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Advanced Filters</h3>
              <button className="text-xs text-blue-600 hover:underline">More Options</button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Order Type</label>
                <select className="text-xs text-gray-700 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400">
                  <option>All Types</option>
                  <option>Standard</option>
                  <option>Express</option>
                  <option>Bulk</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Priority Level</label>
                <select className="text-xs text-gray-700 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400">
                  <option>All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Vehicle Type</label>
                <select className="text-xs text-gray-700 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400">
                  <option>All Vehicles</option>
                  <option>Truck</option>
                  <option>Van</option>
                  <option>Trailer</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Client Category</label>
                <select className="text-xs text-gray-700 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400">
                  <option>All Clients</option>
                  <option>Retail</option>
                  <option>Wholesale</option>
                  <option>Enterprise</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table container */}
          <div className="mb-4 border border-gray-300 rounded-md">
            <div className="bg-white rounded-md shadow">
              <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-end gap-3">
                <button
                  className="text-sm text-black"
                  onClick={() => console.log('Bulk Assign clicked')}
                >
                  Bulk Assign
                </button>
                <button
                  className="text-sm text-black"
                  onClick={() => console.log('Export Selected clicked')}
                >
                  Export Selected
                </button>
              </div>

              <table className="w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sr.No
                    </th>
                    <th scope="col" className="w-1/6 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="w-1/6 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="w-1/6 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th scope="col" className="w-1/6 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th scope="col" className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderData.map((order, index) => {
                    const { city, distance } = splitRoute(order.route);
                    return (
                      <tr key={order.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-4 py-3 truncate text-center text-sm text-gray-500">
                          {order.client}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">
                          <div>{city}</div>
                          {distance && <div className="text-xs text-gray-400">{distance}</div>}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${priorityColor(order.priority)}`}>
                            {order.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${statusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Available Vehicles */}
          <div className="bg-white p-4 border border-gray-300 mb-4">
            <h3 className="text-sm font-bold text-black mb-4">Available Vehicles</h3>
            <div className="flex flex-wrap gap-6">
              {/* Card 1: TRK-001 */}
              <div className="w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-sm">TRK-001</div>
                <div className="text-xs text-gray-500 mb-2">Heavy Truck</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div><span className="font-medium">Driver:</span> John Doe</div>
                  <div><span className="font-medium">Capacity:</span> 10 tons</div>
                  <div><span className="font-medium">Location:</span> Mumbai Hub</div>
                </div>
                <div className="mt-2">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Available</span>
                </div>
                <button className="mt-3 w-full text-xs bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
                  Assign to Order
                </button>
              </div>

              {/* Card 2: VAN-045 */}
              <div className="w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-sm">VAN-045</div>
                <div className="text-xs text-gray-500 mb-2">Delivery Van</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div><span className="font-medium">Driver:</span> Mike Wilson</div>
                  <div><span className="font-medium">Capacity:</span> 2 tons</div>
                  <div><span className="font-medium">Location:</span> En Route</div>
                </div>
                <div className="mt-2">
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">In Use</span>
                </div>
                <button className="mt-3 w-full text-xs bg-gray-400 text-white py-2 rounded-md cursor-not-allowed">
                  Currently Assigned
                </button>
              </div>

              {/* Card 3: VAN-045 (duplicate) */}
              <div className="w-77 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-sm">VAN-045</div>
                <div className="text-xs text-gray-500 mb-2">Delivery Van</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div><span className="font-medium">Driver:</span> Mike Wilson</div>
                  <div><span className="font-medium">Capacity:</span> 2 tons</div>
                  <div><span className="font-medium">Location:</span> En Route</div>
                </div>
                <div className="mt-2">
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">In Use</span>
                </div>
                <button className="mt-3 w-full text-xs bg-gray-400 text-white py-2 rounded-md cursor-not-allowed">
                  Currently Assigned
                </button>
              </div>
            </div>
          </div>

          {/* Live Tracking Dashboard */}
          <div className="bg-white p-6 border border-gray-300 rounded-md shadow-sm mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Live Tracking Dashboard</h3>
                <p className="text-sm text-gray-500">Real-time vehicle positions</p>
              </div>
              <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                View Map →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Map placeholder */}
              <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
                <span>📍 Interactive Map View</span>
              </div>

              {/* Right: Active Shipments with progress bars */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">Active Shipments</h4>

                {/* Card 1: TRK-001 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="font-semibold text-sm">TRK-001</div>
                  <div className="text-xs text-gray-500">Mumbai → Delhi</div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-0.5">
                      <span>Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 2: VAN-045 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="font-semibold text-sm">VAN-045</div>
                  <div className="text-xs text-gray-500">Chennai → Bangalore</div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-0.5">
                      <span>Progress</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 3: TRK-028 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="font-semibold text-sm">TRK-028</div>
                  <div className="text-xs text-gray-500">Kolkata → Bhubaneswar</div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-0.5">
                      <span>Progress</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Performance Analytics */}
          <div className="bg-white border border-gray-300 mb-4 p-4">
            {/* Header row with title + dropdown + button */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Performance Analytics</h2>
              <div className="flex items-center gap-3">
                {/* Last 7 days dropdown */}
                <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 hover:border-gray-400 transition-colors">
                  <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-5 text-gray-700 text-sm">
                    <option>Last 7 days</option>
                    <option>Last 14 days</option>
                    <option>Last 30 days</option>
                  </select>
                  <span className="pointer-events-none text-gray-400 text-[10px] absolute right-2">▼</span>
                </div>
                {/* Export Report button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md transition-colors">
                  Export Report
                </button>
              </div>
            </div>

            {/* Metric cards */}
            <div className="flex gap-4">
              <div className="bg-blue-100 rounded-lg p-4 h-25 w-60 border border-none shadow-sm text-center">
                <div className="text-4xl font-bold text-gray-800">94.5%</div>
                <div className="text-sm font-medium text-gray-600 mt-1">On-Time Delivery</div>
                <div className="text-center gap-1 mt-1 text-green-600 text-sm font-semibold">
                  <span>↑</span>
                  <span>+2.3%</span>
                </div>
              </div>
              <div className="bg-green-100 rounded-lg p-4 h-25 w-60 border border-none shadow-sm text-center">
                <div className="text-4xl font-bold text-gray-800">87%</div>
                <div className="text-sm font-medium text-gray-600 mt-1">Vehicle Utilization</div>
                <div className="text-center gap-1 mt-1 text-green-600 text-sm font-semibold">
                  <span>↑</span>
                  <span>+5.1%</span>
                </div>
              </div>
              <div className="bg-orange-100 rounded-lg p-4 h-25 w-60 border border-none shadow-sm text-center">
                <div className="text-4xl font-bold text-gray-800">2.1%</div>
                <div className="text-sm font-medium text-gray-600 mt-1">Damage Rate</div>
                <div className="text-center gap-1 mt-1 text-red-600 text-sm font-semibold">
                  <span>↓</span>
                  <span>-0.8%</span>
                </div>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 h-25 w-60 border border-none shadow-sm text-center">
                <div className="text-4xl font-bold text-gray-800">4.8</div>
                <div className="text-sm font-medium text-gray-600 mt-1">Avg Rating</div>
                <div className=" gap-1 mt-1 text-green-600 text-sm font-semibold text-center">
                  <span>↑</span>
                  <span>+0.2</span>
                </div>
              </div>
            </div>

            <div className="bg-light-gray border border-none ml-0 mt-4 mr-0 h-60 flex flex-col items-center justify-center gap-1">
              <IoTrendingDownSharp className="text-gray-500 w-6 h-6" />
              <span>Performance Trends Chart</span>
              <span>weekly delivery performance metrics</span>
            </div>
          </div>

          {/* Recent{/* Recent Activities */}
          <div class="bg-white border border-gray-300">
            <div className="flex items-center justify-between p-4">
              <h2 className="font-bold">Recent Activities</h2>
              <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-sm font-medium">
                <GrView className="w-4 h-4 text-black" />
                View all
              </button>
            </div>

            <div class="flex gap-3 items-start px-4 py-2 border-none w-255 bg-light-gray m-4">
              <div class="bg-gray-200 rounded-full p-1 flex-shrink-0 mt-1  bg-green-300">
                <LuChevronRight class="w-4 h-4 " />
              </div>
              <div>
                <div class="font-semibold text-sm">Order #LG-2024-001247 delivered successfully</div>
                <div class="text-xs text-gray-600">Vehicle TRK-001 completed delivery to Acme Corporation</div>
                <div class="text-xs text-gray-400">2 minutes ago</div>
              </div>
            </div>

            <div class="flex gap-3 items-start px-4 py-2 border-none w-255 bg-light-gray m-4">
              <div class="bg-blue-300 rounded-full p-1 flex-shrink-0 mt-1">
                <CiDeliveryTruck className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div class="font-semibold text-sm">Vehicle VAN-045 assigned to new order</div>
                <div class="text-xs text-gray-600">Order #LG-2024-001248 assigned to Mike Wilson</div>
                <div class="text-xs text-gray-400">15 minutes ago</div>
              </div>
            </div>

            <div class="flex gap-3 items-start px-4 py-2 border-none w-255 bg-light-gray m-4">
              <div class="bg-orange-300 rounded-full p-1 flex-shrink-0 mt-1">
                <RiAlertFill className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div class="font-semibold text-sm">Delay reported for Order #LG-2024-001245</div>
                <div class="text-xs text-gray-600">Traffic congestion causing 2-hour delay</div>
                <div class="text-xs text-gray-400">1 hour ago</div>
              </div>
            </div>

            <div class="flex gap-3 items-start px-4 py-2 border-none w-255 bg-light-gray m-4">
              <div class="bg-purple-300 rounded-full p-1 flex-shrink-0 mt-1">
                <IoPersonAddSharp className="w-4 h-4 text-gray-600" />
              </div>
              <div >
                <div class="font-semibold text-sm">New client registered</div>
                <div class="text-xs text-gray-600">TechFlow Enterprises added to client database</div>
                <div class="text-xs text-gray-400">3 hours ago</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Orders;