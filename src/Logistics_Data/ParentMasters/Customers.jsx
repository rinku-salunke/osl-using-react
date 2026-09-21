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
import { FaListCheck } from "react-icons/fa6";

const Customers = () => {
  // ===== Filters =====
  const [branchType, setBranchType] = useState("");
  const [branchName, setBranchName] = useState("");
  const [customerName, setCustomerName] = useState("");
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
    address: true,
    vendorCode: true,
    city: true,
    contactPerson: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "vendorCode", label: "Vendor Code" },
    { key: "city", label: "City" },
    { key: "contactPerson", label: "Contact Person" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [articles, setArticles] = useState([
    {
      id: 1,
      srNo: 1,
      name: "TEST",
      email: "fartadepratap@gmail.com",
      address: "Plot No. Av35, Sanand, Phase 2 Indl Estate",
      vendorCode: "VND0005",
      city: "Pune",
      contactPerson: "8459879654",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      name: "ABC Corp",
      email: "abc@corp.com",
      address: "123 Main St, Mumbai",
      vendorCode: "VND0006",
      city: "Mumbai",
      contactPerson: "9876543210",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      name: "XYZ Ltd",
      email: "xyz@ltd.com",
      address: "45 Industrial Area, Delhi",
      vendorCode: "VND0007",
      city: "Delhi",
      contactPerson: "9988776655",
      status: false,
    },
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
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // ===== FILTERED DATA =====
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchBranchType = branchType ? a.branchType === branchType : true;
      const matchBranchName = branchName ? a.branchName === branchName : true;
      const matchCustomerName = customerName
        ? a.name.toLowerCase().includes(customerName.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
            ? a.status === true
            : a.status === false;
      const matchSearch = a.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return (
        matchBranchType &&
        matchBranchName &&
        matchCustomerName &&
        matchStatus &&
        matchSearch
      );
    });
  }, [articles, branchType, branchName, customerName, status, search]);

  // ===== Cards: filter-wise count =====
  const statsData = useMemo(() => {
    const total = articles.length;
    const active = articles.filter((a) => a.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Customers",
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
        label: "Active Customers",
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
        label: "InActive Customers",
        value: inactive,
        icon: (
          <div className="w-6 h-6 text-green-600">
            <FaWarehouse size={15} />
          </div>
        ),
        iconBg: "bg-green-100",
        footer: "currently away",
        footerIcon: <IoIosArrowRoundUp size={18} />,
        footerColor: "text-blue-600",
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

  // ===== FILTERS =====
  const filtersData = [
    {
      label: "Branch Type",
      value: branchType,
      onChange: (v) => {
        setBranchType(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Branch Type", value: "" },
        { label: "Head Office", value: "head" },
        { label: "Warehouse", value: "warehouse" },
      ],
      width: "w-[180px]",
    },
    {
      label: "Branch Name",
      value: branchName,
      onChange: (v) => {
        setBranchName(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Branch Name", value: "" },
        { label: "Mumbai", value: "mumbai" },
        { label: "Pune", value: "pune" },
      ],
      width: "w-[180px]",
    },
    {
      label: "Customer Name",
      value: customerName,
      onChange: (v) => {
        setCustomerName(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Customer Name", value: "" },
        { label: "TEST", value: "test" },
        { label: "ABC Corp", value: "abc corp" },
      ],
      width: "w-[180px]",
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
      width: "w-[150px]",
    },
  ];

  const handleReset = () => {
    setBranchType("");
    setBranchName("");
    setCustomerName("");
    setStatus("");
    setCurrentPage(1);
  };

  const handleAdd = () => alert("Add Customer clicked");
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <MasterData
      title="Customer"
      onAdd={handleAdd}
      addButtonLabel="Add Customer"
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
    >
      {/* ===== Top Bar ===== */}
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
                <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[60px] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <SortIcon />
                    <span>Sr No.</span>
                  </div>
                </th>
              )}
              {visibleColumns.name && (
                <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[130px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Name</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.email && (
                <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[200px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Email</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.address && (
                <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[250px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Address</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.vendorCode && (
                <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[110px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Vendor Code</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.city && (
                <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[100px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>City</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.contactPerson && (
                <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[140px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Contact Person</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.status && (
                <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[90px] whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <SortIcon />
                  </div>
                </th>
              )}
              {visibleColumns.actions && (
                <th className="text-left font-medium px-3 py-2.5 border-b border-gray-200 w-[120px] whitespace-nowrap">
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
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  {visibleColumns.srNo && (
                    <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                      {article.srNo}
                    </td>
                  )}
                  {visibleColumns.name && (
                    <td
                      className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-800 font-medium align-middle truncate"
                      title={article.name}
                    >
                      {article.name}
                    </td>
                  )}
                  {visibleColumns.email && (
                    <td
                      className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle truncate"
                      title={article.email}
                    >
                      {article.email}
                    </td>
                  )}
                  {visibleColumns.address && (
                    <td
                      className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle truncate"
                      title={article.address}
                    >
                      {article.address}
                    </td>
                  )}
                  {visibleColumns.vendorCode && (
                    <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                      {article.vendorCode}
                    </td>
                  )}
                  {visibleColumns.city && (
                    <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                      {article.city}
                    </td>
                  )}
                  {visibleColumns.contactPerson && (
                    <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                      {article.contactPerson}
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-3 py-2.5 border-b border-r border-gray-200 align-middle">
                      <ToggleSwitch
                        checked={article.status}
                        onChange={() => toggleStatus(article.id)}
                      />
                    </td>
                  )}
                  {visibleColumns.actions && (
                    <td className="px-3 py-2.5 border-b border-gray-200 align-middle">
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

export default Customers;