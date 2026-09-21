import React, { useState, useMemo } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FaBoxes } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

const Employees = () => {
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
    name: true,
    email: true,
    mobile: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "name", label: "Employee Name" },
    { key: "email", label: "Email ID" },
    { key: "mobile", label: "Mobile No." },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data (UPDATED to match Employee Headers) =====
  const [articles, setArticles] = useState([
    { id: 1, srNo: 1, name: "Pradnya Pandy", email: "pradnya@gmail.com", mobile: "9356030474", status: true },
    { id: 2, srNo: 2, name: "Mangesh Raut", email: "mangesh@gmail.com", mobile: "9119548796", status: true },
    { id: 3, srNo: 3, name: "Pratap Fartade", email: "fartadepratap@gmail.com", mobile: "8457985480", status: true },
    { id: 4, srNo: 4, name: "Prathmesh Dhane", email: "prathmesh@gmail.com", mobile: "9856231479", status: true },
    { id: 5, srNo: 5, name: "Girish Jadhav", email: "girish@gmail.com", mobile: "705789033", status: true },
    { id: 6, srNo: 6, name: "Aarti Kale", email: "aartikale694@gmail.com", mobile: "7756989775", status: true },
    { id: 7, srNo: 7, name: "Pratik Hatekar", email: "fartadepratap@gmail.com", mobile: "9119540707", status: true },
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
    if (window.confirm("Are you sure you want to delete this employee?")) {
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
        label: "Total Employees",
        value: total,
        icon: (
          <div className="w-6 h-6 text-blue-600">
            <FaBoxes size={20} />
          </div>
        ),
        iconBg: "bg-blue-100",
        footer: "5% from last week",
        footerIcon: <IoIosArrowRoundUp size={18} />,
        footerColor: "text-green-600"
      },
      {
        label: "Active Employees",
        value: active,
        icon: (
          <div className="w-6 h-6 text-green-500">
            <FaWarehouse size={15} />
          </div>
        ),
        iconBg: "bg-green-100",
        footer: "Currently Active",
        footerIcon: <FaWarehouse size={15} />,
        footerColor: "text-blue-600",
      },
      {
        label: "InActive Employees",
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
      label: "Employee Name",
      value: articleType,
      onChange: (v) => {
        setArticleType(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Employee", value: "" },
        { label: "Pradnya Pandy", value: "pradnya" },
        { label: "Mangesh Raut", value: "mangesh" },
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

  const handleAdd = () => alert("Add Employee clicked");

  // Calculate dynamic colSpan for "No data" row
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <MasterData
      title="Employees"
      onAdd={handleAdd}
      addButtonLabel="Add Employees"
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
              {visibleColumns.name && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-between">
                    <span>Employee Name</span>
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
              {visibleColumns.mobile && (
                <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[150px]">
                  <div className="flex items-center justify-between">
                    <span>Mobile No.</span>
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
                  {visibleColumns.name && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-800 font-medium truncate">
                      {article.name}
                    </td>
                  )}
                  {visibleColumns.email && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                      {article.email}
                    </td>
                  )}
                  {visibleColumns.mobile && (
                    <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                      {article.mobile}
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

export default Employees;