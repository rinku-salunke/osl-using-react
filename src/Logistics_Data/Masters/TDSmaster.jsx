import React, { useState, useMemo, useEffect } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock, FaListCheck } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { FaBoxes } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { TfiWrite } from "react-icons/tfi";
import { GrView } from "react-icons/gr";

import { toast } from "react-toastify";

const TdsMaster = () => {
  // ===== Page mode: "list" | "add" | "edit" | "view" =====
  const [mode, setMode] = useState("list");
  const [editingTds, setEditingTds] = useState(null);
  const [viewingTds, setViewingTds] = useState(null);

  // ===== Reason for Edit Modal state =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditTds, setPendingEditTds] = useState(null);

  // ===== Status Toggle Confirmation state =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    tds: null,
    action: "",
  });

  // ===== Success Popup state =====
  const [successPopup, setSuccessPopup] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // ===== Processing Popup state =====
  const [processing, setProcessing] = useState(false);

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
    tds: null,
  });

  // ===== Filters =====
  const [tdsNameFilter, setTdsNameFilter] = useState("");
  const [tdsCodeFilter, setTdsCodeFilter] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    tdsName: true,
    tdsCode: true,
    section: true,
    withPan: true,
    withoutPan: true,
    applicableFrom: true,
    applicableTo: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "tdsName", label: "TDS Name" },
    { key: "tdsCode", label: "TDS Code" },
    { key: "section", label: "Section" },
    { key: "withPan", label: "With PAN" },
    { key: "withoutPan", label: "Without PAN" },
    { key: "applicableFrom", label: "Applicable From" },
    { key: "applicableTo", label: "Applicable To" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [tdsList, setTdsList] = useState([
    {
      id: 1,
      srNo: 1,
      tdsName: "Salary",
      tdsCode: "192",
      section: "192",
      tdsStatus: "Active",
      applicableFrom: "2024-04-01",
      applicableTo: "2025-03-31",
      basicExemption: "250000",
      withPan: "10%",
      withoutPan: "20%",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      tdsName: "Interest on Securities",
      tdsCode: "193",
      section: "193",
      tdsStatus: "Active",
      applicableFrom: "2024-04-01",
      applicableTo: "2025-03-31",
      basicExemption: "10000",
      withPan: "10%",
      withoutPan: "20%",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      tdsName: "Dividend",
      tdsCode: "194",
      section: "194",
      tdsStatus: "Active",
      applicableFrom: "2024-04-01",
      applicableTo: "2025-03-31",
      basicExemption: "5000",
      withPan: "10%",
      withoutPan: "20%",
      status: true,
    },
    {
      id: 4,
      srNo: 4,
      tdsName: "Contractor",
      tdsCode: "194C",
      section: "194C",
      tdsStatus: "Inactive",
      applicableFrom: "2024-04-01",
      applicableTo: "2025-03-31",
      basicExemption: "30000",
      withPan: "1%",
      withoutPan: "20%",
      status: false,
    },
  ]);

  // ===== Toggle Status — opens confirmation dialog (SAME AS VehicleType) =====
  const toggleStatus = (tds) => {
    setStatusConfirm({
      isOpen: true,
      tds,
      action: tds.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { tds, action } = statusConfirm;
    if (!tds) return;

    setTdsList((prev) =>
      prev.map((t) =>
        t.id === tds.id
          ? {
              ...t,
              status: !t.status,
              tdsStatus: t.status ? "Inactive" : "Active",
            }
          : t
      )
    );

    setStatusConfirm({ isOpen: false, tds: null, action: "" });
    setSuccessPopup({
      isOpen: true,
      title: action === "deactivate" ? "Deactivated" : "Activated",
      message: `Record ${
        action === "deactivate" ? "Deactivated" : "Activated"
      } Successfully!`,
    });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, tds: null, action: "" });
  };

  // ===== Edit Flow — Step 1: Click edit → open Reason modal =====
  const handleEdit = (tds) => {
    setPendingEditTds(tds);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  // ===== Edit Flow — Step 2: Continue → open Edit Form =====
  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingTds(pendingEditTds);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditTds(null);
  };

  // ===== View =====
  const handleView = (tds) => {
    setViewingTds(tds);
    setMode("view");
  };

  // ===== Delete — opens confirmation dialog =====
  const handleDelete = (id) => {
    const tdsToDelete = tdsList.find((t) => t.id === id);
    if (!tdsToDelete) return;
    setDeleteConfirm({ isOpen: true, tds: tdsToDelete });
  };

  const confirmDelete = () => {
    const tds = deleteConfirm.tds;
    if (!tds) return;
    setTdsList((prev) => prev.filter((t) => t.id !== tds.id));
    setDeleteConfirm({ isOpen: false, tds: null });
    toast.success("TDS deleted!");
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, tds: null });
  };

  // ===== FILTERED DATA =====
  const filteredTds = useMemo(() => {
    return tdsList.filter((t) => {
      const matchName = tdsNameFilter
        ? t.tdsName.toLowerCase().includes(tdsNameFilter.toLowerCase())
        : true;
      const matchCode = tdsCodeFilter
        ? t.tdsCode.toLowerCase().includes(tdsCodeFilter.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? t.status === true
          : t.status === false;
      const matchSearch =
        t.tdsName.toLowerCase().includes(search.toLowerCase()) ||
        t.tdsCode.toLowerCase().includes(search.toLowerCase());
      return matchName && matchCode && matchStatus && matchSearch;
    });
  }, [tdsList, tdsNameFilter, tdsCodeFilter, status, search]);

  // ===== Cards Data =====
  const statsData = useMemo(() => {
    const total = tdsList.length;
    const active = tdsList.filter((t) => t.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Tds Master",
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
        label: "Active Tds Master",
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
        label: "InActive Tds Master",
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
  }, [tdsList]);

  // ===== Pagination =====
  const totalEntries = filteredTds.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedTds = filteredTds.slice(startIdx, startIdx + entriesPerPage);

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
      label: "Tds Name",
      value: tdsNameFilter,
      onChange: (v) => {
        setTdsNameFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Tds Name", value: "" },
        { label: "Salary", value: "salary" },
        { label: "Interest on Securities", value: "interest" },
        { label: "Dividend", value: "dividend" },
        { label: "Contractor", value: "contractor" },
      ],
    },
    {
      label: "Tds Code",
      value: tdsCodeFilter,
      onChange: (v) => {
        setTdsCodeFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Tds Code", value: "" },
        { label: "192", value: "192" },
        { label: "193", value: "193" },
        { label: "194", value: "194" },
        { label: "194C", value: "194C" },
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

  // ===== Add → open Add form =====
  const handleAdd = () => {
    setEditingTds(null);
    setMode("add");
  };

  // ===== Save (Add or Update) =====
  const handleSaveTds = (formData) => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      if (editingTds) {
        // UPDATE
        setTdsList((prev) =>
          prev.map((t) =>
            t.id === editingTds.id
              ? {
                  ...t,
                  ...formData,
                  status: formData.tdsStatus === "Active",
                  lastEditReason: editReason.trim(),
                }
              : t
          )
        );
        setSuccessPopup({
          isOpen: true,
          title: "TdsMasters Details Updated Successfully",
          message: "",
        });
      } else {
        // ADD
        const nextId =
          tdsList.length > 0 ? Math.max(...tdsList.map((t) => t.id)) + 1 : 1;
        setTdsList((prev) => [
          ...prev,
          {
            id: nextId,
            srNo: prev.length + 1,
            ...formData,
            status: formData.tdsStatus === "Active",
          },
        ]);
        setSuccessPopup({
          isOpen: true,
          title: "TdsMasters Details Added Successfully",
          message: "",
        });
      }

      setEditingTds(null);
      setEditReason("");
      setPendingEditTds(null);
      setMode("list");
    }, 1200);
  };

  const handleCancelForm = () => {
    setEditingTds(null);
    setEditReason("");
    setPendingEditTds(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingTds(null);
    setMode("list");
  };

  // ================= EDIT / ADD FORM VIEW =================
  if (mode === "edit" || mode === "add") {
    return (
      <AddTdsForm
        initialData={editingTds}
        isEdit={Boolean(editingTds)}
        onSave={handleSaveTds}
        onCancel={handleCancelForm}
      />
    );
  }

  // ================= VIEW DETAILS =================
  if (mode === "view" && viewingTds) {
    return <TdsDetailsView tds={viewingTds} onBack={handleBackFromView} />;
  }

  // ================= LIST VIEW =================
  return (
    <>
      <MasterData
        title="TDS Master"
        onAdd={handleAdd}
        addButtonLabel="Add TDS Master"
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

        {/* ===== Top Bar ===== */}
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
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                {visibleColumns.srNo && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[70px]">
                    <div className="flex items-center gap-1">
                      <SortIcon />
                      <span>Sr No.</span>
                    </div>
                  </th>
                )}
                {visibleColumns.tdsName && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>TDS Name</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.tdsCode && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>TDS Code</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.section && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Section</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.withPan && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>With PAN</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.withoutPan && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Without PAN</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.applicableFrom && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Applicable From</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.applicableTo && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Applicable To</span>
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
              {paginatedTds.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center text-gray-400 py-6 border-b border-gray-200"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedTds.map((t, idx) => (
                  <tr
                    key={t.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {visibleColumns.srNo && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {t.srNo}
                      </td>
                    )}
                    {visibleColumns.tdsName && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium">
                        {t.tdsName}
                      </td>
                    )}
                    {visibleColumns.tdsCode && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {t.tdsCode}
                      </td>
                    )}
                    {visibleColumns.section && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {t.section}
                      </td>
                    )}
                    {visibleColumns.withPan && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {t.withPan}
                      </td>
                    )}
                    {visibleColumns.withoutPan && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {t.withoutPan}
                      </td>
                    )}
                    {visibleColumns.applicableFrom && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {t.applicableFrom}
                      </td>
                    )}
                    {visibleColumns.applicableTo && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {t.applicableTo}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-2 py-3 border-b border-r border-gray-200">
                        <ToggleSwitch
                          checked={t.status}
                          onChange={() => toggleStatus(t)}
                        />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-2 py-3 border-b border-gray-200">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleView(t)}
                            className="w-7 h-7 border border-gray-400 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-50 transition"
                            title="View"
                          >
                            <GrView size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(t)}
                            className="w-7 h-7 border border-blue-500 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition"
                            title="Edit"
                          >
                            <MdOutlineModeEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="w-7 h-7 border border-red-500 text-red-500 rounded-md flex items-center justify-center hover:bg-red-50 transition"
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

      {/* ================= PROCESSING POPUP ================= */}
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
              <b>{deleteConfirm.tds?.tdsName}</b>?
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
              Enter reason for editing
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

/* ================= ADD / EDIT FORM COMPONENT ================= */
const AddTdsForm = ({ initialData = null, isEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    tdsName: initialData?.tdsName || "",
    tdsCode: initialData?.tdsCode || "",
    section: initialData?.section || "",
    tdsStatus: initialData?.tdsStatus || "Active",
    applicableFrom: initialData?.applicableFrom || "",
    applicableTo: initialData?.applicableTo || "",
    basicExemption: initialData?.basicExemption || "",
    withPan: initialData?.withPan || "",
    withoutPan: initialData?.withoutPan || "",
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

    if (!formData.tdsName.trim()) return setError("TDS Name is required.");
    if (!formData.tdsCode.trim()) return setError("TDS Code is required.");
    if (!formData.section.trim()) return setError("TDS Section is required.");
    if (!formData.applicableFrom)
      return setError("Applicable From Date is required.");
    if (!formData.applicableTo)
      return setError("Applicable To Date is required.");
    if (!formData.basicExemption.trim())
      return setError("Basic Exemption is required.");
    if (!formData.withPan.trim())
      return setError("Basic Rate (With PAN) is required.");
    if (!formData.withoutPan.trim())
      return setError("Basic Rate (Without PAN) is required.");

    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="flex items-center justify-between mb-4 border-b text-2xl font-bold text-gray-900 border-gray-200 -mx-6 px-6 pb-5">
        {isEdit ? "Update Tds Master" : "Add Tds Master"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <FormInput
            label="TDS Name"
            required
            placeholder="TDS Name"
            value={formData.tdsName}
            onChange={handleChange("tdsName")}
          />
          <FormInput
            label="TDS Code"
            required
            placeholder="TDS Code"
            value={formData.tdsCode}
            onChange={handleChange("tdsCode")}
          />
          <FormInput
            label="TDS Section"
            required
            placeholder="TDS Section"
            value={formData.section}
            onChange={handleChange("section")}
          />
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              TDS Status
            </label>
            <select
              value={formData.tdsStatus}
              onChange={handleChange("tdsStatus")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose TDS Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <FormInput
            label="Applicable From Date"
            required
            type="date"
            value={formData.applicableFrom}
            onChange={handleChange("applicableFrom")}
          />
          <FormInput
            label="Applicable To Date"
            required
            type="date"
            value={formData.applicableTo}
            onChange={handleChange("applicableTo")}
          />
          <FormInput
            label="Basic Exemption"
            required
            placeholder="Basic Exemption"
            value={formData.basicExemption}
            onChange={handleChange("basicExemption")}
          />
          <FormInput
            label="Basic Rate (With PAN)"
            required
            placeholder="Basic Rate (With PAN)"
            value={formData.withPan}
            onChange={handleChange("withPan")}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <FormInput
            label="Basic Rate (Without PAN)"
            required
            placeholder="Basic Rate (Without PAN)"
            value={formData.withoutPan}
            onChange={handleChange("withoutPan")}
          />
        </div>

        {error && (
          <div className="mb-4 max-w-md text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* Buttons */}
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

/* ================= REUSABLE FORM INPUT ================= */
const FormInput = ({
  label,
  required,
  placeholder,
  value,
  onChange,
  type = "text",
}) => (
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

/* ================= TDS DETAILS VIEW ================= */
const TdsDetailsView = ({ tds, onBack }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1e1b6b] mb-5 transition"
    >
      <span className="text-lg leading-none">←</span>
      <span>Back</span>
    </button>

    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      TDS Master Details
    </h1>

    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        General Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
        <DetailRow label="TDS Name" value={tds.tdsName} />
        <DetailRow label="TDS Code" value={tds.tdsCode} />
        <DetailRow label="TDS Section" value={tds.section} />
        <DetailRow label="Applicable From" value={tds.applicableFrom} />
        <DetailRow label="Applicable To" value={tds.applicableTo} />
        <DetailRow label="Basic Exemption" value={tds.basicExemption} />
        <DetailRow label="Basic Rate (With PAN)" value={tds.withPan} />
        <DetailRow label="Basic Rate (Without PAN)" value={tds.withoutPan} />
        <DetailRow
          label="Status"
          value={
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                tds.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {tds.status ? "Active" : "Inactive"}
            </span>
          }
        />
      </div>

      {tds.lastEditReason && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Reason for last edit
          </p>
          <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
            {tds.lastEditReason}
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

export default TdsMaster;