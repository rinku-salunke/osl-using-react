import React from 'react';
import { LuChevronRight } from "react-icons/lu";
import { RiAlertFill } from "react-icons/ri";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineInventory } from "react-icons/md";
import { GoReport } from "react-icons/go";
import { IoMapSharp } from "react-icons/io5";


function Warehouse() {
  return (
    <div>
      <div class="border-b border-gray-200 pb-2 -mx-8 px-8 flex flex-col bg-white">
        <span class="font-bold">Warehouse Operations</span>
        <span>manage inventory picking, packing and warehouse tasks</span>
      </div>

      <div class="bg-gray-50 min-h-screen -mx-8">   {/* इथे राखाडी बॅकग्राउंड */}

        <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-4">
          <div class="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
            <div class="text-xs text-gray-500 font-medium tracking-wide">Total Inventory</div>
            <div class="text-2xl font-bold text-gray-800">24,567</div>
            <div class="text-xs text-green-600 font-medium">↑ 5% from last week</div>
          </div>

          <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
            {/* Row 1: Title on left, Icon on right */}
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium tracking-wide">
              <span>Active Tasks</span>
              <MdOutlineInventory className="text-base text-gray-400" /> {/* Icon on the right */}
            </div>

            {/* Row 2: Number */}
            <div className="text-2xl font-bold text-gray-800">12</div>

            {/* Row 3: Subtext */}
            <div className="text-xs text-red-500">8 pending pickup</div>
          </div>

          <div class="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
            <div class="text-xs text-gray-500 font-medium tracking-wide">Warehouse Utilization</div>
            <div class="text-2xl font-bold text-gray-800">78%</div>
            <div class="text-xs text-blue-600 font-medium">Optimal range</div>
          </div>

          <div class="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
            <div class="text-xs text-gray-500 font-medium tracking-wide">Items Processed</div>
            <div class="text-2xl font-bold text-gray-800">1,456</div>
            <div class="text-xs text-green-600 font-medium">↑ 12% from yesterday</div>
          </div>
        </div>


        <div class="bg-white border border-gray-300 ml-8  p-4 m-4 flex flex-col gap-3 rounded-md">
          <div>
            <h2 class="text-sm font-semibold text-gray-700">Quick Actions</h2>
          </div>
          <div class="flex flex-wrap gap-3">
            <div class="flex-1 min-w-[100px] text-xs text-gray-500 font-medium bg-gray-100 h-20 rounded-md p-2 flex items-center justify-center border border-gray-200">
              Receive items
            </div>
            <div class="flex-1 min-w-[100px] text-xs text-gray-500 font-medium bg-gray-100 h-20 rounded-md p-2 flex items-center justify-center border border-gray-200">
              Pick items
            </div>
            <div class="flex-1 min-w-[100px] text-xs text-gray-500 font-medium bg-gray-100 h-20 rounded-md p-2 flex items-center justify-center border border-gray-200">
              Pack items
            </div>
            <div class="flex-1 min-w-[100px] text-xs text-gray-500 font-medium bg-gray-100 h-20 rounded-md p-2 flex items-center justify-center border border-gray-200">
              QR Scan
            </div>
            <div class="flex-1 min-w-[100px] text-xs text-gray-500 font-medium bg-gray-100 h-20 rounded-md p-2 flex items-center justify-center border border-gray-200">
              Audit Stock
            </div>
            <div class="flex-1 min-w-[100px] text-xs text-gray-500 font-medium bg-gray-100 h-20 rounded-md p-2 flex items-center justify-center border border-gray-200">
              Load Vehicle
            </div>
          </div>
        </div>
        <div class="bg-white border border-gray-300 ml-8  m-4 flex  rounded-md h-150">
          <div class="grid grid-cols-2 gap-4 p-4 w-full m-4">

            <div class="border border-gray-300 h-67 mb-0">
              <div>
                <div class="flex justify-between">
                  <div class="flex flex-col">
                    <span>Pick Order #LG-001247</span>
                    <span>Priority:High</span>
                  </div>
                  <span class="text-gray-600">In Progress</span>
                </div>

                <div class="flex justify-between mt-0">
                  <div class="flex flex-col">
                    <span>Assigned to:</span>
                    <span>Items:</span>
                    <span>Location:</span>
                    <span>Started:</span>
                  </div>
                  <div class="flex flex-col m-2">
                    <span class="font-bold text-black">Sarah Johnson</span>
                    <span class="font-bold text-black">24 items</span>
                    <span class="font-bold text-black">Zone A-12</span>
                    <span class="font-bold text-black">2 hours ago</span>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between p-2 mb-2">
                    <span>progress</span>
                    <span>18/24 items</span>
                  </div>
                  <div class=" bg-gray-200 h-2 rounde-md m-1 w-[90%]">
                    <div class="bg-green-600 h-2 w-[60%]"></div>
                  </div>
                </div>

                <div>
                  <div>
                  </div>
                  <span class="bg-blue-900 m-1 text-white text-center py-2 rounded-md inline-block w-[96%]">
                    View Details
                  </span>
                </div>
              </div>
            </div>
            <div class="border border-gray-300 h-67">
              <div>
                <div class="flex justify-between">
                  <div class="flex flex-col">
                    <span>Pick Order #LG-001247</span>
                    <span>Priority:High</span>
                  </div>
                  <span class="text-gray-600">In Progress</span>
                </div>

                <div class="flex justify-between mt-0">
                  <div class="flex flex-col">
                    <span>Assigned to:</span>
                    <span>Items:</span>
                    <span>Location:</span>
                    <span>Started:</span>
                  </div>
                  <div class="flex flex-col m-2">
                    <span class="font-bold text-black">Sarah Johnson</span>
                    <span class="font-bold text-black">24 items</span>
                    <span class="font-bold text-black">Zone A-12</span>
                    <span class="font-bold text-black">2 hours ago</span>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between p-2 mb-2">
                    <span>progress</span>
                    <span>18/24 items</span>
                  </div>
                  <div class=" bg-gray-200 h-2 rounde-md m-1 w-[90%]">
                    <div class="bg-green-600 h-2 w-[60%]"></div>
                  </div>
                </div>

                <div>
                  <div>
                  </div>
                  <span class="bg-orange-500 m-1 text-white text-center py-2 rounded-md inline-block w-[96%]">
                    View Details
                  </span>
                </div>
              </div>
            </div>
            <div class="border border-gray-300 h-67">
              <div>
                <div class="flex justify-between">
                  <div class="flex flex-col">
                    <span>Pick Order #LG-001247</span>
                    <span>Priority:High</span>
                  </div>
                  <span class="text-gray-600">In Progress</span>
                </div>

                <div class="flex justify-between mt-0">
                  <div class="flex flex-col">
                    <span>Assigned to:</span>
                    <span>Items:</span>
                    <span>Location:</span>
                    <span>Started:</span>
                  </div>
                  <div class="flex flex-col m-2">
                    <span class="font-bold text-black">Sarah Johnson</span>
                    <span class="font-bold text-black">24 items</span>
                    <span class="font-bold text-black">Zone A-12</span>
                    <span class="font-bold text-black">2 hours ago</span>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between p-2 mb-2">
                    <span>progress</span>
                    <span>18/24 items</span>
                  </div>
                  <div class=" bg-gray-200 h-2 rounde-md m-1 w-[90%]">
                    <div class="bg-green-600 h-2 w-[60%]"></div>
                  </div>
                </div>

                <div>
                  <div>
                  </div>
                  <span class="bg-blue-500 m-1 text-white text-center py-2 rounded-md inline-block w-[96%]">
                    View Details
                  </span>
                </div>
              </div>
            </div>
            <div class="border border-gray-300 h-67">
              <div>
                <div class="flex justify-between">
                  <div class="flex flex-col">
                    <span>Pick Order #LG-001247</span>
                    <span>Priority:High</span>
                  </div>
                  <span class="text-gray-600">In Progress</span>
                </div>

                <div class="flex justify-between mt-0">
                  <div class="flex flex-col">
                    <span>Assigned to:</span>
                    <span>Items:</span>
                    <span>Location:</span>
                    <span>Started:</span>
                  </div>
                  <div class="flex flex-col m-2">
                    <span class="font-bold text-black">Sarah Johnson</span>
                    <span class="font-bold text-black">24 items</span>
                    <span class="font-bold text-black">Zone A-12</span>
                    <span class="font-bold text-black">2 hours ago</span>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between p-2 mb-2">
                    <span>progress</span>
                    <span>18/24 items</span>
                  </div>
                  <div class=" bg-gray-200 h-2 rounde-md m-1 w-[90%]">
                    <div class="bg-green-600 h-2 w-[60%]"></div>
                  </div>
                </div>

                <div>
                  <div>
                  </div>
                  <span class="bg-purple-500 m-1 text-white text-center py-2 rounded-md inline-block w-[96%]">
                    View Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 p-4 w-full m-4">

        </div>



        <div class="flex gap-4 px-4">
          {/* Left Column */}
          <div class="bg-white border border-gray-300 p-4 rounded-md flex-1 h-100  ml-3.5">
            <div className="flex flex-row gap-60">
              <h3 className="font-semibold text-gray-700 text-sm tracking-wider mb-3">
                Inventory Levels
              </h3>
              <h3 className="font-semibold  text-sm tracking-wider mb-3 text-blue-500">
                <GoReport className="h-3 w-3 inline mr-1" />   {/* आता हा आयकॉन टेक्स्टच्या आधी */}
                View Full Report
              </h3>
            </div>
            <div class=" p-4 rounded-md flex flex-col gap-2 ">

              <div class="bg-gray-50 h-15">
                <div class="flex justify-between">

                  <div class="flex flex-col">
                    <span >Optimal Stock</span>
                    <span >18,456 items</span>
                  </div>
                  <span class="m-2 text-green-500 font-bold">75%</span>
                </div>
              </div>
              <div class="bg-gray-50 h-15">
                <div class="flex justify-between">
                  <div class="flex flex-col">
                    <span>Low Stock</span>
                    <span class="text-1xl">4,234 items</span>
                  </div>
                  <span class="m-2 text-orange-300 font-bold">17%</span>
                </div>
              </div>
              <div class="bg-gray-50 h-15">
                <div class="flex justify-between">
                  <div class="flex flex-col">
                    <span>Out Of Stock</span>
                    <span>1,877 items</span>
                  </div>
                  <span class="m-2 text-red-600 font-bold">8%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div class="bg-white border border-gray-300 p-4 rounded-md flex-1 h-100">
            <div className="flex flex-row gap-60">
              <h3 className="font-semibold text-gray-700 text-sm tracking-wider mb-3">
                Warehouse Zones
              </h3>
              <h3 className="font-semibold  text-sm tracking-wider mb-3 text-blue-500">
                <IoMapSharp className="h-3 w-3 inline mr-1" />   {/* आता हा आयकॉन टेक्स्टच्या आधी */}
                Zone Map
              </h3>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-4 ">
              <div class="h-22 rounded-md text-center  bg-blue-100 ">
                <div class="flex flex-col items-center justify-center m-2 ">
                  <span class="text-blue-500 font-bold">Zone A</span>
                  <span>Electronics</span>
                  <span class="text-green-500">85% capacity</span>
                </div>
              </div>
              <div class="h-22 rounded-md text-center bg-green-100">
                <div class="flex flex-col m-2 ">
                  <span class="text-green-500 font-bold">Zone B</span>
                  <span>Texttiles</span>
                  <span class="text-green-500">72% capacity</span>
                </div>

              </div>
              <div class="h-22 rounded-md text-center bg-orange-100">
                <div class="flex flex-col items-center justify-center m-2">
                  <span class="text-orange-500 font-bold">Zone C</span>
                  <span>Food 7 Beverage</span>
                  <span class="text-orange-500">91% capacity</span>
                </div>
              </div>
              <div class="h-22 rounded-md text-center bg-purple-100">
                <div class="flex flex-col items-center justify-center m-2 ">
                  <span class="text-purple-500 font-bold">Zone D</span>
                  <span>Automative</span>
                  <span class="text-blue-500">685 capacity</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 h-15 mt-4 rounded-md">
              <div class="flex justify-between p-2">
                <span class="text-black">Overall Utilization</span>
                <span class="text-blue-950 font-bold">79%</span>
              </div>
              <div class="w-full bg-gray-100 rounded-md h-2">
                <div class="bg-blue-900 h-2 w-[60%] me-3"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-300 ml-8 p-4 m-4 rounded-md h-120">   {/* removed mt-1 */}
          <div className="flex items-center justify-between p-4">
            <h2 className="font-bold">Recent Warehouse Activity</h2>

          </div>

          <div class="flex gap-3 items-start px-4 py-2 border-none w-255 bg-light-gray m-4">
            <div class=" rounded-full p-1 flex-shrink-0 mt-1  bg-green-300">
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
              <CiDeliveryTruck class="w-4 h-4 text-gray-600" />
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

        <div class="bg-white border border-gray-300 ml-8 p-4 m-4 gap-2 rounded-md h-45">   {/* removed mt-1 */}
          <div >
            <div class="mb-2">
              <h2>Warehouse Performance Metrics</h2>
            </div>

            <div class="flex gap-2 mt-10">
              <div class="flex-1 w-[100] h-20 bg-blue-300  rounded-md p-2 flex items-center justify-center border border-gray-200 text-xs text-gray-500 font-medium">
                lorem
              </div>

              <div class="flex-1 w-[100] h-20 bg-green-300 rounded-md p-2 flex items-center justify-center border border-gray-200 text-xs text-gray-500 font-medium">
                lorem
              </div>
              <div class="flex-1 w-[100] h-20 bg-orange-300 rounded-md p-2 flex items-center justify-center border border-gray-200 text-xs text-gray-500 font-medium">
                lorem
              </div>
              <div class="flex-1 w-[100] h-20 bg-purple-300 rounded-md p-2 flex items-center justify-center border border-gray-200 text-xs text-gray-500 font-medium">
                lorem
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  );
}

export default Warehouse;