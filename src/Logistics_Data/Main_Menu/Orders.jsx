import React, { useState } from 'react';
import { MdOutlineClear } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiAlertFill } from "react-icons/ri";
import { LuChevronRight } from "react-icons/lu";
import { IoTrendingDownSharp } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { IoLocation } from "react-icons/io5";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import { IoTodaySharp } from "react-icons/io5";
import { MdFormatListBulleted } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";
import { HiOutlineRefresh } from "react-icons/hi";
import { FaClipboardList, FaClock, FaTruck, FaCheckCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { ImDownload3 } from "react-icons/im";
import { HiOutlineSortAscending } from "react-icons/hi";
import { FiCopy } from "react-icons/fi";
import { BsCheckCircleFill, BsExclamationTriangleFill, BsCircleFill } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GoPlus } from "react-icons/go";


function Orders() {

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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orderData.length / itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header – fixed alignment */}
      <div className="bg-white border-b border-gray-300 flex justify-between items-center px-8 -mx-8">
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Order Management</h1>
          <span className="text-sm text-gray-500">Manage and track all logistic orders</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-gray-600 border border-gray-300 rounded-md px-4 py-1.5 font-medium cursor-pointer hover:bg-gray-50">
            Export
          </span>
          <span className="bg-dark-navy-blue text-white px-4 py-1.5 rounded-md font-medium cursor-pointer hover:opacity-90">
            + New Order
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b border-gray-200 py-3 -mx-8 px-8 flex flex-row md:flex-row items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 hover:border-gray-400 transition-colors">
            <IoTodaySharp size={15} className='text-gray-500 flex-shrink-0' />
            <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-5 text-gray-700">
              <option>Last 7 days</option>
              <option>Last 14 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <span className="pointer-events-none text-gray-400 text-[10px] absolute right-2">▼</span>
          </div>

          <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 hover:border-gray-400 transition-colors">
            <IoLocation size={15} className="text-gray-500 flex-shrink-0" />
            <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 pr-1">
              <option>All Locations</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Chennai</option>
            </select>
            <span className="text-gray-400 text-[10px] pointer-events-none flex-shrink-0">▼</span>
          </div>

          <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 hover:border-gray-400 transition-colors">
            <MdOutlineSignalWifiStatusbar4Bar size={15} className="text-gray-500 flex-shrink-0" />
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

        <div className='flex flex-row gap-2 items-center'>
          <div className='flex bg-gray-100 p-1 rounded-lg'>
            <div className='p-2 bg-white shadow-sm rounded-md text-blue-700'>
              <MdFormatListBulleted size={15} />
            </div>
            <div className='p-2 text-gray-500 rounded-md'>
              <BsBoxes size={15} />
            </div>
          </div>
          <div className='p-2 text-gray-500'>
            <HiOutlineRefresh size={15} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 -mx-8 px-8 bg-light-gray">
        <div className="py-4">

          {/* Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 border border-gray-300 rounded-md flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-xs text-gray-500 tracking-wide">Total Orders</div>
                <div className="text-2xl font-bold text-gray-800 my-1">1,247</div>
                <div className="flex items-center text-xs text-green-600 font-medium">
                  <FaArrowUp size={10} className="mr-1" />
                  12% from last month
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg text-dark-navy-blue">
                <FaClipboardList size={20} />
              </div>
            </div>

            <div className="bg-white p-4 border border-gray-300 rounded-md flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-xs text-gray-500 tracking-wide">Pending Assignment</div>
                <div className="text-2xl font-bold text-gray-800 my-1">24</div>
                <div className="flex items-center text-xs text-red-600 font-medium">
                  <FaArrowDown size={10} className="mr-1" />
                  3% from yesterday
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg text-orange-500">
                <FaClock size={20} />
              </div>
            </div>

            <div className="bg-white p-4 border border-gray-300 rounded-md flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-xs text-gray-500 tracking-wide">In Transit</div>
                <div className="text-2xl font-bold text-gray-800 my-1">156</div>
                <div className="flex items-center text-xs text-blue-600 font-medium">
                  <FaArrowUp size={10} className="mr-1" />
                  8% from last week
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg text-dark-navy-blue">
                <FaTruck size={20} />
              </div>
            </div>

            <div className="bg-white p-4 border border-gray-300 rounded-md flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-xs text-gray-500 tracking-wide">Delivered Today</div>
                <div className="text-2xl font-bold text-gray-800 my-1">89</div>
                <div className="flex items-center text-xs text-green-600 font-medium">
                  <FaArrowUp size={10} className="mr-1" />
                  15% from yesterday
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <FaCheckCircle size={20} />
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="bg-white p-4 mb-4 rounded-md shadow-sm border border-gray-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-800">Advanced Filters</h3>
              <div className='flex items-center gap-1.5'>
                <HiOutlineMenuAlt3 size={18} className='text-gray-800' />
                <button className="text-xs font-medium text-dark-navy-blue hover:underline">More Options</button>
              </div>
            </div>
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex-1 min-w-[140px] flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Order Type</label>
                <select className="w-full text-xs text-gray-700 border border-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none bg-white">
                  <option>All Types</option>
                  <option>Standard</option>
                  <option>Express</option>
                  <option>Bulk</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px] flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Priority Level</label>
                <select className="w-full text-xs text-gray-700 border border-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none bg-white">
                  <option>All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px] flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Vehicle Type</label>
                <select className="w-full text-xs text-gray-700 border border-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none bg-white">
                  <option>All Vehicles</option>
                  <option>Truck</option>
                  <option>Van</option>
                  <option>Trailer</option>
                </select>
              </div>
              <div className="flex-1 min-w-[140px] flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Client Category</label>
                <select className="w-full text-xs text-gray-700 border border-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none bg-white">
                  <option>All Clients</option>
                  <option>Retail</option>
                  <option>Wholesale</option>
                  <option>Enterprise</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mb-4 border border-gray-300 rounded-md bg-white shadow">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-end gap-6">
              <button className="flex items-center gap-2 text-sm text-black hover:text-blue-600">
                <FaTruck size={16} />
                Bulk Assign
              </button>
              <button className="flex items-center gap-2 text-sm text-black hover:text-blue-600">
                <ImDownload3 size={16} />
                Export Selected
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>Page 1 of 25</span>
                <button className="text-gray-400 hover:text-gray-600"><FaChevronLeft size={12} /></button>
                <button className="text-gray-400 hover:text-gray-600"><FaChevronRight size={12} /></button>
              </div>
            </div>

            <table className="w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-12 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sr.No</th>
                  <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">Order ID <HiOutlineSortAscending size={14} /></div>
                  </th>
                  <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">Client <HiOutlineSortAscending size={14} /></div>
                  </th>
                  <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">Date Created <HiOutlineSortAscending size={14} /></div>
                  </th>
                  <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th scope="col" className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">Priority <HiOutlineSortAscending size={14} /></div>
                  </th>
                  <th scope="col" className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">Status <HiOutlineSortAscending size={14} /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderData.map((order, index) => {
                  const { city, distance } = splitRoute(order.route);
                  const initials = order.client.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  const avatarColors = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-gray-100 text-gray-600'];
                  const avatarColor = avatarColors[index % avatarColors.length];

                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">{index + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                        <div className="flex items-center gap-1">
                          <span>#{order.id}</span>
                          <FiCopy size={12} className="text-gray-400 cursor-pointer" />
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${avatarColor}`}>
                            {initials}
                          </div>
                          <div>
                            <div className="text-gray-900">{order.client}</div>
                            <div className="text-xs text-gray-500">
                              {order.client === 'AC' ? 'contact@acme.com' :
                                order.client === 'GI' ? 'orders@global.com' :
                                  order.client === 'ST' ? 'logistics@startech.com' : 'shipping@techflow.com'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div>{order.date.split(' ').slice(0, 3).join(' ')}</div>
                        <div className="text-xs text-gray-400">{order.date.split(' ').slice(3).join(' ')}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div>{city}</div>
                        {distance && <div className="text-xs text-gray-400">{distance}</div>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-4 font-semibold rounded-full ${priorityColor(order.priority)}`}>
                          {order.priority === 'High' ? <BsExclamationTriangleFill size={10} /> :
                            order.priority === 'Medium' ? <BsExclamationTriangleFill size={10} /> :
                              <BsCircleFill size={10} />}
                          {order.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-4 font-semibold rounded-full ${statusColor(order.status)}`}>
                          {order.status === 'Pending' ? <BsCircleFill size={10} /> :
                            order.status === 'Assigned' ? <BsCheckCircleFill size={10} /> :
                              order.status === 'Issue' ? <BsExclamationTriangleFill size={10} /> :
                                <BsCircleFill size={10} />}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-xs text-gray-500">Showing 1 to 10 of 248 results</div>
              <div className="flex gap-1">
                <button className="px-3 py-1 border rounded text-gray-600 disabled:opacity-50">Previous</button>
                <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
                <button className="px-3 py-1 border rounded text-gray-600">2</button>
                <button className="px-3 py-1 border rounded text-gray-600">3</button>
                <button className="px-3 py-1 border rounded text-gray-600">...</button>
                <button className="px-3 py-1 border rounded text-gray-600">25</button>
                <button className="px-3 py-1 border rounded text-gray-600">Next</button>
              </div>
            </div>
          </div>

          {/* ========== AVAILABLE VEHICLES – EXACTLY AS PER IMAGE ========== */}
          <div className="bg-white p-4 border border-gray-300 mb-4">
            <h3 className="text-sm font-bold text-black mb-4">Available Vehicles</h3>


            <div className="flex flex-wrap gap-6">

              {/* <!-- Card 1: TRK-001 --> */}
              <div class="w-80 bg-white border border-gray-200 rounded-md p-4">
                <div class="flex justify-between items-start">
                  <div class="flex items-center gap-2">

                    <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                      <FaTruck class="text-green-700" size={18} />
                    </div>
                    <div>
                      <div class="font-bold text-lg text-gray-800">TRK-001</div>
                      <div class="text-sm text-gray-500">Heavy Truck</div>
                    </div>
                  </div>
                  <span class="text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">Available</span>
                </div>
                <div class="mt-3 space-y-1.5 text-sm text-gray-600 border-t border-gray-100 pt-3">
                  <div class="flex justify-between"><span class="font-medium text-gray-700">Driver:</span> <span>John Doe</span></div>
                  <div class="flex justify-between"><span class="font-medium text-gray-700">Capacity:</span> <span>10 tons</span></div>
                  <div class="flex justify-between"><span class="font-medium text-gray-700">Location:</span> <span>Mumbai Hub</span></div>
                </div>
                <button class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-200 shadow-sm hover:shadow">
                  Assign to Order
                </button>
              </div>


              <div class="w-80 bg-white border border-gray-200 rounded-md p-4">
                <div class="flex justify-between items-start">
                  <div class="flex items-center gap-2">
                    <div className='w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center'>
                      <FaTruck class="text-blue-500" size={18} />
                    </div>
                    <div>
                      <div class="font-bold text-lg text-gray-800">VAN-045</div>
                      <div class="text-sm text-gray-500">Delivery Van</div>
                    </div>
                  </div>
                  <span class="text-xs font-medium text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full">
                    In Use
                  </span>
                </div>
                <div class="mt-3 space-y-1.5 text-sm text-gray-600 border-t border-gray-100 pt-3">
                  <div class="flex justify-between"><span class="font-medium text-gray-700">Driver:</span><span>Mike Wilson</span></div>
                  <div class="flex justify-between"><span class="font-medium text-gray-700">Capacity:</span><span>2 tons</span></div>
                  <div class="flex justify-between"><span class="font-medium text-gray-700">Location:</span><span>En Route</span>
                  </div>
                </div>
                <button
                  class="mt-4 w-full bg-gray-300 text-gray-500 text-sm font-medium py-2.5 rounded-lg cursor-not-allowed shadow-sm"
                  disabled
                >
                  Currently Assigned
                </button>
              </div>



              <div class="w-80 bg-white border border-gray-200 rounded-md p-4 ">
                <div className='flex justify-between items-start'>
                  <div class="flex items-center gap-2">
                    <div className='w-8 h-8 bg-red-100 rounded-md flex items-center justify-center'>
                      <FaTruck class="text-red-500" size={18} />
                    </div>
                    <div>
                      <div class="font-bold text-lg text-gray-800">TRK-028</div>
                      <div class="text-sm text-gray-500">Container Truck</div>
                    </div>
                  </div>
                  <span class="text-xs font-medium text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                    Maintenance
                  </span>
                </div>


                <div class="mt-3 space-y-1.5 text-sm text-gray-600 border-t border-gray-100 pt-3">
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Driver:</span>
                    <span>Sarah Johnson</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Capacity:</span>
                    <span>20 tons</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Location:</span>
                    <span>Service Center</span>
                  </div>
                </div>

                <button
                  class="mt-4 w-full bg-gray-300 text-gray-500 text-sm font-medium py-2.5 rounded-lg cursor-not-allowed shadow-sm"
                  disabled
                >
                  Under Maintenance
                </button>
              </div>

            </div>
          </div>
          {/* ========== END AVAILABLE VEHICLES ========== */}

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
              <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center text-gray-400 text-sm border border-gray-200">
                <span>📍 Interactive Map View</span>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">Active Shipments</h4>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Performance Analytics</h2>
              <div className="flex items-center gap-3">
                <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 hover:border-gray-400 transition-colors">
                  <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-5 text-gray-700 text-sm">
                    <option>Last 7 days</option>
                    <option>Last 14 days</option>
                    <option>Last 30 days</option>
                  </select>
                  <span className="pointer-events-none text-gray-400 text-[10px] absolute right-2">▼</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md transition-colors">
                  Export Report
                </button>
              </div>
            </div>
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

          {/* Recent Activities */}
          <div className="bg-white border border-gray-300">
            <div className="flex items-center justify-between p-4">
              <h2 className="font-bold">Recent Activities</h2>
              <button className="flex items-center gap-1 text-dark-navy-blue hover:text-purple-800 text-sm font-medium">
                <GrView className="w-4 h-4 text-dark-navy-blue" />
                View all
              </button>
            </div>
            <div className="flex gap-3 items-start px-4 py-2 border-none w-255 bg-light-gray m-4">
              <div className="rounded-full p-1  mt-1 bg-green-100 text-green-700">
                <LuChevronRight className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-sm">Order #LG-2024-001247 delivered successfully</div>
                <div className="text-xs text-gray-600">Vehicle TRK-001 completed delivery to Acme Corporation</div>
                <div className="text-xs text-gray-400">2 minutes ago</div>
              </div>
            </div>
            <div className="flex gap-3 items-start px-4 py-2 border-none w-255 bg-light-gray m-4">
              <div className="rounded-full p-1  mt-1 bg-blue-100 text-blue-700">
                <CiDeliveryTruck className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="font-semibold text-sm">Vehicle VAN-045 assigned to new order</div>
                <div className="text-xs text-gray-600">Order #LG-2024-001248 assigned to Mike Wilson</div>
                <div className="text-xs text-gray-400">15 minutes ago</div>
              </div>
            </div>
            <div className="flex gap-3 items-start px-4 py-2 border-none w-255 bg-light-gray m-4">
              <div className="rounded-full p-1  mt-1  bg-orange-100 text-orange-700">
                <RiAlertFill className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="font-semibold text-sm">Delay reported for Order #LG-2024-001245</div>
                <div className="text-xs text-gray-600">Traffic congestion causing 2-hour delay</div>
                <div className="text-xs text-gray-400">1 hour ago</div>
              </div>
            </div>
            <div className="flex gap-3 items-start px-4 py-2 border-none w-255 bg-light-gray m-4">
              <div className=" rounded-full p-1  mt-1 bg-purple-100 text-purple-700">
                <IoPersonAddSharp className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <div className="font-semibold text-sm">New client registered</div>
                <div className="text-xs text-gray-600">TechFlow Enterprises added to client database</div>
                <div className="text-xs text-gray-400">3 hours ago</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Orders;