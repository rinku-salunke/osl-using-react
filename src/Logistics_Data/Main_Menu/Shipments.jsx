import React from 'react'
import { LuTriangleAlert } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { GrFormView } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { FiAlertTriangle } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { RiFilterFill } from "react-icons/ri";
import { MdDownload } from "react-icons/md";
import { RiTruckFill } from "react-icons/ri";
import { CiClock2 } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoWarning, IoAlertCircle } from "react-icons/io5";

function Shipments() {

  const shipmentsData = [
    {
      id: "SH-2024-001247",
      priority: "High",
      route: "Mumbai → Delhi",
      distance: "485 km",
      status: "In Transit",
      eta: "Tomorrow, 2:30 PM",
      timeRemaining: "6 hours remaining",
      progress: 65,
      vehicle: "TRK-001",
      driver: "Raj Kumar"
    },
    {
      id: "SH-2024-001246",
      priority: "Medium",
      route: "Delhi → Kolkata",
      distance: "1,472 km",
      status: "Out for Delivery",
      eta: "Today, 6:00 PM",
      timeRemaining: "2 hours remaining",
      progress: 90,
      vehicle: "TRK-002",
      driver: "Amit Singh"
    },
    {
      id: "SH-2024-001245",
      priority: "High",
      route: "Chennai → Bangalore",
      distance: "347 km",
      status: "Delayed",
      eta: "Today, 4:00 PM",
      timeRemaining: "2 hours overdue",
      progress: 75,
      vehicle: "TRK-003",
      driver: "Suresh Raman"
    },
    {
      id: "SH-2024-001244",
      priority: "Low",
      route: "Pune → Hyderabad",
      distance: "559 km",
      status: "Delivered",
      eta: "Delivered",
      timeRemaining: "2 hours ago",
      progress: 100,
      vehicle: "TRK-004",
      driver: "Vikram Joshi"
    },
    {
      id: "SH-2024-001243",
      priority: "Medium",
      route: "Ahmedabad → Surat",
      distance: "264 km",
      status: "Vehicle Issue",
      eta: "On Hold",
      timeRemaining: "Breakdown reported",
      progress: 40,
      vehicle: "TRK-005",
      driver: "Kiran Patel"
    }
  ];

  return (
    <div className="gap-4">
      <div class="bg-white border-b border-gray-300 flex justify-between items-center px-6 py-1.5 -mx-8">

        <div class="flex flex-col">
          <h1 class="font-bold text-black">Vehicle & Gate Pass Management</h1>
          <span>Manage fleet vehicles, gate passes, and vehicle documentation.</span>
        </div>


        <div class="flex items-center space-x-3">
          <span class=" text-gray-600 border border-gray-300 rounded-md px-4 py-1.5 font-medium">
            Route Planner
          </span>
          <span class="bg-dark-navy-blue text-white px-4 py-1.5 rounded-md  font-medium">
            + New Shipments
          </span>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen -mx-8">
        {/* Stats Cards Grid */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-4">
          <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full relative">
            {/* आयकॉन गोलाकार पार्श्वभूमीसह (बहुतेक डॅशबोर्ड कार्ड्समध्ये असतो) */}
            <div className="absolute top-8 right-3 bg-blue-100 rounded-md h-9 text-center justify-center items-center w-9 p-1.5">
              <RiTruckFill className="text-gray-500" size={20} />
            </div>

            <div className="flex flex-col justify-between h-full">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Active Shipments</div>
              <div className="text-2xl font-bold text-gray-800">247</div>
              <div className="text-xs text-blue-700 font-medium inline-flex items-center gap-1 ">
                <RiTruckFill className="text-blue-700" size={20} />

                18 in transit</div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex items-center justify-between shadow-sm">
            {/* Left side: Text */}
            <div className="flex flex-col justify-center gap-1">
              <div className="text-xs text-gray-500 font-medium tracking-wide">On-Time Delivery</div>
              <div className="text-2xl font-bold text-gray-800">96.8%</div>
              <div className="text-xs text-green-600 flex items-center">
                <IoIosArrowRoundUp className="text-base" /> 2.1% from last month
              </div>
            </div>

            {/* Right side: Icon Box */}
            <div className="bg-green-100 rounded-md p-3 text-green-600 h-12 w-12 flex items-center justify-center text-2xl">
              <CiClock2 />
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex items-center justify-between shadow-sm">
            {/* Left side: Text */}
            <div className="flex flex-col justify-center gap-1">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Average Delivery Time</div>
              <div className="text-2xl font-bold text-gray-800">2.4d</div>
              <div className="text-xs text-orange-600 flex items-center gap-1 font-medium">
                <span className="bg-orange-600 text-white rounded-full p-0.5">
                  <IoIosArrowDown className="text-[10px]" />
                </span>
                0.2d faster
              </div>
            </div>

            {/* Right side: Icon Box */}
            <div className="bg-orange-100 rounded-md p-3 text-orange-600 h-12 w-12 flex items-center justify-center text-2xl">
              <LuTimer />
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex items-center justify-between shadow-sm">
            {/* Left side: Text */}
            <div className="flex flex-col justify-center gap-1">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Delivery Issues</div>
              <div className="text-2xl font-bold text-gray-800">8</div>
              <div className="text-xs text-red-600 flex items-center gap-1 font-medium">
              <IoWarning className="text-sm" />
                Requires attention
              </div>
            </div>

            {/* Right side: Icon Box */}
            <div className="bg-red-100 rounded-md p-3 text-red-600 h-12 w-12 flex items-center justify-center text-2xl">
             <IoAlertCircle />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-4 m-4 rounded-md">
          {/* पहिली ओळ - Status, Route, Date Range आणि Calendar Icon (शेवटी) */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">Status:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Assigned</option>
                <option>In Transit</option>
                <option>Delivered</option>
              </select>
            </div>

            {/* Route */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">Route:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>All Routes</option>
                <option>Mumbai → Delhi</option>
                <option>Chennai → Bangalore</option>
                <option>Pune → Hyderabad</option>
              </select>
            </div>

            {/* Date Range - हा भाग तसाच */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">Date Range:</span>
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-28 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="text-gray-400 text-sm">to</span>
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-28 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Calendar Icon - आता 1st line च्या अगदी शेवटी (ml-auto ने उजवीकडे) */}
            <CiCalendarDate size={28} className="text-gray-500 cursor-pointer ml-auto" />
          </div>

          {/* दुसरी ओळ - Filter आणि Export बटणे (उजवीकडे) */}
          <div className="flex justify-end mt-3">
            <div className="flex items-center gap-2">
              <button className="bg-gray-50 hover:bg-gray-200 border border-gray-300 text-gray-700 text-sm font-medium px-5 py-1.5 rounded-md transition-colors inline-flex items-center gap-2">
                <RiFilterFill size={18} />
                Filter
              </button>
              <button className="bg-dark-navy-blue hover:bg-blue-800 text-white text-sm font-medium px-4 py-1.5 rounded-md transition-colors inline-flex items-center gap-2">
                <MdDownload size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Real-Time Shipment Tracking</h2>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Full Screen
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-dark-navy-blue border border-indigo-600 rounded-md text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative m-4 h-96 overflow-hidden rounded-lg">
            {/* Your provided iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30239.371363488313!2d73.86754319751884!3d18.66752185201002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1788861683807!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Live Tracking Map"
              className="rounded-lg"
            />

            {/* Active Vehicles Overlay */}
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-72 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Active Vehicles</h3>
              <ul className="space-y-2.5">
                <li className="flex items-center text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2 inline-block"></span>
                  TRK-001: Mumbai -&gt; Delhi
                </li>
                <li className="flex items-center text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2 inline-block"></span>
                  TRK-002: Delhi -&gt; Kolkata
                </li>
                <li className="flex items-center text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full bg-orange-500 mr-2 inline-block"></span>
                  TRK-003: Chennai -&gt; Bangalore
                </li>
                <li className="flex items-center text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full bg-purple-500 mr-2 inline-block"></span>
                  TRK-004: Pune -&gt; Hyderabad
                </li>
              </ul>
            </div>

            {/* Legend Overlay */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-48 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Legend</h3>
              <ul className="space-y-2.5">
                <li className="flex items-center text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2 inline-block"></span>
                  On Schedule
                </li>
                <li className="flex items-center text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full bg-orange-500 mr-2 inline-block"></span>
                  Delayed
                </li>
                <li className="flex items-center text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2 inline-block"></span>
                  Issue/Alert
                </li>
                <li className="flex items-center text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2 inline-block"></span>
                  Delivery Point
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Active Shipments Table - Full width border */}
        <div className="bg-white border border-gray-300 ml-8 m-4 rounded-md shadow-sm overflow-hidden">
          {/* ✅ Updated Header with Create Shipment Button */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h1 className="font-bold text-gray-800 text-lg">Active Shipments</h1>
            <button className="flex items-center gap-2 bg-dark-navy-blue text-white text-sm font-medium px-4 py-2 rounded-md transition">
              <IoMdAdd className="w-4 h-4" />
              Create Shipment
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Tracking ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Route</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">ETA</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Progress</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shipmentsData.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50 transition">
                    {/* Tracking ID + Priority */}
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{shipment.id}</div>
                      <span>{shipment.priority}
                      </span>
                    </td>

                    {/* Route + Distance */}
                    <td className="px-4 py-3">
                      <div className="text-gray-800 font-medium">{shipment.route}</div>
                      <div className="text-xs text-gray-400">{shipment.distance}</div>
                    </td>

                    {/* Vehicle + Driver */}
                    <td className="px-4 py-3">
                      <div className="text-gray-800 font-medium">{shipment.vehicle}</div>
                      <div className="text-xs text-gray-400">Driver: {shipment.driver}</div>
                    </td>

                    {/* Status */}
                    <td class="px-4 py-3 font-bold">
                      <span>
                        {shipment.status}
                      </span>
                    </td>

                    {/* ETA + time remaining */}
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-800">{shipment.eta}</div>

                      <div className="text-xs font-medium text-gray-500">
                        {shipment.timeRemaining}
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${shipment.progress >= 90 ? 'bg-green-500' :
                                shipment.progress >= 70 ? 'bg-blue-500' :
                                  shipment.progress >= 50 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                }`}
                              style={{ width: `${shipment.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{shipment.progress}%</span>
                        </div>
                        <span className="text-[10px] text-gray-400">{shipment.progress}% Complete</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td class="px-4 py-3">
                      <button class="text-sm h-3 w-3">
                        <GrFormView />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

        {/* Route Performance & Delivery Alerts */}
        <div className="flex gap-4 px-4">
          {/* Left Column */}
          <div className="bg-white border border-gray-300 p-4 rounded-md flex-1 h-100 ml-3.5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700 text-sm tracking-wider">
                Route Performance
              </h3>
              <span className="text-xs text-gray-400">Last 7 Days</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-start bg-gray-50 rounded-md h-15 p-2">
                <div>
                  <span className="text-sm font-medium text-gray-800">Mumbai → Delhi</span>
                  <p className="text-xs text-gray-400">On-time rate</p>
                </div>
                <span className="text-sm font-bold text-green-600">98.2%</span>
              </div>

              <div className="flex justify-between items-start bg-gray-50 rounded-md h-15 p-2">
                <div>
                  <span className="text-sm font-medium text-gray-800">Delhi → Kolkata</span>
                  <p className="text-xs text-gray-400">18 deliveries this week</p>
                  <p className="text-xs text-gray-400">On-time rate</p>
                </div>
                <span className="text-sm font-bold text-green-600">95.8%</span>
              </div>

              <div className="flex justify-between items-start bg-gray-50 rounded-md h-15 p-2">
                <div>
                  <span className="text-sm font-medium text-gray-800">Chennai → Bangalore</span>
                  <p className="text-xs text-gray-400">32 deliveries this week</p>
                  <p className="text-xs text-gray-400">On-time rate</p>
                </div>
                <span className="text-sm font-bold text-yellow-600">87.5%</span>
              </div>

              <div className="flex justify-between items-start bg-gray-50 rounded-md h-15 p-2">
                <div>
                  <span className="text-sm font-medium text-gray-800">Pune → Hyderabad</span>
                  <p className="text-xs text-gray-400">15 deliveries this week</p>
                  <p className="text-xs text-gray-400">On-time rate</p>
                </div>
                <span className="text-sm font-bold text-green-600">96.1%</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white border border-gray-300 p-4 rounded-md flex-1 h-100 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700 text-sm tracking-wider">
                Delivery Alerts
              </h3>
              <span className="text-dark-navy-blue text-sm font-medium cursor-pointer hover:underline">
                Manage Alerts
              </span>
            </div>

            <div class="">
              {/* 1. Vehicle Breakdown */}
              <div className="flex items-center justify-between bg-red-100 rounded-md p-2 m-2">
                <div className="w-6 h-6 rounded-full bg-red-200 items-center justify-center flex mr-2">
                  <FiAlertTriangle className="w-3.5 h-3.5 text-red-600" />
                </div>                  <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Vehicle Breakdown - TRK-005</p>
                  <p className="text-xs text-gray-500">Shipment SH-2024-001243 delayed due to vehicle issue</p>
                  <p className="text-xs text-gray-400 mt-0.5">15 minutes ago</p>
                </div>
                <RxCross1 className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer transition flex-shrink-0 ml-2" />
              </div>

              <div className="flex items-start bg-orange-100 h-18 p-2 m-2">
                <div className="flex-1 rounded-md">
                  <p className="text-sm font-semibold text-gray-800">Delivery Delayed</p>
                  <p className="text-xs text-gray-500">SH-2024-001245 is running 2 hours behind schedule</p>
                  <p className="text-xs text-gray-400 mt-0.5">1 hour ago</p>
                </div>
                <RxCross1 className="w-4 h-4 text-orange-500 cursor-pointer transition flex-shrink-0 ml-2" />

              </div>

              <div className="flex items-center justify-between bg-blue-100 p-2 m-2">
                <div className="flex-1 rounded-md  h-18 ">
                  <p className="text-sm font-semibold text-gray-800">Route Optimization Available</p>
                  <p className="text-xs text-gray-500">New route suggested for Mumbai-Delhi corridor</p>
                  <p className="text-xs text-gray-400 mt-0.5">2 hours ago</p>
                </div>
                <RxCross1 className="w-4 h-4 text-blue-500 cursor-pointer transition flex-shrink-0 ml-2" />
              </div>

              <div className="flex items-center justify-between bg-green-100 rounded-md p-2 m-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Delivery Completed</p>
                  <p className="text-xs text-gray-500">SH-2024-001244 delivered successfully to Hyderabad</p>
                  <p className="text-xs text-gray-400 mt-0.5">3 hours ago</p>
                </div>
                <RxCross1 className="w-4 h-4 text-green-500 cursor-pointer transition flex-shrink-0 ml-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Driver Performance Dashboard */}
        <div className="bg-white ml-8 p-4 m-4 border border-gray-300 rounded-md shadow-sm">
          <h1 className="font-bold text-xl text-gray-800 mb-4 tracking-wide">
            Driver Performance Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Raj Kumar */}
            <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
              <div className="flex items-center gap-3 mt-1">
                <img
                  src="https://i.pravatar.cc/100?img=11"
                  alt="Raj Kumar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="text-xs text-gray-500">TRK-001</p>
                  <h3 className="font-semibold text-gray-800 text-md">Raj Kumar</h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm flex justify-between"><span className="text-gray-500">Deliveries:</span> <span className="font-medium">47</span></p>
                <p className="text-sm flex justify-between"><span className="text-gray-500">On-time Rate:</span> <span className="font-medium text-green-600">98.2%</span></p>
                <p className="text-sm flex justify-between"> <span className="text-gray-500">Rating:</span>
                  <span className="font-medium">
                    <span className="text-yellow-500">★</span> 4.3
                  </span></p>
                <p className="text-sm flex justify-between"><span className="text-gray-500">Status</span> <span className="font-bold">On Route</span></p>
              </div>
              <button className="mt-3 bg-dark-navy-blue text-white text-sm py-1.5 rounded-md transition w-full">
                📞 Call
              </button>
            </div>

            {/* Amit Singh */}
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mt-1">
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Amit Singh"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="text-xs text-gray-500">TRK-002</p>
                  <h3 className="font-semibold text-gray-800 text-md">Amit Singh</h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm flex justify-between"><span className="text-gray-500">Deliveries:</span> <span className="font-medium">52</span></p>
                <p className="text-sm flex justify-between"><span className="text-gray-500">On-time Rate:</span> <span className="font-medium text-green-600">95.8%</span></p>
                <p className="text-sm flex justify-between"> <span className="text-gray-500">Rating:</span>
                  <span className="font-medium">
                    <span className="text-yellow-500">★</span> 4.3
                  </span></p>
                <p className="text-sm flex justify-between"><span className="text-gray-500">Status</span> <span className="font-bold">Delivering</span></p>
              </div>
              <button className="mt-3 bg-dark-navy-blue hover:bg-blue-700 text-white text-sm py-1.5 rounded-md transition w-full">
                📞 Call
              </button>
            </div>

            {/* Suresh Raman */}
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mt-1">
                <img
                  src="https://i.pravatar.cc/100?img=13"
                  alt="Suresh Raman"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="text-xs text-gray-500">TRK-003</p>
                  <h3 className="font-semibold text-gray-800 text-md">Suresh Raman</h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm flex justify-between"><span className="text-gray-500">Deliveries:</span> <span className="font-medium">38</span></p>
                <p className="text-sm flex justify-between"><span className="text-gray-500">On-time Rate:</span> <span className="font-medium text-yellow-600">87.5%</span></p>
                <p className="text-sm flex justify-between"> <span className="text-gray-500">Rating:</span>
                  <span className="font-medium">
                    <span className="text-yellow-500">★</span> 4.3
                  </span></p>
                <p className="text-sm flex justify-between"><span className="text-gray-500">Status</span> <span className="font-bold">Delayed</span></p>
              </div>
              <button className="mt-3 bg-red-600 hover:bg-blue-700 text-white text-sm py-1.5 rounded-md w-[90%] flex items-center px-4">
                <span>📞 Call</span>
                <LuTriangleAlert className="w-4 h-4 ml-auto" />
              </button>
            </div>

            {/* Vikram Joshi */}
            <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center gap-3 mt-1">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Driver profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="text-xs text-gray-500">TRK-004</p>
                  <h3 className="font-semibold text-gray-800 text-md">Vikram Joshi</h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm flex justify-between"><span className="text-gray-500">Deliveries:</span> <span className="font-medium">41</span></p>
                <p className="text-sm flex justify-between"><span className="text-gray-500">On-time Rate:</span> <span className="font-medium text-green-600">96.1%</span></p>
                <p className="text-sm flex justify-between"> <span className="text-gray-500">Rating:</span>
                  <span className="font-medium">
                    <span className="text-yellow-500">★</span> 4.3
                  </span></p>
                <p className="text-sm flex justify-between"><span className="text-gray-500">Status</span> <span className="font-bold">Available</span></p>
              </div>
              <button className="mt-3 bg-dark-navy-blue text-white text-sm py-1.5 rounded-md transition w-full">
                📋 Assign
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipments