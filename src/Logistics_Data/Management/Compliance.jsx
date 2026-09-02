import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { RiFolderUploadLine } from "react-icons/ri";
import { FcExpired } from "react-icons/fc";
import { FaLeaf } from "react-icons/fa";
import { TbIrregularPolyhedronPlus } from "react-icons/tb";
import { MdOutlineHighQuality } from "react-icons/md";
import { FaUmbrella } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { GoAlertFill } from "react-icons/go";


function Compliance() {
  return (
    <div>
      {/* ---------- HEADER (unchanged) ---------- */}
      <div className="bg-white border-b border-gray-300 flex justify-between items-center px-6 py-1.5 -mx-8">
        <div className="flex flex-col">
          <h1 className="font-bold text-black">Compliance Management</h1>
          <span>monitor regulatory compliance, certifications and audit requirements</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600 border border-gray-300 rounded-md px-4 py-1.5 font-medium">
            Compliance Report
          </span>
          <span className="bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5">
            <IoMdAdd className="text-base" />
            Add Document
          </span>
        </div>
      </div>
      <div className="bg-gray-50 min-h-screen -mx-8">

        {/* Stats Cards (unchanged) */}
        <div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-4">
            <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Total Documents</div>
              <div className="text-2xl font-bold text-gray-800">156</div>
              <div className="text-xs text-green-600 font-medium">139 compliant</div>

            </div>
            <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Pending Reviews</div>
              <div className="text-2xl font-bold text-gray-800">7</div>
              <div className="text-xs text-red-600 font-medium">Requires Attention</div>
            </div>
            <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Expiring Soon</div>
              <div className="text-2xl font-bold text-gray-800">12</div>
              <div className="text-xs text-orange-300 font-medium">within 30 days</div>
            </div>
            <div className="border border-gray-300 rounded-md p-4 bg-white h-28 w-full flex flex-col justify-between">
              <div className="text-xs text-gray-500 font-medium tracking-wide">Audit Score</div>
              <div className="text-2xl font-bold text-gray-800">89%</div>
              <div className="text-xs text-green-600 font-medium">+3% from last month</div>
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
        <div className="flex gap-4 me-3 ms-8 mt-3">
          {/* Wider column – Gate Pass Queue (no scrollbar) */}
          <div className="bg-white border border-gray-300 rounded-md p-4 flex-[2]">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-300 px-2 py-3 -mx-4">              <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-800">Document Categories</span>
            </div>
              <button className="px-3 py-1.5  border border-gray-300 rounded-md flex items-center gap-1">
                All Categories
              </button>
            </div>
            <div>
              <div class="grid grid-cols-2 gap-4 mt-3">
                <div class="h-59 rounded-md  p-2 border border-gray-300">
                  <div class="flex justify-between mb-5">
                    <span class=" border rounded-md border-gray-300 px-5 py-3 bg-red-300 border-none text-black">
                      <FcExpired />
                    </span>
                    <span class="font-bold text-black">3 Expiring</span>
                  </div>
                  <div class="flex flex-col text-sm">
                    <span class="font-bold">Safety & Security</span>
                    <span>fire safety certificates,security</span>
                    <span>clearances, and safety protocols</span>
                  </div>
                  <div class="flex justify-between mt-2">
                    <span>23 documents</span>
                    <span class="text-green">87% compliants</span>
                  </div>
                  <div class="flex flex-row gap-2">
                    <span className="block w-[90%] bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium items-center gap-1.5 text-center">
                      View Details
                    </span>
                    <span class="text-center border border-gray-300 px-3 py-2">
                      <IoMdAdd size={20} />

                    </span>
                  </div>
                </div>
                <div class="h-59 rounded-md  p-2 border border-gray-300"><div class="flex justify-between mb-5">
                  <span class=" border rounded-md border-gray-300 px-5 py-3 bg-green-300 border-none text-black">
                    <FaLeaf size={20} />
                  </span>
                  <span class="font-bold text-black">All Current</span>
                </div>
                  <div class="flex flex-col text-sm">
                    <span class="font-bold">Environmental</span>
                    <span>Environmental permits, waste management, and pollution control certificates</span>
                    <span>clearances, and safety protocols</span>
                  </div>
                  <div class="flex justify-between mt-2">
                    <span class="text-sm">18 documents</span>
                    <span class="text-green text-sm">100% compliants</span>
                  </div>
                  <div class="flex flex-row gap-2">
                    <span className="block w-[90%] bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium items-center gap-1.5 text-center">
                      View Details
                    </span>
                    <span class="text-center border border-gray-300 px-3 py-2">
                      <IoMdAdd className="text-base" />

                    </span>
                  </div></div>
                <div class="h-59 rounded-md  p-2 border border-gray-300"><div class="flex justify-between mb-5">
                  <span class=" border rounded-md border-gray-300 px-5 py-3 bg-blue-300 border-none text-black">
                    <TbIrregularPolyhedronPlus size={20} />

                  </span>
                  <span class="font-bold text-black">2 Pending</span>
                </div>
                  <div class="flex flex-col text-sm">
                    <span class="font-bold">Legal & Regulatory</span>
                    <span>business license,permits,and regulatory compliance documents</span>

                  </div>
                  <div class="flex justify-between mt-2">
                    <span class="text-sm">28 documents</span>
                    <span class="text-green text-sm">92% compliants</span>
                  </div>
                  <div class="flex flex-row gap-2">
                    <span className="block w-[90%] bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium items-center gap-1.5 text-center">
                      View Details
                    </span>
                    <span class="text-center border border-gray-300 px-3 py-2">
                      <IoMdAdd className="text-base" />

                    </span>
                  </div></div>
                <div class="h-59 rounded-md  p-2 border border-gray-300"><div class="flex justify-between mb-5">
                  <span class=" border rounded-md border-gray-300 px-5 py-3 bg-red-300 border-none text-black">
                    <MdOutlineHighQuality size={20} />
                  </span>
                  <span class="font-bold text-black">Certified</span>
                </div>
                  <div class="flex flex-col text-sm">
                    <span class="font-bold">Quality Standards</span>
                    <span>ISO certifications,quality management,</span>
                    <span>and standard compliance</span>
                  </div>
                  <div class="flex justify-between mt-2">
                    <span class="text-sm">15 documents</span>
                    <span class="text-green text-sm">95% compliants</span>
                  </div>
                  <div class="flex flex-row gap-2">
                    <span className="block w-[90%] bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium items-center gap-1.5 text-center">
                      View Details
                    </span>
                    <span class="text-center border border-gray-300 px-3 py-2">
                      <IoMdAdd className="text-base" />

                    </span>
                  </div></div>
                <div class="h-59 rounded-md  p-2 border border-gray-300"><div class="flex justify-between mb-5">
                  <span class=" border rounded-md border-gray-300 px-5 py-3 bg-blue-300 border-none text-black">
                    <FaUmbrella size={20} />

                  </span>
                  <span class="font-bold text-black">1 Expiring</span>
                </div>
                  <div class="flex flex-col text-sm">
                    <span class="font-bold">Insurance</span>
                    <span>vehicle insurance,liability coverage,and cargo protection policies</span>

                  </div>
                  <div class="flex justify-between mt-2 text-sm">
                    <span>28 documents</span>
                    <span class="text-green">92% compliants</span>
                  </div>
                  <div class="flex flex-row gap-2">
                    <span className="block w-[90%] bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium items-center gap-1.5 text-center">
                      View Details
                    </span>
                    <span class="text-center border border-gray-300 px-3 py-2">
                      <IoMdAdd className="text-base" />

                    </span>
                  </div></div>
                <div class="h-59 rounded-md  p-2 border border-gray-300"><div class="flex justify-between mb-5">
                  <span class=" border rounded-md border-gray-300 px-5 py-3 bg-yellow-300 border-none text-black">
                    <FaTruck size={20} />

                  </span>
                  <span class="font-bold text-black">2 Expired</span>
                </div>
                  <div class="flex flex-col text-sm">
                    <span class="font-bold">Vehicle Compliance</span>
                    <span>vehicle registrations,PUC certificates,and fitness certificates</span>
                  </div>
                  <div class="flex justify-between mt-2 text-sm">
                    <span>35 documents</span>
                    <span class="text-green">83% compliants</span>
                  </div>
                  <div class="flex flex-row gap-2">
                    <span className="block w-[90%] bg-dark-navy-blue text-white px-4 py-1.5 rounded-md text-sm font-medium items-center gap-1.5 text-center">
                      View Details
                    </span>
                    <span class="text-center border border-gray-300 px-3 py-2">
                      <IoMdAdd className="text-base" />

                    </span>
                  </div></div>
              </div>
            </div>

          </div>
          {/* Narrower column */}
          <div className="bg-white border border-gray-300 rounded-md p-4 flex-1">



            <div>
              <div class="flex justify-between items-center mt-6">
                <span>Compliance Alerts</span>
                <span>
                  <TiStarFullOutline />

                </span>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-2 mt-8">
              <div class="w-full h-30 bg-red-50 border border-gray-200 rounded-md px-4 flex items-center text-sm">
                <div class="flex flex-row gap-2">
                  <span class="border border-none rounded-md bg-red-100 px-1 py-1 h-6 items-center text-red-500"><GoAlertFill size={15} />
                  </span>
                  <div class="flex flex-col ">
                    <div class="flex flex-col text-sm text-red-800">
                      <span>Critical:Fire Safety Certificate</span>
                      <span>Expired</span>
                    </div>
                    <div class="flex flex-col text-sm text-red-500">
                      <span>Warehouse A -Mumbai Facility Fire</span>
                      <span>safety certificate expired 5 days ago</span>
                    </div>
                    <div class="flex flex-row gap-2">
                      <span class="rounded-md border border-red-500 px-2 py-1 text-white bg-red-600">Renew now</span>
                      <span class="rounded-md border border-red-500 px-2 py-1 text-red-600">Details</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-30 bg-orange-50 border border-gray-200 rounded-md px-4 flex items-center text-sm">
                <div class="flex flex-row gap-2">
                  <span class="border border-none rounded-md bg-orange-100 px-1 py-1 h-6 items-center text-orange-500"><GoAlertFill size={15} />
                  </span>
                  <div class="flex flex-col ">
                    <div class=" text-sm text-orange-800">
                      <span>Vehicle PUC Expiring Soon</span>

                    </div>
                    <div class="flex flex-col text-sm text-red-500">
                      <span>TRK-001 PUC Certificate Expires in 7</span>
                      <span>days</span>
                    </div>
                    <div class="flex flex-row gap-2">
                      <span class="rounded-md border border-orange-500 px-2 py-1 text-white bg-orange-600">Schedule</span>
                      <span class="rounded-md border border-orange-500 px-2 py-1 text-orange-600">view</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-30 bg-yellow-50 border border-gray-200 rounded-md px-4 flex items-center text-sm">
                <div class="flex flex-row gap-2">
                  <span class="border border-none rounded-md bg-yellow-100 px-1 py-1 h-6 items-center text-yellow-500"><GoAlertFill size={15} />
                  </span>
                  <div class="flex flex-col ">
                    <div class=" text-sm text-yellow-800">
                      <span>Insurance Renewal Due</span>
                    </div>
                    <div class="flex flex-col text-sm text-yellow-500">
                      <span>commercial vehicle insurance expires in</span>
                      <span>15 days</span>
                    </div>
                    <div class="flex flex-row gap-2">
                      <span class="rounded-md border border-yellow-500 px-2 py-1 text-white bg-yellow-600">Contact Agent</span>
                      <span class="rounded-md border border-yellow-500 px-2 py-1 text-yellow-600">Details</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-30 bg-blue-50 border border-gray-200 rounded-md px-4 flex items-center text-sm">
                <div class="flex flex-row gap-2">
                  <span class="border border-none rounded-md bg-blue-100 px-1 py-1 h-6 items-center text-blue-500"><GoAlertFill size={15} />
                  </span>
                  <div class="flex flex-col ">
                    <div class=" text-sm text-blue-800">
                      <span>Audit Scheduled</span>

                    </div>
                    <div class="flex flex-col text-sm text-blue-500">
                      <span>environmental compliance audit</span>
                      <span>schedule for next week</span>
                    </div>
                    <div class="flex flex-row gap-2">
                      <span class="rounded-md border border-blue-500 px-2 py-1 text-white bg-blue-600">Prepare</span>
                      <span class="rounded-md border border-blue-500 px-2 py-1 text-blue-600">Calendar</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-30 bg-purple-50 border border-gray-200 rounded-md px-4 flex items-center text-sm">
                <div class="flex flex-row gap-2">
                  <span class="border border-none rounded-md bg-purple-100 px-1 py-1 h-6 items-center text-purple-500"><GoAlertFill size={15} />
                  </span>
                  <div class="flex flex-col ">
                    <div class=" text-purple-800">
                      <span>ISO Certification Review</span>
                      <span>Expired</span>
                    </div>
                    <div class="flex flex-col text-sm text-purple-500">
                      <span>annual ISO 9001 certification review due</span>
                      <span>in 30 daysw</span>
                    </div>
                    <div class="flex flex-row gap-2">
                      <span class="rounded-md border border-purple-500 px-2 py-1 text-white bg-purple-600">Start Review</span>
                      <span class="rounded-md border border-purple-500 px-2 py-1 text-purple-600">Checklist</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full h-12 bg-gray-50 border items-center border-dark-navy-blue text-dark-navy-blue rounded-md px-4 flex justify-center text-sm">
                View All Alerts(12)
              </div>
            </div>




          </div>
        </div>

        <div className="flex gap-2 px-4 mt-2 h-auto">
          {/* Left column */}
          <div className="bg-white border border-gray-300 p-4 rounded-md flex-1 ms-4">
            {/* Header */}
            <div className="flex justify-between border-b border-gray-300 px-2 -mx-4 py-2">
              <span className="font-bold">Recent Documents</span>
              <span className="text-dark-navy-blue cursor-pointer hover:underline text-sm">View All</span>
            </div>

            {/* Document List */}
            <div className="flex flex-col gap-3 mt-4">
              {/* 1. Environmental Permit */}
              <div className="border border-gray-200 rounded-md bg-white p-3 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-gray-800">Environmental_Permit_2024.pdf</span>
                    <p className="text-xs text-gray-400 mt-0.5">Uploaded 2 hours ago • Environmental</p>
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Approved</span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Valid until Dec 2024</p>
              </div>

              {/* 2. ISO Certificate */}
              <div className="border border-gray-200 rounded-md bg-white p-3 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-gray-800">ISO_9001_Certificate.jpg</span>
                    <p className="text-xs text-gray-400 mt-0.5">Uploaded yesterday • Quality Standards</p>
                  </div>
                  <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">Under Review</span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Pending verification</p>
              </div>

              {/* 3. Fire Safety Certificate */}
              <div className="border border-gray-200 rounded-md bg-white p-3 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-gray-800">Fire_Safety_Certificate.pdf</span>
                    <p className="text-xs text-gray-400 mt-0.5">Uploaded 3 days ago • Safety & Security</p>
                  </div>
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Expired</span>
                </div>
                <p className="text-xs text-red-500 mt-1.5">⚠️ Renewal required</p>
              </div>

              {/* 4. Business License */}
              <div className="border border-gray-200 rounded-md bg-white p-3 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-gray-800">Business_License_Renewal.pdf</span>
                    <p className="text-xs text-gray-400 mt-0.5">Uploaded last week • Legal & Regulatory</p>
                  </div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Current</span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Valid until Jun 2025</p>
              </div>

              {/* 5. Insurance Policy */}
              <div className="border border-gray-200 rounded-md bg-white p-3 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-gray-800">Insurance_Policy_Commercial.pdf</span>
                    <p className="text-xs text-gray-400 mt-0.5">Uploaded 2 weeks ago • Insurance</p>
                  </div>
                  <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Expiring Soon</span>
                </div>
                <p className="text-xs text-orange-500 mt-1.5">⏳ Expires in 15 days</p>
              </div>
            </div>
          </div>

          {/** Right Column - Audit History */}
          <div className="bg-white p-4 rounded-md flex-1 border border-gray-300">
            {/* Header */}
            <div className="flex justify-between border-b border-gray-300 px-2 -mx-4 py-2">
              <span className="font-bold text-gray-800">Audit History</span>
              <span className="text-white border border-gray-300 rounded-md px-2 py-1 bg-dark-navy-blue text-sm font-medium">Schedule Audit</span>
            </div>

            {/* Audit List */}
            <div className="flex flex-col gap-3 mt-4">
              {/* 1. Environmental Compliance Audit */}
              <div className="p-3 bg-white hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-gray-800 text-sm">Environmental Compliance Audit</span>
                  <span className="text-xs font-medium ">Passed</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Completed on Jan 10, 2024</p>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Annual environmental compliance review covering waste management, emissions, and environmental permits.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs">
                  <span className="text-gray-500">Score: <span className="font-semibold text-gray-700">94/100</span></span>
                  <span className="text-gray-500">Auditor: <span className="text-gray-700">Green Compliance Inc.</span></span>
                </div>
                <button className="text-dark-navy-blue text-xs font-medium hover:underline mt-1.5 cursor-pointer">
                  View Report →
                </button>
              </div>

              {/* 2. Safety & Security Audit */}
              <div className="p-3 bg-white hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-gray-800 text-sm">Safety & Security Audit</span>
                  <span className="text-xs font-medium">Minor Issues</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Completed on Dec 15, 2023</p>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Comprehensive safety audit identified minor issues with fire safety equipment maintenance schedules.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs">
                  <span className="text-gray-500">Score: <span className="font-semibold text-gray-700">87/100</span></span>
                  <span className="text-gray-500">Auditor: <span className="text-gray-700">SafeGuard Audits</span></span>
                </div>
                <button className="text-dark-navy-blue text-xs font-medium hover:underline mt-1.5 cursor-pointer">
                  View Report →
                </button>
              </div>

              {/* 3. ISO 9001 Certification Review */}
              <div className="p-3 bg-white hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-gray-800 text-sm">ISO 9001 Certification Review</span>
                  <span className="text-xs font-medium">Scheduled</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Scheduled for Jan 25, 2024</p>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Annual ISO 9001 quality management system certification review and renewal process.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs">
                  <span className="text-gray-500">Duration: <span className="text-gray-700">2 days</span></span>
                  <span className="text-gray-500">Auditor: <span className="text-gray-700">ISO Cert Solutions</span></span>
                </div>
                <button className="text-dark-navy-blue text-xs font-medium hover:underline mt-1.5 cursor-pointer">
                  Preparation Checklist →
                </button>
              </div>

              {/* 4. Legal & Regulatory Compliance */}
              <div className="p-3 bg-white hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-gray-800 text-sm">Legal & Regulatory Compliance</span>
                  <span className="text-xs font-medium">Passed</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Completed on Nov 20, 2023</p>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Quarterly review of business licenses, permits, and regulatory compliance requirements.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs">
                  <span className="text-gray-500">Score: <span classNamse="font-semibold text-gray-700">98/100</span></span>
                  <span className="text-gray-500">Auditor: <span className="text-gray-700">Legal Compliance Group</span></span>
                </div>
                <button className="text-dark-navy-blue text-xs font-medium hover:underline mt-1.5 cursor-pointer">
                  View Report →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Compliance