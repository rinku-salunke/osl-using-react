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
import { BsCheckCircleFill, BsExclamationTriangleFill, BsCircleFill } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { FaMapMarkedAlt, FaMapMarkerAlt } from 'react-icons/fa';

// Status icon map – clean and reusable
const STATUS_ICONS = {
  Pending: <BsCircleFill size={8} />,
  Assigned: <BsCheckCircleFill size={8} />,
  Issue: <BsExclamationTriangleFill size={8} />,
  'In Transit': <FaTruck size={8} />,
};

function Orders() {
  const orderData = [
    {
      id: '#LG-2024-001247',
      client: 'Acme Corporation',
      date: 'Jan 15, 2024 09:30 AM',
      route: 'Mumbai → Delhi 850 km',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: '#LG-2024-001246',
      client: 'Global Industries',
      date: 'Jan 15, 2024 08:15 AM',
      route: 'Chennai → Bangalore 350 km',
      priority: 'Medium',
      status: 'Assigned'
    },
    {
      id: '#LG-2024-001245',
      client: 'StarTech Solutions',
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
  const [selectedOrders, setSelectedOrders] = useState([]);

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
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Assigned': return 'bg-blue-100 text-blue-800';
      case 'Issue': return 'bg-red-100 text-red-800';
      case 'In Transit': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orderData.length / itemsPerPage);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header – कॉम्पॅक्ट, कोणतेही negative margins नाही */}
      <header className="bg-white border-b border-gray-300 flex justify-between items-center px-6 py-2">
        <div className="flex flex-col">
          <h1 className="font-bold text-black text-lg">Order Management</h1>
          <span className="text-xs text-gray-500">Manage and track all logistic orders</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-gray-600 border border-gray-300 rounded-md px-4 py-1 text-sm font-medium cursor-pointer hover:bg-gray-50">
            Export
          </span>
          <span className="bg-blue-900 text-white px-4 py-1 rounded-md text-sm font-medium cursor-pointer hover:opacity-90">
            + New Order
          </span>
        </div>
      </header>

      {/* Filter Bar – कॉम्पॅक्ट */}
      <div className="border-b border-gray-200 py-1.5 px-6 flex flex-wrap items-center justify-between gap-2 bg-white">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1 hover:border-gray-400 transition-colors">
            <IoTodaySharp size={14} className="text-gray-500 flex-shrink-0" />
            <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-4 text-gray-700 text-xs">
              <option>Last 7 days</option>
              <option>Last 14 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <span className="pointer-events-none text-gray-400 text-[9px] absolute right-1.5">
              <RiArrowDropDownLine size={23} />
            </span>
          </div>

          <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1 hover:border-gray-400 transition-colors">
            <IoLocation size={14} className="text-gray-500 flex-shrink-0" />
            <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 text-xs pr-1">
              <option>All Locations</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Chennai</option>
            </select>
            <RiArrowDropDownLine size={23} />
          </div>

          <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1 hover:border-gray-400 transition-colors">
            <MdOutlineSignalWifiStatusbar4Bar size={14} className="text-gray-500 flex-shrink-0" />
            <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-4 text-gray-700 text-xs">
              <option>All Status</option>
              <option>Pending</option>
              <option>Assigned</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Issue</option>
            </select>
            <RiArrowDropDownLine size={23} />
          </div>

          <button className="text-black-600 hover:underline flex items-center gap-1 text-xs">
            Clear all <MdOutlineClear size={14} />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <div className="p-1.5 bg-white shadow-sm rounded-md text-blue-700">
              <MdFormatListBulleted size={14} />
            </div>
            <div className="p-1.5 text-gray-500 rounded-md">
              <BsBoxes size={14} />
            </div>
          </div>
          <div className="p-1.5 text-gray-500">
            <HiOutlineRefresh size={14} />
          </div>
        </div>
      </div>

      {/* Main Content – compact spacing, no negative margins */}
      <div className="flex-1 px-6 py-3 bg-gray-50 space-y-3">
        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-[10px] text-gray-500 tracking-wide">Total Orders</div>
              <div className="text-xl font-bold text-gray-800 my-0.5">1,247</div>
              <div className="flex items-center text-[10px] text-green-600 font-medium">
                <FaArrowUp size={9} className="mr-1" />
                12% from last month
              </div>
            </div>
            <div className="bg-blue-100 p-2.5 rounded-lg text-blue-900">
              <FaClipboardList size={18} />
            </div>
          </div>

          <div className="bg-white p-3 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-[10px] text-gray-500 tracking-wide">Pending Assignment</div>
              <div className="text-xl font-bold text-gray-800 my-0.5">24</div>
              <div className="flex items-center text-[10px] text-red-600 font-medium">
                <FaArrowDown size={9} className="mr-1" />
                3% from yesterday
              </div>
            </div>
            <div className="bg-orange-100 p-2.5 rounded-lg text-orange-500">
              <FaClock size={18} />
            </div>
          </div>

          <div className="bg-white p-3 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-[10px] text-gray-500 tracking-wide">In Transit</div>
              <div className="text-xl font-bold text-gray-800 my-0.5">156</div>
              <div className="flex items-center text-[10px] text-blue-600 font-medium">
                <FaArrowUp size={9} className="mr-1" />
                8% from last week
              </div>
            </div>
            <div className="bg-blue-100 p-2.5 rounded-lg text-blue-900">
              <FaTruck size={18} />
            </div>
          </div>

          <div className="bg-white p-3 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-[10px] text-gray-500 tracking-wide">Delivered Today</div>
              <div className="text-xl font-bold text-gray-800 my-0.5">89</div>
              <div className="flex items-center text-[10px] text-green-600 font-medium">
                <FaArrowUp size={9} className="mr-1" />
                15% from yesterday
              </div>
            </div>
            <div className="bg-green-100 p-2.5 rounded-lg text-green-600">
              <FaCheckCircle size={18} />
            </div>
          </div>
        </div>

        {/* Advanced Filters – compact */}
        <div className="bg-white p-2.5 rounded-md shadow-sm border border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-800">Advanced Filters</h3>
            <div className="flex items-center gap-1">
              <HiOutlineMenuAlt3 size={16} className="text-gray-800" />
              <button className="text-[10px] font-medium text-blue-900 hover:underline">More Options</button>
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-2">
            <div className="flex-1 min-w-[120px] flex flex-col gap-0.5">
              <label className="text-[10px] font-medium text-gray-600">Order Type</label>
              <select className="w-full text-xs text-gray-700 border border-gray-300 rounded-md px-2 py-1 focus:outline-none bg-white">
                <option>All Types</option>
                <option>Standard</option>
                <option>Express</option>
                <option>Bulk</option>
              </select>
            </div>
            <div className="flex-1 min-w-[120px] flex flex-col gap-0.5">
              <label className="text-[10px] font-medium text-gray-600">Priority Level</label>
              <select className="w-full text-xs text-gray-700 border border-gray-300 rounded-md px-2 py-1 focus:outline-none bg-white">
                <option>All Priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="flex-1 min-w-[120px] flex flex-col gap-0.5">
              <label className="text-[10px] font-medium text-gray-600">Vehicle Type</label>
              <select className="w-full text-xs text-gray-700 border border-gray-300 rounded-md px-2 py-1 focus:outline-none bg-white">
                <option>All Vehicles</option>
                <option>Truck</option>
                <option>Van</option>
                <option>Trailer</option>
              </select>
            </div>
            <div className="flex-1 min-w-[120px] flex flex-col gap-0.5">
              <label className="text-[10px] font-medium text-gray-600">Client Category</label>
              <select className="w-full text-xs text-gray-700 border border-gray-300 rounded-md px-2 py-1 focus:outline-none bg-white">
                <option>All Clients</option>
                <option>Retail</option>
                <option>Wholesale</option>
                <option>Enterprise</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table – compact */}
        <div className="border border-gray-300 rounded-md bg-white shadow-sm">
          <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-end gap-4 flex-wrap">
            <button className="flex items-center gap-1.5 text-xs text-black hover:text-blue-600">
              <FaTruck size={14} />
              Bulk Assign
            </button>
            <button className="flex items-center gap-1.5 text-xs text-black hover:text-blue-600">
              <ImDownload3 size={14} />
              Export Selected
            </button>
            <div className="flex items-center gap-1.5 text-xs text-gray-700">
              <span>Page 1 of 25</span>
              <button className="text-gray-400 hover:text-gray-600"><FaChevronLeft size={10} /></button>
              <button className="text-gray-400 hover:text-gray-600"><FaChevronRight size={10} /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-10 px-3 py-2 text-center text-[10px] font-medium text-gray-500 tracking-wider">Sr.No</th>
                  <th scope="col" className="w-1/6 px-3 py-2 text-left text-[10px] font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1">Order ID <RiExpandUpDownFill size={12} /></div>
                  </th>
                  <th scope="col" className="w-1/6 px-3 py-2 text-left text-[10px] font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1">Client <RiExpandUpDownFill size={12} /></div>
                  </th>
                  <th scope="col" className="w-1/6 px-3 py-2 text-left text-[10px] font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1">Date Created <MdOutlineArrowDropDown size={16} /></div>
                  </th>
                  <th scope="col" className="w-1/6 px-3 py-2 text-left text-[10px] font-medium text-gray-500 tracking-wider">Route</th>
                  <th scope="col" className="w-1/12 px-3 py-2 text-left text-[10px] font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1">Priority</div>
                  </th>
                  <th scope="col" className="w-1/12 px-3 py-2 text-left text-[10px] font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1">Status <RiExpandUpDownFill size={12} /></div>
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
                      <td className="px-3 py-2 whitespace-nowrap text-center text-xs text-gray-500">{index + 1}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-dark-navy-blue">
                        <div className="flex items-center gap-1.5 cursor-pointer group" onClick={() => navigator.clipboard.writeText(order.id)}>
                          <span>#{order.id}</span>
                          <FaCopy className="text-gray-400 group-hover:text-blue-600 transition-colors" size={10} />
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${order.client === 'TechFlow Enterprises' ? 'bg-gray-100' : avatarColor}`}>
                            {order.client === 'TechFlow Enterprises' ? (
                              // येथे तुमची dummy image URL द्या
                              <img
                                src="https://picsum.photos/seed/tech/30/30"
                                alt="TechFlow"
                                className="h-7 w-7 rounded-full object-cover"
                              />
                            ) : (
                              initials
                            )}
                          </div>
                          <div>
                            <div className="text-gray-900 text-xs">{order.client}</div>
                            <div className="text-[10px] text-gray-500">
                              {order.client === 'Acme Corporation' ? 'contact@acme.com' :
                                order.client === 'Global Industries' ? 'orders@global.com' :
                                  order.client === 'StarTech Solutions' ? 'logistics@startech.com' : 'shipping@techflow.com'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                        <div>{order.date.split(' ').slice(0, 3).join(' ')}</div>
                        <div className="text-[10px] text-gray-400">{order.date.split(' ').slice(3).join(' ')}</div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                        <div>{city}</div>
                        {distance && <div className="text-[10px] text-gray-400">{distance}</div>}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 inline-flex items-center gap-1 text-[10px] leading-3 font-semibold rounded-full ${priorityColor(order.priority)}`}>
                          {order.priority === 'High' ? <BsExclamationTriangleFill size={8} /> :
                            order.priority === 'Medium' ? <BsExclamationTriangleFill size={8} /> :
                              <BsCircleFill size={8} />}
                          {order.priority}
                        </span>
                      </td>
                      {/* Updated status cell – uses the STATUS_ICONS map */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className='font-bold text-xs'>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-3 py-2 border-t border-gray-200 flex items-center justify-between flex-wrap gap-2">
            <div className="text-[10px] text-gray-500">Showing 1 to 10 of 248 results</div>
            <div className="flex gap-1">
              <button className="px-2.5 py-1 border rounded text-gray-600 text-xs disabled:opacity-50">Previous</button>
              <button className="px-2.5 py-1 border rounded bg-dark-navy-blue text-white text-xs">1</button>
              <button className="px-2.5 py-1 border rounded text-gray-600 text-xs">2</button>
              <button className="px-2.5 py-1 border rounded text-gray-600 text-xs">3</button>
              <button className="px-2.5 py-1 border rounded text-gray-600 text-xs">...</button>
              <button className="px-2.5 py-1 border rounded text-gray-600 text-xs">25</button>
              <button className="px-2.5 py-1 border rounded text-gray-600 text-xs">Next</button>
            </div>
          </div>
        </div>
        {/* Available Vehicles – compact */}
        <div className="bg-white p-3 border border-gray-300 rounded-md">
          <div className='flex justify-between items-center mb-2'>
            <h3 className="text-xs font-bold text-black">Available Vehicles</h3>

            <button
              className='flex items-center gap-1.5 text-dark-navy-blue text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity'
              type="button">
              <GoPlus size={20} />
              Add Vehicle
            </button>
          </div>

          {/* Container: Added flex-wrap, removed extra right space */}
          <div className="flex flex-wrap gap-4">

            {/* Card 1: Changed w-72 to flex-1 so it stretches */}
            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-green-100 rounded-md flex items-center justify-center">
                    <FaTruck className="text-green-700" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">TRK-001</div>
                    <div className="text-xs text-gray-500">Heavy Truck</div>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Available</span>
              </div>
              <div className="mt-2 space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-2 font-bold">
                <div className="flex justify-between"><span className="font-medium text-gray-700">Driver:</span> <span>John Doe</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Capacity:</span> <span>10 tons</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Location:</span> <span>Mumbai Hub</span></div>
              </div>
              <button className="mt-3 w-full bg-dark-navy-blue text-white text-xs font-medium py-2 rounded-lg transition-colors shadow-sm hover:shadow">
                Assign to Order
              </button>
            </div>

            {/* Card 2: Changed w-72 to flex-1 */}
            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-100 rounded-md flex items-center justify-center">
                    <FaTruck className="text-blue-500" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">VAN-045</div>
                    <div className="text-xs text-gray-500">Delivery Van</div>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">In Use</span>
              </div>
              <div className="mt-2 space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-2 font-bold">
                <div className="flex justify-between"><span className="font-medium text-gray-700">Driver:</span><span>Mike Wilson</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Capacity:</span><span>2 tons</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Location:</span><span>En Route</span></div>
              </div>
              <button className="mt-3 w-full bg-gray-300 text-gray-500 text-xs font-medium py-2 rounded-lg cursor-not-allowed shadow-sm" disabled>
                Currently Assigned
              </button>
            </div>

            {/* Card 3: Changed w-72 to flex-1 */}
            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-red-100 rounded-md flex items-center justify-center">
                    <FaTruck className="text-red-500" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">TRK-028</div>
                    <div className="text-xs text-gray-500">Container Truck</div>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Maintenance</span>
              </div>
              <div className="mt-2 space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-2">
                <div className="flex justify-between"><span className="font-medium text-gray-700">Driver:</span><span className="font-bold">Sarah Johnson</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Capacity:</span><span>20 tons</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Location:</span><span className="font-bold">Service Center</span></div>
              </div>
              <button className="mt-3 w-full bg-gray-300 text-gray-500 text-xs font-medium py-2 rounded-lg cursor-not-allowed shadow-sm" disabled>
                Under Maintenance
              </button>
            </div>
          </div>
        </div>
        {/* Live Tracking Dashboard */}
        <div className="bg-white p-4 border border-gray-300 rounded-md shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-800">Live Tracking Dashboard</h3>
              <p className="text-xs text-gray-500">Real-time vehicle positions</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Live Updates
              </span>
              <button className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium">
                <FaMapMarkedAlt size={14} />
                Full Map
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Map Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-6 h-64 flex flex-col items-center justify-center relative border border-gray-200">
              {/* Colored dots */}
              <div className="absolute top-10 left-12 w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
              <div className="absolute bottom-16 left-28 w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
              <div className="absolute top-16 right-20 w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>

              {/* Center Content */}
              <FaMapMarkerAlt size={40} className="text-gray-400 mb-2" />
              <div className="font-semibold text-gray-700 text-sm">Interactive Map View</div>
              <div className="text-xs text-gray-500">Real-time vehicle positions</div>
            </div>

            {/* Right Shipments Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-800">Active Shipments</h4>

              {/* Shipment Card 1 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <div>
                      <div className="text-xs font-bold text-gray-800">TRK-001</div>
                      <div className="text-[10px] text-gray-500">Mumbai → Delhi</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">On Time</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              {/* Shipment Card 2 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <div>
                      <div className="text-xs font-bold text-gray-800">VAN-045</div>
                      <div className="text-[10px] text-gray-500">Chennai → Bangalore</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">In Transit</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>

              {/* Shipment Card 3 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                    <div>
                      <div className="text-xs font-bold text-gray-800">TRK-028</div>
                      <div className="text-[10px] text-gray-500">Kolkata → Bhubaneswar</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">Delayed</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Performance Analytics */}
        <div className="bg-white border border-gray-300 rounded-md p-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base text-gray-800">Performance Analytics</h2>
            <div className="flex items-center gap-2">
              <div className="relative flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-md px-2 py-0.5 hover:border-gray-400 transition-colors">
                <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-4 text-gray-700 text-xs">
                  <option>Last 7 days</option>
                  <option>Last 14 days</option>
                  <option>Last 30 days</option>
                </select>
                <span className="pointer-events-none text-gray-400 text-[9px] absolute right-1">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
              <button className="text-blue-900 text-xs flex items-center gap-1">
                <ImDownload3 size={14} />
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-blue-100 rounded-lg p-3 border border-blue-100 text-center">
              <div className="text-2xl font-bold text-gray-800">94.5%</div>
              <div className="text-xs font-medium text-gray-600 mt-0.5">On-Time Delivery</div>
              <div className="flex items-center gap-1 mt-1 text-green-600 text-xs font-semibold flex justify-center">
                <FaArrowUp size={10} />
                <span>+2.3%</span>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-3 border border-green-100 text-center">
              <div className="text-2xl font-bold text-gray-800">87%</div>
              <div className="text-xs font-medium text-gray-600 mt-0.5">Vehicle Utilization</div>
              <div className="flex items-center gap-1 mt-1 text-green-600 text-xs font-semibold flex justify-center">
                <FaArrowUp size={10} />
                <span>+5.1%</span>
              </div>
            </div>
            <div className="bg-orange-100 rounded-lg p-3 border border-orange-100 text-center">
              <div className="text-2xl font-bold text-gray-800">2.1%</div>
              <div className="text-xs font-medium text-gray-600 mt-0.5">Damage Rate</div>
              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs font-semibold flex justify-center">
                <FaArrowDown size={10} />
                <span>-0.8%</span>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-3 border border-purple-100 text-center">
              <div className="text-2xl font-bold text-gray-800">4.8</div>
              <div className="text-xs font-medium text-gray-600 mt-0.5">Avg Rating</div>
              <div className="flex items-center gap-1 mt-1 text-green-600 text-xs font-semibold flex justify-center">
                <FaArrowUp size={10} />
                <span>+0.2</span>
              </div>
            </div>
          </div>

          <div className="mt-3 bg-gray-50 border border-none rounded-lg h-48 flex flex-col items-center justify-center gap-1">
            <IoTrendingDownSharp className="text-gray-400 w-6 h-6" />
            <span className="text-xs font-medium text-gray-500">Performance Trends Chart</span>
            <span className="text-[10px] text-gray-400">weekly delivery performance metrics</span>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-gray-300 rounded-md">
          <div className="flex items-center justify-between p-3">
            <h2 className="font-bold text-sm text-gray-800">Recent Activities</h2>
            <button className="flex items-center gap-1 text-blue-900 hover:text-purple-800 text-xs font-medium">
              <GrView className="w-3.5 h-3.5" />
              View all
            </button>
          </div>

          <div className="flex gap-3 items-start px-3 py-1.5 bg-gray-50 m-2 rounded-md">
            <div className="rounded-full p-1 mt-0.5 bg-green-100 text-green-700">
              <LuChevronRight className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-xs text-gray-800">Order #LG-2024-001247 delivered successfully</div>
              <div className="text-[10px] text-gray-600">Vehicle TRK-001 completed delivery to Acme Corporation</div>
              <div className="text-[10px] text-gray-400">2 minutes ago</div>
            </div>
          </div>

          <div className="flex gap-3 items-start px-3 py-1.5 bg-gray-50 m-2 rounded-md">
            <div className="rounded-full p-1 mt-0.5 bg-blue-100 text-blue-700">
              <CiDeliveryTruck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-xs text-gray-800">Vehicle VAN-045 assigned to new order</div>
              <div className="text-[10px] text-gray-600">Order #LG-2024-001248 assigned to Mike Wilson</div>
              <div className="text-[10px] text-gray-400">15 minutes ago</div>
            </div>
          </div>

          <div className="flex gap-3 items-start px-3 py-1.5 bg-gray-50 m-2 rounded-md">
            <div className="rounded-full p-1 mt-0.5 bg-orange-100 text-orange-700">
              <RiAlertFill className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-xs text-gray-800">Delay reported for Order #LG-2024-001245</div>
              <div className="text-[10px] text-gray-600">Traffic congestion causing 2-hour delay</div>
              <div className="text-[10px] text-gray-400">1 hour ago</div>
            </div>
          </div>

          <div className="flex gap-3 items-start px-3 py-1.5 bg-gray-50 m-2 rounded-md">
            <div className="rounded-full p-1 mt-0.5 bg-purple-100 text-purple-700">
              <IoPersonAddSharp className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-xs text-gray-800">New client registered</div>
              <div className="text-[10px] text-gray-600">TechFlow Enterprises added to client database</div>
              <div className="text-[10px] text-gray-400">3 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;