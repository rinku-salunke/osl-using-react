import React, { useState, useMemo, useEffect } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FaBoxes } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

import { toast } from "react-toastify";

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

  // ===== Table Data =====
  const [employees, setEmployees] = useState([
    { id: 1, srNo: 1, name: "Pradnya Pandy", email: "pradnya@gmail.com", mobile: "9356030474", status: true },
    { id: 2, srNo: 2, name: "Mangesh Raut", email: "mangesh@gmail.com", mobile: "9119548796", status: true },
    { id: 3, srNo: 3, name: "Pratap Fartade", email: "fartadepratap@gmail.com", mobile: "8457985480", status: true },
    { id: 4, srNo: 4, name: "Prathmesh Dhane", email: "prathmesh@gmail.com", mobile: "9856231479", status: true },
    { id: 5, srNo: 5, name: "Girish Jadhav", email: "girish@gmail.com", mobile: "705789033", status: true },
    { id: 6, srNo: 6, name: "Aarti Kale", email: "aartikale694@gmail.com", mobile: "7756989775", status: true },
    { id: 7, srNo: 7, name: "Pratik Hatekar", email: "fartadepratap@gmail.com", mobile: "9119540707", status: true },
  ]);

  // ===== Status Toggle Confirmation state =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    employee: null,
    action: "",
  });

  // ===== Success Popup state =====
  const [successPopup, setSuccessPopup] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // ⭐ Auto-close success popup after 1.5 seconds
  useEffect(() => {
    if (successPopup.isOpen) {
      const timer = setTimeout(() => {
        setSuccessPopup({ isOpen: false, title: "", message: "" });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [successPopup.isOpen]);

  // ===== Delete Confirm state =====
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    employee: null,
  });

  // ===== Reason for Edit Modal state =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditEmployee, setPendingEditEmployee] = useState(null);

  // ===== Toggle Status — opens confirmation dialog (SAME AS VehicleType) =====
  const toggleStatus = (employee) => {
    setStatusConfirm({
      isOpen: true,
      employee,
      action: employee.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { employee, action } = statusConfirm;
    if (!employee) return;

    setEmployees((prev) =>
      prev.map((e) => (e.id === employee.id ? { ...e, status: !e.status } : e))
    );

    setStatusConfirm({ isOpen: false, employee: null, action: "" });
    setSuccessPopup({
      isOpen: true,
      title: action === "deactivate" ? "Deactivated" : "Activated",
      message: `Record ${action === "deactivate" ? "Deactivated" : "Activated"} Successfully!`,
    });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, employee: null, action: "" });
  };

  // ===== Edit Flow — Step 1: Click edit → open Reason modal =====
  const handleEdit = (employee) => {
    setPendingEditEmployee(employee);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  // ===== Edit Flow — Step 2: Continue → show success =====
  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setIsReasonModalOpen(false);
    setSuccessPopup({
      isOpen: true,
      title: "Ready for Edit",
      message: `Reason saved for ${pendingEditEmployee?.name}. Edit form coming soon.`,
    });
    setPendingEditEmployee(null);
    setEditReason("");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditEmployee(null);
  };

  // ===== View =====
  const handleView = (employee) => {
    toast.info(`View: ${employee.name}`);
  };

  // ===== Delete — opens confirmation dialog =====
  const handleDelete = (id) => {
    const employeeToDelete = employees.find((e) => e.id === id);
    if (!employeeToDelete) return;
    setDeleteConfirm({ isOpen: true, employee: employeeToDelete });
  };

  const confirmDelete = () => {
    const employee = deleteConfirm.employee;
    if (!employee) return;
    setEmployees((prev) => prev.filter((e) => e.id !== employee.id));
    setDeleteConfirm({ isOpen: false, employee: null });
    toast.success("Employee deleted!");
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, employee: null });
  };

  // ===== FILTERED DATA (filters + search) =====
  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      const matchType = articleType
        ? e.name.toLowerCase().includes(articleType.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? e.status === true
          : e.status === false;
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
      return matchType && matchStatus && matchSearch;
    });
  }, [employees, articleType, status, search]);

  // ===== Cards: filter-wise count =====
  const statsData = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status).length;
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
        footerColor: "text-green-600",
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
  }, [employees]);

  // ===== Pagination calculations =====
  const totalEntries = filteredEmployees.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedEmployees = filteredEmployees.slice(
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
    <>
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
                  <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[130px]">
                    <span>Actions</span>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedEmployees.length === 0 ? (
                <tr>
                  <td
                    colSpan={visibleColumnCount}
                    className="text-center text-gray-400 py-6 border-b border-gray-200"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map((employee, idx) => (
                  <tr
                    key={employee.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {visibleColumns.srNo && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                        {employee.srNo}
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-800 font-medium truncate">
                        {employee.name}
                      </td>
                    )}
                    {visibleColumns.email && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                        {employee.email}
                      </td>
                    )}
                    {visibleColumns.mobile && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                        {employee.mobile}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-2 py-2 border-b border-r border-gray-200">
                        <ToggleSwitch
                          checked={employee.status}
                          onChange={() => toggleStatus(employee)}
                        />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-2 py-2 border-b border-gray-200">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="w-7 h-7 flex items-center justify-center text-blue-600 hover:text-blue-800 transition"
                            title="Edit"
                          >
                            <MdOutlineModeEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="w-7 h-7 flex items-center justify-center text-red-500 hover:text-red-700 transition"
                            title="Delete"
                          >
                            <RiDeleteBin6Line size={18} />
                          </button>
                          <button
                            onClick={() => handleView(employee)}
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

      {/* ================= STATUS CONFIRMATION DIALOG ================= */}
      {statusConfirm.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[420px] p-10 text-center">
            <div className="flex justify-center mb-5">
              {statusConfirm.action === "deactivate" ? (
                <div className="w-20 h-20 rounded-full border-2 border-orange-300 flex items-center justify-center">
                  <span className="text-4xl text-orange-400 font-light">!</span>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full border-2 border-green-300 flex items-center justify-center">
                  <span className="text-4xl text-green-500">✓</span>
                </div>
              )}
            </div>

            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {statusConfirm.action === "deactivate"
                ? "Deactivate Record?"
                : "Activate Record?"}
            </h3>

            <p className="text-sm text-gray-500 mb-8">
              {statusConfirm.action === "deactivate"
                ? "This record will be moved to the inactive list."
                : "This will make the record visible in active listings."}
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={confirmStatusChange}
                className={`text-white text-sm font-medium px-5 py-2 rounded-md transition ${
                  statusConfirm.action === "deactivate"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {statusConfirm.action === "deactivate"
                  ? "Yes, Deactivate"
                  : "Yes, Activate"}
              </button>
              <button
                onClick={cancelStatusChange}
                className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium px-5 py-2 rounded-md transition"
              >
                No, keep it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUCCESS POPUP (auto-closes) ================= */}
      {successPopup.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[420px] p-10 text-center">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full border-2 border-green-300 flex items-center justify-center">
                <span className="text-4xl text-green-500">✓</span>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {successPopup.title}
            </h3>

            {successPopup.message && (
              <p className="text-sm text-gray-500">{successPopup.message}</p>
            )}
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION DIALOG ================= */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[420px] p-10 text-center">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full border-2 border-red-300 flex items-center justify-center">
                <span className="text-4xl text-red-500 font-light">!</span>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Delete Record?
            </h3>

            <p className="text-sm text-gray-500 mb-8">
              Are you sure you want to delete{" "}
              <b>{deleteConfirm.employee?.name}</b>?
              <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-5 py-2 rounded-md transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium px-5 py-2 rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= REASON FOR EDIT MODAL ================= */}
      {isReasonModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[520px] p-8">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-2">
              Reason for Edit
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Why are you editing this employee?
            </p>

            <textarea
              value={editReason}
              onChange={(e) => setEditReason(e.target.value)}
              placeholder="Reason..."
              rows={6}
              autoFocus
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleContinueEdit}
                disabled={!editReason.trim()}
                className={`text-white text-sm font-medium px-6 py-2 rounded-md transition ${
                  editReason.trim()
                    ? "bg-[#6366f1] hover:bg-[#4f46e5]"
                    : "bg-[#6366f1]/60 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
              <button
                onClick={handleCancelReason}
                className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium px-6 py-2 rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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