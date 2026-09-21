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

const GstMaster = () => {
  // ===== Page mode: "list" | "add" | "edit" | "view" =====
  const [mode, setMode] = useState("list");
  const [editingGst, setEditingGst] = useState(null);
  const [viewingGst, setViewingGst] = useState(null);

  // ===== Reason for Edit Modal state =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditGst, setPendingEditGst] = useState(null);

  // ===== Status Toggle Confirmation state =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    gst: null,
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
    gst: null,
  });

  // ===== Filters =====
  const [stateFilter, setStateFilter] = useState("");
  const [gstNameFilter, setGstNameFilter] = useState("");
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
    state: true,
    gstName: true,
    sacCode: true,
    marks: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "state", label: "State" },
    { key: "gstName", label: "GST Name" },
    { key: "sacCode", label: "Sac Code" },
    { key: "marks", label: "Marks" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [gstList, setGstList] = useState([
    {
      id: 1,
      srNo: 1,
      state: "Andaman & Nicobar Islands",
      stateCode: "35",
      gstRateCategory: "Not Zero",
      gstRate: "18",
      gstName: "A&NI Not Zero 18%",
      description: "",
      wefDate: "2026-05-09",
      endDate: "2026-12-09",
      gstCategory: "Services",
      sacCode: "996511",
      type: "Including",
      igst: "18",
      igstPostingOut: "IGST Output A&NI Not Zero 18%",
      igstPostingIn: "IGST Input A&NI Not Zero 18%",
      cgst: "9.00",
      cgstPostingOut: "CGST Output A&NI Not Zero 9.00",
      cgstPostingIn: "CGST Input A&NI Not Zero 9.00",
      sgst: "9.00",
      sgstPostingOut: "SGST Output A&NI Not Zero 9.00",
      sgstPostingIn: "SGST Input A&NI Not Zero 9.00",
      remarks: "",
      marks: "added",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      state: "Punjab",
      stateCode: "03",
      gstRateCategory: "Not Zero",
      gstRate: "18",
      gstName: "Punjab Not Zero 18%",
      gstCategory: "Services",
      sacCode: "996511",
      type: "Including",
      igst: "18",
      cgst: "9.00",
      sgst: "9.00",
      remarks: "",
      marks: "added",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      state: "Chandigarh",
      stateCode: "04",
      gstRateCategory: "Nil Rated",
      gstRate: "0",
      gstName: "Chandigarh Nil Rated",
      gstCategory: "Services",
      sacCode: "996511",
      type: "Including",
      igst: "0",
      cgst: "0",
      sgst: "0",
      remarks: "",
      marks: "added",
      status: true,
    },
    {
      id: 4,
      srNo: 4,
      state: "Bihar",
      stateCode: "10",
      gstRateCategory: "Not Zero",
      gstRate: "15",
      gstName: "Bihar Not Zero 15%",
      gstCategory: "Services",
      sacCode: "994512",
      type: "Including",
      igst: "15",
      cgst: "7.5",
      sgst: "7.5",
      remarks: "",
      marks: "added",
      status: true,
    },
  ]);

  // ===== Toggle Status — opens confirmation dialog (SAME AS VehicleType) =====
  const toggleStatus = (gst) => {
    setStatusConfirm({
      isOpen: true,
      gst,
      action: gst.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { gst, action } = statusConfirm;
    if (!gst) return;

    setGstList((prev) =>
      prev.map((g) => (g.id === gst.id ? { ...g, status: !g.status } : g))
    );

    setStatusConfirm({ isOpen: false, gst: null, action: "" });
    setSuccessPopup({
      isOpen: true,
      title: action === "deactivate" ? "Deactivated" : "Activated",
      message: `Record ${
        action === "deactivate" ? "Deactivated" : "Activated"
      } Successfully!`,
    });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, gst: null, action: "" });
  };

  // ===== Edit Flow — Step 1: Click edit → open Reason modal =====
  const handleEdit = (gst) => {
    setPendingEditGst(gst);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  // ===== Edit Flow — Step 2: Continue → open Edit Form =====
  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingGst(pendingEditGst);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditGst(null);
  };

  // ===== View =====
  const handleView = (gst) => {
    setViewingGst(gst);
    setMode("view");
  };

  // ===== Delete — opens confirmation dialog =====
  const handleDelete = (id) => {
    const gstToDelete = gstList.find((g) => g.id === id);
    if (!gstToDelete) return;
    setDeleteConfirm({ isOpen: true, gst: gstToDelete });
  };

  const confirmDelete = () => {
    const gst = deleteConfirm.gst;
    if (!gst) return;
    setGstList((prev) => prev.filter((g) => g.id !== gst.id));
    setDeleteConfirm({ isOpen: false, gst: null });
    toast.success("GST deleted!");
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, gst: null });
  };

  // ===== FILTERED DATA =====
  const filteredGst = useMemo(() => {
    return gstList.filter((g) => {
      const matchState = stateFilter
        ? g.state.toLowerCase().includes(stateFilter.toLowerCase())
        : true;
      const matchGstName = gstNameFilter
        ? g.gstName.toLowerCase().includes(gstNameFilter.toLowerCase())
        : true;
      const matchSac = sacCodeFilter
        ? g.sacCode.toLowerCase().includes(sacCodeFilter.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? g.status === true
          : g.status === false;
      const matchSearch =
        g.gstName.toLowerCase().includes(search.toLowerCase()) ||
        g.state.toLowerCase().includes(search.toLowerCase()) ||
        g.sacCode.toLowerCase().includes(search.toLowerCase());
      return (
        matchState && matchGstName && matchSac && matchStatus && matchSearch
      );
    });
  }, [gstList, stateFilter, gstNameFilter, sacCodeFilter, status, search]);

  // ===== Cards Data =====
  const statsData = useMemo(() => {
    const total = gstList.length;
    const active = gstList.filter((g) => g.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total GST",
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
        label: "Active GST",
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
        label: "InActive GST",
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
  }, [gstList]);

  // ===== Pagination =====
  const totalEntries = filteredGst.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedGst = filteredGst.slice(startIdx, startIdx + entriesPerPage);

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
      label: "State Name",
      value: stateFilter,
      onChange: (v) => {
        setStateFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select State", value: "" },
        { label: "Andaman & Nicobar Islands", value: "andaman" },
        { label: "Punjab", value: "punjab" },
        { label: "Chandigarh", value: "chandigarh" },
        { label: "Bihar", value: "bihar" },
      ],
    },
    {
      label: "GST Name",
      value: gstNameFilter,
      onChange: (v) => {
        setGstNameFilter(v);
        setCurrentPage(1);
      },
      options: [{ label: "Select Gst Name", value: "" }],
    },
    {
      label: "Sac Code",
      value: sacCodeFilter,
      onChange: (v) => {
        setSacCodeFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Sac Code", value: "" },
        { label: "996511", value: "996511" },
        { label: "994512", value: "994512" },
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
    setEditingGst(null);
    setMode("add");
  };

  // ===== Save (Add or Update) =====
  const handleSaveGst = (formData) => {
    setProcessing(true);

    // Simulate API delay (replace with real API call if needed)
    setTimeout(() => {
      setProcessing(false);

      if (editingGst) {
        // UPDATE
        setGstList((prev) =>
          prev.map((g) =>
            g.id === editingGst.id
              ? {
                  ...g,
                  ...formData,
                  lastEditReason: editReason.trim(),
                  marks: "updated",
                }
              : g
          )
        );
        setSuccessPopup({
          isOpen: true,
          title: "GstMasters Details Updated Successfully",
          message: "",
        });
      } else {
        // ADD
        const nextId =
          gstList.length > 0 ? Math.max(...gstList.map((g) => g.id)) + 1 : 1;
        setGstList((prev) => [
          ...prev,
          {
            id: nextId,
            srNo: prev.length + 1,
            ...formData,
            marks: "added",
            status: true,
          },
        ]);
        setSuccessPopup({
          isOpen: true,
          title: "GstMasters Details Added Successfully",
          message: "",
        });
      }

      setEditingGst(null);
      setEditReason("");
      setPendingEditGst(null);
      setMode("list");
    }, 1200);
  };

  const handleCancelForm = () => {
    setEditingGst(null);
    setEditReason("");
    setPendingEditGst(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingGst(null);
    setMode("list");
  };

  // ================= EDIT / ADD FORM VIEW =================
  if (mode === "edit" || mode === "add") {
    return (
      <AddGstForm
        initialData={editingGst}
        isEdit={Boolean(editingGst)}
        onSave={handleSaveGst}
        onCancel={handleCancelForm}
      />
    );
  }

  // ================= VIEW DETAILS =================
  if (mode === "view" && viewingGst) {
    return (
      <GstDetailsView gst={viewingGst} onBack={handleBackFromView} />
    );
  }

  // ================= LIST VIEW =================
  return (
    <>
      <MasterData
        title="GST Master"
        onAdd={handleAdd}
        addButtonLabel="Add GST"
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
                {visibleColumns.state && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>State</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.gstName && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>GST Name</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.sacCode && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Sac Code</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.marks && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Marks</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[120px]">
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
              {paginatedGst.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-gray-400 py-6 border-b border-gray-200"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedGst.map((g, idx) => (
                  <tr
                    key={g.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {visibleColumns.srNo && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {g.srNo}
                      </td>
                    )}
                    {visibleColumns.state && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium">
                        {g.state}
                      </td>
                    )}
                    {visibleColumns.gstName && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {g.gstName}
                      </td>
                    )}
                    {visibleColumns.sacCode && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {g.sacCode}
                      </td>
                    )}
                    {visibleColumns.marks && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {g.marks}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-2 py-3 border-b border-r border-gray-200">
                        <ToggleSwitch
                          checked={g.status}
                          onChange={() => toggleStatus(g)}
                        />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-2 py-3 border-b border-gray-200">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleView(g)}
                            className="w-7 h-7 border border-gray-400 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-50 transition"
                            title="View"
                          >
                            <GrView size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(g)}
                            className="w-7 h-7 border border-blue-500 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition"
                            title="Edit"
                          >
                            <MdOutlineModeEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(g.id)}
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
              <b>{deleteConfirm.gst?.gstName}</b>?
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
const AddGstForm = ({ initialData = null, isEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    state: initialData?.state || "",
    stateCode: initialData?.stateCode || "",
    gstRateCategory: initialData?.gstRateCategory || "",
    gstRate: initialData?.gstRate || "",
    gstName: initialData?.gstName || "",
    description: initialData?.description || "",
    wefDate: initialData?.wefDate || "",
    endDate: initialData?.endDate || "",
    gstCategory: initialData?.gstCategory || "",
    sacCode: initialData?.sacCode || "",
    type: initialData?.type || "",
    igst: initialData?.igst || "",
    igstPostingOut: initialData?.igstPostingOut || "",
    igstPostingIn: initialData?.igstPostingIn || "",
    cgst: initialData?.cgst || "",
    cgstPostingOut: initialData?.cgstPostingOut || "",
    cgstPostingIn: initialData?.cgstPostingIn || "",
    sgst: initialData?.sgst || "",
    sgstPostingOut: initialData?.sgstPostingOut || "",
    sgstPostingIn: initialData?.sgstPostingIn || "",
    remarks: initialData?.remarks || "",
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

    if (!formData.state.trim()) return setError("State is required.");
    if (!formData.stateCode.trim()) return setError("State Code is required.");
    if (!formData.gstRateCategory.trim())
      return setError("GST Rate Category is required.");
    if (!formData.gstRate.trim()) return setError("GST Rate(%) is required.");
    if (!formData.gstName.trim()) return setError("GST Name is required.");
    if (!formData.wefDate) return setError("W.E.F.Date is required.");
    if (!formData.endDate) return setError("End Date is required.");
    if (!formData.gstCategory.trim())
      return setError("GST Category is required.");
    if (!formData.sacCode.trim()) return setError("SAC Code is required.");
    if (!formData.type.trim()) return setError("Type is required.");
    if (!formData.igst.trim()) return setError("IGST(%) is required.");
    if (!formData.cgst.trim()) return setError("CGST(%) is required.");
    if (!formData.sgst.trim()) return setError("SGST(%) is required.");

    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="flex items-center justify-between mb-4 border-b text-2xl font-bold text-gray-900 border-gray-200 -mx-6 px-6 pb-5">
        {isEdit ? "Update GST Master" : "Add GST Master"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.state}
              onChange={handleChange("state")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select State</option>
              <option value="Andaman & Nicobar Islands">
                Andaman & Nicobar Islands
              </option>
              <option value="Punjab">Punjab</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Bihar">Bihar</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <FormInput
            label="State Code"
            required
            placeholder="State Code"
            value={formData.stateCode}
            onChange={handleChange("stateCode")}
          />

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              GST Rate Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gstRateCategory}
              onChange={handleChange("gstRateCategory")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose Description</option>
              <option value="Not Zero">Not Zero</option>
              <option value="Nil Rated">Nil Rated</option>
              <option value="Zero">Zero</option>
            </select>
          </div>

          <FormInput
            label="GST Rate(%)"
            required
            placeholder="Rate"
            value={formData.gstRate}
            onChange={handleChange("gstRate")}
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <FormInput
            label="GST Name"
            required
            placeholder="GST Name"
            value={formData.gstName}
            onChange={handleChange("gstName")}
          />
          <FormInput
            label="Description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange("description")}
          />
          <FormInput
            label="W.E.F.Date"
            required
            type="date"
            value={formData.wefDate}
            onChange={handleChange("wefDate")}
          />
          <FormInput
            label="End Date"
            required
            type="date"
            value={formData.endDate}
            onChange={handleChange("endDate")}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              GST Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gstCategory}
              onChange={handleChange("gstCategory")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gst Category</option>
              <option value="Services">Services</option>
              <option value="WareHouse Services">WareHouse Services</option>
              <option value="Goods">Goods</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              SAC Code <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.sacCode}
              onChange={handleChange("sacCode")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select SAC Code</option>
              <option value="996511">996511</option>
              <option value="994512">994512</option>
              <option value="996601">996601</option>
              <option value="996812">996812</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={handleChange("type")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose Type</option>
              <option value="Including">Including</option>
              <option value="Excluding">Excluding</option>
            </select>
          </div>

          <FormInput
            label="IGST(%)"
            required
            placeholder="IGST"
            value={formData.igst}
            onChange={handleChange("igst")}
          />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <FormInput
            label="IGST Posting A/C (Output)"
            required
            placeholder="IGST Posting A/C (Output)"
            value={formData.igstPostingOut}
            onChange={handleChange("igstPostingOut")}
          />
          <FormInput
            label="IGST Posting A/C (Input)"
            required
            placeholder="IGST Posting A/C (Input)"
            value={formData.igstPostingIn}
            onChange={handleChange("igstPostingIn")}
          />
          <FormInput
            label="CGST(%)"
            required
            placeholder="CGST"
            value={formData.cgst}
            onChange={handleChange("cgst")}
          />
          <FormInput
            label="CGST Posting A/C (Output)"
            required
            placeholder="CGST Posting A/C (Output)"
            value={formData.cgstPostingOut}
            onChange={handleChange("cgstPostingOut")}
          />
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <FormInput
            label="CGST Posting A/C (Input)"
            required
            placeholder="CGST Posting A/C (Input)"
            value={formData.cgstPostingIn}
            onChange={handleChange("cgstPostingIn")}
          />
          <FormInput
            label="SGST(%)"
            required
            placeholder="SGST"
            value={formData.sgst}
            onChange={handleChange("sgst")}
          />
          <FormInput
            label="SGST Posting A/C (Output)"
            required
            placeholder="SGST Posting A/C (Output)"
            value={formData.sgstPostingOut}
            onChange={handleChange("sgstPostingOut")}
          />
          <FormInput
            label="SGST Posting A/C (Input)"
            required
            placeholder="SGST Posting A/C (Input)"
            value={formData.sgstPostingIn}
            onChange={handleChange("sgstPostingIn")}
          />
        </div>

        {/* Remarks */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Remarks
          </label>
          <input
            type="text"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange("remarks")}
            className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

/* ================= GST DETAILS VIEW ================= */
const GstDetailsView = ({ gst, onBack }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1e1b6b] mb-5 transition"
    >
      <span className="text-lg leading-none">←</span>
      <span>Back</span>
    </button>

    <h1 className="text-2xl font-bold text-gray-900 mb-6">
      GST Master Details
    </h1>

    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        General Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
        <DetailRow label="State" value={gst.state} />
        <DetailRow label="State Code" value={gst.stateCode} />
        <DetailRow label="GST Rate Category" value={gst.gstRateCategory} />
        <DetailRow label="GST Rate(%)" value={gst.gstRate} />
        <DetailRow label="GST Name" value={gst.gstName} />
        <DetailRow label="Description" value={gst.description || "-"} />
        <DetailRow label="W.E.F.Date" value={gst.wefDate} />
        <DetailRow label="End Date" value={gst.endDate} />
        <DetailRow label="GST Category" value={gst.gstCategory} />
        <DetailRow label="SAC Code" value={gst.sacCode} />
        <DetailRow label="Type" value={gst.type} />
        <DetailRow label="IGST(%)" value={gst.igst} />
        <DetailRow label="CGST(%)" value={gst.cgst} />
        <DetailRow label="SGST(%)" value={gst.sgst} />
        <DetailRow label="Remarks" value={gst.remarks || "-"} />
        <DetailRow
          label="Status"
          value={
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                gst.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {gst.status ? "Active" : "Inactive"}
            </span>
          }
        />
      </div>

      {gst.lastEditReason && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Reason for last edit
          </p>
          <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
            {gst.lastEditReason}
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

export default GstMaster;