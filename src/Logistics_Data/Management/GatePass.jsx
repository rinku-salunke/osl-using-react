import React from 'react';
import { IoMdAdd } from "react-icons/io";
import { FaTruck } from "react-icons/fa6";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { RiFolderUploadLine } from "react-icons/ri";

function GatePass() {

  const vehicleData = [
    {
      id: "TRK-001",
      model: "Tata 407",
      plate: "MH-12-AB-1234",
      capacity: "3.5T",
      driverName: "Raj Kumar",
      driverPhone: "9878674523",
      status: "In Transit",
      route: "Mumbai → Delhi",
      currentStop: "Nashik, Maharashtra",
      lastUpdated: "15 minutes ago",
      nextServiceDate: "Jan 25, 2024",
      nextServiceReminder: "5 days remaining",
      truckBg: "bg-blue-300",
      truckText: "text-blue-500",
    },
    {
      id: "TRK-002",
      model: "Ashok Leyland",
      plate: "DL-8C-XY-5678",
      capacity: "7.5T",
      driverName: "Amit Singh",
      driverPhone: "9876543211",
      status: "Ready for Dispatch",
      route: "Delhi → Jaipur",
      currentStop: "Gurugram, Haryana",
      lastUpdated: "2 hours ago",
      nextServiceDate: "Feb 10, 2024",
      nextServiceReminder: "12 days remaining",
      truckBg: "bg-green-300",
      truckText: "text-green-600",
    },
    {
      id: "TRK-003",
      model: "Mahindra Bolero",
      plate: "TN-09-CD-9012",
      capacity: "2.5T",
      driverName: "Suresh Raman",
      driverPhone: "9876543212",
      status: "Scheduled Service",
      route: "Chennai → Bangalore",
      currentStop: "Vellore, Tamil Nadu",
      lastUpdated: "Yesterday",
      nextServiceDate: "Dec 28, 2023",
      nextServiceReminder: "3 days overdue",
      truckBg: "bg-yellow-300",
      truckText: "text-yellow-600",
    },
    {
      id: "TRK-004",
      model: "Eicher Pro",
      plate: "KA-01-AB-5678",
      capacity: "4.0T",
      driverName: "Vikram Joshi",
      driverPhone: "9876543213",
      status: "In Transit",
      route: "Bangalore → Hyderabad",
      currentStop: "Kurnool, Andhra Pradesh",
      lastUpdated: "1 hour ago",
      nextServiceDate: "Feb 15, 2024",
      nextServiceReminder: "10 days remaining",
      truckBg: "bg-purple-300",
      truckText: "text-purple-600",
    },
    {
      id: "TRK-005",
      model: "Force Traveller",
      plate: "GJ-18-EF-3456",
      capacity: "2.0T",
      driverName: "Kiran Patel",
      driverPhone: "9876543214",
      status: "Scheduled Service",
      route: "Ahmedabad → Mumbai",
      currentStop: "Surat, Gujarat",
      lastUpdated: "3 hours ago",
      nextServiceDate: "Jan 30, 2024",
      nextServiceReminder: "2 days remaining",
      truckBg: "bg-red-300",
      truckText: "text-red-600",
    },
  ];

  return (
    <div>
      {/* ---------- HEADER (unchanged) ---------- */}
      <div className="bg-white border-b border-gray-300 flex justify-between items-center px-6 py-1.5 -mx-8">
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Vehicle & Gate Pass Management</h1>
          <span>Manage fleet vehicles, gate passes, and vehicle documentation.</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600 border border-gray-300 rounded-md px-4 py-1.5 font-medium">
            Generate Report
          </span>
          <span className="bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5">
            <IoMdAdd className="text-base" />
            Add Vehicle
          </span>
        </div>
      </div>

      {/* ---------- MAIN BODY ---------- */}
      <div className="bg-gray-50 min-h-screen -mx-8">

        {/* Stats Cards (unchanged) */}
        <div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-4">
            <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between items-center">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Total Feet</div>
              <div className="text-2xl font-bold text-gray-800">48</div>
              <div className="text-xs text-blue-600 font-medium">24 active today</div>
              <FaTruck className="text-base" />
            </div>
            <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Available Vehicles</div>
              <div className="text-2xl font-bold text-gray-800">18</div>
              <div className="text-xs text-green-600 font-medium">Ready For Dispatch</div>
            </div>
            <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
              <div className="text-xs text-gray-500 font-medium tracking-wide">In Maintenance</div>
              <div className="text-2xl font-bold text-gray-800">6</div>
              <div className="text-xs text-orange-600 font-medium">Scheduled Service</div>
            </div>
            <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Gate Pass Today</div>
              <div className="text-2xl font-bold text-gray-800">32</div>
              <div className="text-xs text-blue-600 font-medium">8 pending approval</div>
            </div>
          </div>
        </div>

        {/* Quick Actions (unchanged) */}
        <div>
          <div className="bg-white border border-gray-300 rounded-md p-4 me-3 ms-8 h-15">
            <div className="flex justify-between">
              <div>
                <span className="text-black font-bold">Quick Actions</span>
              </div>
              <div className="space-x-3">
                <span className="inline-flex items-center gap-2 border border-gray-300 px-4 py-1 rounded-md bg-dark-navy-blue text-white">
                  <MdOutlineQrCodeScanner size={20} />
                  Scan Gate Pass
                </span>
                <span className="border inline-flex items-center gap-2 border-gray-300 px-4 py-1 rounded-md bg-green-700 text-white text-center">
                  <HiOutlineCalendarDateRange size={20} />Issue Gate Pass
                </span>
                <span className="border border-gray-300 inline-flex items-center gap-2 px-4 py-1 rounded-md bg-orange-600 text-center text-white">
                  <MdOutlineSystemSecurityUpdateGood size={20} />
                  Schedule Maintenance
                </span>
                <span className="border border-gray-300 inline-flex items-center gap-2 px-4 py-1 rounded-md bg-purple-600 text-white text-center">
                  <RiFolderUploadLine size={20} />
                  Upload Documents
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- TABLE DIV (HEIGHT INCREASED – NO VERTICAL SCROLLBAR) ---------- */}
        <div className="bg-white border border-gray-300 mt-3 me-3 ms-8 rounded-md overflow-x-auto">
          {/* Table Header - Vehicle Fleet & Add Vehicle Button */}
          <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 bg-white rounded-t-md h-15">
            <span className="font-semibold text-black font-bold">Vehicle Fleet</span>
            <span className="bg-dark-navy-blue text-white px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5">
              <IoMdAdd className="text-base" />
              Add Vehicle
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50  border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Vehicle Details</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Driver</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Current Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Next Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicleData.map((vehicle, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    {/* 1. Vehicle Details with dynamic truck color */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <span className={`inline-flex items-center justify-center border border-gray-300 rounded-md ${vehicle.truckBg} h-10 w-10`}>
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

                    {/* 2. Driver */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">{vehicle.driverName}</span>
                        <span className="text-xs text-gray-500">{vehicle.driverPhone}</span>
                      </div>
                    </td>

                    {/* 3. Status */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{vehicle.status}</span>
                        <span className="text-xs text-gray-500">{vehicle.route}</span>
                      </div>
                    </td>

                    {/* 4. Current Location */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-black">{vehicle.currentStop}</span>
                        <span className="text-xs text-gray-400 mt-0.5">
                          Last Updated: {vehicle.lastUpdated}
                        </span>
                      </div>
                    </td>

                    {/* 5. Next Service */}
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

                    {/* 6. Actions */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button className="border border-gray-300 px-2 py-1 rounded-md text-xs hover:bg-gray-100 transition">
                          Delete
                        </button>
                        <button className="border border-gray-300 px-2 py-1 rounded-md text-xs hover:bg-gray-100 transition">
                          Edit
                        </button>
                        <button className="border border-gray-300 px-2 py-1 rounded-md text-xs hover:bg-gray-100 transition">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
              <span className="text-sm text-gray-500">Showing 1 to 5 of 247 results</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-md transition">Previous</button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-md transition">2</button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-md transition">3</button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-md transition">Next</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 me-3 ms-8 mt-3">
          {/* Wider column – Gate Pass Queue (no scrollbar) */}
          <div className="bg-white border border-gray-300 rounded-md p-4 flex-[2]">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">Gate Pass Queue</span>
                <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                  All Passes
                </span>
              </div>
              <button className="px-3 py-1.5 bg-dark-navy-blue text-white text-sm rounded-md flex items-center gap-1 hover:opacity-90 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Pass
              </button>
            </div>

            {/* Pass List – no max height, no overflow scroll */}
            <div className="mt-3 space-y-3">
              {[
                {
                  id: 'GP-2024-001',
                  vehicle: 'TRK-001',
                  driver: 'Raj Kumar',
                  status: 'Active',
                  detail: 'Valid until: Today 6:00 PM',
                  badge: 'Active',
                  badgeColor: 'bg-green-100 text-green-800',
                  extra: 'Exit: Pending',
                },
                {
                  id: 'GP-2024-002',
                  vehicle: 'TRK-004',
                  driver: 'Vikram Joshi',
                  status: 'Pending Approval',
                  detail: 'Requested: 2 hours ago',
                  badge: 'Pending',
                  badgeColor: 'bg-yellow-100 text-yellow-800',
                  extra: 'Priority: High',
                },
                {
                  id: 'GP-2024-003',
                  vehicle: 'TRK-002',
                  driver: 'Amit Singh',
                  status: 'Approved',
                  detail: 'Valid: Tomorrow 8:00 AM - 8:00 PM',
                  badge: 'Approved',
                  badgeColor: 'bg-blue-100 text-blue-800',
                  extra: 'Ready for use',
                },
                {
                  id: 'GP-2024-004',
                  vehicle: 'TRK-003',
                  driver: 'Suresh Raman',
                  status: 'Completed',
                  detail: 'Expired: Yesterday 6:00 PM',
                  badge: 'Expired',
                  badgeColor: 'bg-red-100 text-red-800',
                  extra: 'Duration: 8 hours',
                },
              ].map((pass) => (
                <div key={pass.id} className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-800 text-sm">{pass.id}</span>
                        <span className="text-xs text-gray-500">
                          {pass.vehicle} • {pass.driver}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5">{pass.detail}</div>
                      {pass.extra && (
                        <div className="text-xs text-gray-500 mt-0.5">{pass.extra}</div>
                      )}
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${pass.badgeColor}`}>
                      {pass.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Narrower column */}
          <div className="bg-white border border-gray-300 rounded-md p-4 flex-1">
            {/* Gate Scanner */}
            <div>
              <h3 className="font-semibold text-gray-800">Gate Scanner</h3>

              {/* QR Code Frame */}
              <div className="mt-3 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <span className="text-sm text-gray-500 mt-2">Position QR code within the frame</span>
                <button className="mt-3 px-4 py-1.5 bg-dark-navy-blue text-white text-sm rounded-md hover:opacity-90 transition">
                  Start Scanner
                </button>
              </div>

              {/* Manual Entry */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Manual Entry</h4>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="Enter Gate Pass ID"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="px-3 py-1.5 bg-dark-navy-blue text-white text-sm rounded-md hover:opacity-90 transition whitespace-nowrap">
                    Lookup Pass
                  </button>
                </div>
              </div>

              {/* Recent Scans */}
              <div className="mt-4">
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
        </div>

        <div className="flex gap-2 px-4 mt-2 h-auto">
          {/* Left column */}
          <div className="bg-white border border-gray-300 p-4 rounded-md flex-1 ms-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Document Management</span>
              <span className="px-4 py-1.5 border border-gray-300 rounded-md bg-dark-navy-blue text-white inline-flex items-center gap-2 text-sm">
                <RiFolderUploadLine size={20} />
                Upload Document
              </span>
            </div>

            <ul className="mt-3 grid grid-cols-2 gap-2">
              <li className="w-full">
                <div className="h-20 bg-white border border-gray-300 rounded-md p-3 flex flex-col items-center">
                  <span className="font-medium text-gray-800 text-sm">Registration</span>
                  <span className="text-xs text-gray-500">RC Documents</span>
                </div>
              </li>
              <li className="w-full">
                <div className="h-20 bg-white border border-gray-300 rounded-md p-3 flex flex-col items-center">
                  <span className="font-medium text-gray-800 text-sm">Insurance</span>
                  <span className="text-xs text-gray-500">Policy Documents</span>
                </div>
              </li>
              <li className="w-full">
                <div className="h-20 bg-white border border-gray-300 rounded-md p-3 flex flex-col items-center">
                  <span className="font-medium text-gray-800 text-sm">PUC</span>
                  <span className="text-xs text-gray-500">Emission Certificates</span>
                </div>
              </li>
              <li className="w-full">
                <div className="h-20 bg-white border border-gray-300 rounded-md p-3 flex flex-col items-center">
                  <span className="font-medium text-gray-800 text-sm">Driver License</span>
                  <span className="text-xs text-gray-500">License Documents</span>
                </div>
              </li>
            </ul>

            {/* Recent Uploads */}
            <div className="mt-4 pt-3">
              <h4 className="text-sm font-semibold text-gray-800 mb-4">Recent Uploads</h4>
              <div className="mt-2 space-y-2">
                <div className="flex flex-col  border border-gray-300 p-2 rounded-md">
                  <span className="text-gray-700">TRK-001_Insurance.pdf</span>
                  <span className="text-gray-400">Uploaded 2 hours ago</span>
                </div>
                <div className="flex flex-col border border-gray-300 rounded-md ">
                  <span className="text-gray-700">TRK-002_PUC_Certificate.jpg</span>
                  <span className="text-gray-400">Uploaded yesterday</span>
                </div>
              </div>
            </div>
          </div>

          -
          {/* Right column */}
          <div className="bg-white border border-gray-300 p-4 rounded-md flex-1">
            {/* Maintenance Schedule */}
            <div>
              <h3 className="font-semibold text-gray-800">Maintenance Schedule</h3>
              <div className="mt-2">
                <div className="grid grid-cols-7 text-xs text-center font-medium text-gray-500">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="py-1">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 text-xs text-center mt-1">
                  {[28, 29, 30, 31, 1, 2, 3].map((d) => (
                    <div key={d} className="py-1 border border-gray-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      {d}
                    </div>
                  ))}
                  {[4, 5, 6, 7, 8, 9, 10].map((d) => (
                    <div key={d} className="py-1 border border-gray-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      {d}
                    </div>
                  ))}
                  {[11, 12, 13, 14, 15, 16, 17].map((d) => (
                    <div key={d} className="py-1 border border-gray-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      {d}
                    </div>
                  ))}
                  {[18, 19, 20, 21, 22, 23, 24].map((d) => (
                    <div key={d} className="py-1 border border-gray-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      {d}
                    </div>
                  ))}
                  {[25, 26, 27, 28, 29, 30, 31].map((d) => (
                    <div key={d} className="py-1 border border-gray-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto">
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Services */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 text-sm">Upcoming Services</h4>
              <div className="mt-2 space-y-2">
                <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded text-xs">
                  <div className="font-medium text-red-700">TRK-003 Service Overdue</div>
                  <div className="text-gray-600">3 days overdue • Engine oil change</div>
                  <span className="inline-block bg-red-100 text-red-800 px-2 py-0.5 rounded mt-1 text-[10px] font-bold">Urgent</span>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-2 rounded text-xs">
                  <div className="font-medium text-yellow-800">TRK-001 Scheduled Service</div>
                  <div className="text-gray-600">Due: Jan 25 • General maintenance</div>
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mt-1 text-[10px] font-bold">Soon</span>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-2 rounded text-xs">
                  <div className="font-medium text-blue-800">TRK-004 Routine Check</div>
                  <div className="text-gray-600">Due: Feb 10 • Tire inspection</div>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded mt-1 text-[10px] font-bold">Planned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GatePass;