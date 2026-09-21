import React, { useState, useMemo, useEffect } from "react";
import MasterData from "../../Components/MasterData";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FaArrowRight, FaPlus, FaTrashAlt, FaCog, FaBoxOpen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { toast } from "react-toastify";

const PartNumber = () => {
  // ===== Page mode =====
  const [mode, setMode] = useState("list");
  const [editingPart, setEditingPart] = useState(null);
  const [viewingPart, setViewingPart] = useState(null);

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

  // ===== Status Confirm =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    part: null,
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
    part: null,
  });

  // ===== Reason for Edit =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditPart, setPendingEditPart] = useState(null);

  // ===== Toggle Status =====
  const toggleStatus = (part) => {
    setStatusConfirm({
      isOpen: true,
      part,
      action: part.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { part, action } = statusConfirm;
    if (!part) return;
    setPartNumbers((prev) =>
      prev.map((p) => (p.id === part.id ? { ...p, status: !p.status } : p))
    );
    setStatusConfirm({ isOpen: false, part: null, action: "" });
    setSuccessPopup({
      isOpen: true,
      title: action === "deactivate" ? "Deactivated" : "Activated",
      message: `Record ${action === "deactivate" ? "Deactivated" : "Activated"} Successfully!`,
    });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, part: null, action: "" });
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
  const handleEdit = (part) => {
    setPendingEditPart(part);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingPart(pendingEditPart);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditPart(null);
  };

  // ===== View =====
  const handleView = (part) => {
    setViewingPart(part);
    setMode("view");
  };

  // ===== Delete =====
  const handleDelete = (id) => {
    const p = partNumbers.find((x) => x.id === id);
    if (!p) return;
    setDeleteConfirm({ isOpen: true, part: p });
  };

  const confirmDelete = () => {
    const p = deleteConfirm.part;
    if (!p) return;
    setPartNumbers((prev) => prev.filter((x) => x.id !== p.id));
    setDeleteConfirm({ isOpen: false, part: null });
    toast.success("Part deleted!");
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, part: null });
  };

  // ===== FILTERED =====
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
      { label: "Total Customer Parts", value: total, noIcon: true },
      { label: "Active Customer Parts", value: active, noIcon: true },
      { label: "Inactive Customer Parts", value: inactive, noIcon: true },
    ];
  }, [partNumbers]);

  // ===== Pagination =====
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

  // ===== Add =====
  const handleAdd = () => {
    setEditingPart(null);
    setMode("add");
  };

  // ===== Save =====
  const handleSavePart = (formData) => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      if (editingPart) {
        setPartNumbers((prev) =>
          prev.map((p) =>
            p.id === editingPart.id
              ? { ...p, ...formData, lastEditReason: editReason.trim() }
              : p
          )
        );
        setSuccessPopup({
          isOpen: true,
          title: "Part Details Updated Successfully",
          message: "",
        });
      } else {
        const nextId =
          partNumbers.length > 0
            ? Math.max(...partNumbers.map((p) => p.id)) + 1
            : 1;
        setPartNumbers((prev) => [
          ...prev,
          {
            id: nextId,
            srNo: prev.length + 1,
            consigneeName: formData.customerName || "",
            consignorName: formData.consignorName || "",
            mappedParts: formData.parts?.[0]?.partNumber
              ? [{ part: formData.parts[0].partNumber }]
              : [],
            status: true,
            ...formData,
          },
        ]);
        setSuccessPopup({
          isOpen: true,
          title: "Part Details Added Successfully",
          message: "",
        });
      }

      setEditingPart(null);
      setEditReason("");
      setPendingEditPart(null);
      setMode("list");
    }, 1200);
  };

  const handleCancelForm = () => {
    setEditingPart(null);
    setEditReason("");
    setPendingEditPart(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingPart(null);
    setMode("list");
  };

  // ============ FORM VIEW ============
  if (mode === "edit" || mode === "add") {
    return (
      <AddPartForm
        initialData={editingPart}
        isEdit={Boolean(editingPart)}
        onSave={handleSavePart}
        onCancel={handleCancelForm}
      />
    );
  }

  // ============ VIEW ============
  if (mode === "view" && viewingPart) {
    return (
      <PartDetailsView part={viewingPart} onBack={handleBackFromView} />
    );
  }

  // ============ LIST VIEW ============
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <>
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
        {/* Top Bar */}
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
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-[220px]"
            />
          </div>
        </div>

        {/* Table */}
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
                    <div className="flex items-center gap-1"><SortIcon /><span>Sr No.</span></div>
                  </th>
                )}
                {visibleColumns.consigneeName && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[200px]">
                    <div className="flex items-center justify-between"><span>Consignee Name</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.consignorName && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between"><span>Consignor Name</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.mappedParts && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[220px]">
                    <div className="flex items-center justify-between"><span>Mapped Parts & Packing</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[100px]">
                    <div className="flex items-center justify-between"><span>Status</span><SortIcon /></div>
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
              {paginatedPartNumbers.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumnCount} className="text-center text-gray-400 py-6 border-b border-gray-200">
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedPartNumbers.map((item, idx) => (
                  <tr key={item.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}>
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
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-top">{item.srNo}</td>
                    )}
                    {visibleColumns.consigneeName && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium align-top">{item.consigneeName}</td>
                    )}
                    {visibleColumns.consignorName && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-top whitespace-normal break-words leading-relaxed">{item.consignorName}</td>
                    )}
                    {visibleColumns.mappedParts && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700 align-top">
                        <div className="flex flex-col gap-1">
                          {item.mappedParts.map((mp, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="font-medium">{mp.part}</span>
                              {mp.badge && (
                                <span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded">{mp.badge}</span>
                              )}
                              {mp.arrow && <FaArrowRight size={12} className="text-blue-500" />}
                            </div>
                          ))}
                        </div>
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 align-top">
                        <ToggleSwitch checked={item.status} onChange={() => toggleStatus(item)} />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-2 py-3 border-b border-gray-200 align-top">
                        <div className="flex gap-1">
                          <button onClick={() => handleView(item)} className="w-8 h-8 flex items-center justify-center text-gray-600 border border-gray-400 rounded hover:bg-gray-50 transition" title="View">
                            <GrView size={16} />
                          </button>
                          <button onClick={() => handleEdit(item)} className="w-8 h-8 flex items-center justify-center text-blue-600 border border-blue-400 rounded hover:bg-blue-50 transition" title="Edit">
                            <MdOutlineModeEdit size={18} />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex items-center justify-center text-red-500 border border-red-400 rounded hover:bg-red-50 transition" title="Delete">
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
              {statusConfirm.action === "deactivate" ? "Deactivate Record?" : "Activate Record?"}
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
                {statusConfirm.action === "deactivate" ? "Yes, Deactivate" : "Yes, Activate"}
              </button>
              <button onClick={cancelStatusChange} className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium px-5 py-2 rounded-md transition">
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
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">{successPopup.title}</h3>
            {successPopup.message && <p className="text-sm text-gray-500">{successPopup.message}</p>}
          </div>
        </div>
      )}

      {/* ===== PROCESSING ===== */}
      {processing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[420px] p-10 text-center">
            <h3 className="text-3xl font-semibold text-gray-700 mb-6">Processing...</h3>
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
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Delete Record?</h3>
            <p className="text-sm text-gray-500 mb-8">
              Are you sure you want to delete <b>{deleteConfirm.part?.consigneeName}</b>?
              <br />This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-5 py-2 rounded-md transition">
                Yes, Delete
              </button>
              <button onClick={cancelDelete} className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium px-5 py-2 rounded-md transition">
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
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-2">Reason for Edit</h3>
            <p className="text-sm text-gray-600 text-center mb-6">Why are you editing this part?</p>
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
              <button onClick={handleCancelReason} className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium px-6 py-2 rounded-md transition">
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
const AddPartForm = ({ initialData = null, isEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customerName: initialData?.customerName || "",
    consignorName: initialData?.consignorName || "",
  });

  // ===== Part Configurations =====
  const [parts, setParts] = useState([
    {
      id: Date.now(),
      partNumber: "",
      partDescription: "",
      partWeight: "",
      variants: [
        {
          id: Date.now() + 1,
          packingTypeName: "",
          articleContainer: "",
          piecesQty: "",
          wtPerPiece: "",
          length: "",
          width: "",
          height: "",
          cftFactor: "",
        },
      ],
    },
  ]);

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

  // ===== Part CRUD =====
  const updatePart = (id, field, value) =>
    setParts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );

  const addPart = () =>
    setParts((prev) => [
      ...prev,
      {
        id: Date.now(),
        partNumber: "",
        partDescription: "",
        partWeight: "",
        variants: [
          {
            id: Date.now() + 1,
            packingTypeName: "",
            articleContainer: "",
            piecesQty: "",
            wtPerPiece: "",
            length: "",
            width: "",
            height: "",
            cftFactor: "",
          },
        ],
      },
    ]);

  const removePart = (id) => {
    if (parts.length === 1) return;
    setParts((prev) => prev.filter((p) => p.id !== id));
  };

  // ===== Variant CRUD =====
  const addVariant = (partId) =>
    setParts((prev) =>
      prev.map((p) =>
        p.id === partId
          ? {
              ...p,
              variants: [
                ...p.variants,
                {
                  id: Date.now(),
                  packingTypeName: "",
                  articleContainer: "",
                  piecesQty: "",
                  wtPerPiece: "",
                  length: "",
                  width: "",
                  height: "",
                  cftFactor: "",
                },
              ],
            }
          : p
      )
    );

  const updateVariant = (partId, variantId, field, value) =>
    setParts((prev) =>
      prev.map((p) =>
        p.id === partId
          ? {
              ...p,
              variants: p.variants.map((v) =>
                v.id === variantId ? { ...v, [field]: value } : v
              ),
            }
          : p
      )
    );

  const removeVariant = (partId, variantId) =>
    setParts((prev) =>
      prev.map((p) =>
        p.id === partId
          ? { ...p, variants: p.variants.filter((v) => v.id !== variantId) }
          : p
      )
    );

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setError("");

    if (!formData.customerName) return setError("Customer Name is required.");

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (!p.partNumber.trim())
        return setError(`Part Number is required (Part ${i + 1}).`);
      if (!p.partDescription.trim())
        return setError(`Part Description is required (Part ${i + 1}).`);
    }

    onSave({ ...formData, parts });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HEADER (NOT sticky, no white bg) ===== */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Update Part Number" : "Add Part Number"}
        </h1>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-medium px-6 py-2 rounded-md transition"
        >
          Back
        </button>
      </div>

      {/* FORM CONTENT */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          {/* ===== Customer Name ===== */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.customerName}
                onChange={handleChange("customerName")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Customer</option>
                <option value="Bosch Limited (chakan)">Bosch Limited (chakan)</option>
                <option value="ABC Corp">ABC Corp</option>
                <option value="XYZ Ltd">XYZ Ltd</option>
              </select>
            </div>
          </div>

          {/* ===== + Part Number button ===== */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={addPart}
              className="bg-white border border-[#1e1b6b] text-[#1e1b6b] hover:bg-[#1e1b6b] hover:text-white text-sm font-medium px-5 py-2 rounded-md transition"
            >
              + Part Number
            </button>
          </div>

          {/* ===== Part Configurations ===== */}
          {parts.map((part, pIndex) => (
            <div
              key={part.id}
              className="bg-white border border-gray-200 rounded-lg p-6 mb-6"
            >
              {/* Part Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#1e1b6b]">
                  <FaCog className="text-[#2563eb]" /> Part Configuration {pIndex + 1}
                </h3>
                {parts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePart(part.id)}
                    className="flex items-center gap-2 border border-red-400 text-red-500 hover:bg-red-50 text-sm font-medium px-4 py-1.5 rounded-md transition"
                  >
                    <FaTrashAlt size={12} /> Remove Part
                  </button>
                )}
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <FormInput
                  label="Part Number"
                  required
                  placeholder="Enter Part No"
                  value={part.partNumber}
                  onChange={(e) =>
                    updatePart(part.id, "partNumber", e.target.value)
                  }
                />
                <FormInput
                  label="Part Description"
                  required
                  placeholder="Enter Description"
                  value={part.partDescription}
                  onChange={(e) =>
                    updatePart(part.id, "partDescription", e.target.value)
                  }
                />
              </div>

              {/* Row 2 */}
              <div className="max-w-md mb-6">
                <FormInput
                  label="Part Weight"
                  placeholder="Enter Per Piece Weight"
                  value={part.partWeight}
                  onChange={(e) =>
                    updatePart(part.id, "partWeight", e.target.value)
                  }
                />
              </div>

              {/* ===== PACKING VARIANTS ===== */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-gray-800 tracking-wide">
                    PACKING VARIANTS
                  </h4>
                  <button
                    type="button"
                    onClick={() => addVariant(part.id)}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-4 py-2 rounded-md transition"
                  >
                    + Add Variant
                  </button>
                </div>

                {part.variants.map((variant, vIndex) => (
                  <div
                    key={variant.id}
                    className="border border-gray-200 rounded-lg p-5 mb-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <FaBoxOpen className="text-[#2563eb]" /> Variant {vIndex + 1}
                      </h5>
                      {part.variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariant(part.id, variant.id)}
                          className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded transition"
                          title="Remove Variant"
                        >
                          <IoMdClose size={14} />
                        </button>
                      )}
                    </div>

                    {/* Variant Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <FormInput
                        label="Packing Type Name"
                        placeholder="e.g. Box, Pallet"
                        value={variant.packingTypeName}
                        onChange={(e) =>
                          updateVariant(part.id, variant.id, "packingTypeName", e.target.value)
                        }
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Article Container
                        </label>
                        <select
                          value={variant.articleContainer}
                          onChange={(e) =>
                            updateVariant(part.id, variant.id, "articleContainer", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select Article</option>
                          <option value="Box">Box</option>
                          <option value="Pallet">Pallet</option>
                          <option value="Crate">Crate</option>
                        </select>
                      </div>
                      <FormInput
                        label="Pieces / Qty"
                        placeholder="Quantity"
                        value={variant.piecesQty}
                        onChange={(e) =>
                          updateVariant(part.id, variant.id, "piecesQty", e.target.value)
                        }
                      />
                      <FormInput
                        label="Wt. Per Piece (KG)"
                        placeholder="Weight"
                        value={variant.wtPerPiece}
                        onChange={(e) =>
                          updateVariant(part.id, variant.id, "wtPerPiece", e.target.value)
                        }
                      />
                    </div>

                    {/* Variant Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <FormInput
                        label="Length (L) (inches)"
                        placeholder="L"
                        value={variant.length}
                        onChange={(e) =>
                          updateVariant(part.id, variant.id, "length", e.target.value)
                        }
                      />
                      <FormInput
                        label="Width (W) (inches)"
                        placeholder="W"
                        value={variant.width}
                        onChange={(e) =>
                          updateVariant(part.id, variant.id, "width", e.target.value)
                        }
                      />
                      <FormInput
                        label="Height (H) (inches)"
                        placeholder="H"
                        value={variant.height}
                        onChange={(e) =>
                          updateVariant(part.id, variant.id, "height", e.target.value)
                        }
                      />
                      <FormInput
                        label="CFT Factor"
                        placeholder="Factor"
                        value={variant.cftFactor}
                        onChange={(e) =>
                          updateVariant(part.id, variant.id, "cftFactor", e.target.value)
                        }
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Total CFT
                        </label>
                        <input
                          type="text"
                          value="Auto"
                          readOnly
                          className="w-full bg-green-50 border border-green-200 text-gray-700 rounded-md px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Total Weight
                        </label>
                        <input
                          type="text"
                          value="Auto"
                          readOnly
                          className="w-full bg-red-50 border border-red-200 text-gray-700 rounded-md px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

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

/* ================= PART DETAILS VIEW ================= */
const PartDetailsView = ({ part, onBack }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1e1b6b] mb-5 transition"
    >
      <span className="text-lg leading-none">←</span>
      <span>Back</span>
    </button>

    <h1 className="text-2xl font-bold text-gray-900 mb-6">Part Details</h1>

    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">General Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
        <DetailRow label="Consignee Name" value={part.consigneeName} />
        <DetailRow label="Consignor Name" value={part.consignorName} />
        <DetailRow
          label="Mapped Parts"
          value={
            <div className="flex flex-col gap-1">
              {part.mappedParts?.map((mp, i) => (
                <span key={i}>{mp.part}{mp.badge ? ` (${mp.badge})` : ""}</span>
              ))}
            </div>
          }
        />
        <DetailRow
          label="Status"
          value={
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${part.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {part.status ? "Active" : "Inactive"}
            </span>
          }
        />
      </div>

      {part.lastEditReason && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Reason for last edit</p>
          <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
            {part.lastEditReason}
          </p>
        </div>
      )}
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
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

export default PartNumber;