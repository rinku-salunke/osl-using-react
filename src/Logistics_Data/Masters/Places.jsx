import React, { useState, useMemo } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock, FaListCheck } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { FaBoxes } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { TfiWrite } from "react-icons/tfi";

const Places = () => {
  // ===== Filters =====
  const [placeFilter, setPlaceFilter] = useState("");
  const [placeTypeFilter, setPlaceTypeFilter] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    placeName: true,
    placeTypeName: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "placeName", label: "Place Name" },
    { key: "placeTypeName", label: "Place Type Name" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [places, setPlaces] = useState([
    {
      id: 1,
      srNo: 1,
      placeName: "Hinjewadi",
      placeTypeName: "Bonded Warehouses",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      placeName: "Wakad",
      placeTypeName: "Container Freight Station",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      placeName: "Baner",
      placeTypeName: "Bonded Warehouses",
      status: false,
    },
    {
      id: 4,
      srNo: 4,
      placeName: "Kharadi",
      placeTypeName: "Port",
      status: true,
    },
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (id) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: !p.status } : p))
    );
  };

  // ===== Edit Handler =====
  const handleEdit = (item) => alert(`Edit: ${item.placeName}`);

  // ===== FILTERED DATA =====
  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchPlace = placeFilter
        ? p.placeName.toLowerCase().includes(placeFilter.toLowerCase())
        : true;
      const matchType = placeTypeFilter
        ? p.placeTypeName
            .toLowerCase()
            .includes(placeTypeFilter.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? p.status === true
          : p.status === false;
      const matchSearch = p.placeName
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchPlace && matchType && matchStatus && matchSearch;
    });
  }, [places, placeFilter, placeTypeFilter, status, search]);

  // ===== Cards Data =====
  const statsData = useMemo(() => {
    const total = places.length;
    const active = places.filter((p) => p.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Places",
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
        label: "Active Places",
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
        label: "InActive Places",
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
  }, [places]);

  // ===== Pagination calculations =====
  const totalEntries = filteredPlaces.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedPlaces = filteredPlaces.slice(
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
      label: "Third Party Places",
      value: placeFilter,
      onChange: (v) => {
        setPlaceFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Place", value: "" },
        { label: "Hinjewadi", value: "hinjewadi" },
        { label: "Wakad", value: "wakad" },
        { label: "Baner", value: "baner" },
        { label: "Kharadi", value: "kharadi" },
      ],
    },
    {
      label: "Place Type",
      value: placeTypeFilter,
      onChange: (v) => {
        setPlaceTypeFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Place Type", value: "" },
        { label: "Bonded Warehouses", value: "bonded warehouses" },
        { label: "Container Freight Station", value: "container freight station" },
        { label: "Port", value: "port" },
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

  const handleAdd = () => alert("Add Third Party Places clicked");

  return (
    <MasterData
      title="Third Party Places"
      onAdd={handleAdd}
      addButtonLabel="Add Third Party Places"
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
              {visibleColumns.placeName && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Place Name</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.placeTypeName && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Place Type Name</span>
                    <SortIcon />
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
              {visibleColumns.actions && (
                <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[110px]">
                  <span>Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedPlaces.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-400 py-6 border-b border-gray-200"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedPlaces.map((p, idx) => (
                <tr
                  key={p.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {visibleColumns.srNo && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {p.srNo}
                    </td>
                  )}
                  {visibleColumns.placeName && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium">
                      {p.placeName}
                    </td>
                  )}
                  {visibleColumns.placeTypeName && (
                    <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                      {p.placeTypeName}
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-2 py-3 border-b border-r border-gray-200">
                      <ToggleSwitch
                        checked={p.status}
                        onChange={() => toggleStatus(p.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-2 py-3 border-b border-gray-200">
                      <button
                        onClick={() => handleEdit(p)}
                        className="w-7 h-7 border border-blue-500 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition"
                        title="Edit"
                      >
                        <MdOutlineModeEdit size={16} />
                      </button>
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

export default Places;