import React, { useState, useMemo, useEffect } from "react";
import MasterData from "../../Components/MasterData";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FaBoxes, FaCheckCircle, FaWarehouse, FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { toast } from "react-toastify";

const Transporter = () => {
  // ===== Page mode =====
  const [mode, setMode] = useState("list");
  const [editingTransporter, setEditingTransporter] = useState(null);
  const [viewingTransporter, setViewingTransporter] = useState(null);

  // ===== Filters =====
  const [transporterName, setTransporterName] = useState("");
  const [billingHeadName, setBillingHeadName] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    name: true,
    address: true,
    email: true,
    contactNo: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "name", label: "Transporter name" },
    { key: "address", label: "Address" },
    { key: "email", label: "Email ID" },
    { key: "contactNo", label: "Contact No" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [transporters, setTransporters] = useState([
    {
      id: 1,
      srNo: 1,
      name: "Shree Transport Services",
      address: "45, MIDC Industrial Area, Bhosari, Pune, Maharashtra",
      email: "fartadepratap@gmail.com",
      contactNo: "8459879654",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      name: "SGT Transporter",
      address: "Pune",
      email: "abc11@gmail.com",
      contactNo: "9856230142",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      name: "SG Transporter",
      address: "Pune",
      email: "mno1@gmail.com",
      contactNo: "9856230141",
      status: false,
    },
  ]);

  // ===== Status Confirm =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    transporter: null,
    action: "",
  });

  // ===== Success Popup =====
  const [successPopup, setSuccessPopup] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // ===== Processing =====
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (successPopup.isOpen) {
      const timer = setTimeout(() => {
        setSuccessPopup({ isOpen: false, title: "", message: "" });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [successPopup.isOpen]);

  // ===== Delete Confirm =====
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    transporter: null,
  });

  // ===== Reason for Edit =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditTransporter, setPendingEditTransporter] = useState(null);

  // ===== Toggle Status =====
  const toggleStatus = (transporter) => {
    setStatusConfirm({
      isOpen: true,
      transporter,
      action: transporter.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { transporter, action } = statusConfirm;
    if (!transporter) return;
    setTransporters((prev) =>
      prev.map((t) =>
        t.id === transporter.id ? { ...t, status: !t.status } : t
      )
    );
    setStatusConfirm({ isOpen: false, transporter: null, action: "" });
    setSuccessPopup({
      isOpen: true,
      title: action === "deactivate" ? "Deactivated" : "Activated",
      message: `Record ${action === "deactivate" ? "Deactivated" : "Activated"} Successfully!`,
    });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, transporter: null, action: "" });
  };

  // ===== Edit =====
  const handleEdit = (transporter) => {
    setPendingEditTransporter(transporter);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingTransporter(pendingEditTransporter);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditTransporter(null);
  };

  // ===== View =====
  const handleView = (transporter) => {
    setViewingTransporter(transporter);
    setMode("view");
  };

  // ===== Delete =====
  const handleDelete = (id) => {
    const t = transporters.find((x) => x.id === id);
    if (!t) return;
    setDeleteConfirm({ isOpen: true, transporter: t });
  };

  const confirmDelete = () => {
    const t = deleteConfirm.transporter;
    if (!t) return;
    setTransporters((prev) => prev.filter((x) => x.id !== t.id));
    setDeleteConfirm({ isOpen: false, transporter: null });
    toast.success("Transporter deleted!");
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, transporter: null });
  };

  // ===== FILTERED =====
  const filteredTransporters = useMemo(() => {
    return transporters.filter((t) => {
      const matchName = transporterName
        ? t.name.toLowerCase().includes(transporterName.toLowerCase())
        : true;
      const matchBillingHead = billingHeadName
        ? t.name.toLowerCase().includes(billingHeadName.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? t.status === true
          : t.status === false;
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
      return matchName && matchBillingHead && matchStatus && matchSearch;
    });
  }, [transporters, transporterName, billingHeadName, status, search]);

  // ===== Stats =====
  const statsData = useMemo(() => {
    const total = transporters.length;
    const active = transporters.filter((t) => t.status).length;
    const inactive = total - active;

    return [
      {
        label: "TOTAL TRANSPORTERS",
        value: total,
        icon: (
          <div className="w-6 h-6 text-blue-600">
            <FaBoxes size={20} />
          </div>
        ),
        iconBg: "bg-blue-100",
        footer: "Registered Partners",
        footerIcon: <FaWarehouse size={13} />,
        footerColor: "text-blue-600",
      },
      {
        label: "ACTIVE TRANSPORTERS",
        value: active,
        icon: (
          <div className="w-6 h-6 text-green-600">
            <FaCheckCircle size={20} />
          </div>
        ),
        iconBg: "bg-green-100",
        footer: "Ready for dispatch",
        footerIcon: <FaCheckCircle size={13} />,
        footerColor: "text-green-600",
      },
      {
        label: "INACTIVE TRANSPORTERS",
        value: inactive,
        icon: (
          <div className="w-6 h-6 text-red-500">
            <FaXmark size={20} />
          </div>
        ),
        iconBg: "bg-red-100",
        footer: "Currently away",
        footerIcon: <FaXmark size={13} />,
        footerColor: "text-red-500",
      },
    ];
  }, [transporters]);

  // ===== Pagination =====
  const totalEntries = filteredTransporters.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedTransporters = filteredTransporters.slice(
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
      label: "Transporter Name",
      value: transporterName,
      onChange: (v) => {
        setTransporterName(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Transporter Name", value: "" },
        { label: "Shree Transport Services", value: "shree" },
        { label: "SGT Transporter", value: "sgt" },
        { label: "SG Transporter", value: "sg" },
      ],
      width: "w-[220px]",
    },
    {
      label: "Billing Head Name",
      value: billingHeadName,
      onChange: (v) => {
        setBillingHeadName(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Billing Head", value: "" },
        { label: "Shree Transport Services", value: "shree" },
        { label: "SGT Transporter", value: "sgt" },
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
    setTransporterName("");
    setBillingHeadName("");
    setStatus("");
    setCurrentPage(1);
  };

  // ===== Add =====
  const handleAdd = () => {
    setEditingTransporter(null);
    setMode("add");
  };

  // ===== Save =====
  const handleSaveTransporter = (formData) => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      if (editingTransporter) {
        setTransporters((prev) =>
          prev.map((t) =>
            t.id === editingTransporter.id
              ? {
                  ...t,
                  ...formData,
                  name: formData.transporterName,
                  address: formData.address,
                  email: formData.email,
                  contactNo: formData.telephone,
                  lastEditReason: editReason.trim(),
                }
              : t
          )
        );
        setSuccessPopup({
          isOpen: true,
          title: "Transporter Details Updated Successfully",
          message: "",
        });
      } else {
        const nextId =
          transporters.length > 0
            ? Math.max(...transporters.map((t) => t.id)) + 1
            : 1;
        setTransporters((prev) => [
          ...prev,
          {
            id: nextId,
            srNo: prev.length + 1,
            name: formData.transporterName,
            address: formData.address,
            email: formData.email,
            contactNo: formData.telephone,
            status: true,
            ...formData,
          },
        ]);
        setSuccessPopup({
          isOpen: true,
          title: "Transporter Details Added Successfully",
          message: "",
        });
      }

      setEditingTransporter(null);
      setEditReason("");
      setPendingEditTransporter(null);
      setMode("list");
    }, 1200);
  };

  const handleCancelForm = () => {
    setEditingTransporter(null);
    setEditReason("");
    setPendingEditTransporter(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingTransporter(null);
    setMode("list");
  };

  // ============ FORM VIEW ============
  if (mode === "edit" || mode === "add") {
    return (
      <AddTransporterForm
        initialData={editingTransporter}
        isEdit={Boolean(editingTransporter)}
        onSave={handleSaveTransporter}
        onCancel={handleCancelForm}
      />
    );
  }

  // ============ VIEW ============
  if (mode === "view" && viewingTransporter) {
    return (
      <TransporterDetailsView
        transporter={viewingTransporter}
        onBack={handleBackFromView}
      />
    );
  }

  // ============ LIST VIEW ============
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <>
      <MasterData
        title="Transporter"
        subtitle="Manage fleet vehicles, gate passes, and vehicle documentation"
        onAdd={handleAdd}
        addButtonLabel="Add Transporter"
        stats={statsData}
        extraCard={{
          title: "Transporter Status",
          icon: <FaCheckCircle className="text-blue-500" size={16} />,
        }}
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
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[80px]">
                    <div className="flex items-center gap-1">
                      <SortIcon />
                      <span>Sr No.</span>
                    </div>
                  </th>
                )}
                {visibleColumns.name && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[180px]">
                    <div className="flex items-center justify-between">
                      <span>Transporter name</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.address && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Address</span>
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
                {visibleColumns.contactNo && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[150px]">
                    <div className="flex items-center justify-between">
                      <span>Contact No</span>
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
              {paginatedTransporters.length === 0 ? (
                <tr>
                  <td
                    colSpan={visibleColumnCount}
                    className="text-center text-gray-400 py-6 border-b border-gray-200"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedTransporters.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                  >
                    {visibleColumns.srNo && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle">
                        {item.srNo}
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium align-middle whitespace-normal break-words">
                        {item.name}
                      </td>
                    )}
                    {visibleColumns.address && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-normal break-words">
                        {item.address}
                      </td>
                    )}
                    {visibleColumns.email && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle truncate">
                        {item.email}
                      </td>
                    )}
                    {visibleColumns.contactNo && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">
                        {item.contactNo}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 align-middle">
                        <ToggleSwitch
                          checked={item.status}
                          onChange={() => toggleStatus(item)}
                        />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-2 py-3 border-b border-gray-200 align-middle">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleView(item)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
                            title="View"
                          >
                            <GrView size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 flex items-center justify-center text-blue-600 border border-blue-400 rounded hover:bg-blue-50 transition"
                            title="Edit"
                          >
                            <MdOutlineModeEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-red-500 border border-red-400 rounded hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <RiDeleteBin6Line size={16} />
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

      {/* ===== STATUS CONFIRM ===== */}
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
                className={`text-white text-sm font-medium px-5 py-2 rounded-md transition ${statusConfirm.action === "deactivate" ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}`}
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

      {/* ===== SUCCESS ===== */}
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

      {/* ===== PROCESSING ===== */}
      {processing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[420px] p-10 text-center">
            <h3 className="text-3xl font-semibold text-gray-700 mb-6">
              Processing...
            </h3>
            <div className="flex justify-center">
              <span className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE ===== */}
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
              <b>{deleteConfirm.transporter?.name}</b>?
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

      {/* ===== REASON FOR EDIT ===== */}
      {isReasonModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[520px] p-8">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-2">
              Reason for Edit
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Why are you editing this transporter?
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
                className={`text-white text-sm font-medium px-6 py-2 rounded-md transition ${editReason.trim() ? "bg-[#6366f1] hover:bg-[#4f46e5]" : "bg-[#6366f1]/60 cursor-not-allowed"}`}
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

/* ================= ADD / EDIT FORM ================= */
const AddTransporterForm = ({ initialData = null, isEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    billingHeadName: initialData?.billingHeadName || "",
    transporterName: initialData?.transporterName || "",
    address: initialData?.address || "",
    pincode: initialData?.pincode || "",
    state: initialData?.state || "",
    district: initialData?.district || "",
    taluka: initialData?.taluka || "",
    pincodeOfficeName: initialData?.pincodeOfficeName || "",
    telephone: initialData?.telephone || "",
    email: initialData?.email || "",
    panNo: initialData?.panNo || "",
    vendorCode: initialData?.vendorCode || "",
    gstNo: initialData?.gstNo || "",
    bankName: initialData?.bankName || "",
    accountNumber: initialData?.accountNumber || "",
    ifscCode: initialData?.ifscCode || "",
    billingCycle: initialData?.billingCycle || "",
    primaryContact: initialData?.primaryContact || "",
    secondaryContact: initialData?.secondaryContact || "",
    tdsApplicable: initialData?.tdsApplicable || "No",
    tollTaxApplicable: initialData?.tollTaxApplicable || "No",
    gstApplicable: initialData?.gstApplicable || "No",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setError("");

    if (!formData.billingHeadName.trim())
      return setError("Billing Head Name is required.");
    if (!formData.transporterName.trim())
      return setError("Transporter Name is required.");
    if (!formData.address.trim()) return setError("Address is required.");
    if (!formData.pincode.trim()) return setError("Pincode is required.");
    if (!formData.telephone.trim()) return setError("Telephone is required.");
    if (!formData.email.trim()) return setError("Email is required.");
    if (!formData.panNo.trim()) return setError("Pan No is required.");
    if (!formData.vendorCode.trim())
      return setError("Vendor Code is required.");
    if (!formData.gstNo.trim()) return setError("GST No is required.");
    if (!formData.bankName.trim()) return setError("Bank Name is required.");
    if (!formData.accountNumber.trim())
      return setError("Account Number is required.");
    if (!formData.ifscCode.trim()) return setError("IFSC Code is required.");
    if (!formData.billingCycle.trim())
      return setError("Billing Cycle is required.");
    if (!formData.primaryContact.trim())
      return setError("Primary Contact Number is required.");

    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HEADER ===== */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Update Transporter" : "Add Transporter"}
        </h1>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-medium px-6 py-2 rounded-md transition"
        >
          Back
        </button>
      </div>

      {/* ===== FORM CONTENT ===== */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              <FormInput
                label="Billing Head Name"
                required
                placeholder="Billing Head Name"
                value={formData.billingHeadName}
                onChange={handleChange("billingHeadName")}
              />
              <FormInput
                label="Transporter Name"
                required
                placeholder="Transporter Name"
                value={formData.transporterName}
                onChange={handleChange("transporterName")}
              />
              <FormInput
                label="Address"
                required
                placeholder="Correspondence Address"
                value={formData.address}
                onChange={handleChange("address")}
              />
              <FormInput
                label="Pincode"
                required
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange("pincode")}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              <FormInput
                label="State"
                placeholder="State"
                value={formData.state}
                onChange={handleChange("state")}
              />
              <FormInput
                label="District"
                placeholder="District"
                value={formData.district}
                onChange={handleChange("district")}
              />
              <FormInput
                label="Taluka"
                placeholder="Taluka"
                value={formData.taluka}
                onChange={handleChange("taluka")}
              />
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Pincode Office Name
                </label>
                <select
                  value={formData.pincodeOfficeName}
                  onChange={handleChange("pincodeOfficeName")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Office Name</option>
                  <option value="Main Office">Main Office</option>
                  <option value="Branch Office">Branch Office</option>
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              <FormInput
                label="Telephone"
                required
                placeholder="Telephone"
                value={formData.telephone}
                onChange={handleChange("telephone")}
              />
              <FormInput
                label="Email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange("email")}
              />
              <FormInput
                label="Pan No"
                required
                placeholder="Pan No"
                value={formData.panNo}
                onChange={handleChange("panNo")}
              />
              <FormInput
                label="Vendor Code"
                required
                placeholder="Vendor Code"
                value={formData.vendorCode}
                onChange={handleChange("vendorCode")}
              />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              <FormInput
                label="GST No"
                required
                placeholder="GST No"
                value={formData.gstNo}
                onChange={handleChange("gstNo")}
              />
              <FormInput
                label="Bank Name"
                required
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange("bankName")}
              />
              <FormInput
                label="Account Number"
                required
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange("accountNumber")}
              />
              <FormInput
                label="IFSC Code"
                required
                placeholder="IFSC Code"
                value={formData.ifscCode}
                onChange={handleChange("ifscCode")}
              />
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              <FormInput
                label="Billing Cycle(In Days)"
                required
                placeholder="Billing Cycle(In Days)"
                value={formData.billingCycle}
                onChange={handleChange("billingCycle")}
              />
              <FormInput
                label="Primary Contact Number"
                required
                placeholder="Primary Contact Number"
                value={formData.primaryContact}
                onChange={handleChange("primaryContact")}
              />
              <FormInput
                label="Secondary Contact Number"
                placeholder="Secondary Contact Number"
                value={formData.secondaryContact}
                onChange={handleChange("secondaryContact")}
              />
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  TDS Applicable ?
                </label>
                <select
                  value={formData.tdsApplicable}
                  onChange={handleChange("tdsApplicable")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Toll Tax Applicable ?
                </label>
                <select
                  value={formData.tollTaxApplicable}
                  onChange={handleChange("tollTaxApplicable")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  GST Applicable ?
                </label>
                <select
                  value={formData.gstApplicable}
                  onChange={handleChange("gstApplicable")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* ===== + Add TDS / GST button ===== */}
          <div className="flex justify-end mb-6">
            <button
              type="button"
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-5 py-2 rounded-md transition flex items-center gap-2"
            >
              + Add TDS / GST
            </button>
          </div>

          {error && (
            <div className="mb-4 max-w-md text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          {/* Bottom Buttons */}
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
    </div>
  );
};

/* ================= REUSABLE INPUT ================= */
const FormInput = ({ label, required, placeholder, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

/* ================= TRANSPORTER DETAILS VIEW ================= */
const TransporterDetailsView = ({ transporter, onBack }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1e1b6b] mb-5 transition"
    >
      <span className="text-lg leading-none">←</span>
      <span>Back</span>
    </button>

    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      Transporter Details
    </h1>

    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        General Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
        <DetailRow label="Transporter Name" value={transporter.name} />
        <DetailRow label="Address" value={transporter.address} />
        <DetailRow label="Email" value={transporter.email} />
        <DetailRow label="Contact No" value={transporter.contactNo} />
        <DetailRow
          label="Status"
          value={
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${transporter.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {transporter.status ? "Active" : "Inactive"}
            </span>
          }
        />
      </div>

      {transporter.lastEditReason && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Reason for last edit
          </p>
          <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
            {transporter.lastEditReason}
          </p>
        </div>
      )}
    </div>
  </div>
);

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
    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ${checked ? "bg-[#1e1b6b]" : "bg-gray-300"}`}
  >
    <span
      className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${checked ? "translate-x-[22px]" : "translate-x-[2px]"}`}
    />
  </button>
);

export default Transporter;