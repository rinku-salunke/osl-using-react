import React, { useState, useMemo } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { FaBoxes } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const GstMaster = () => {
  // ===== Filters =====
  const [gstFilter, setGstFilter] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    gstPercentage: true,
    cgst: true,
    sgst: true,
    status: true,
    action: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "gstPercentage", label: "GST %" },
    { key: "cgst", label: "CGST %" },
    { key: "sgst", label: "SGST %" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [gstList, setGstList] = useState([
    { id: 1, srNo: 1, gstPercentage: "0%", cgst: "0%", sgst: "0%", status: true },
    { id: 2, srNo: 2, gstPercentage: "5%", cgst: "2.5%", sgst: "2.5%", status: true },
    { id: 3, srNo: 3, gstPercentage: "12%", cgst: "6%", sgst: "6%", status: true },
    { id: 4, srNo: 4, gstPercentage: "18%", cgst: "9%", sgst: "9%", status: true },
    { id: 5, srNo: 5, gstPercentage: "28%", cgst: "14%", sgst: "14%", status: false },
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (id) => {
    setGstList((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: !g.status } : g))
    );
  };

  // ===== Edit / Delete =====
  const handleEdit = (item) => alert(`Edit: ${item.gstPercentage}`);
  const handleDelete = (id) => {
    if (window.confirm("हा GST delete करायचा?")) {
      setGstList((prev) => prev.filter((g) => g.id !== id));
    }
  };

  // ===== FILTERED DATA =====
  const filteredGst = useMemo(() => {
    return gstList.filter((g) => {
      const matchGst = gstFilter ? g.gstPercentage === gstFilter : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
            ? g.status === true
            : g.status === false;
      const matchSearch = g.gstPercentage
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchGst && matchStatus && matchSearch;
    });
  }, [gstList, gstFilter, status, search]);

  // ===== Cards Data =====
  const statsData = useMemo(() => {
    const total = gstList.length;
    const active = gstList.filter((g) => g.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total GST",
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
        label: "Active GST",
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
        label: "InActive GST",
        value: inactive,
        icon: (
          <div className="w-6 h-6 text-purple-600">
            <IoMdCart size={20} />
          </div>
        ),
        iconBg: "bg-purple-100",
        footer: "Open positions",
        footerIcon: <IoIosArrowRoundUp size={18} />,
        footerColor: "text-green-600",
      },
    ];
  }, [gstList]);

  // ===== Pagination calculations =====
  const totalEntries = filteredGst.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedGst = filteredGst.slice(startIdx, startIdx + entriesPerPage);

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
      label: "GST Percentage",
      value: gstFilter,
      onChange: (v) => {
        setGstFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select GST", value: "" },
        { label: "0%", value: "0%" },
        { label: "5%", value: "5%" },
        { label: "12%", value: "12%" },
        { label: "18%", value: "18%" },
        { label: "28%", value: "28%" },
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

  const handleAdd = () => alert("Add GST clicked");

  return (
    <MasterData
      title="GST Master"
      onAdd={handleAdd}
      addButtonLabel="Add GST"
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
      {/* ===== Toolbar (Copy, Excel, CSV, PDF, Print) ===== */}
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
        <table className="w-full text-sm border-collapse table-fixed">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              {visibleColumns.srNo && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[100px]">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>Sr No.</span>
                  </div>
                </th>
              )}
              {visibleColumns.gstPercentage && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>GST %</span>
                  </div>
                </th>
              )}
              {visibleColumns.cgst && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>CGST %</span>
                  </div>
                </th>
              )}
              {visibleColumns.sgst && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>SGST %</span>
                  </div>
                </th>
              )}
              {visibleColumns.status && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[140px]">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.action && (
                <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[110px]">
                  <span>Action</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedGst.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-gray-400 py-6 border-b border-gray-200"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedGst.map((g, idx) => (
                <tr
                  key={g.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {visibleColumns.srNo && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {g.srNo}
                    </td>
                  )}
                  {visibleColumns.gstPercentage && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium">
                      {g.gstPercentage}
                    </td>
                  )}
                  {visibleColumns.cgst && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {g.cgst}
                    </td>
                  )}
                  {visibleColumns.sgst && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {g.sgst}
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-2 py-3 border-b border-r border-gray-200">
                      <ToggleSwitch
                        checked={g.status}
                        onChange={() => toggleStatus(g.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.action && (
                    <td className="px-2 py-3 border-b border-gray-200">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(g)}
                          className="w-7 h-7 border border-blue-500 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <MdOutlineModeEdit size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(g.id)}
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
    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ${checked ? "bg-[#1e1b6b]" : "bg-gray-300"
      }`}
  >
    <span
      className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${checked ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
    />
  </button>
);

export default GstMaster;