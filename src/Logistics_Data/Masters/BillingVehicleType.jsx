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

const BillingVehicleType = () => {
  // ===== Page mode: "list" | "edit" | "view" =====
  const [mode, setMode] = useState("list");
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [viewingVehicle, setViewingVehicle] = useState(null);

  // ===== Reason for Edit Modal state =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditVehicle, setPendingEditVehicle] = useState(null);

  // ===== Status Toggle Confirmation state =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    vehicle: null,
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
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    billingVehicleType: true,
    capacity: true,
    dimensions: true,
    wheels: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr." },
    { key: "billingVehicleType", label: "Billing Vehicle Type" },
    { key: "capacity", label: "Capacity" },
    { key: "dimensions", label: "Dimensions (L x W x H)" },
    { key: "wheels", label: "Wheels & Axle" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [billingVehicles, setBillingVehicles] = useState([
    {
      id: 1,
      srNo: 1,
      billingVehicleType: "Tempo",
      capacity: "25400.00 KG",
      dimensions: "24.00 x 8.00 x 8.50 ft",
      wheels: "10 Tyres",
      status: true,
      payloadCapacity: "25400.00",
      tyreCount: "10",
      axleType: "Multi Axle",
      internalLength: "24.0",
      internalWidth: "8.0",
      internalHeight: "8.5",
      externalLength: "25.5",
      externalWidth: "8.5",
      externalHeight: "10.0",
    },
    {
      id: 2,
      srNo: 2,
      billingVehicleType: "Truck",
      capacity: "30000.00 KG",
      dimensions: "26.00 x 8.50 x 9.00 ft",
      wheels: "12 Tyres",
      status: true,
      payloadCapacity: "30000.00",
      tyreCount: "12",
      axleType: "Multi Axle",
      internalLength: "26.0",
      internalWidth: "8.5",
      internalHeight: "9.0",
      externalLength: "27.0",
      externalWidth: "9.0",
      externalHeight: "10.5",
    },
    {
      id: 3,
      srNo: 3,
      billingVehicleType: "Mini Truck",
      capacity: "15000.00 KG",
      dimensions: "18.00 x 6.50 x 7.00 ft",
      wheels: "6 Tyres",
      status: false,
      payloadCapacity: "15000.00",
      tyreCount: "6",
      axleType: "Single Axle",
      internalLength: "18.0",
      internalWidth: "6.5",
      internalHeight: "7.0",
      externalLength: "19.0",
      externalWidth: "7.0",
      externalHeight: "8.0",
    },
    {
      id: 4,
      srNo: 4,
      billingVehicleType: "Container",
      capacity: "40000.00 KG",
      dimensions: "32.00 x 8.50 x 9.50 ft",
      wheels: "14 Tyres",
      status: true,
      payloadCapacity: "40000.00",
      tyreCount: "14",
      axleType: "Multi Axle",
      internalLength: "32.0",
      internalWidth: "8.5",
      internalHeight: "9.5",
      externalLength: "33.0",
      externalWidth: "9.0",
      externalHeight: "11.0",
    },
  ]);

  // ===== Toggle Status — opens confirmation dialog =====
  const toggleStatus = (vehicle) => {
    setStatusConfirm({
      isOpen: true,
      vehicle,
      action: vehicle.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { vehicle, action } = statusConfirm;
    if (!vehicle) return;

    setBillingVehicles((prev) =>
      prev.map((v) => (v.id === vehicle.id ? { ...v, status: !v.status } : v))
    );

    setStatusConfirm({ isOpen: false, vehicle: null, action: "" });
    setSuccessPopup({ isOpen: true, action });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, vehicle: null, action: "" });
  };

  // ===== Edit Flow — Step 1: Click edit → open Reason modal =====
  const handleEdit = (vehicle) => {
    setPendingEditVehicle(vehicle);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  // ===== Edit Flow — Step 2: Continue → open Edit Form =====
  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingVehicle(pendingEditVehicle);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditVehicle(null);
  };

  // ===== View =====
  const handleView = (vehicle) => {
    setViewingVehicle(vehicle);
    setMode("view");
  };

  // ===== Delete with Toastify =====
  const handleDelete = (id) => {
    const vehicleToDelete = billingVehicles.find((v) => v.id === id);
    if (!vehicleToDelete) return;

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
            Delete <b>{vehicleToDelete.billingVehicleType}</b>?
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
                setBillingVehicles((prev) => prev.filter((v) => v.id !== id));
                toast.success("Billing Vehicle Type deleted!");
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
        toastId: `delete-billing-vehicle-${id}`,
        style: { width: "340px", padding: "16px" },
      }
    );
  };

  // ===== Add New =====
  const handleAddNew = () => {
    setEditingVehicle(null);
    setMode("edit");
  };

  // ===== Save (Add or Update) =====
  const handleSaveVehicle = (formData) => {
    if (!formData.billingVehicleType.trim()) {
      toast.error("Please enter billing vehicle type");
      return;
    }

    const capacityStr = formData.payloadCapacity
      ? `${formData.payloadCapacity} KG`
      : "";
    const dimsStr =
      formData.internalLength && formData.internalWidth && formData.internalHeight
        ? `${formData.internalLength} x ${formData.internalWidth} x ${formData.internalHeight} ft`
        : "";
    const wheelsStr = formData.tyreCount ? `${formData.tyreCount} Tyres` : "";

    if (editingVehicle) {
      // UPDATE
      setBillingVehicles((prev) =>
        prev.map((v) =>
          v.id === editingVehicle.id
            ? {
                ...v,
                ...formData,
                capacity: capacityStr,
                dimensions: dimsStr,
                wheels: wheelsStr,
                lastEditReason: editReason.trim(),
                lastEditedAt: new Date().toISOString(),
              }
            : v
        )
      );
      toast.success("Billing Vehicle Type updated!");
    } else {
      // ADD
      const nextId =
        billingVehicles.length > 0
          ? Math.max(...billingVehicles.map((v) => v.id)) + 1
          : 1;
      setBillingVehicles((prev) => [
        ...prev,
        {
          id: nextId,
          srNo: prev.length + 1,
          ...formData,
          capacity: capacityStr,
          dimensions: dimsStr,
          wheels: wheelsStr,
          status: true,
          createdAt: new Date().toISOString(),
        },
      ]);
      toast.success("Billing Vehicle Type added successfully!");
    }

    setEditingVehicle(null);
    setEditReason("");
    setPendingEditVehicle(null);
    setMode("list");
  };

  const handleCancelForm = () => {
    setEditingVehicle(null);
    setEditReason("");
    setPendingEditVehicle(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingVehicle(null);
    setMode("list");
  };

  // ===== FILTERED DATA =====
  const filteredVehicles = useMemo(() => {
    return billingVehicles.filter((v) => {
      const matchType = vehicleTypeFilter
        ? v.billingVehicleType
            .toLowerCase()
            .includes(vehicleTypeFilter.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? v.status === true
          : v.status === false;
      const matchSearch = v.billingVehicleType
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchType && matchStatus && matchSearch;
    });
  }, [billingVehicles, vehicleTypeFilter, status, search]);

  // ===== Cards Data =====
  const statsData = useMemo(() => {
    const total = billingVehicles.length;
    const active = billingVehicles.filter((v) => v.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Billing Vehicle Type",
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
        label: "Active Billing Vehicle Type",
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
        label: "InActive Billing Vehicle Type",
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
  }, [billingVehicles]);

  // ===== Pagination calculations =====
  const totalEntries = filteredVehicles.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedVehicles = filteredVehicles.slice(
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
      label: "Billing Vehicle Type",
      value: vehicleTypeFilter,
      onChange: (v) => {
        setVehicleTypeFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Vehicle Type", value: "" },
        { label: "Tempo", value: "tempo" },
        { label: "Truck", value: "truck" },
        { label: "Mini Truck", value: "mini truck" },
        { label: "Container", value: "container" },
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
      <AddBillingVehicleForm
        initialData={editingVehicle}
        isEdit={Boolean(editingVehicle)}
        onSave={handleSaveVehicle}
        onCancel={handleCancelForm}
      />
    );
  }

  // ================= VIEW DETAILS =================
  if (mode === "view" && viewingVehicle) {
    return (
      <BillingVehicleDetailsView
        vehicle={viewingVehicle}
        onBack={handleBackFromView}
      />
    );
  }

  // ================= LIST VIEW =================
  return (
    <>
      <MasterData
        title="Billing Vehicle Type Master"
        onAdd={handleAddNew}
        addButtonLabel="Add Billing Vehicle Type"
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
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="px-2 py-2 border-b border-r border-gray-200 w-[40px]">
                  <input type="checkbox" className="accent-indigo-600" />
                </th>

                {visibleColumns.srNo && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[70px]">
                    <div className="flex items-center gap-1">
                      <SortIcon />
                      <span>Sr.</span>
                    </div>
                  </th>
                )}
                {visibleColumns.billingVehicleType && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Billing Vehicle Type</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.capacity && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Capacity</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.dimensions && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Dimensions (L x W x H)</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.wheels && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Wheels & Axle</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[100px]">
                    <span>Status</span>
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
              {paginatedVehicles.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-gray-400 py-6 border-b border-gray-200"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedVehicles.map((v, idx) => (
                  <tr
                    key={v.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-2 py-2 border-b border-r border-gray-200">
                      <input type="checkbox" className="accent-indigo-600" />
                    </td>

                    {visibleColumns.srNo && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                        {v.srNo}
                      </td>
                    )}
                    {visibleColumns.billingVehicleType && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-800 font-medium">
                        {v.billingVehicleType}
                      </td>
                    )}
                    {visibleColumns.capacity && (
                      <td className="px-2 py-2 border-b border-r border-gray-200">
                        <span className="inline-block border border-blue-400 text-blue-600 rounded px-2 py-0.5 text-xs">
                          {v.capacity}
                        </span>
                      </td>
                    )}
                    {visibleColumns.dimensions && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                        {v.dimensions}
                      </td>
                    )}
                    {visibleColumns.wheels && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                        {v.wheels}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-2 py-2 border-b border-r border-gray-200">
                        <ToggleSwitch
                          checked={v.status}
                          onChange={() => toggleStatus(v)}
                        />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-2 py-2 border-b border-gray-200">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(v)}
                            className="w-7 h-7 border border-blue-500 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition"
                            title="Edit"
                          >
                            <MdOutlineModeEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(v.id)}
                            className="w-7 h-7 border border-red-500 text-red-500 rounded-md flex items-center justify-center hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <RiDeleteBin6Line size={16} />
                          </button>
                          <button
                            onClick={() => handleView(v)}
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
              Why are you editing this billing vehicle type?
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
const AddBillingVehicleForm = ({ initialData = null, isEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    billingVehicleType: initialData?.billingVehicleType || "",
    payloadCapacity: initialData?.payloadCapacity || "",
    tyreCount: initialData?.tyreCount || "",
    axleType: initialData?.axleType || "",
    internalLength: initialData?.internalLength || "",
    internalWidth: initialData?.internalWidth || "",
    internalHeight: initialData?.internalHeight || "",
    externalLength: initialData?.externalLength || "",
    externalWidth: initialData?.externalWidth || "",
    externalHeight: initialData?.externalHeight || "",
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

    if (!formData.billingVehicleType.trim()) {
      setError("Billing Vehicle Type is required.");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ⭐ Title OUTSIDE the form card (same as Articles.jsx) */}
              <h1 className="flex items-center justify-between mb-4 border-b text-2xl font-bold text-gray-900 border-gray-200 -mx-6 px-6 pb-5">
        {isEdit ? "Edit Billing Vehicle Type" : "Add Billing Vehicle Type"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        {/* ===== General Details ===== */}
        <div className="mb-2 flex items-center gap-2 text-blue-600 font-medium">
          <span>📋</span>
          <h2>General Details</h2>
        </div>
        <div className="border-b border-gray-200 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <FormInput
            label="Billing Vehicle Type"
            required
            placeholder="e.g. 10 Wheeler Container"
            value={formData.billingVehicleType}
            onChange={handleChange("billingVehicleType")}
          />
          <FormInput
            label="Payload Capacity (KG)"
            required
            placeholder="e.g. 25000"
            value={formData.payloadCapacity}
            onChange={handleChange("payloadCapacity")}
          />
          <FormInput
            label="Tyre Count"
            required
            placeholder="e.g. 10"
            value={formData.tyreCount}
            onChange={handleChange("tyreCount")}
          />
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Axle Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.axleType}
              onChange={handleChange("axleType")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select</option>
              <option value="Single Axle">Single Axle</option>
              <option value="Multi Axle">Multi Axle</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
        </div>

        {/* ===== Internal Dimensions ===== */}
        <div className="mb-2 flex items-center gap-2 text-blue-600 font-medium">
          <span>📐</span>
          <h2>Internal Dimensions (ft)</h2>
        </div>
        <div className="border-b border-gray-200 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <FormInput
            label="Internal Length"
            required
            placeholder="e.g. 24.0"
            value={formData.internalLength}
            onChange={handleChange("internalLength")}
          />
          <FormInput
            label="Internal Width"
            required
            placeholder="e.g. 8.0"
            value={formData.internalWidth}
            onChange={handleChange("internalWidth")}
          />
          <FormInput
            label="Internal Height"
            required
            placeholder="e.g. 8.5"
            value={formData.internalHeight}
            onChange={handleChange("internalHeight")}
          />
        </div>

        {/* ===== External Dimensions ===== */}
        <div className="mb-2 flex items-center gap-2 text-blue-600 font-medium">
          <span>📏</span>
          <h2>External Dimensions (ft)</h2>
        </div>
        <div className="border-b border-gray-200 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <FormInput
            label="External Length"
            required
            placeholder="e.g. 25.5"
            value={formData.externalLength}
            onChange={handleChange("externalLength")}
          />
          <FormInput
            label="External Width"
            required
            placeholder="e.g. 8.5"
            value={formData.externalWidth}
            onChange={handleChange("externalWidth")}
          />
          <FormInput
            label="External Height"
            required
            placeholder="e.g. 10.0"
            value={formData.externalHeight}
            onChange={handleChange("externalHeight")}
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

/* Reusable form input */
const FormInput = ({ label, required, placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

/* ================= BILLING VEHICLE DETAILS VIEW ================= */
const BillingVehicleDetailsView = ({ vehicle, onBack }) => {
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
        Billing Vehicle Type Details
      </h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
        {/* General Details */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          General Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 mb-6">
          <DetailRow
            label="Billing Vehicle Type"
            value={vehicle.billingVehicleType}
          />
          <DetailRow
            label="Payload Capacity"
            value={vehicle.capacity || vehicle.payloadCapacity}
          />
          <DetailRow
            label="Tyre Count"
            value={vehicle.tyreCount ? `${vehicle.tyreCount} Tyres` : "-"}
          />
          <DetailRow label="Axle Type" value={vehicle.axleType || "-"} />
          <DetailRow
            label="Status"
            value={
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  vehicle.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {vehicle.status ? "Active" : "Inactive"}
              </span>
            }
          />
        </div>

        {/* Internal Dimensions */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-8 pt-6 border-t border-gray-200">
          Internal Dimensions (ft)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 mb-6">
          <DetailRow label="Length" value={vehicle.internalLength || "-"} />
          <DetailRow label="Width" value={vehicle.internalWidth || "-"} />
          <DetailRow label="Height" value={vehicle.internalHeight || "-"} />
        </div>

        {/* External Dimensions */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-8 pt-6 border-t border-gray-200">
          External Dimensions (ft)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10">
          <DetailRow label="Length" value={vehicle.externalLength || "-"} />
          <DetailRow label="Width" value={vehicle.externalWidth || "-"} />
          <DetailRow label="Height" value={vehicle.externalHeight || "-"} />
        </div>

        {/* Last Edit Reason */}
        {vehicle.lastEditReason && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Reason for last edit
            </p>
            <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
              {vehicle.lastEditReason}
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

export default BillingVehicleType;