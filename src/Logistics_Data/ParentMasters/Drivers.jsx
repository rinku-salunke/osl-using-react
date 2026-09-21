import React, { useState, useMemo } from "react";
import MasterData from "../../Components/MasterData";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";

const Drivers = () => {
  // ===== Filters =====
  const [driverName, setDriverName] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    name: true,
    dob: true,
    telephone: true,
    licenseNo: true,
    licenseExpiry: true,
    allocationStatus: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "name", label: "Name" },
    { key: "dob", label: "DOB" },
    { key: "telephone", label: "Telephone" },
    { key: "licenseNo", label: "License No" },
    { key: "licenseExpiry", label: "License Expiry & Type" },
    { key: "allocationStatus", label: "Allocation Status" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      srNo: 1,
      name: "Rajesh Kumar",
      dob: "1990-05-14",
      telephone: "9876543210",
      licenseNo: "MH12-2018-0012345",
      licenseExpiry: "2026-05-14 (LMV)",
      allocationStatus: "Assigned",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      name: "Suresh Patil",
      dob: "1988-11-22",
      telephone: "9123456789",
      licenseNo: "MH14-2017-0098765",
      licenseExpiry: "2025-11-22 (HMV)",
      allocationStatus: "Unassigned",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      name: "Amit Sharma",
      dob: "1995-03-08",
      telephone: "9988776655",
      licenseNo: "MH01-2020-0054321",
      licenseExpiry: "2027-03-08 (LMV)",
      allocationStatus: "Assigned",
      status: false,
    },
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (id) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: !d.status } : d))
    );
  };

  // ===== Edit / Delete / View =====
  const handleEdit = (item) => alert(`Edit: ${item.name}`);
  const handleView = (item) => alert(`View: ${item.name}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    }
  };

  // ===== FILTERED DATA =====
  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      const matchName = driverName
        ? d.name.toLowerCase().includes(driverName.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
            ? d.status === true
            : d.status === false;
      const matchSearch = d.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchName && matchStatus && matchSearch;
    });
  }, [drivers, driverName, status, search]);

  // ===== Stats =====
  const statsData = useMemo(() => {
    const total = drivers.length;
    const active = drivers.filter((d) => d.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Drivers",
        value: total,
        icon: (
          <div className="w-6 h-6 text-blue-600">
            <FaUsers size={20} />
          </div>
        ),
        iconBg: "bg-blue-100",
        footer: "5% from last week",
        footerIcon: <IoIosArrowRoundUp size={14} />,
        footerColor: "text-green-600",
      },
      {
        label: "Active Driver",
        value: active,
        icon: (
          <div className="w-6 h-6 text-orange-500">
            <FaListCheck size={20} />
          </div>
        ),
        iconBg: "bg-orange-100",
        footer: "Recent additions",
        footerIcon: <FaCheckCircle size={13} />,
        footerColor: "text-red-600",
      },
      {
        label: "InActive Driver",
        value: inactive,
        icon: (
          <div className="w-6 h-6 text-green-600">
            <FaTimesCircle size={20} />
          </div>
        ),
        iconBg: "bg-green-100",
        footer: "Currently away",
        footerIcon: <FaTimesCircle size={13} />,
        footerColor: "text-blue-600",
      },
    ];
  }, [drivers]);

  // ===== Pagination calculations =====
  const totalEntries = filteredDrivers.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedDrivers = filteredDrivers.slice(
    startIdx,
    startIdx + entriesPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEntriesPerPageChange = (value) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  // ===== Filters Data =====
  const filtersData = [
    {
      label: "Driver Name",
      value: driverName,
      onChange: (v) => {
        setDriverName(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Driver Name", value: "" },
        { label: "Rajesh Kumar", value: "rajesh" },
        { label: "Suresh Patil", value: "suresh" },
        { label: "Amit Sharma", value: "amit" },
      ],
      width: "w-[220px]",
    },
    {
      label: "Status",
      value: status,
      onChange: (v) => {
        setStatus(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Status", value: "" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      width: "w-[180px]",
    },
  ];

  const handleReset = () => {
    setDriverName("");
    setStatus("");
    setCurrentPage(1);
  };

  const handleAdd = () => alert("Add Driver clicked");
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <MasterData
      title="Driver"
      onAdd={handleAdd}
      addButtonLabel="Add Driver"
      stats={statsData}
      filters={filtersData}
      onReset={handleReset}
      currentPage={currentPage}
      totalPages={totalPages}
      totalEntries={totalEntries}
      entriesPerPage={entriesPerPage}
      onPageChange={handlePageChange}
      onEntriesPerPageChange={handleEntriesPerPageChange}
      columns={columnsList}
      visibleColumns={visibleColumns}
      onToggleColumn={toggleColumn}
      showExportButtons={true}
    >
      {/* ===== Top Bar: Entries per page + Search ===== */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-white border border-gray-200 rounded-t-md border-b-0">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <select
            value={entriesPerPage}
            onChange={(e) =>
              handleEntriesPerPageChange(Number(e.target.value))
            }
            className="border border-gray-300 rounded-md px-2 py-1.5 text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries per page</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Search:</span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-[220px]"
          />
        </div>
      </div>

      {/* ===== Table (⭐ NO SCROLLBAR) ===== */}
      <div className="border border-gray-200 rounded-b-md">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              {visibleColumns.srNo && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[60px] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>Sr No.</span>
                  </div>
                </th>
              )}
              {visibleColumns.name && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Name</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.dob && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>DOB</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.telephone && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Telephone</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.licenseNo && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>License No</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.licenseExpiry && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>License Expiry & Type</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.allocationStatus && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Allocation Status</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.status && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[80px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.actions && (
                <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[110px] whitespace-nowrap">
                  <span>Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedDrivers.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumnCount}
                  className="text-center text-gray-400 py-6 border-b border-gray-200"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedDrivers.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  {visibleColumns.srNo && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle">
                      {item.srNo}
                    </td>
                  )}
                  {visibleColumns.name && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium align-middle whitespace-nowrap">
                      {item.name}
                    </td>
                  )}
                  {visibleColumns.dob && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                      {item.dob}
                    </td>
                  )}
                  {visibleColumns.telephone && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                      {item.telephone}
                    </td>
                  )}
                  {visibleColumns.licenseNo && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                      {item.licenseNo}
                    </td>
                  )}
                  {visibleColumns.licenseExpiry && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                      {item.licenseExpiry}
                    </td>
                  )}
                  {visibleColumns.allocationStatus && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 align-middle whitespace-nowrap">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.allocationStatus === "Assigned"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.allocationStatus}
                      </span>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 align-middle">
                      <ToggleSwitch
                        checked={item.status}
                        onChange={() => toggleStatus(item.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-2 py-3 border-b border-gray-200 align-middle">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleView(item)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
                          title="View"
                        >
                          <GrView size={15} />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="w-7 h-7 flex items-center justify-center text-blue-600 border border-blue-400 rounded hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <MdOutlineModeEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-red-500 border border-red-400 rounded hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <RiDeleteBin6Line size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </MasterData>
  );
};

/* ================= SORT ICON ================= */
const SortIcon = () => (
  <span className="inline-flex flex-col leading-none text-[10px] text-gray-400 select-none">
    <span className="leading-none">▲</span>
    <span className="leading-none -mt-[2px]">▼</span>
  </span>
);

/* ================= TOGGLE SWITCH ================= */
const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ${
      checked ? "bg-[#1e1b6b]" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
        checked ? "translate-x-[22px]" : "translate-x-[2px]"
      }`}
    />
  </button>
);

export default Drivers;