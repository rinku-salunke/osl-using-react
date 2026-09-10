import React from 'react';
import { IoMdAdd } from "react-icons/io";
import {
  FaTruck,
  FaCircleCheck,
  FaScrewdriverWrench,
  FaTicket,
  FaBell,
  FaBars,
  FaChevronDown,
  FaPenToSquare,
  FaTrash,
  FaEye,
  FaShareFromSquare,
  FaCheck,
  FaXmark,
  FaPlay,
  FaArrowsRotate,
  FaPrint,
  FaFilePdf,
  FaFileImage,
  FaFileLines,
  FaShieldHalved,
  FaFileSignature,
  FaIdCard,
  FaDownload
} from "react-icons/fa6";
import { MdOutlineQrCodeScanner, MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { RiFolderUploadLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";

function GatePass() {

  // Data for the Vehicle Fleet Table
  const vehicleData = [
    {
      id: "TRK-001",
      model: "Tata 407",
      plate: "MH-12-AB-1234",
      capacity: "3.5T",
      driverName: "Raj Kumar",
      driverPhone: "+91 98765 43210",
      status: "In Transit",
      route: "Mumbai → Delhi",
      currentStop: "Nashik, Maharashtra",
      lastUpdated: "15 mins ago",
      nextServiceDate: "Jan 25, 2024",
      nextServiceReminder: "5 days remaining",
      truckBg: "bg-blue-100",
      truckText: "text-blue-600",
      avatar: "https://i.pravatar.cc/150?u=raj",
    },
    {
      id: "TRK-002",
      model: "Ashok Leyland",
      plate: "DL-8C-XY-5678",
      capacity: "7.5T",
      driverName: "Amit Singh",
      driverPhone: "+91 98765 43211",
      status: "Available",
      route: "Ready for dispatch",
      currentStop: "Delhi Warehouse",
      lastUpdated: "2 hours ago",
      nextServiceDate: "Feb 10, 2024",
      nextServiceReminder: "12 days remaining",
      truckBg: "bg-green-100",
      truckText: "text-green-600",
      avatar: "https://i.pravatar.cc/150?u=amit",
    },
    {
      id: "TRK-003",
      model: "Mahindra Bolero",
      plate: "TN-09-CD-9012",
      capacity: "2.5T",
      driverName: "Suresh Raman",
      driverPhone: "9876543212",
      status: "Maintenance",
      route: "Scheduled service",
      currentStop: "Vellore, Tamil Nadu",
      lastUpdated: "Yesterday",
      nextServiceDate: "Dec 28, 2023",
      nextServiceReminder: "3 days overdue",
      truckBg: "bg-yellow-100",
      truckText: "text-yellow-600",
      avatar: "https://i.pravatar.cc/150?u=suresh",
    },
    {
      id: "TRK-004",
      model: "Eicher Pro",
      plate: "KA-01-AB-5678",
      capacity: "4.0T",
      driverName: "Vikram Joshi",
      driverPhone: "9876543213",
      status: "Loading",
      route: "Bangalore warehouse",
      currentStop: "Kurnool, Andhra Pradesh",
      lastUpdated: "1 hour ago",
      nextServiceDate: "Feb 15, 2024",
      nextServiceReminder: "10 days remaining",
      truckBg: "bg-purple-100",
      truckText: "text-purple-600",
      avatar: "https://i.pravatar.cc/150?u=vikram",
    },
    {
      id: "TRK-005",
      model: "Force Traveller",
      plate: "GJ-18-EF-3456",
      capacity: "2.0T",
      driverName: "Kiran Patel",
      driverPhone: "9876543214",
      status: "Out of Service",
      route: "Accident repair",
      currentStop: "Surat, Gujarat",
      lastUpdated: "3 hours ago",
      nextServiceDate: "Jan 30, 2024",
      nextServiceReminder: "2 days remaining",
      truckBg: "bg-red-100",
      truckText: "text-red-600",
      avatar: "https://i.pravatar.cc/150?u=kiran",
    },
  ];

  // Data for the Gate Pass Queue
  const gatePassData = [
    {
      id: "GP-2024-001",
      vehicle: "TRK-001",
      driver: "Raj Kumar",
      detail: "Valid until: Today 6:00 PM",
      status: "Active",
      statusDetail: "Exit: Pending",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      icon: <FaTicket size={18} />,
      actions: [
        { icon: <FaEye size={16} />, color: "text-blue-600" },
        { icon: <FaShareFromSquare size={16} />, color: "text-green-600" },
        { icon: <FaPrint size={16} />, color: "text-gray-600" },
      ]
    },
    {
      id: "GP-2024-002",
      vehicle: "TRK-004",
      driver: "Vikram Joshi",
      detail: "Requested: 2 hours ago",
      status: "Pending Approval",
      statusDetail: "Priority: High",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      icon: <FaTicket size={18} />,
      actions: [
        { icon: <FaCheck size={16} />, color: "text-green-600" },
        { icon: <FaXmark size={16} />, color: "text-red-600" },
        { icon: <FaEye size={16} />, color: "text-blue-600" },
      ]
    },
    {
      id: "GP-2024-003",
      vehicle: "TRK-002",
      driver: "Amit Singh",
      detail: "Valid: Tomorrow 8:00 AM - 8:00 PM",
      status: "Approved",
      statusDetail: "Ready for use",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: <FaTicket size={18} />,
      actions: [
        { icon: <FaEye size={16} />, color: "text-blue-600" },
        { icon: <FaPlay size={16} />, color: "text-green-600" },
        { icon: <FaPrint size={16} />, color: "text-gray-600" },
      ]
    },
    {
      id: "GP-2024-004",
      vehicle: "TRK-003",
      driver: "Suresh Raman",
      detail: "Expired: Yesterday 6:00 PM",
      status: "Completed",
      statusDetail: "Duration: 8 hours",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      icon: <FaTicket size={18} />,
      actions: [
        { icon: <FaArrowsRotate size={16} />, color: "text-blue-600" },
        { icon: <FaPrint size={16} />, color: "text-gray-600" },
      ]
    }
  ];

  // Data for Document Management Cards
  const documentCards = [
    { title: "Registration", subtitle: "RC Documents", icon: <FaFileLines size={20} />, bg: "bg-blue-50", color: "text-blue-600" },
    { title: "Insurance", subtitle: "Policy Documents", icon: <FaShieldHalved size={20} />, bg: "bg-green-50", color: "text-green-600" },
    { title: "PUC", subtitle: "Emission Certificates", icon: <FaFileSignature size={20} />, bg: "bg-orange-50", color: "text-orange-600" },
    { title: "Driver License", subtitle: "License Documents", icon: <FaIdCard size={20} />, bg: "bg-purple-50", color: "text-purple-600" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-sans">

      {/* ---------- MAIN CONTENT AREA ---------- */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-500 hover:text-gray-700">
              <FaBars size={20} />
            </button>
            <div className='flex flex-col'>
              <span className="font-semibold text-gray-800 hidden sm:block">Vehicle & Gate Pass Management</span>
              <span className="text-sm text-gray-500">Manage fleet vehicles, gate passes, and vehicle documentation.</span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
              <HiOutlineDocumentReport className="w-4 h-4" />
              Generate Report
            </button>
            <button className="flex-1 sm:flex-none bg-dark-navy-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <IoMdAdd className="text-base" />
              Add Vehicle
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50">

          {/* ---------- STATS CARDS ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-gray-300 rounded-md p-5 bg-white flex items-center justify-between shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium tracking-wide">Total Fleet</span>
                <span className="text-2xl font-bold text-gray-800">48</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                  <FaTruck size={12} />
                  24 active today
                </span>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg text-blue-900">
                <FaTruck size={24} />
              </div>
            </div>

            <div className="border border-gray-300 rounded-md p-5 bg-white flex items-center justify-between shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium tracking-wide">Available Vehicles</span>
                <span className="text-2xl font-bold text-gray-800">18</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-medium">
                  <FaCircleCheck size={12} />
                  Ready for dispatch
                </span>
              </div>
              <div className="bg-green-100 p-3 rounded-lg text-green-900">
                <FaCircleCheck size={24} />
              </div>
            </div>

            <div className="border border-gray-300 rounded-md p-5 bg-white flex items-center justify-between shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium tracking-wide">In Maintenance</span>
                <span className="text-2xl font-bold text-gray-800">6</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-orange-600 font-medium">
                  <FaScrewdriverWrench size={12} />
                  Scheduled service
                </span>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg text-orange-900">
                <FaScrewdriverWrench size={24} />
              </div>
            </div>

            <div className="border border-gray-300 rounded-md p-5 bg-white flex items-center justify-between shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium tracking-wide">Gate Pass Today</span>
                <span className="text-2xl font-bold text-gray-800">32</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                  <FaTicket size={12} />
                  8 pending approval
                </span>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg text-purple-900">
                <FaTicket size={24} />
              </div>
            </div>
          </div>

          {/* ---------- QUICK ACTIONS ---------- */}
          <div className="bg-white border border-gray-300 rounded-md p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <span className="text-black font-bold whitespace-nowrap">Quick Actions</span>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md bg-dark-navy-blue text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <MdOutlineQrCodeScanner size={18} />
                Scan Gate Pass
              </button>
              <button className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md bg-green-700 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <HiOutlineCalendarDateRange size={18} />
                Issue Gate Pass
              </button>
              <button className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md bg-orange-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <MdOutlineSystemSecurityUpdateGood size={18} />
                Schedule Maintenance
              </button>
              <button className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <RiFolderUploadLine size={18} />
                Upload Documents
              </button>
            </div>
          </div>

          {/* ---------- VEHICLE FLEET TABLE ---------- */}
          <div className="bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-300 px-4 py-3 bg-white gap-3">
              <span className="font-semibold text-black text-lg">Vehicle Fleet</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Filter by Status:</span>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm font-medium text-gray-800 focus:outline-none cursor-pointer">
                    <option>All Vehicles</option>
                    <option>In Transit</option>
                    <option>Available</option>
                    <option>Scheduled Service</option>
                  </select>
                  <FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                </div>
                <button className="bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5">
                  <IoMdAdd className="text-base" />
                  Add Vehicle
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Vehicle Details</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Driver</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Current Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Next Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicleData.map((vehicle, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-3">
                          <span className={`inline-flex items-center justify-center rounded-md ${vehicle.truckBg} h-10 w-10`}>
                            <FaTruck size={20} className={vehicle.truckText} />
                          </span>
                          <div className="flex-col inline-flex">
                            <span className="font-bold text-gray-800 text-sm">{vehicle.id}</span>
                            <span className="text-gray-600 text-xs">
                              {vehicle.model} • {vehicle.plate}
                            </span>
                            <span className="text-gray-500 text-xs font-medium">
                              Capacity: {vehicle.capacity}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={vehicle.avatar}
                            alt={vehicle.driverName}
                            className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-800">{vehicle.driverName}</span>
                            <span className="text-xs text-gray-500">{vehicle.driverPhone}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">
                            {vehicle.status}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {vehicle.route}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm text-black">{vehicle.currentStop}</span>
                          <span className="text-xs text-gray-400 mt-0.5">
                            Last Updated: {vehicle.lastUpdated}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-800">{vehicle.nextServiceDate}</span>
                          <span
                            className={`text-xs font-medium ${vehicle.nextServiceReminder.includes("overdue")
                              ? "text-red-600"
                              : "text-green-600"
                              }`}
                          >
                            {vehicle.nextServiceReminder}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button className="text-blue-600 hover:text-blue-800 transition" title="View">
                            <FaEye size={16} />
                          </button>
                          <button className="text-orange-500 hover:text-orange-700 transition" title="Edit">
                            <FaPenToSquare size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition" title="Delete">
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 gap-3">
              <span className="text-sm text-gray-500">Showing 1 to 5 of 247 results</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-md transition">Previous</button>
                <button className="px-3 py-1 text-sm bg-dark-navy-blue text-white rounded-md">1</button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-md transition">2</button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-md transition">3</button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-md transition">Next</button>
              </div>
            </div>
          </div>

          {/* ---------- GATE PASS QUEUE & SCANNER ---------- */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Gate Pass Queue */}
            <div className="bg-white border border-gray-300 rounded-md p-4 flex-[2] shadow-sm">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="font-semibold text-gray-800 text-lg">Gate Pass Queue</span>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm font-medium text-gray-800 focus:outline-none cursor-pointer">
                      <option>All Passes</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Approved</option>
                      <option>Completed</option>
                    </select>
                    <FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                  </div>
                  <button className="px-3 py-1.5 bg-dark-navy-blue text-white text-sm rounded-md flex items-center gap-1.5 hover:opacity-90 transition">
                    <IoMdAdd size={16} />
                    New Pass
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-3">
                {gatePassData.map((pass) => (
                  <div key={pass.id} className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${pass.iconBg} ${pass.iconColor}`}>
                        {pass.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 text-sm">{pass.id}</span>
                        <span className="text-xs text-gray-600 mt-0.5">{pass.vehicle} • {pass.driver}</span>
                        <span className="text-xs text-gray-400 mt-0.5">{pass.detail}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <span className="text-sm font-semibold text-gray-800">{pass.status}</span>
                      <span className="text-xs text-gray-500 mt-1">{pass.statusDetail}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {pass.actions.map((action, i) => (
                        <button key={i} className={`${action.color} hover:opacity-80 transition`}>
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gate Scanner */}
            <div className="bg-white border border-gray-300 rounded-md p-4 flex-1 shadow-sm">
              <h3 className="font-semibold text-gray-800 text-lg">Gate Scanner</h3>

              <div className="mt-3 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                <div className="p-4 border border-gray-300 rounded-lg mb-2">
                  <MdOutlineQrCodeScanner className="h-10 w-10 text-gray-400" />
                </div>
                <span className="text-sm text-gray-500 mt-2 text-center">Position QR code within the frame</span>
                <button className="mt-3 px-4 py-1.5 bg-dark-navy-blue text-white text-sm rounded-md hover:opacity-90 transition w-full">
                  Start Scanner
                </button>
              </div>

              <div className="mt-5">
                <h4 className="text-sm font-medium text-gray-700">Manual Entry</h4>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Enter Gate Pass ID"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="px-3 py-1.5 bg-green-700 text-white text-sm rounded-md hover:bg-green-800 transition whitespace-nowrap">
                    Lookup Pass
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="text-sm font-medium text-gray-700">Recent Scans</h4>
                <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Pass ID</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-3 py-2 text-xs text-gray-700">GP-2024-001</td>
                        <td className="px-3 py-2 text-xs text-gray-700">Entry</td>
                        <td className="px-3 py-2 text-xs text-gray-500">2:30 PM</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs text-gray-700">GP-2024-005</td>
                        <td className="px-3 py-2 text-xs text-gray-700">Exit</td>
                        <td className="px-3 py-2 text-xs text-gray-500">1:45 PM</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs text-gray-700">GP-2024-003</td>
                        <td className="px-3 py-2 text-xs text-gray-700">Entry</td>
                        <td className="px-3 py-2 text-xs text-gray-500">12:15 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- DOCUMENT MANAGEMENT & MAINTENANCE ---------- */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left column - Document Management */}
            <div className="bg-white border border-gray-300 p-4 rounded-md flex-1 shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="font-semibold text-gray-800 text-lg">Document Management</span>
                <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-blue-700 text-white inline-flex items-center gap-2 text-sm hover:bg-blue-800 transition">
                  <RiFolderUploadLine size={16} />
                  Upload Document
                </button>
              </div>

              {/* Document Cards Grid */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                {documentCards.map((doc, idx) => (
                  <div key={idx} className="h-24 bg-white border border-gray-300 rounded-md p-3 flex flex-col items-center justify-center hover:bg-gray-50 transition cursor-pointer">
                    <div className={`p-2 rounded-lg ${doc.bg} ${doc.color} mb-2`}>
                      {doc.icon}
                    </div>
                    <span className="font-medium text-gray-800 text-sm">{doc.title}</span>
                    <span className="text-xs text-gray-500 mt-0.5">{doc.subtitle}</span>
                  </div>
                ))}
              </div>

              {/* Recent Uploads */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Recent Uploads</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border border-gray-200 p-3 rounded-md bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FaFilePdf size={20} className="text-red-600" />
                      <div className="flex flex-col">
                        <span className="text-gray-800 text-sm font-medium">TRK-001_Insurance.pdf</span>
                        <span className="text-gray-400 text-xs mt-0.5">Uploaded 2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 transition"><FaPenToSquare size={14} /></button>
                      <button className="text-green-600 hover:text-green-800 transition"><FaDownload size={14} /></button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border border-gray-200 p-3 rounded-md bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FaFileImage size={20} className="text-blue-600" />
                      <div className="flex flex-col">
                        <span className="text-gray-800 text-sm font-medium">TRK-002_PUC_Certificate.jpg</span>
                        <span className="text-gray-400 text-xs mt-0.5">Uploaded yesterday</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 transition"><FaPenToSquare size={14} /></button>
                      <button className="text-green-600 hover:text-green-800 transition"><FaDownload size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Maintenance Schedule */}
            <div className="bg-white border border-gray-300 p-4 rounded-md flex-1 shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 text-lg">Maintenance Schedule</h3>
                <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-orange-500 text-white inline-flex items-center gap-2 text-sm hover:bg-orange-600 transition">
                  <HiOutlineCalendarDateRange size={16} />
                  Schedule Service
                </button>
              </div>

              {/* Calendar */}
              <div className="mt-4">
                <div className="grid grid-cols-7 text-xs text-center font-medium text-gray-500 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="py-1">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-2 text-xs text-center">
                  {[28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((d, i) => (
                    <div key={i} className={`py-1 flex items-center justify-center mx-auto w-8 h-8 rounded-full ${d === 15 ? 'bg-blue-700 text-white font-bold' : d === 25 ? 'bg-red-100 text-red-600 font-bold' : 'hover:bg-gray-100'}`}>
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Services */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm mb-3">Upcoming Services</h4>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded text-xs flex justify-between items-center">
                    <div>
                      <div className="font-medium text-red-700">TRK-003 Service Overdue</div>
                      <div className="text-gray-600 mt-0.5">3 days overdue • Engine oil change</div>
                    </div>
                    <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-[10px] font-bold">Urgent</span>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded text-xs flex justify-between items-center">
                    <div>
                      <div className="font-medium text-yellow-800">TRK-001 Scheduled Service</div>
                      <div className="text-gray-600 mt-0.5">Due: Jan 25 • General maintenance</div>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-[10px] font-bold">Soon</span>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-xs flex justify-between items-center">
                    <div>
                      <div className="font-medium text-blue-800">TRK-004 Routine Check</div>
                      <div className="text-gray-600 mt-0.5">Due: Feb 10 • Tire inspection</div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold">Planned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default GatePass;