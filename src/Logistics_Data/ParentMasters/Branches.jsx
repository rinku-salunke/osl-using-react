import React, { useState, useMemo } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";

const Articles = () => {
  // ===== Filters =====
  const [articleType, setArticleType] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    code: true,
    type: true,
    abbreviation: true,
    name: true,
    state: true,
    pincode: true,
    status: true, // This is the toggle switch column
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "code", label: "Code" },
    { key: "type", label: "Type" },
    { key: "abbreviation", label: "Abbreviations" },
    { key: "name", label: "Name" },
    { key: "state", label: "State" },
    { key: "pincode", label: "Pincode" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data (FIXED to match headers) =====
  const [articles, setArticles] = useState([
    { id: 1, srNo: 1, code: "WZ-MH-MUM-002", type: "West Zone", abbreviation: "MUM", name: "MUMBAI", state: "MAHARASHTRA", pincode: "400008", status: true },
    { id: 2, srNo: 2, code: "SZ-KA-BEN-003", type: "South Zone", abbreviation: "BLR", name: "Bangalore", state: "KARNATAKA", pincode: "560099", status: true },
    { id: 3, srNo: 3, code: "WZ-MH-PUN-004", type: "West Zone", abbreviation: "RAN", name: "Ranjangaon", state: "MAHARASHTRA", pincode: "412209", status: true },
    { id: 4, srNo: 4, code: "HO-MP-IND-005", type: "Head Office", abbreviation: "IND", name: "INDORE", state: "MADHYA PRADESH", pincode: "452001", status: true },
    { id: 5, srNo: 5, code: "NZ-HR-GUR-006", type: "North Zone", abbreviation: "GUR", name: "Gurgaon", state: "HARYANA", pincode: "122503", status: true },
    // Add more dummy data if needed
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (id) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: !a.status } : a))
    );
  };

  // ===== Edit / Delete / View =====
  const handleEdit = (article) => alert(`Edit: ${article.name}`);
  const handleView = (article) => alert(`View: ${article.name}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // ===== FILTERED DATA (filters + search) =====
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchType = articleType ? a.type === articleType : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
            ? a.status === true
            : a.status === false;
      const matchSearch = a.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchType && matchStatus && matchSearch;
    });
  }, [articles, articleType, status, search]);

  // ===== Cards: filter-wise count =====
  const statsData = useMemo(() => {
    const total = articles.length;
    const active = articles.filter((a) => a.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Branches",
        value: total,
        footerIcon: <IoIosArrowRoundUp size={18} />,
        footerColor: "text-green-600",
      },
      {
        label: "Active Units",
        value: active,
        footerIcon: <FaClock size={15} />,
        footerColor: "text-red-600",
      },
      {
        label: "InActive Units",
        value: inactive,
        footerIcon: <IoIosArrowRoundUp size={18} />,
        footerColor: "text-green-600",
      },
    ];
  }, [articles]);

  // ===== Pagination calculations =====
  const totalEntries = filteredArticles.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedArticles = filteredArticles.slice(
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
      label: "Branch Type",
      value: articleType,
      onChange: (v) => {
        setArticleType(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Article Type", value: "" },
        { label: "Blog", value: "blog" },
        { label: "News", value: "news" },
        { label: "Tutorial", value: "tutorial" },
      ],
    },
    {
      label: "State",
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

  const handleAdd = () => alert("Add Article clicked");

  // Calculate dynamic colSpan for "No data" row
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <MasterData
      title="Infrastructure Master"
      onAdd={handleAdd}
      addButtonLabel="Add Branch/Warehouse"
      stats={statsData}
      filters={filtersData}
      currentPage={currentPage}
      totalPages={totalPages}
      totalEntries={totalEntries}
      entriesPerPage={entriesPerPage}
      onPageChange={handlePageChange}
      onEntriesPerPageChange={handleEntriesPerPageChange}
      columns={columnsList}
      visibleColumns={visibleColumns}
      onToggleColumn={toggleColumn}
    >
      {/* ===== Top Bar: Entries per page + Search ===== */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-white border border-gray-200 rounded-t-md border-b-0">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <select
            value={entriesPerPage}
            onChange={(e) => handleEntriesPerPageChange(Number(e.target.value))}
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
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[60px]">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>Sr No.</span>
                  </div>
                </th>
              )}
              {visibleColumns.code && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Code</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.type && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[150px]">
                  <div className="flex items-center justify-between">
                    <span>Type</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.abbreviation && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[120px]">
                  <div className="flex items-center justify-between">
                    <span>Abbreviations</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.name && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Name</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.state && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>State</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.pincode && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[100px]">
                  <div className="flex items-center justify-between">
                    <span>Pincode</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.status && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[80px]">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.actions && (
                <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[120px]">
                  <span>Actions</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedArticles.length === 0 ? (
              <tr>
                <td
                  colSpan={visibleColumnCount}
                  className="text-center text-gray-400 py-6 border-b border-gray-200"
                >
                  No data available
                </td>
              </tr>
            ) : (
              paginatedArticles.map((article, idx) => (
                <tr
                  key={article.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {visibleColumns.srNo && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                      {article.srNo}
                    </td>
                  )}
                  {visibleColumns.code && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-800 font-medium truncate">
                      {article.code}
                    </td>
                  )}
                  {visibleColumns.type && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                      {article.type}
                    </td>
                  )}
                  {visibleColumns.abbreviation && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                      {article.abbreviation}
                    </td>
                  )}
                  {visibleColumns.name && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-800 font-medium">
                      {article.name}
                    </td>
                  )}
                  {visibleColumns.state && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                      {article.state}
                    </td>
                  )}
                  {visibleColumns.pincode && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                      {article.pincode}
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-2 py-2 border-b border-r border-gray-200">
                      <ToggleSwitch
                        checked={article.status}
                        onChange={() => toggleStatus(article.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-2 py-2 border-b border-gray-200">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(article)}
                          className="w-7 h-7 flex items-center justify-center text-blue-600 hover:text-blue-800 transition"
                          title="Edit"
                        >
                          <MdOutlineModeEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="w-7 h-7 flex items-center justify-center text-red-500 hover:text-red-700 transition"
                          title="Delete"
                        >
                          <RiDeleteBin6Line size={18} />
                        </button>
                        <button
                          onClick={() => handleView(article)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-800 transition"
                          title="View"
                        >
                          <GrView size={18} />
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

export default Articles;