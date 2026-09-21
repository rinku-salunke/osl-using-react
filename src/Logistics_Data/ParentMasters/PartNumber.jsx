import React, { useState, useMemo } from "react";
import MasterData from "../../Components/MasterData";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";

const PartNumber = () => {
  // ===== Tabs =====
  const [activeTab, setActiveTab] = useState("partNumber");

  // ===== Filters =====
  const [customerName, setCustomerName] = useState("");
  const [customerPartNumber, setCustomerPartNumber] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Row Selection =====
  const [selectedRows, setSelectedRows] = useState([]);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    checkbox: true,
    srNo: true,
    consigneeName: true,
    consignorName: true,
    mappedParts: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "checkbox", label: "Select" },
    { key: "srNo", label: "Sr No." },
    { key: "consigneeName", label: "Consignee Name" },
    { key: "consignorName", label: "Consignor Name" },
    { key: "mappedParts", label: "Mapped Parts & Packing" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [partNumbers, setPartNumbers] = useState([
    {
      id: 1,
      srNo: 1,
      consigneeName: "Bosch Limited (chakan)",
      consignorName:
        "Emitec Technologies India Private Limited Talegaon Pune (Phase II, B2, Talegaon Industries Area Pune Maharashtra-410507)",
      mappedParts: [
        { part: "6211175", badge: "Pallet" },
        { part: "50759176" },
      ],
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      consigneeName: "Bosch Limited (chakan)",
      consignorName:
        "Emitec Technologies India Private Limited Talegaon Pune (Phase II, B2, Talegaon Industries Area Pune Maharashtra-410507)",
      mappedParts: [{ part: "6205005", arrow: true }, { part: "6211175" }],
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      consigneeName: "Bosch Limited (chakan)",
      consignorName:
        "Emitec Technologies India Private Limited Talegaon Pune (Phase II, B2, Talegaon Industries Area Pune Maharashtra-410507)",
      mappedParts: [
        { part: "6197305", badge: "Pallet" },
        { part: "6205005" },
      ],
      status: true,
    },
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (id) => {
    setPartNumbers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: !p.status } : p))
    );
  };

  // ===== Row Select =====
  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === paginatedPartNumbers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedPartNumbers.map((p) => p.id));
    }
  };

  // ===== Edit =====
  const handleEdit = (item) => alert(`Edit: ${item.consigneeName}`);

  // ===== FILTERED DATA =====
  const filteredPartNumbers = useMemo(() => {
    return partNumbers.filter((p) => {
      const matchCustomerName = customerName
        ? p.consigneeName.toLowerCase().includes(customerName.toLowerCase())
        : true;
      const matchCustomerPartNumber = customerPartNumber
        ? p.mappedParts.some((mp) =>
            mp.part.toLowerCase().includes(customerPartNumber.toLowerCase())
          )
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
            ? p.status === true
            : p.status === false;
      const matchSearch = p.consigneeName
        .toLowerCase()
        .includes(search.toLowerCase());
      return (
        matchCustomerName &&
        matchCustomerPartNumber &&
        matchStatus &&
        matchSearch
      );
    });
  }, [partNumbers, customerName, customerPartNumber, status, search]);

  // ===== Stats =====
  const statsData = useMemo(() => {
    const total = partNumbers.length;
    const active = partNumbers.filter((p) => p.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Customer Parts",
        value: total,
        noIcon: true,
      },
      {
        label: "Active Customer Parts",
        value: active,
        noIcon: true,
      },
      {
        label: "Inactive Customer Parts",
        value: inactive,
        noIcon: true,
      },
    ];
  }, [partNumbers]);

  // ===== Pagination calculations =====
  const totalEntries = filteredPartNumbers.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedPartNumbers = filteredPartNumbers.slice(
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
      label: "Customer Name",
      value: customerName,
      onChange: (v) => {
        setCustomerName(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Customer", value: "" },
        { label: "Bosch Limited (chakan)", value: "bosch" },
      ],
      width: "w-[220px]",
    },
    {
      label: "Customer Part Number",
      value: customerPartNumber,
      onChange: (v) => {
        setCustomerPartNumber(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Customer Name", value: "" },
        { label: "6211175", value: "6211175" },
        { label: "50759176", value: "50759176" },
        { label: "6205005", value: "6205005" },
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
    setCustomerName("");
    setCustomerPartNumber("");
    setStatus("");
    setCurrentPage(1);
  };

  const handleAdd = () => alert("Create Part clicked");

  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <MasterData
      title="Part Directory"
      onAdd={handleAdd}
      addButtonLabel="Create Part"
      headerRight={
        <button className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition bg-white">
          Consignor-Consignee Registry
        </button>
      }
      tabs={
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("partNumber")}
            className={`px-5 py-2 text-sm font-medium rounded-md transition ${
              activeTab === "partNumber"
                ? "bg-[#1e1b6b] text-white"
                : "bg-white text-[#1e1b6b] border border-[#1e1b6b]"
            }`}
          >
            Part Number
          </button>
          <button
            onClick={() => setActiveTab("customerPartNumber")}
            className={`px-5 py-2 text-sm font-medium rounded-md transition ${
              activeTab === "customerPartNumber"
                ? "bg-[#1e1b6b] text-white"
                : "bg-white text-[#1e1b6b] border border-[#1e1b6b]"
            }`}
          >
            Customer Part Number
          </button>
        </div>
      }
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
      resetButtonRed={true}
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
              {visibleColumns.checkbox && (
                <th className="text-center font-medium px-2 py-2 border-b border-r border-gray-200 w-[50px]">
                  <input
                    type="checkbox"
                    checked={
                      paginatedPartNumbers.length > 0 &&
                      selectedRows.length === paginatedPartNumbers.length
                    }
                    onChange={toggleAllRows}
                    className="accent-indigo-600 cursor-pointer"
                  />
                </th>
              )}
              {visibleColumns.srNo && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[80px]">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>Sr No.</span>
                  </div>
                </th>
              )}
              {visibleColumns.consigneeName && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[200px]">
                  <div className="flex items-center justify-between">
                    <span>Consignee Name</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.consignorName && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Consignor Name</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.mappedParts && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[220px]">
                  <div className="flex items-center justify-between">
                    <span>Mapped Parts & Packing</span>
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
                <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[100px]">
                  <span>Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedPartNumbers.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumnCount}
                  className="text-center text-gray-400 py-6 border-b border-gray-200"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedPartNumbers.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  {visibleColumns.checkbox && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-center align-top">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleRow(item.id)}
                        className="accent-indigo-600 cursor-pointer"
                      />
                    </td>
                  )}
                  {visibleColumns.srNo && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-top">
                      {item.srNo}
                    </td>
                  )}
                  {visibleColumns.consigneeName && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium align-top">
                      {item.consigneeName}
                    </td>
                  )}
                  {visibleColumns.consignorName && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-top whitespace-normal break-words leading-relaxed">
                      {item.consignorName}
                    </td>
                  )}
                  {visibleColumns.mappedParts && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-top">
                      <div className="flex flex-col gap-1">
                        {item.mappedParts.map((mp, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="font-medium">{mp.part}</span>
                            {mp.badge && (
                              <span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded">
                                {mp.badge}
                              </span>
                            )}
                            {mp.arrow && (
                              <FaArrowRight size={12} className="text-blue-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 align-top">
                      <ToggleSwitch
                        checked={item.status}
                        onChange={() => toggleStatus(item.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-2 py-3 border-b border-gray-200 align-top">
                      <div className="flex gap-1">
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

export default PartNumber;