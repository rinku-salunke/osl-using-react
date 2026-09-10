import React, { useState } from 'react';
import { MdOutlineClear, MdFormatListBulleted, MdOutlineArrowDropDown } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoPersonAddSharp, IoTrendingDownSharp, IoLocation, IoTodaySharp } from "react-icons/io5";
import { RiAlertFill, RiArrowDropDownLine, RiExpandUpDownFill } from "react-icons/ri";
import { LuChevronRight } from "react-icons/lu";
import { GrView } from "react-icons/gr";
import { BsBoxes, BsCheckCircleFill, BsExclamationTriangleFill, BsCircleFill, BsSliders } from "react-icons/bs";
import { HiOutlineRefresh } from "react-icons/hi";
import {
  FaClipboardList,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkedAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { ImDownload3 } from "react-icons/im";
import { FaCopy, FaFilter } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";

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

  // -------- FILTER STATES --------
  const [dateFilter, setDateFilter] = useState('Last 30 days');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // -------- MORE OPTIONS STATE --------
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // -------- CLEAR ALL FUNCTION --------
  const handleClearAll = () => {
    setDateFilter('Last 30 days');
    setLocationFilter('All Locations');
    setStatusFilter('All Status');
  };

  const splitRoute = (route) => {
    const match = route.match(/^(.*?)(\d+\s*km)$/);
    if (match) {
      return { city: match[1].trim(), distance: match[2] };
    }
    return { city: route, distance: '' };
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-300 flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-black text-2xl">Order Management</h1>
          <span className="text-sm text-gray-500 mt-1">Manage and track all logistic orders</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-gray-600 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-50">
            Export
          </span>
          <span className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:opacity-90">
            + New Order
          </span>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="border-b border-gray-200 py-3 px-6 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {/* First Dropdown: Date */}
          <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-40 hover:border-gray-300">
            <IoTodaySharp size={16} className="text-gray-500 flex-shrink-0" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 text-sm w-full pr-6"
            >
              <option>Last 7 days</option>
              <option>Last 14 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
              <RiArrowDropDownLine size={20} />
            </span>
          </div>

          {/* Second Dropdown: Location */}
          <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-40 hover:border-gray-300">
            <IoLocation size={16} className="text-gray-500 flex-shrink-0" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 text-sm w-full pr-6"
            >
              <option>All Locations</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Chennai</option>
            </select>
            <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
              <RiArrowDropDownLine size={20} />
            </span>
          </div>

          {/* Third Dropdown: Status */}
          <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-40 hover:border-gray-300">
            <FaFilter size={14} className="text-gray-500 flex-shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 text-sm w-full pr-6"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Assigned</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Issue</option>
            </select>
            <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
              <RiArrowDropDownLine size={20} />
            </span>
          </div>
          <button
            onClick={handleClearAll}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1.5 text-sm ml-1 cursor-pointer"
          >
            Clear all <MdOutlineClear size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <div className="p-2 bg-white shadow-sm rounded-md text-blue-700">
              <MdFormatListBulleted size={14} />
            </div>
            <div className="p-2 text-gray-500 rounded-md">
              <BsBoxes size={14} />
            </div>
          </div>
          <div className="p-2 text-gray-500">
            <HiOutlineRefresh size={14} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-5 bg-gray-50 space-y-5">
        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Total Orders</div>
              <div className="text-2xl font-bold text-gray-800 my-1">1,247</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <FaArrowUp size={10} className="mr-1" />
                12% from last month
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-blue-900">
              <FaClipboardList size={20} />
            </div>
          </div>

          <div className="bg-white p-4 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Pending Assignment</div>
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
              <div className="text-sm text-gray-500 font-medium">In Transit</div>
              <div className="text-2xl font-bold text-gray-800 my-1">156</div>
              <div className="flex items-center text-xs text-blue-600 font-medium">
                <FaArrowUp size={10} className="mr-1" />
                8% from last week
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-blue-900">
              <FaTruck size={20} />
            </div>
          </div>

          <div className="bg-white p-4 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Delivered Today</div>
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
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">Advanced Filters</h3>
            <button
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="flex items-center gap-1.5 text-xs font-medium text-dark-navy-blue"
            >
              <BsSliders size={16} className="text-dark-navy-blue" />
              More Options
            </button>
          </div>

          {/* Default Filters (Always Visible) */}
          <div className="flex flex-wrap items-start gap-3">
            <div className="flex-1 min-w-[120px] flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Order Type</label>
              <div className="relative">
                <select className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer">
                  <option>All Types</option>
                  <option>Standard</option>
                  <option>Express</option>
                  <option>Bulk</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[120px] flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Priority Level</label>
              <div className="relative">
                <select className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer">
                  <option>All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[120px] flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Vehicle Type</label>
              <div className="relative">
                <select className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer">
                  <option>All Vehicles</option>
                  <option>Truck</option>
                  <option>Van</option>
                  <option>Trailer</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[120px] flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Client Category</label>
              <div className="relative">
                <select className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer">
                  <option>All Clients</option>
                  <option>Retail</option>
                  <option>Wholesale</option>
                  <option>Enterprise</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
          </div>

          {/* More Options (Only When Clicked) */}
          {showMoreOptions && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-start gap-3">
                {/* Weight Range */}
                <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Weight Range</label>
                  <div className="relative">
                    <select className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer">
                      <option>All Weights</option>
                      <option>0 - 1 Ton</option>
                      <option>1 - 5 Tons</option>
                      <option>5 - 10 Tons</option>
                      <option>10+ Tons</option>
                    </select>
                    <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                      <RiArrowDropDownLine size={20} />
                    </span>
                  </div>
                </div>

                {/* Volume / Dimensions */}
                <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Volume / Dimensions</label>
                  <div className="relative">
                    <select className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer">
                      <option>All Volumes</option>
                      <option>0 - 100 cu.ft</option>
                      <option>100 - 500 cu.ft</option>
                      <option>500 - 1000 cu.ft</option>
                      <option>1000+ cu.ft</option>
                    </select>
                    <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                      <RiArrowDropDownLine size={20} />
                    </span>
                  </div>
                </div>

                {/* Number of Packages */}
                <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Number of Packages</label>
                  <div className="relative">
                    <select className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer">
                      <option>Any</option>
                      <option>1 - 10 Boxes</option>
                      <option>10 - 50 Boxes</option>
                      <option>50 - 100 Boxes</option>
                      <option>100+ Boxes</option>
                    </select>
                    <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                      <RiArrowDropDownLine size={20} />
                    </span>
                  </div>
                </div>

                {/* Temperature Control */}
                <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Temperature Control</label>
                  <div className="relative">
                    <select className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer">
                      <option>Any</option>
                      <option>Ambient (Normal)</option>
                      <option>Cold Chain (2-8°C)</option>
                      <option>Frozen (-20°C)</option>
                    </select>
                    <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                      <RiArrowDropDownLine size={20} />
                    </span>
                  </div>
                </div>

                {/* Vehicle Number / Driver Name */}
                <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Vehicle No. / Driver Name</label>
                  <input
                    type="text"
                    placeholder="e.g. TRK-001 or John Doe"
                    className="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none bg-white"
                  />
                </div>

                {/* Route (Origin / Destination) */}
                <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-600">Route (Origin → Destination)</label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai to Delhi"
                    className="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="border border-gray-300 rounded-md bg-white shadow-sm">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-end gap-5 flex-wrap">
            <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600">
              <FaTruck size={14} />
              Bulk Assign
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600">
              <ImDownload3 size={14} />
              Export Selected
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Page 1 of 25</span>
              <button className="text-gray-400 hover:text-gray-600"><FaChevronLeft size={12} /></button>
              <button className="text-gray-400 hover:text-gray-600"><FaChevronRight size={12} /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-12 px-4 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">Sr.No</th>
                  <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1.5">Order ID <RiExpandUpDownFill size={12} /></div>
                  </th>
                  <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1.5">Client <RiExpandUpDownFill size={12} /></div>
                  </th>
                  <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1.5">Date Created <MdOutlineArrowDropDown size={16} /></div>
                  </th>
                  <th scope="col" className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Route</th>
                  <th scope="col" className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1.5">Priority</div>
                  </th>
                  <th scope="col" className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                    <div className="flex items-center gap-1.5">Status <RiExpandUpDownFill size={12} /></div>
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
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">{index + 1}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigator.clipboard.writeText(order.id)}>
                          <span>#{order.id}</span>
                          <FaCopy className="text-gray-400 group-hover:text-blue-600 transition-colors" size={12} />
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${order.client === 'TechFlow Enterprises' ? 'bg-gray-100' : avatarColor}`}>
                            {order.client === 'TechFlow Enterprises' ? (
                              <img
                                src="https://picsum.photos/seed/tech/30/30"
                                alt="TechFlow"
                                className="h-8 w-8 rounded-full object-cover"
                              />
                            ) : (
                              initials
                            )}
                          </div>
                          <div>
                            <div className="text-gray-900 text-sm font-medium">{order.client}</div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {order.client === 'Acme Corporation' ? 'contact@acme.com' :
                                order.client === 'Global Industries' ? 'orders@global.com' :
                                  order.client === 'StarTech Solutions' ? 'logistics@startech.com' : 'shipping@techflow.com'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{order.date.split(' ').slice(0, 3).join(' ')}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{order.date.split(' ').slice(3).join(' ')}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{city}</div>
                        {distance && <div className="text-xs text-gray-400 mt-0.5">{distance}</div>}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex items-center gap-1 text-xs leading-3 font-semibold rounded-full ${priorityColor(order.priority)}`}>
                          {order.priority === 'High' ? <BsExclamationTriangleFill size={10} /> :
                            order.priority === 'Medium' ? <BsExclamationTriangleFill size={10} /> :
                              <BsCircleFill size={10} />}
                          {order.priority}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className='font-semibold text-sm'>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm text-gray-500">Showing 1 to 10 of 248 results</div>
            <div className="flex gap-1.5">
              <button className="px-3 py-1.5 border rounded text-gray-600 text-sm disabled:opacity-50">Previous</button>
              <button className="px-3 py-1.5 border rounded bg-blue-900 text-white text-sm">1</button>
              <button className="px-3 py-1.5 border rounded text-gray-600 text-sm">2</button>
              <button className="px-3 py-1.5 border rounded text-gray-600 text-sm">3</button>
              <button className="px-3 py-1.5 border rounded text-gray-600 text-sm">...</button>
              <button className="px-3 py-1.5 border rounded text-gray-600 text-sm">25</button>
              <button className="px-3 py-1.5 border rounded text-gray-600 text-sm">Next</button>
            </div>
          </div>
        </div>

        {/* Available Vehicles */}
        <div className="bg-white p-4 border border-gray-300 rounded-md">
          <div className='flex justify-between items-center mb-4'>
            <h3 className="text-base font-bold text-black">Available Vehicles</h3>
            <button
              className='flex items-center gap-1.5 text-blue-900 text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity'
              type="button">
              <GoPlus size={20} />
              Add Vehicle
            </button>
          </div>

          <div className="flex flex-wrap gap-5">
            {/* Card 1 */}
            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <FaTruck className="text-green-700" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">TRK-001</div>
                    <div className="text-xs text-gray-500 mt-0.5">Heavy Truck</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Available</span>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                <div className="flex justify-between"><span className="font-medium text-gray-700">Driver:</span> <span className="font-semibold">John Doe</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Capacity:</span> <span className="font-semibold">10 tons</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Location:</span> <span className="font-semibold">Mumbai Hub</span></div>
              </div>
              <button className="mt-4 w-full bg-blue-900 text-white text-sm font-medium py-2 rounded-lg transition-colors shadow-sm hover:shadow">
                Assign to Order
              </button>
            </div>

            {/* Card 2 */}
            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <FaTruck className="text-blue-500" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">VAN-045</div>
                    <div className="text-xs text-gray-500 mt-0.5">Delivery Van</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">In Use</span>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                <div className="flex justify-between"><span className="font-medium text-gray-700">Driver:</span><span className="font-semibold">Mike Wilson</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Capacity:</span><span className="font-semibold">2 tons</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Location:</span><span className="font-semibold">En Route</span></div>
              </div>
              <button className="mt-4 w-full bg-gray-300 text-gray-500 text-sm font-medium py-2 rounded-lg cursor-not-allowed shadow-sm" disabled>
                Currently Assigned
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                    <FaTruck className="text-red-500" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">TRK-028</div>
                    <div className="text-xs text-gray-500 mt-0.5">Container Truck</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Maintenance</span>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                <div className="flex justify-between"><span className="font-medium text-gray-700">Driver:</span><span className="font-semibold">Sarah Johnson</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Capacity:</span><span className="font-semibold">20 tons</span></div>
                <div className="flex justify-between"><span className="font-medium text-gray-700">Location:</span><span className="font-semibold">Service Center</span></div>
              </div>
              <button className="mt-4 w-full bg-gray-300 text-gray-500 text-sm font-medium py-2 rounded-lg cursor-not-allowed shadow-sm" disabled>
                Under Maintenance
              </button>
            </div>
          </div>
        </div>

        {/* Live Tracking Dashboard */}
        <div className="bg-white p-5 border border-gray-300 rounded-md shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-800">Live Tracking Dashboard</h3>
              <p className="text-sm text-gray-500 mt-1">Real-time vehicle positions</p>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Live Updates
              </span>
              <button className="text-sm text-blue-600 hover:underline flex items-center gap-1.5 font-medium">
                <FaMapMarkedAlt size={14} />
                Full Map
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Map Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-6 h-64 flex flex-col items-center justify-center relative border border-gray-200">
              <div className="absolute top-10 left-12 w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
              <div className="absolute bottom-16 left-28 w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
              <div className="absolute top-16 right-20 w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>

              <FaMapMarkerAlt size={40} className="text-gray-400 mb-3" />
              <div className="font-semibold text-gray-700 text-sm">Interactive Map View</div>
              <div className="text-sm text-gray-500 mt-1">Real-time vehicle positions</div>
            </div>

            {/* Right Shipments Section */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-gray-800">Active Shipments</h4>

              {/* Shipment Card 1 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">TRK-001</div>
                      <div className="text-xs text-gray-500 mt-0.5">Mumbai → Delhi</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">On Time</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              {/* Shipment Card 2 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">VAN-045</div>
                      <div className="text-xs text-gray-500 mt-0.5">Chennai → Bangalore</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">In Transit</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>Progress</span>
                    <span>30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>

              {/* Shipment Card 3 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">TRK-028</div>
                      <div className="text-xs text-gray-500 mt-0.5">Kolkata → Bhubaneswar</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">Delayed</span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
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
        <div className="bg-white border border-gray-300 rounded-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-base text-gray-800">Performance Analytics</h2>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center gap-1.5 bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1 hover:border-gray-400 transition-colors">
                <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-4 text-gray-700 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 14 days</option>
                  <option>Last 30 days</option>
                </select>
                <span className="pointer-events-none text-gray-400 text-[9px] absolute right-1.5">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
              <button className="text-blue-900 text-sm flex items-center gap-1.5">
                <ImDownload3 size={14} />
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-100 rounded-lg p-4 border border-blue-100 text-center">
              <div className="text-2xl font-bold text-gray-800">94.5%</div>
              <div className="text-sm font-medium text-gray-600 mt-1">On-Time Delivery</div>
              <div className="flex items-center gap-1 mt-1.5 text-green-600 text-sm font-semibold flex justify-center">
                <FaArrowUp size={12} />
                <span>+2.3%</span>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-4 border border-green-100 text-center">
              <div className="text-2xl font-bold text-gray-800">87%</div>
              <div className="text-sm font-medium text-gray-600 mt-1">Vehicle Utilization</div>
              <div className="flex items-center gap-1 mt-1.5 text-green-600 text-sm font-semibold flex justify-center">
                <FaArrowUp size={12} />
                <span>+5.1%</span>
              </div>
            </div>
            <div className="bg-orange-100 rounded-lg p-4 border border-orange-100 text-center">
              <div className="text-2xl font-bold text-gray-800">2.1%</div>
              <div className="text-sm font-medium text-gray-600 mt-1">Damage Rate</div>
              <div className="flex items-center gap-1 mt-1.5 text-red-600 text-sm font-semibold flex justify-center">
                <FaArrowDown size={12} />
                <span>-0.8%</span>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4 border border-purple-100 text-center">
              <div className="text-2xl font-bold text-gray-800">4.8</div>
              <div className="text-sm font-medium text-gray-600 mt-1">Avg Rating</div>
              <div className="flex items-center gap-1 mt-1.5 text-green-600 text-sm font-semibold flex justify-center">
                <FaArrowUp size={12} />
                <span>+0.2</span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 border border-none rounded-lg h-48 flex flex-col items-center justify-center gap-1.5">
            <IoTrendingDownSharp className="text-gray-400 w-6 h-6" />
            <span className="text-sm font-medium text-gray-500">Performance Trends Chart</span>
            <span className="text-xs text-gray-400">weekly delivery performance metrics</span>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-gray-300 rounded-md">
          <div className="flex items-center justify-between p-4">
            <h2 className="font-bold text-base text-gray-800">Recent Activities</h2>
            <button className="flex items-center gap-1.5 text-blue-900 hover:text-purple-800 text-sm font-medium">
              <GrView className="w-4 h-4" />
              View all
            </button>
          </div>

          <div className="flex gap-4 items-start px-4 py-3 bg-gray-50 m-3 rounded-md">
            <div className="rounded-full p-1.5 mt-0.5 bg-green-100 text-green-700">
              <LuChevronRight className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Order #LG-2024-001247 delivered successfully</div>
              <div className="text-xs text-gray-600 mt-1">Vehicle TRK-001 completed delivery to Acme Corporation</div>
              <div className="text-xs text-gray-400 mt-1">2 minutes ago</div>
            </div>
          </div>

          <div className="flex gap-4 items-start px-4 py-3 bg-gray-50 m-3 rounded-md">
            <div className="rounded-full p-1.5 mt-0.5 bg-blue-100 text-blue-700">
              <CiDeliveryTruck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Vehicle VAN-045 assigned to new order</div>
              <div className="text-xs text-gray-600 mt-1">Order #LG-2024-001248 assigned to Mike Wilson</div>
              <div className="text-xs text-gray-400 mt-1">15 minutes ago</div>
            </div>
          </div>

          <div className="flex gap-4 items-start px-4 py-3 bg-gray-50 m-3 rounded-md">
            <div className="rounded-full p-1.5 mt-0.5 bg-orange-100 text-orange-700">
              <RiAlertFill className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">Delay reported for Order #LG-2024-001245</div>
              <div className="text-xs text-gray-600 mt-1">Traffic congestion causing 2-hour delay</div>
              <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
            </div>
          </div>

          <div className="flex gap-4 items-start px-4 py-3 bg-gray-50 m-3 rounded-md">
            <div className="rounded-full p-1.5 mt-0.5 bg-purple-100 text-purple-700">
              <IoPersonAddSharp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-800">New client registered</div>
              <div className="text-xs text-gray-600 mt-1">TechFlow Enterprises added to client database</div>
              <div className="text-xs text-gray-400 mt-1">3 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;