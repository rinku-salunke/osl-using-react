import React, { useState, useMemo } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { TfiWrite } from "react-icons/tfi";
import { FaBoxes } from "react-icons/fa";        // ✅ fa मधून

const TdsMaster = () => {
  // ===== Filters =====
  const [tdsNameFilter, setTdsNameFilter] = useState("");
  const [tdsCodeFilter, setTdsCodeFilter] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    tdsName: true,
    tdsCode: true,
    section: true,
    withPan: true,
    withoutPan: true,
    applicableFrom: true,
    applicableTo: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "tdsName", label: "TDS Name" },
    { key: "tdsCode", label: "TDS Code" },
    { key: "section", label: "Section" },
    { key: "withPan", label: "With PAN" },
    { key: "withoutPan", label: "Without PAN" },
    { key: "applicableFrom", label: "Applicable From" },
    { key: "applicableTo", label: "Applicable To" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [tdsList, setTdsList] = useState([
    {
      id: 1,
      srNo: 1,
      tdsName: "Salary",
      tdsCode: "192",
      section: "192",
      withPan: "10%",
      withoutPan: "20%",
      applicableFrom: "01/04/2024",
      applicableTo: "31/03/2025",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      tdsName: "Interest on Securities",
      tdsCode: "193",
      section: "193",
      withPan: "10%",
      withoutPan: "20%",
      applicableFrom: "01/04/2024",
      applicableTo: "31/03/2025",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      tdsName: "Dividend",
      tdsCode: "194",
      section: "194",
      withPan: "10%",
      withoutPan: "20%",
      applicableFrom: "01/04/2024",
      applicableTo: "31/03/2025",
      status: true,
    },
    {
      id: 4,
      srNo: 4,
      tdsName: "Contractor",
      tdsCode: "194C",
      section: "194C",
      withPan: "1%",
      withoutPan: "20%",
      applicableFrom: "01/04/2024",
      applicableTo: "31/03/2025",
      status: false,
    },
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (id) => {
    setTdsList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: !t.status } : t))
    );
  };

  // ===== Edit / Delete =====
  const handleEdit = (item) => alert(`Edit: ${item.tdsName}`);
  const handleDelete = (id) => {
    if (window.confirm("हा TDS delete करायचा?")) {
      setTdsList((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // ===== FILTERED DATA =====
  const filteredTds = useMemo(() => {
    return tdsList.filter((t) => {
      const matchName = tdsNameFilter
        ? t.tdsName.toLowerCase().includes(tdsNameFilter.toLowerCase())
        : true;
      const matchCode = tdsCodeFilter
        ? t.tdsCode.toLowerCase().includes(tdsCodeFilter.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? t.status === true
          : t.status === false;
      const matchSearch =
        t.tdsName.toLowerCase().includes(search.toLowerCase()) ||
        t.tdsCode.toLowerCase().includes(search.toLowerCase());
      return matchName && matchCode && matchStatus && matchSearch;
    });
  }, [tdsList, tdsNameFilter, tdsCodeFilter, status, search]);

  // ===== Cards Data =====
  const statsData = useMemo(() => {
    const total = tdsList.length;
    const active = tdsList.filter((t) => t.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Tds Master",
        value: total,
        icon: (
          <div className="w-6 h-6 text-blue-600">
            <FaBoxes size={20} />
          </div>
        ),
        iconBg: "bg-blue-100",
        footer: "5% from last week",
        footerIcon: <IoIosArrowRoundUp size={18} />,
        footerColor: "text-green-600",
      },
      {
        label: "Active Tds Master",
        value: active,
        icon: (
          <div className="w-6 h-6 text-orange-500">
            <FaListCheck size={20} />
          </div>
        ),
        iconBg: "bg-orange-100",
        footer: "Recent additions",
        footerIcon: <FaClock size={15} />,
        footerColor: "text-red-600",
      },
      {
        label: "InActive Tds Master",
        value: inactive,
        icon: (
          <div className="w-6 h-6 text-green-600">
            <HiOutlineOfficeBuilding size={20} />
          </div>
        ),
        iconBg: "bg-green-100",
        footer: "Currently away",
        footerIcon: <TfiWrite size={14} />,
        footerColor: "text-blue-600",
      },
    ];
  }, [tdsList]);

  // ===== Pagination calculations =====
  const totalEntries = filteredTds.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedTds = filteredTds.slice(startIdx, startIdx + entriesPerPage);

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
      label: "Tds Name",
      value: tdsNameFilter,
      onChange: (v) => {
        setTdsNameFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Tds Name", value: "" },
        { label: "Salary", value: "salary" },
        { label: "Interest on Securities", value: "interest" },
        { label: "Dividend", value: "dividend" },
        { label: "Contractor", value: "contractor" },
      ],
    },
    {
      label: "Tds Code",
      value: tdsCodeFilter,
      onChange: (v) => {
        setTdsCodeFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Tds Code", value: "" },
        { label: "192", value: "192" },
        { label: "193", value: "193" },
        { label: "194", value: "194" },
        { label: "194C", value: "194C" },
      ],
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
    },
  ];

  const handleAdd = () => alert("Add TDS Master clicked");

  return (
    <MasterData
      title="TDS Master"
      onAdd={handleAdd}
      addButtonLabel="Add TDS Master"
      stats={statsData}
      filters={filtersData}
      // Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      totalEntries={totalEntries}
      entriesPerPage={entriesPerPage}
      onPageChange={handlePageChange}
      onEntriesPerPageChange={handleEntriesPerPageChange}
      // Column Visibility
      columns={columnsList}
      visibleColumns={visibleColumns}
      onToggleColumn={toggleColumn}
    >
      {/* ===== Toolbar ===== */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {["Copy", "Excel", "CSV", "PDF", "Print"].map((btn) => (
          <button
            key={btn}
            className="border border-gray-300 px-3 py-1.5 text-sm rounded-md hover:bg-gray-50"
          >
            {btn}
          </button>
        ))}
      </div>

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
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              {visibleColumns.srNo && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[70px]">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>Sr No.</span>
                  </div>
                </th>
              )}
              {visibleColumns.tdsName && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>TDS Name</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.tdsCode && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>TDS Code</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.section && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Section</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.withPan && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>With PAN</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.withoutPan && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Without PAN</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.applicableFrom && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Applicable From</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.applicableTo && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Applicable To</span>
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
                <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[110px]">
                  <span>Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedTds.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="text-center text-gray-400 py-6 border-b border-gray-200"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedTds.map((t, idx) => (
                <tr
                  key={t.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {visibleColumns.srNo && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {t.srNo}
                    </td>
                  )}
                  {visibleColumns.tdsName && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium">
                      {t.tdsName}
                    </td>
                  )}
                  {visibleColumns.tdsCode && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {t.tdsCode}
                    </td>
                  )}
                  {visibleColumns.section && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {t.section}
                    </td>
                  )}
                  {visibleColumns.withPan && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {t.withPan}
                    </td>
                  )}
                  {visibleColumns.withoutPan && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {t.withoutPan}
                    </td>
                  )}
                  {visibleColumns.applicableFrom && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {t.applicableFrom}
                    </td>
                  )}
                  {visibleColumns.applicableTo && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {t.applicableTo}
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-2 py-3 border-b border-r border-gray-200">
                      <ToggleSwitch
                        checked={t.status}
                        onChange={() => toggleStatus(t.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-2 py-3 border-b border-gray-200">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(t)}
                          className="w-7 h-7 border border-blue-500 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <MdOutlineModeEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="w-7 h-7 border border-red-400 text-red-500 rounded-md flex items-center justify-center hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <RiDeleteBin6Line size={15} />
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

export default TdsMaster;