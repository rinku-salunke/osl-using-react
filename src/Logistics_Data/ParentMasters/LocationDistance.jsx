import React, { useState, useMemo } from "react";
import MasterData from "../../Components/MasterData";
import { MdOutlineModeEdit } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaRoute, FaCheckCircle } from "react-icons/fa";

const LocationDistance = () => {
  // ===== Filters =====
  const [locationType, setLocationType] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    locationType: true,
    fromLocation: true,
    toLocation: true,
    distance: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "locationType", label: "Location Type" },
    { key: "fromLocation", label: "From Location" },
    { key: "toLocation", label: "To Location" },
    { key: "distance", label: "Distance (KM)" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [routes, setRoutes] = useState([
    {
      id: 1,
      srNo: 1,
      locationType: "OSL-Customer",
      fromLocation:
        "Emitec Technologies India Private Limited Talegaon Pune (Emitec Technologies India Private Limited Talegaon Pune)",
      toLocation: "Pune",
      distance: 0,
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      locationType: "OSL-OSL",
      fromLocation: "Gurgaon",
      toLocation: "Gurgaon",
      distance: 0,
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      locationType: "Cust-ThirdParty",
      fromLocation:
        "Seg Automotive India Private Limited (Seg Automotive India Private Limited )",
      toLocation: "Ranjangaon",
      distance: 57,
      status: true,
    },
    {
      id: 4,
      srNo: 4,
      locationType: "OSL-Customer",
      fromLocation:
        "Varroc Engineering Limited (Varroc Engineering Limited)",
      toLocation: "Pune",
      distance: 120,
      status: false,
    },
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (id) => {
    setRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: !r.status } : r))
    );
  };

  // ===== Edit / View =====
  const handleEdit = (item) => alert(`Edit: ${item.fromLocation}`);
  const handleView = (item) => alert(`View: ${item.fromLocation}`);

  // ===== FILTERED DATA =====
  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => {
      const matchLocationType = locationType
        ? r.locationType === locationType
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
            ? r.status === true
            : r.status === false;
      const matchSearch = r.fromLocation
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchLocationType && matchStatus && matchSearch;
    });
  }, [routes, locationType, status, search]);

  // ===== Stats =====
  const statsData = useMemo(() => {
    const total = routes.length;
    const active = routes.filter((r) => r.status).length;
    const inactive = total - active;

    return [
      {
        label: "TOTAL ROUTES",
        value: total,
        icon: (
          <div className="w-8 h-8 text-blue-600">
            <FaRoute size={28} />
          </div>
        ),
        iconBg: "",
        noBg: true,
        largeIcon: true,
      },
      {
        label: "ACTIVE ROUTES",
        value: active,
        icon: (
          <div className="w-8 h-8 text-green-600">
            <FaCheckCircle size={28} />
          </div>
        ),
        iconBg: "",
        noBg: true,
        largeIcon: true,
      },
      {
        label: "INACTIVE ROUTES",
        value: inactive,
        icon: (
          <div className="w-8 h-8 text-green-600">
            <FaCheckCircle size={28} />
          </div>
        ),
        iconBg: "",
        noBg: true,
        largeIcon: true,
      },
    ];
  }, [routes]);

  // ===== Pagination calculations =====
  const totalEntries = filteredRoutes.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedRoutes = filteredRoutes.slice(
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
      label: "Location Type",
      value: locationType,
      onChange: (v) => {
        setLocationType(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Location Type", value: "" },
        { label: "OSL-Customer", value: "OSL-Customer" },
        { label: "OSL-OSL", value: "OSL-OSL" },
        { label: "Cust-ThirdParty", value: "Cust-ThirdParty" },
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
    setLocationType("");
    setStatus("");
    setCurrentPage(1);
  };

  const handleAdd = () => alert("Add Route Distances clicked");
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <MasterData
      title="Distance Matrix"
      subtitle="Pre-calculated routes for Billing and Freight logic"
      onAdd={handleAdd}
      addButtonLabel="Add Route Distances"
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

      {/* ===== Table ===== */}
      <div className="border border-gray-200 rounded-b-md">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              {visibleColumns.srNo && (
                <th className="text-left font-medium px-3 py-2 border-b border-r border-gray-200 w-[60px] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>Sr No.</span>
                  </div>
                </th>
              )}
              {visibleColumns.locationType && (
                <th className="text-left font-medium px-3 py-2 border-b border-r border-gray-200 w-[130px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Location Type</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.fromLocation && (
                <th className="text-left font-medium px-3 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>From Location</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.toLocation && (
                <th className="text-left font-medium px-3 py-2 border-b border-r border-gray-200 w-[150px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>To Location</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.distance && (
                <th className="text-left font-medium px-3 py-2 border-b border-r border-gray-200 w-[120px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Distance (KM)</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.status && (
                <th className="text-left font-medium px-3 py-2 border-b border-r border-gray-200 w-[90px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.actions && (
                <th className="text-left font-medium px-3 py-2 border-b border-gray-200 w-[110px] whitespace-nowrap">
                  <span>Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedRoutes.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumnCount}
                  className="text-center text-gray-400 py-6 border-b border-gray-200"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedRoutes.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  {visibleColumns.srNo && (
                    <td className="px-3 py-3 border-b border-r border-gray-200 text-gray-700 align-top">
                      {item.srNo}
                    </td>
                  )}
                  {visibleColumns.locationType && (
                    <td className="px-3 py-3 border-b border-r border-gray-200 align-top whitespace-nowrap">
                      <span className="text-xs px-2.5 py-1 rounded-md font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {item.locationType}
                      </span>
                    </td>
                  )}
                  {visibleColumns.fromLocation && (
                    <td className="px-3 py-3 border-b border-r border-gray-200 text-gray-800 align-top whitespace-normal break-words leading-relaxed">
                      {item.fromLocation}
                    </td>
                  )}
                  {visibleColumns.toLocation && (
                    <td className="px-3 py-3 border-b border-r border-gray-200 text-gray-700 align-top whitespace-nowrap">
                      {item.toLocation}
                    </td>
                  )}
                  {visibleColumns.distance && (
                    <td className="px-3 py-3 border-b border-r border-gray-200 align-top whitespace-nowrap">
                      <span className="text-xs px-2.5 py-1 rounded-md font-medium bg-green-50 text-green-700 border border-green-200">
                        {item.distance} KM
                      </span>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-3 py-3 border-b border-r border-gray-200 align-top">
                      <ToggleSwitch
                        checked={item.status}
                        onChange={() => toggleStatus(item.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-3 py-3 border-b border-gray-200 align-top">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleView(item)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
                          title="View"
                        >
                          <GrView size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="w-8 h-8 flex items-center justify-center text-blue-600 border border-blue-400 rounded hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <MdOutlineModeEdit size={17} />
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

export default LocationDistance;