import React from 'react';
import { IoMdAdd } from "react-icons/io";
import { PiExportBold } from "react-icons/pi";
import { CiReceipt } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { MdFilterAlt } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";

function OrderOverview() {
  // Hardcoded Data Array - Order Details match the image exactly
  const orders = [
    {
      id: "ORD-2024-0234",
      created: "Jan 15, 2024",
      due: "Jan 18, 2024",
      lrNumber: "LR-2024-5678",
      lrStatus: "Generated",
      lrDate: "Jan 15",
      client: { name: "TechCorp Solutions", type: "Premium Client", initials: "TC", color: "bg-teal-50 text-teal-600" },
      route: { from: "Pune", to: "Mumbai", distance: "150 km" },
      consignment: { type: "Electronics", weight: "2,500 kg", packages: "42 packages" },
      status: { label: "Pending LR", color: "text-orange-500 bg-orange-50" },
      priority: { label: "High", color: "text-red-500 bg-red-50" },
    },
    {
      id: "ORD-2024-0235",
      created: "Jan 15, 2024",
      due: "Jan 17, 2024",
      lrNumber: "LR-2024-5679",
      lrStatus: "Generated",
      lrDate: "Jan 15",
      client: { name: "Global Industries", type: "Standard Client", initials: "GI", color: "bg-green-50 text-green-600" },
      route: { from: "Delhi", to: "Jaipur", distance: "280 km" },
      consignment: { type: "Textiles", weight: "1,800 kg", packages: "28 packages" },
      status: { label: "In Transit", color: "text-blue-500 bg-blue-50" },
      priority: { label: "Medium", color: "text-yellow-500 bg-yellow-50" },
    },
    {
      id: "ORD-2024-0236",
      created: "Jan 14, 2024",
      due: "Jan 16, 2024",
      lrNumber: "LR-2024-5680",
      lrStatus: "Generated",
      lrDate: "Jan 14",
      client: { name: "Modern Electronics", type: "VIP Client", initials: "ME", color: "bg-purple-50 text-purple-600" },
      route: { from: "Bangalore", to: "Chennai", distance: "350 km" },
      consignment: { type: "Electronics", weight: "3,200 kg", packages: "65 packages" },
      status: { label: "Delivered", color: "text-green-500 bg-green-50" },
      priority: { label: "Low", color: "text-green-500 bg-green-50" },
    },
    {
      id: "ORD-2024-0237",
      created: "Jan 14, 2024",
      due: "Jan 19, 2024",
      lrNumber: "Pending",
      lrStatus: "LR not generated",
      lrDate: "", // No date
      client: { name: "Retail Dynamics", type: "New Client", initials: "RD", color: "bg-red-50 text-red-600" },
      route: { from: "Kolkata", to: "Bhubaneswar", distance: "440 km" },
      consignment: { type: "FMCG", weight: "4,100 kg", packages: "85 packages" },
      status: { label: "Draft", color: "text-gray-500 bg-gray-50" },
      priority: { label: "Medium", color: "text-yellow-500 bg-yellow-50" },
    },
    {
      id: "ORD-2024-0238",
      created: "Jan 13, 2024",
      due: "Jan 15, 2024",
      lrNumber: "LR-2024-5681",
      lrStatus: "Generated",
      lrDate: "Jan 13",
      client: { name: "Alpha Pharma", type: "Premium Client", initials: "AP", color: "bg-indigo-50 text-indigo-600" },
      route: { from: "Hyderabad", to: "Vijayawada", distance: "275 km" },
      consignment: { type: "Pharmaceuticals", weight: "1,950 kg", packages: "38 packages" },
      status: { label: "Loading", color: "text-yellow-500 bg-yellow-50" },
      priority: { label: "High", color: "text-red-500 bg-red-50" },
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-4 -mx-8 mt-0">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-black text-lg">Order & LR Management</h1>
          <span className="text-sm text-gray-600">
            manage orders, loading receipts, and consignment documentation
          </span>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-gray-600 border border-gray-300 rounded-md px-4 py-1.5 font-medium inline-flex items-center gap-2">
            <PiExportBold className="text-base" size={15} />
            Export Data
          </span>
          <span className="bg-yellow-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5">
            <CiReceipt className="text-base" size={15} />
            Generate LR
          </span>
          <span className="bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5">
            <IoMdAdd className="text-base" />
            New Order
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="border border-gray-300 rounded-md p-4 bg-white h-28 flex flex-col justify-between">
          <div className="text-xs text-gray-500 font-medium tracking-wide">Total Orders</div>
          <div className="text-2xl font-bold text-gray-800">2847</div>
          <div className="text-xs text-green-600 font-medium">+15% from last month</div>
        </div>
        <div className="border border-gray-300 rounded-md p-4 bg-white h-28 flex flex-col justify-between">
          <div className="text-xs text-gray-500 font-medium tracking-wide">Active LRs</div>
          <div className="text-2xl font-bold text-gray-800">1523</div>
          <div className="text-xs text-green-600 font-medium">247 pending approval</div>
        </div>
        <div className="border border-gray-300 rounded-md p-4 bg-white h-28 flex flex-col justify-between">
          <div className="text-xs text-gray-500 font-medium tracking-wide">In Transit</div>
          <div className="text-2xl font-bold text-gray-800">892</div>
          <div className="text-xs text-orange-600 font-medium">Actively tracked</div>
        </div>
        <div className="border border-gray-300 rounded-md p-4 bg-white h-28 flex flex-col justify-between">
          <div className="text-xs text-gray-500 font-medium tracking-wide">Delivered</div>
          <div className="text-2xl font-bold text-gray-800">1432</div>
          <div className="text-xs text-blue-600 font-medium">98.5% success rate</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white h-20 border border-gray-300 rounded-md flex justify-between items-center px-4">
        <div className="flex flex-row gap-2 items-center">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white">
            <option value="all">All Status</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white">
            <option value="all">All Clients</option>
          </select>
          <input type="text" placeholder="mm/dd/yyyy" className="border border-gray-300 rounded-md px-3 py-2 text-black w-32" />
          <input type="text" placeholder="mm/dd/yyyy" className="border border-gray-300 rounded-md px-3 py-2 text-black w-32" />
          <button className="p-2 text-black">
            <CiCalendar size={30} />
          </button>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <button className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 inline-flex items-center gap-2 hover:bg-gray-50 inline">
            <MdFilterAlt size={16} />
            Advanced Filters
          </button>
          <button className="bg-dark-navy-blue text-white rounded-md px-4 py-2  inline-flex items-center gap-2">
            <IoMdSearch size={16} />
            Search
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-300 mt-3 rounded-md overflow-x-auto">

        {/* Table Header - Order Management & Buttons */}
        <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 bg-white rounded-t-md h-15">
          <span className="text-black font-bold">Order Management</span>
          <div className='flex flex-row'>
            <button className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 text-sm hover:bg-gray-50">Columns</button>
            <button className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 text-sm hover:bg-gray-50">Sort</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-12">Sr. No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Order Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">LR Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Client</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">Route</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">Consignment</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">Priority</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  {/* Sr. No */}
                  <td className="px-4 py-4 text-left text-gray-500">
                    {index + 1}
                  </td>

                  {/* Order Details */}
                  <td className="p-4">
                    <div className="font-semibold text-indigo-900">{order.id}</div>
                    <div className="text-xs text-gray-500">Created: {order.created}</div>
                    <div className="text-xs text-gray-500">Due: {order.due}</div>
                  </td>

                  {/* LR Number */}
                  <td className="p-4">
                    <div className={`font-semibold ${order.lrStatus === 'Pending' ? 'text-orange-500 flex items-center gap-1' : 'text-indigo-900'}`}>
                      {order.lrStatus === 'Pending' && <span className="w-2 h-2 rounded-full bg-orange-500 block"></span>}
                      {order.lrNumber}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.lrStatus === 'Generated' ? `Generated: ${order.lrDate}` : order.lrStatus}
                    </div>
                  </td>

                  {/* Client */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${order.client.color} flex items-center justify-center text-xs font-bold`}>
                        {order.client.initials}
                      </div>
                      <div>
                        <div className="font-medium">{order.client.name}</div>
                        <div className="text-xs text-gray-500">{order.client.type}</div>
                      </div>
                    </div>
                  </td>

                  {/* Route */}
                  <td className="p-4 text-center text-gray-700">
                    <div className="flex items-center justify-center gap-2">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>{order.route.from}</span>
                      <span>→</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>{order.route.to}</span>
                    </div>
                    <div className="text-xs text-gray-500">Distance: {order.route.distance}</div>
                  </td>

                  {/* Consignment */}
                  <td className="p-4 text-center">
                    <div className="font-medium">{order.consignment.type}</div>
                    <div className="text-xs text-gray-500">Weight: {order.consignment.weight}</div>
                    <div className="text-xs text-gray-500">{order.consignment.packages}</div>
                  </td>

                  {/* Status */}
                  <td className="p-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${order.status.color}`}>
                      {order.status.label}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="p-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${order.priority.color}`}>
                      {order.priority.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex justify-center gap-3 text-blue-600 text-lg">
                      <button className="hover:text-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                      <button className="hover:text-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                      <button className="hover:text-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                      <button className="hover:text-blue-800"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
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

      {/* Bottom Two Columns - Fixed Layout */}
      <div className="flex gap-4 mt-2 h-auto">

        {/* Left column - Loading Receipt Status */}
        <div className="bg-white border border-gray-300 p-4 rounded-md flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-indigo-900 font-bold text-lg">Loading Receipt Status</h2>
            <span className="text-blue-600 text-sm cursor-pointer hover:underline">View All LRs</span>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {/* Pending Generation */}
            <div className="border border-gray-200 rounded-md p-4 flex justify-between items-center bg-gray-50">
              <div>
                <div className="font-semibold text-gray-800">Pending Generation</div>
                <div className="text-xs text-gray-500 mt-1">Awaiting LR creation</div>
              </div>
              <div className="font-bold text-lg text-gray-800">247</div>
            </div>

            {/* Generated */}
            <div className="border border-blue-200 rounded-md p-4 flex justify-between items-center bg-blue-50">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-blue-700">Generated</div>
                  <div className="text-xs text-blue-500 mt-1">LR created, ready for dispatch</div>
                </div>
              </div>
              <div className="font-bold text-lg text-blue-700">1,523</div>
            </div>

            {/* Under Review */}
            <div className="border border-purple-200 rounded-md p-4 flex justify-between items-center bg-purple-50">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-purple-700">Under Review</div>
                  <div className="text-xs text-purple-500 mt-1">Pending approval</div>
                </div>
              </div>
              <div className="font-bold text-lg text-purple-700">89</div>
            </div>

            {/* Approved */}
            <div className="border border-green-200 rounded-md p-4 flex justify-between items-center bg-green-50">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-green-700">Approved</div>
                  <div className="text-xs text-green-500 mt-1">Ready for shipment</div>
                </div>
              </div>
              <div className="font-bold text-lg text-green-700">892</div>
            </div>
          </div>
        </div>

        {/* Right Column - Recent LR Activity */}
        <div className="bg-white p-4 rounded-md border border-gray-300 w-[400px] shrink-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-indigo-900 font-bold text-lg">Recent LR Activity</h2>
            <span className="text-blue-600 text-sm cursor-pointer hover:underline">View Timeline</span>
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-5 mt-4">
            {/* Item 1 */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
              </div>
              <div>
                <div className="font-medium text-gray-700">LR-2024-5681 approved for Alpha Pharma</div>
                <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              </div>
              <div>
                <div className="font-medium text-gray-700">LR-2024-5680 generated for Modern Electronics</div>
                <div className="text-xs text-gray-400 mt-1">4 hours ago</div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>
              </div>
              <div>
                <div className="font-medium text-gray-700">LR-2024-5679 pending review for Global Industries</div>
                <div className="text-xs text-gray-400 mt-1">6 hours ago</div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <div>
                <div className="font-medium text-gray-700">LR-2024-5678 created for TechCorp Solutions</div>
                <div className="text-xs text-gray-400 mt-1">8 hours ago</div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <div>
                <div className="font-medium text-gray-700">LR-2024-5677 requires correction</div>
                <div className="text-xs text-gray-400 mt-1">1 day ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white border border-gray-300 mt-4 rounded-md p-4'>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-indigo-900">Quick Actions</h2>
          <button className="text-sm font-medium text-dark-navy-blue hover:underline">
            Customize Actions
          </button>
        </div>

        {/* Grid of Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {/* Create Order */}
          <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center gap-3 hover:shadow-sm transition-shadow cursor-pointer bg-white">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"></path></svg>
            </div>
            <span className="text-xs font-medium text-gray-700">Create Order</span>
          </div>

          {/* Generate LR */}
          <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center gap-3 hover:shadow-sm transition-shadow cursor-pointer bg-white">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <span className="text-xs font-medium text-gray-700">Generate LR</span>
          </div>

          {/* Scan QR Code */}
          <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center gap-3 hover:shadow-sm transition-shadow cursor-pointer bg-white">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <span className="text-xs font-medium text-gray-700">Scan QR Code</span>
          </div>

          {/* Assign Vehicle */}
          <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center gap-3 hover:shadow-sm transition-shadow cursor-pointer bg-white">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <span className="text-xs font-medium text-gray-700">Assign Vehicle</span>
          </div>

          {/* Generate Invoice */}
          <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center gap-3 hover:shadow-sm transition-shadow cursor-pointer bg-white">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <span className="text-xs font-medium text-gray-700">Generate Invoice</span>
          </div>

          {/* View Reports */}
          <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center gap-3 hover:shadow-sm transition-shadow cursor-pointer bg-white">
            <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <span className="text-xs font-medium text-gray-700">View Reports</span>
          </div>

        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">

        {/* Card 1: Order Processing Time */}
        <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-indigo-900 font-bold">Order Processing Time</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>

          {/* Average Processing */}
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Average Processing</span>
              <span className="text-sm font-semibold text-blue-600">4.2 hours</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-1">
              <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
            </div>
          </div>

          {/* LR Generation Time */}
          <div className="flex justify-between items-center mb-4 mt-4">
            <span className="text-sm text-gray-500">LR Generation Time</span>
            <span className="text-sm font-semibold text-orange-500">2.1 hours</span>
          </div>

          {/* Approval Time */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Approval Time</span>
            <span className="text-sm font-semibold text-green-600">1.8 hours</span>
          </div>
        </div>


        {/* Card 2: Order Accuracy */}
        <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-indigo-900 font-bold">Order Accuracy</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
          </div>

          {/* Documentation Accuracy */}
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Documentation Accuracy</span>
              <span className="text-sm font-semibold text-green-600">96.8%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-1">
              <div className="h-2 bg-green-500 rounded-full w-[96%]"></div>
            </div>
          </div>

          {/* Address Accuracy */}
          <div className="flex justify-between items-center mb-4 mt-4">
            <span className="text-sm text-gray-500">Address Accuracy</span>
            <span className="text-sm font-semibold text-blue-600">94.2%</span>
          </div>

          {/* Weight Accuracy */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Weight Accuracy</span>
            <span className="text-sm font-semibold text-orange-500">92.1%</span>
          </div>
        </div>


        {/* Card 3: Client Satisfaction */}
        <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-indigo-900 font-bold">Client Satisfaction</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#3b82f6" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>

          {/* Overall Rating */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">Overall Rating</span>
            <span className="text-sm font-semibold text-green-600">4.7/5</span>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-4">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-gray-300 text-lg">★</span>
          </div>

          {/* Response Time */}
          <div className="flex justify-between items-center mb-4 mt-2">
            <span className="text-sm text-gray-500">Response Time</span>
            <span className="text-sm font-semibold text-blue-600">4.5/5</span>
          </div>

          {/* Service Quality */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Service Quality</span>
            <span className="text-sm font-semibold text-orange-500">4.8/5</span>
          </div>
        </div>

      </div>

      <div className="bg-white border border-gray-300 rounded-md p-4 mt-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-indigo-900">Recent Activities & Alerts</h2>
          <div className="flex gap-4">
            <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">View All</span>
            <span className="text-sm font-medium text-yellow-600 hover:underline cursor-pointer">Mark All Read</span>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">

          {/* Item 1: High Priority Order Overdue */}
          <div className="flex gap-3 py-4 items-start">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">High Priority Order Overdue</h3>
              <p className="text-sm text-gray-500 mt-0.5">Order ORD-2024-0234 for TechCorp Solutions is overdue by 2 hours</p>
              <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
            </div>
            <div className="text-red-500 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
          </div>

          {/* Item 2: LR Pending Approval */}
          <div className="flex gap-3 py-4 items-start">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mt-1.5 shrink-0"></span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">LR Pending Approval</h3>
              <p className="text-sm text-gray-500 mt-0.5">LR-2024-5682 requires manager approval before dispatch</p>
              <p className="text-xs text-gray-400 mt-1">45 minutes ago</p>
            </div>
            <div className="text-yellow-500 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
          </div>

          {/* Item 3: Order Successfully Delivered */}
          <div className="flex gap-3 py-4 items-start">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">Order Successfully Delivered</h3>
              <p className="text-sm text-gray-500 mt-0.5">Order ORD-2024-0236 delivered to Modern Electronics</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
            <div className="text-green-500 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>

          {/* Item 4: New Client Registration */}
          <div className="flex gap-3 py-4 items-start">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">New Client Registration</h3>
              <p className="text-sm text-gray-500 mt-0.5">Retail Dynamics has been added to the client database</p>
              <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
            </div>
            <div className="bg-blue-50 rounded-full p-1 text-blue-600 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>

          {/* Item 5: System Maintenance Scheduled */}
          <div className="flex gap-3 py-4 items-start">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">System Maintenance Scheduled</h3>
              <p className="text-sm text-gray-500 mt-0.5">Planned maintenance window: Tonight 11 PM - 2 AM</p>
              <p className="text-xs text-gray-400 mt-1">6 hours ago</p>
            </div>
            <div className="bg-purple-50 rounded-full p-1 text-purple-600 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderOverview;