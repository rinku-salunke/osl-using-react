import React, { useState, useMemo } from "react";
import MasterData from "../../Components/MasterData";
import { MdOutlineModeEdit } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaBoxes, FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa";

const Transporter = () => {
  // ===== Filters =====
  const [transporterName, setTransporterName] = useState("");
  const [billingHeadName, setBillingHeadName] = useState("");
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
    address: true,
    email: true,
    contactNo: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "name", label: "Transporter name" },
    { key: "address", label: "Address" },
    { key: "email", label: "Email ID" },
    { key: "contactNo", label: "Contact No" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [transporters, setTransporters] = useState([
    {
      id: 1,
      srNo: 1,
      name: "Shree Transport Services",
      address: "45, MIDC Industrial Area, Bhosari, Pune, Maharashtra",
      email: "fartadepratap@gmail.com",
      contactNo: "8459879654",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      name: "SGT Transporter",
      address: "Pune",
      email: "abc11@gmail.com",
      contactNo: "9856230142",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      name: "SG Transporter",
      address: "Pune",
      email: "mno1@gmail.com",
      contactNo: "9856230141",
      status: false,
    },
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (id) => {
    setTransporters((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: !t.status } : t))
    );
  };

  // ===== Edit / View =====
  const handleEdit = (item) => alert(`Edit: ${item.name}`);
  const handleView = (item) => alert(`View: ${item.name}`);

  // ===== FILTERED DATA =====
  const filteredTransporters = useMemo(() => {
    return transporters.filter((t) => {
      const matchName = transporterName
        ? t.name.toLowerCase().includes(transporterName.toLowerCase())
        : true;
      const matchBillingHead = billingHeadName
        ? t.name.toLowerCase().includes(billingHeadName.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
            ? t.status === true
            : t.status === false;
      const matchSearch = t.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchName && matchBillingHead && matchStatus && matchSearch;
    });
  }, [transporters, transporterName, billingHeadName, status, search]);

  // ===== Stats =====
  const statsData = useMemo(() => {
    const total = transporters.length;
    const active = transporters.filter((t) => t.status).length;
    const inactive = total - active;

    return [
      {
        label: "TOTAL TRANSPORTERS",
        value: total,
        icon: (
          <div className="w-6 h-6 text-blue-600">
            <FaBoxes size={20} />
          </div>
        ),
        iconBg: "bg-blue-100",
        footer: "Registered Partners",
        footerIcon: <FaWarehouse size={13} />,
        footerColor: "text-blue-600",
      },
      {
        label: "ACTIVE TRANSPORTERS",
        value: active,
        icon: (
          <div className="w-6 h-6 text-green-600">
            <FaCheckCircle size={20} />
          </div>
        ),
        iconBg: "bg-green-100",
        footer: "Ready for dispatch",
        footerIcon: <FaCheckCircle size={13} />,
        footerColor: "text-green-600",
      },
      {
        label: "INACTIVE TRANSPORTERS",
        value: inactive,
        icon: (
          <div className="w-6 h-6 text-red-500">
            <FaXmark size={20} />
          </div>
        ),
        iconBg: "bg-red-100",
        footer: "Currently away",
        footerIcon: <FaXmark size={13} />,
        footerColor: "text-red-500",
      },
    ];
  }, [transporters]);

  // ===== Pagination calculations =====
  const totalEntries = filteredTransporters.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedTransporters = filteredTransporters.slice(
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
      label: "Transporter Name",
      value: transporterName,
      onChange: (v) => {
        setTransporterName(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Transporter Name", value: "" },
        { label: "Shree Transport Services", value: "shree" },
        { label: "SGT Transporter", value: "sgt" },
        { label: "SG Transporter", value: "sg" },
      ],
      width: "w-[220px]",
    },
    {
      label: "Billing Head Name",
      value: billingHeadName,
      onChange: (v) => {
        setBillingHeadName(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Billing Head", value: "" },
        { label: "Shree Transport Services", value: "shree" },
        { label: "SGT Transporter", value: "sgt" },
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
    setTransporterName("");
    setBillingHeadName("");
    setStatus("");
    setCurrentPage(1);
  };

  const handleAdd = () => alert("Add Transporter clicked");

  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <MasterData
      title="Transporter"
      subtitle="Manage fleet vehicles, gate passes, and vehicle documentation"
      onAdd={handleAdd}
      addButtonLabel="Add Transporter"
      stats={statsData}
      extraCard={{
        title: "Transporter Status",
        icon: <FaCheckCircle className="text-blue-500" size={16} />,
      }}
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

      {/* ===== Table ===== */}
      <div className="overflow-x-auto border border-gray-200 rounded-b-md">
        <table className="w-full text-sm border-collapse table-fixed">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              {visibleColumns.srNo && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[80px]">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>Sr No.</span>
                  </div>
                </th>
              )}
              {visibleColumns.name && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[180px]">
                  <div className="flex items-center justify-between">
                    <span>Transporter name</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.address && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Address</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.email && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Email ID</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.contactNo && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[150px]">
                  <div className="flex items-center justify-between">
                    <span>Contact No</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.status && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[100px]">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.actions && (
                <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[120px]">
                  <div className="flex items-center justify-between">
                    <span>Actions</span>
                    <SortIcon />
                  </div>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedTransporters.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumnCount}
                  className="text-center text-gray-400 py-6 border-b border-gray-200"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedTransporters.map((item, idx) => (
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
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium align-middle whitespace-normal break-words">
                      {item.name}
                    </td>
                  )}
                  {visibleColumns.address && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-normal break-words">
                      {item.address}
                    </td>
                  )}
                  {visibleColumns.email && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle truncate">
                      {item.email}
                    </td>
                  )}
                  {visibleColumns.contactNo && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                      {item.contactNo}
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
                          className="w-8 h-8 flex items-center justify-center text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
                          title="View"
                        >
                          <GrView size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 border border-blue-400 rounded hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <MdOutlineModeEdit size={18} />
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

export default Transporter;