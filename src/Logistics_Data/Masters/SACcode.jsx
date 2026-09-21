import React, { useState, useMemo, useEffect } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { FaBoxes } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";

import { toast } from "react-toastify";

const SacCode = () => {
  // ===== Page mode: "list" | "edit" | "view" =====
  const [mode, setMode] = useState("list");
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

  // ===== Reason for Edit Modal state =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditItem, setPendingEditItem] = useState(null);

  // ===== Status Toggle Confirmation state =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    item: null,
    action: "",
  });

  // ===== Success Popup state =====
  const [successPopup, setSuccessPopup] = useState({
    isOpen: false,
    action: "",
  });

  // ⭐ Auto-close success popup after 1.5 seconds
  useEffect(() => {
    if (successPopup.isOpen) {
      const timer = setTimeout(() => {
        setSuccessPopup({ isOpen: false, action: "" });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [successPopup.isOpen]);

  // ===== Filters =====
  const [sacCodeFilter, setSacCodeFilter] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    sacCode: true,
    status: true,
    action: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "sacCode", label: "Sac Code" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [sacCodes, setSacCodes] = useState([
    { id: 1, srNo: 1, sacCode: "998548", status: true },
    { id: 2, srNo: 2, sacCode: "998549", status: true },
    { id: 3, srNo: 3, sacCode: "998550", status: false },
    { id: 4, srNo: 4, sacCode: "998551", status: true },
  ]);

  // ===== Toggle Status — opens confirmation dialog =====
  const toggleStatus = (item) => {
    setStatusConfirm({
      isOpen: true,
      item,
      action: item.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { item, action } = statusConfirm;
    if (!item) return;

    setSacCodes((prev) =>
      prev.map((s) => (s.id === item.id ? { ...s, status: !s.status } : s))
    );

    setStatusConfirm({ isOpen: false, item: null, action: "" });
    setSuccessPopup({ isOpen: true, action });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, item: null, action: "" });
  };

  // ===== Edit Flow — Step 1: Click edit → open Reason modal =====
  const handleEdit = (item) => {
    setPendingEditItem(item);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  // ===== Edit Flow — Step 2: Continue → open Edit Form =====
  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingItem(pendingEditItem);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditItem(null);
  };

  // ===== View =====
  const handleView = (item) => {
    setViewingItem(item);
    setMode("view");
  };

  // ===== Delete with Toastify =====
  const handleDelete = (id) => {
    const itemToDelete = sacCodes.find((s) => s.id === id);
    if (!itemToDelete) return;

    toast(
      ({ closeToast }) => (
        <div style={{ padding: "4px" }}>
          <p
            style={{
              fontSize: "14px",
              color: "#1f2937",
              fontWeight: "500",
              marginBottom: "12px",
            }}
          >
            Delete <b>{itemToDelete.sacCode}</b>?
            <br />
            <span
              style={{
                fontSize: "12px",
                color: "#6b7280",
                fontWeight: "400",
              }}
            >
              This action cannot be undone.
            </span>
          </p>
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                closeToast();
                setSacCodes((prev) => prev.filter((s) => s.id !== id));
                toast.success("SAC Code deleted!");
              }}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Yes, Delete
            </button>
            <button
              onClick={closeToast}
              style={{
                backgroundColor: "#e5e7eb",
                color: "#374151",
                border: "none",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        toastId: `delete-sac-${id}`,
        style: { width: "340px", padding: "16px" },
      }
    );
  };

  // ===== Add New =====
  const handleAddNew = () => {
    setEditingItem(null);
    setMode("edit");
  };

  // ===== Save (Add or Update) =====
  const handleSaveSac = (formData) => {
    if (!formData.sacCode.trim()) {
      toast.error("Please enter SAC code");
      return;
    }

    if (editingItem) {
      // UPDATE
      setSacCodes((prev) =>
        prev.map((s) =>
          s.id === editingItem.id
            ? {
                ...s,
                sacCode: formData.sacCode.trim(),
                lastEditReason: editReason.trim(),
                lastEditedAt: new Date().toISOString(),
              }
            : s
        )
      );
      toast.success("SAC Code updated!");
    } else {
      // ADD
      const nextId =
        sacCodes.length > 0 ? Math.max(...sacCodes.map((s) => s.id)) + 1 : 1;
      setSacCodes((prev) => [
        ...prev,
        {
          id: nextId,
          srNo: prev.length + 1,
          sacCode: formData.sacCode.trim(),
          status: true,
          createdAt: new Date().toISOString(),
        },
      ]);
      toast.success("SAC Code added successfully!");
    }

    setEditingItem(null);
    setEditReason("");
    setPendingEditItem(null);
    setMode("list");
  };

  const handleCancelForm = () => {
    setEditingItem(null);
    setEditReason("");
    setPendingEditItem(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingItem(null);
    setMode("list");
  };

  // ===== FILTERED DATA =====
  const filteredSacCodes = useMemo(() => {
    return sacCodes.filter((s) => {
      const matchCode = sacCodeFilter
        ? s.sacCode.toLowerCase().includes(sacCodeFilter.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? s.status === true
          : s.status === false;
      const matchSearch = s.sacCode
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCode && matchStatus && matchSearch;
    });
  }, [sacCodes, sacCodeFilter, status, search]);

  // ===== Cards Data =====
  const statsData = useMemo(() => {
    const total = sacCodes.length;
    const active = sacCodes.filter((s) => s.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total SAC Code",
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
        label: "Active Sac Code",
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
        label: "InActive Sac Code",
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
  }, [sacCodes]);

  // ===== Pagination calculations =====
  const totalEntries = filteredSacCodes.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedSacCodes = filteredSacCodes.slice(
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
      label: "SAC Code Number",
      value: sacCodeFilter,
      onChange: (v) => {
        setSacCodeFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select SAC Code Number", value: "" },
        { label: "998548", value: "998548" },
        { label: "998549", value: "998549" },
        { label: "998550", value: "998550" },
        { label: "998551", value: "998551" },
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

  // ================= EDIT / ADD FORM VIEW =================
  if (mode === "edit") {
    return (
      <AddSacForm
        initialData={editingItem}
        isEdit={Boolean(editingItem)}
        onSave={handleSaveSac}
        onCancel={handleCancelForm}
      />
    );
  }

  // ================= VIEW DETAILS =================
  if (mode === "view" && viewingItem) {
    return (
      <SacDetailsView item={viewingItem} onBack={handleBackFromView} />
    );
  }

  // ================= LIST VIEW =================
  return (
    <>
      <MasterData
        title="SAC Code"
        onAdd={handleAddNew}
        addButtonLabel="Add SAC Code"
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
        {/* Toolbar */}
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

        {/* Top Bar */}
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

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-b-md">
          <table className="w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                {visibleColumns.srNo && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[120px]">
                    <div className="flex items-center gap-1">
                      <SortIcon />
                      <span>Sr No.</span>
                    </div>
                  </th>
                )}
                {visibleColumns.sacCode && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center gap-1">
                      <SortIcon />
                      <span>Sac Code</span>
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[200px]">
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.action && (
                  <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[130px]">
                    <span>Action</span>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedSacCodes.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-gray-400 py-6 border-b border-gray-200"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedSacCodes.map((s, idx) => (
                  <tr
                    key={s.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {visibleColumns.srNo && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {s.srNo}
                      </td>
                    )}
                    {visibleColumns.sacCode && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium">
                        {s.sacCode}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-2 py-3 border-b border-r border-gray-200">
                        <ToggleSwitch
                          checked={s.status}
                          onChange={() => toggleStatus(s)}
                        />
                      </td>
                    )}
                    {visibleColumns.action && (
                      <td className="px-2 py-3 border-b border-gray-200">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(s)}
                            className="w-7 h-7 border border-blue-500 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition"
                            title="Edit"
                          >
                            <MdOutlineModeEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="w-7 h-7 border border-red-500 text-red-500 rounded-md flex items-center justify-center hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <RiDeleteBin6Line size={16} />
                          </button>
                          <button
                            onClick={() => handleView(s)}
                            className="w-7 h-7 border border-gray-400 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-50 transition"
                            title="View"
                          >
                            <GrView size={16} />
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
              {successPopup.action === "deactivate"
                ? "Deactivated"
                : "Activated"}
            </h3>

            <p className="text-sm text-gray-500">
              Record{" "}
              {successPopup.action === "deactivate"
                ? "Deactivated"
                : "Activated"}{" "}
              Successfully!
            </p>
          </div>
        </div>
      )}

      {/* ================= REASON FOR EDIT MODAL ================= */}
      {isReasonModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[480px] p-8">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-2">
              Reason for Edit
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Why are you editing this SAC code?
            </p>

            <textarea
              value={editReason}
              onChange={(e) => setEditReason(e.target.value)}
              placeholder="Reason..."
              rows={4}
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

/* ================= ADD / EDIT FORM COMPONENT ================= */
const AddSacForm = ({ initialData = null, isEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    sacCode: initialData?.sacCode || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.sacCode.trim()) {
      setError("SAC Code Number is required.");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ⭐ Title with bottom border */}
              <h1 className="flex items-center justify-between mb-4 border-b text-2xl font-bold text-gray-900 border-gray-200 -mx-6 px-6 pb-5">
        {isEdit ? "Edit SAC Code" : "Add Sac Code"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="mb-5 max-w-md">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            SAC Code Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.sacCode}
            onChange={handleChange("sacCode")}
            placeholder="SAC Code Number"
            autoFocus
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && (
          <div className="mb-4 max-w-md text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#1e1b6b] hover:bg-[#2a2690] text-white text-sm font-medium px-6 py-2 rounded-md transition"
          >
            {isEdit ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-[#1e1b6b] hover:bg-[#2a2690] text-white text-sm font-medium px-6 py-2 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

/* ================= SAC DETAILS VIEW ================= */
const SacDetailsView = ({ item, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1e1b6b] mb-5 transition"
      >
        <span className="text-lg leading-none">←</span>
        <span>Back</span>
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        SAC Code Details
      </h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
          <DetailRow label="Sr No." value={item.srNo} />
          <DetailRow label="SAC Code" value={item.sacCode} />
          <DetailRow
            label="Status"
            value={
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  item.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status ? "Active" : "Inactive"}
              </span>
            }
          />
          {item.createdAt && (
            <DetailRow
              label="Created At"
              value={new Date(item.createdAt).toLocaleString()}
            />
          )}
          {item.lastEditedAt && (
            <DetailRow
              label="Last Edited At"
              value={new Date(item.lastEditedAt).toLocaleString()}
            />
          )}
        </div>

        {item.lastEditReason && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Reason for last edit
            </p>
            <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
              {item.lastEditReason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* Small reusable row */
const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
      {label}
    </p>
    <p className="text-sm text-gray-900 font-medium">{value}</p>
  </div>
);

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

export default SacCode;