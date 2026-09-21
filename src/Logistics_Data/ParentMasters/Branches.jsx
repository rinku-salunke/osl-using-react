import React, { useState, useMemo, useEffect } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock, FaListCheck } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { FaBoxes } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { TfiWrite } from "react-icons/tfi";
import { GrView } from "react-icons/gr";
import { FaPlus, FaTrashAlt, FaKey, FaLayerGroup } from "react-icons/fa";

import { toast } from "react-toastify";

const Branches = () => {
  // ===== Page mode =====
  const [mode, setMode] = useState("list");
  const [editingBranch, setEditingBranch] = useState(null);
  const [viewingBranch, setViewingBranch] = useState(null);

  // ===== Reason for Edit Modal =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditBranch, setPendingEditBranch] = useState(null);

  // ===== Status Confirm =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    branch: null,
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
    branch: null,
  });

  // ===== Filters =====
  const [branchTypeFilter, setBranchTypeFilter] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // ===== Columns =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    code: true,
    type: true,
    abbreviation: true,
    name: true,
    state: true,
    pincode: true,
    status: true,
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

  // ===== Table Data =====
  const [branches, setBranches] = useState([
    { id: 1, srNo: 1, code: "WZ-MH-MUM-002", type: "West Zone", abbreviation: "MUM", name: "MUMBAI", state: "MAHARASHTRA", pincode: "400008", status: true },
    { id: 2, srNo: 2, code: "SZ-KA-BEN-003", type: "South Zone", abbreviation: "BLR", name: "Bangalore", state: "KARNATAKA", pincode: "560099", status: true },
    { id: 3, srNo: 3, code: "WZ-MH-PUN-004", type: "West Zone", abbreviation: "RAN", name: "Ranjangaon", state: "MAHARASHTRA", pincode: "412209", status: true },
    { id: 4, srNo: 4, code: "HO-MP-IND-005", type: "Head Office", abbreviation: "IND", name: "INDORE", state: "MADHYA PRADESH", pincode: "452001", status: true },
    { id: 5, srNo: 5, code: "NZ-HR-GUR-006", type: "North Zone", abbreviation: "GUR", name: "Gurgaon", state: "HARYANA", pincode: "122503", status: true },
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (branch) => {
    setStatusConfirm({
      isOpen: true,
      branch,
      action: branch.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { branch, action } = statusConfirm;
    if (!branch) return;
    setBranches((prev) =>
      prev.map((b) => (b.id === branch.id ? { ...b, status: !b.status } : b))
    );
    setStatusConfirm({ isOpen: false, branch: null, action: "" });
    setSuccessPopup({
      isOpen: true,
      title: action === "deactivate" ? "Deactivated" : "Activated",
      message: `Record ${action === "deactivate" ? "Deactivated" : "Activated"} Successfully!`,
    });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, branch: null, action: "" });
  };

  // ===== Edit =====
  const handleEdit = (branch) => {
    setPendingEditBranch(branch);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingBranch(pendingEditBranch);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditBranch(null);
  };

  // ===== View =====
  const handleView = (branch) => {
    setViewingBranch(branch);
    setMode("view");
  };

  // ===== Delete =====
  const handleDelete = (id) => {
    const b = branches.find((x) => x.id === id);
    if (!b) return;
    setDeleteConfirm({ isOpen: true, branch: b });
  };

  const confirmDelete = () => {
    const b = deleteConfirm.branch;
    if (!b) return;
    setBranches((prev) => prev.filter((x) => x.id !== b.id));
    setDeleteConfirm({ isOpen: false, branch: null });
    toast.success("Branch deleted!");
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, branch: null });
  };

  // ===== FILTERED =====
  const filteredBranches = useMemo(() => {
    return branches.filter((b) => {
      const matchType = branchTypeFilter ? b.type === branchTypeFilter : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? b.status === true
          : b.status === false;
      const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
      return matchType && matchStatus && matchSearch;
    });
  }, [branches, branchTypeFilter, status, search]);

  // ===== Stats =====
  const statsData = useMemo(() => {
    const total = branches.length;
    const active = branches.filter((b) => b.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Branches",
        value: total,
        icon: <div className="w-6 h-6 text-blue-600"><FaBoxes size={20} /></div>,
        iconBg: "bg-blue-100",
        footer: "5% from last week",
        footerIcon: <IoIosArrowRoundUp size={18} />,
        footerColor: "text-green-600",
      },
      {
        label: "Active Units",
        value: active,
        icon: <div className="w-6 h-6 text-orange-500"><FaListCheck size={20} /></div>,
        iconBg: "bg-orange-100",
        footer: "Recent additions",
        footerIcon: <FaClock size={15} />,
        footerColor: "text-red-600",
      },
      {
        label: "InActive Units",
        value: inactive,
        icon: <div className="w-6 h-6 text-green-600"><HiOutlineOfficeBuilding size={20} /></div>,
        iconBg: "bg-green-100",
        footer: "Currently away",
        footerIcon: <TfiWrite size={14} />,
        footerColor: "text-blue-600",
      },
    ];
  }, [branches]);

  // ===== Pagination =====
  const totalEntries = filteredBranches.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedBranches = filteredBranches.slice(startIdx, startIdx + entriesPerPage);

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
      value: branchTypeFilter,
      onChange: (v) => {
        setBranchTypeFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Branch Type", value: "" },
        { label: "West Zone", value: "West Zone" },
        { label: "South Zone", value: "South Zone" },
        { label: "North Zone", value: "North Zone" },
        { label: "Head Office", value: "Head Office" },
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

  // ===== Add =====
  const handleAdd = () => {
    setEditingBranch(null);
    setMode("add");
  };

  // ===== Save =====
  const handleSaveBranch = (formData) => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      if (editingBranch) {
        setBranches((prev) =>
          prev.map((b) =>
            b.id === editingBranch.id
              ? { ...b, ...formData, lastEditReason: editReason.trim() }
              : b
          )
        );
        setSuccessPopup({
          isOpen: true,
          title: "Branch Details Updated Successfully",
          message: "",
        });
      } else {
        const nextId =
          branches.length > 0 ? Math.max(...branches.map((b) => b.id)) + 1 : 1;
        setBranches((prev) => [
          ...prev,
          {
            id: nextId,
            srNo: prev.length + 1,
            code: formData.branchCode || "",
            type: formData.branchType || "",
            abbreviation: formData.abbreviation || "",
            name: formData.branchName || "",
            state: formData.state || "",
            pincode: formData.pincode || "",
            status: true,
            ...formData,
          },
        ]);
        setSuccessPopup({
          isOpen: true,
          title: "Branch Details Added Successfully",
          message: "",
        });
      }

      setEditingBranch(null);
      setEditReason("");
      setPendingEditBranch(null);
      setMode("list");
    }, 1200);
  };

  const handleCancelForm = () => {
    setEditingBranch(null);
    setEditReason("");
    setPendingEditBranch(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingBranch(null);
    setMode("list");
  };

  // ============ FORM VIEW ============
  if (mode === "edit" || mode === "add") {
    return (
      <AddBranchForm
        initialData={editingBranch}
        isEdit={Boolean(editingBranch)}
        onSave={handleSaveBranch}
        onCancel={handleCancelForm}
      />
    );
  }

  // ============ VIEW ============
  if (mode === "view" && viewingBranch) {
    return <BranchDetailsView branch={viewingBranch} onBack={handleBackFromView} />;
  }

  // ============ LIST VIEW ============
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <>
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
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[60px]">
                    <div className="flex items-center gap-1"><SortIcon /><span>Sr No.</span></div>
                  </th>
                )}
                {visibleColumns.code && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between"><span>Code</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.type && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[150px]">
                    <div className="flex items-center justify-between"><span>Type</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.abbreviation && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[120px]">
                    <div className="flex items-center justify-between"><span>Abbreviations</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.name && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between"><span>Name</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.state && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between"><span>State</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.pincode && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[100px]">
                    <div className="flex items-center justify-between"><span>Pincode</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[80px]">
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
              {paginatedBranches.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumnCount} className="text-center text-gray-400 py-6 border-b border-gray-200">
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedBranches.map((b, idx) => (
                  <tr key={b.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {visibleColumns.srNo && <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">{b.srNo}</td>}
                    {visibleColumns.code && <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-800 font-medium truncate">{b.code}</td>}
                    {visibleColumns.type && <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">{b.type}</td>}
                    {visibleColumns.abbreviation && <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">{b.abbreviation}</td>}
                    {visibleColumns.name && <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-800 font-medium">{b.name}</td>}
                    {visibleColumns.state && <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">{b.state}</td>}
                    {visibleColumns.pincode && <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">{b.pincode}</td>}
                    {visibleColumns.status && (
                      <td className="px-2 py-2 border-b border-r border-gray-200">
                        <ToggleSwitch checked={b.status} onChange={() => toggleStatus(b)} />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-2 py-2 border-b border-gray-200">
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(b)} className="w-7 h-7 flex items-center justify-center text-blue-600 hover:text-blue-800 transition" title="Edit">
                            <MdOutlineModeEdit size={18} />
                          </button>
                          <button onClick={() => handleDelete(b.id)} className="w-7 h-7 flex items-center justify-center text-red-500 hover:text-red-700 transition" title="Delete">
                            <RiDeleteBin6Line size={18} />
                          </button>
                          <button onClick={() => handleView(b)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-800 transition" title="View">
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
              Are you sure you want to delete <b>{deleteConfirm.branch?.name}</b>?
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
            <p className="text-sm text-gray-600 text-center mb-6">Enter reason for editing</p>
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

/* ================= ADD / EDIT FORM (3 STAGES) ================= */
const AddBranchForm = ({ initialData = null, isEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    branchType: initialData?.branchType || "",
    pincode: initialData?.pincode || "",
    state: initialData?.state || "",
    district: initialData?.district || "",
    taluka: initialData?.taluka || "",
    branchCode: initialData?.branchCode || "",
    branchName: initialData?.branchName || "",
    abbreviation: initialData?.abbreviation || "",
    gstNumber: initialData?.gstNumber || "",
    pincodeOfficeName: initialData?.pincodeOfficeName || "",
    fullAddress: initialData?.fullAddress || "",
    primaryContact: initialData?.primaryContact || "",
    secondaryContact: initialData?.secondaryContact || "",
    email: initialData?.email || "",
    secondaryEmail: initialData?.secondaryEmail || "",
  });

  const [hangars, setHangars] = useState([
    {
      id: 1,
      name: "",
      workflowPurpose: "",
      length: "",
      width: "",
      height: "",
      cctvIn: "",
      cctvOut: "",
      fireExt: "",
      fireExit: "",
      floors: [{ id: 1, level: "Level 0", height: "" }],
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

  const updateHangar = (id, field, value) =>
    setHangars((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    );

  const addHangar = () =>
    setHangars((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        workflowPurpose: "",
        length: "",
        width: "",
        height: "",
        cctvIn: "",
        cctvOut: "",
        fireExt: "",
        fireExit: "",
        floors: [{ id: 1, level: "Level 0", height: "" }],
      },
    ]);

  const removeHangar = (id) => {
    if (hangars.length === 1) return;
    setHangars((prev) => prev.filter((h) => h.id !== id));
  };

  const addFloor = (hangarId) =>
    setHangars((prev) =>
      prev.map((h) =>
        h.id === hangarId
          ? {
              ...h,
              floors: [
                ...h.floors,
                { id: Date.now(), level: `Level ${h.floors.length}`, height: "" },
              ],
            }
          : h
      )
    );

  const updateFloor = (hangarId, floorId, field, value) =>
    setHangars((prev) =>
      prev.map((h) =>
        h.id === hangarId
          ? {
              ...h,
              floors: h.floors.map((f) =>
                f.id === floorId ? { ...f, [field]: value } : f
              ),
            }
          : h
      )
    );

  const removeFloor = (hangarId, floorId) =>
    setHangars((prev) =>
      prev.map((h) =>
        h.id === hangarId
          ? { ...h, floors: h.floors.filter((f) => f.id !== floorId) }
          : h
      )
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.branchType) return setError("Branch Type is required.");
    if (!formData.pincode.trim()) return setError("Pincode is required.");
    if (!formData.branchCode.trim())
      return setError("Branch/Warehouse Code is required.");
    if (!formData.branchName.trim())
      return setError("Branch/Warehouse Name is required.");
    if (!formData.gstNumber.trim()) return setError("GST Number is required.");
    if (!formData.fullAddress.trim())
      return setError("Full Address is required.");
    if (!formData.primaryContact.trim())
      return setError("Primary Contact Number is required.");
    if (!formData.email.trim()) return setError("Email is required.");

    onSave({ ...formData, hangars });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== STICKY HEADER ===== */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Update Branch" : "Add Branch"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-medium px-6 py-2 rounded-md transition"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-medium px-6 py-2 rounded-md transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* ===== FORM CONTENT ===== */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          {/* ===== STAGE 1 ===== */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#1e1b6b] text-white flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <h2 className="text-lg font-bold text-gray-900">
                STAGE 1: Primary Warehouse Identity
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Branch Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.branchType}
                    onChange={handleChange("branchType")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Branch Type</option>
                    <option value="West Zone">West Zone</option>
                    <option value="South Zone">South Zone</option>
                    <option value="North Zone">North Zone</option>
                    <option value="East Zone">East Zone</option>
                    <option value="Head Office">Head Office</option>
                  </select>
                </div>
                <FormInput
                  label="Pincode"
                  required
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange("pincode")}
                />
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
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                <FormInput
                  label="Taluka"
                  placeholder="Taluka"
                  value={formData.taluka}
                  onChange={handleChange("taluka")}
                />
                <FormInput
                  label="Branch/Warehouse Code"
                  required
                  placeholder="Branch/Warehouse Code"
                  value={formData.branchCode}
                  onChange={handleChange("branchCode")}
                />
                <FormInput
                  label="Branch/Warehouse Name"
                  required
                  placeholder="Branch/Warehouse Name"
                  value={formData.branchName}
                  onChange={handleChange("branchName")}
                />
                <FormInput
                  label="Abbreviation"
                  placeholder="Name Abbreviation"
                  value={formData.abbreviation}
                  onChange={handleChange("abbreviation")}
                />
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <FormInput
                  label="GST Number"
                  required
                  placeholder="GST Number"
                  value={formData.gstNumber}
                  onChange={handleChange("gstNumber")}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Pincode Office Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.pincodeOfficeName}
                    onChange={handleChange("pincodeOfficeName")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Office</option>
                    <option value="Main Office">Main Office</option>
                    <option value="Branch Office">Branch Office</option>
                  </select>
                </div>
                <FormInput
                  label="Full Address"
                  required
                  placeholder=""
                  value={formData.fullAddress}
                  onChange={handleChange("fullAddress")}
                />
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
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
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  label="Email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange("email")}
                />
                <FormInput
                  label="Secondary Email"
                  placeholder="Secondary Email"
                  value={formData.secondaryEmail}
                  onChange={handleChange("secondaryEmail")}
                />
              </div>
            </div>
          </div>

          {/* ===== STAGE 2 ===== */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#1e1b6b] text-white flex items-center justify-center text-sm font-semibold">
                  2
                </span>
                <h2 className="text-lg font-bold text-gray-900">
                  STAGE 2: Structural Configuration
                </h2>
              </div>
              <button
                type="button"
                onClick={addHangar}
                className="bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-medium px-4 py-2 rounded-md transition flex items-center gap-2"
              >
                <FaPlus size={14} /> Add Hangar
              </button>
            </div>

            {hangars.map((hangar) => (
              <div
                key={hangar.id}
                className="bg-white border border-gray-200 rounded-lg p-6 mb-4"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1e1b6b] mb-2">
                      Warehouse/Hangar Name
                    </label>
                    <input
                      type="text"
                      placeholder="E.g. Main Hangar"
                      value={hangar.name}
                      onChange={(e) => updateHangar(hangar.id, "name", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e1b6b] mb-2">
                      Workflow Purpose
                    </label>
                    <select
                      value={hangar.workflowPurpose}
                      onChange={(e) => updateHangar(hangar.id, "workflowPurpose", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Storage (In/Out)</option>
                      <option value="Storage">Storage</option>
                      <option value="Inbound">Inbound</option>
                      <option value="Outbound">Outbound</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e1b6b] mb-2">
                      Dimensions (ft)
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-gray-600">Len</span>
                        <input
                          type="text"
                          value={hangar.length}
                          onChange={(e) => updateHangar(hangar.id, "length", e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-gray-600">Wid</span>
                        <input
                          type="text"
                          value={hangar.width}
                          onChange={(e) => updateHangar(hangar.id, "width", e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-gray-600">Hgt</span>
                        <input
                          type="text"
                          value={hangar.height}
                          onChange={(e) => updateHangar(hangar.id, "height", e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: CCTV + Fire */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1e1b6b] mb-2">
                      CCTV Count
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1.5 flex-1">
                        <span className="text-xs">📹 In</span>
                        <input
                          type="text"
                          value={hangar.cctvIn}
                          onChange={(e) => updateHangar(hangar.id, "cctvIn", e.target.value)}
                          className="w-full outline-none text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1.5 flex-1">
                        <span className="text-xs">📹 Out</span>
                        <input
                          type="text"
                          value={hangar.cctvOut}
                          onChange={(e) => updateHangar(hangar.id, "cctvOut", e.target.value)}
                          className="w-full outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e1b6b] mb-2">
                      Fire Safety
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1.5 flex-1">
                        <span className="text-xs">🔥 Ext</span>
                        <input
                          type="text"
                          value={hangar.fireExt}
                          onChange={(e) => updateHangar(hangar.id, "fireExt", e.target.value)}
                          className="w-full outline-none text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1.5 flex-1">
                        <span className="text-xs">🚪 Exit</span>
                        <input
                          type="text"
                          value={hangar.fireExit}
                          onChange={(e) => updateHangar(hangar.id, "fireExit", e.target.value)}
                          className="w-full outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mb-5">
                  <button
                    type="button"
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1"
                  >
                    <FaKey size={12} /> Access Point
                  </button>
                  <button
                    type="button"
                    onClick={() => addFloor(hangar.id)}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1"
                  >
                    <FaLayerGroup size={12} /> Add Floor
                  </button>
                  <button
                    type="button"
                    onClick={() => removeHangar(hangar.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1"
                  >
                    <FaTrashAlt size={12} /> Remove Hangar
                  </button>
                </div>

                {/* Floors */}
                {hangar.floors.map((floor) => (
                  <div
                    key={floor.id}
                    className="border border-gray-200 rounded-md p-3 mb-2 flex items-center gap-3"
                  >
                    <span className="bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded">
                      FLOOR
                    </span>
                    <input
                      type="text"
                      value={floor.level}
                      onChange={(e) => updateFloor(hangar.id, floor.id, "level", e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1.5 text-sm flex-1"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-xs">Hgt(ft)</span>
                      <input
                        type="text"
                        value={floor.height}
                        onChange={(e) => updateFloor(hangar.id, floor.id, "height", e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-20"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-white border border-green-500 text-green-600 text-xs font-medium px-3 py-1.5 rounded-md"
                    >
                      Add Zone Area
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFloor(hangar.id, floor.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ===== STAGE 3 ===== */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#1e1b6b] text-white flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <h2 className="text-lg font-bold text-gray-900">
                STAGE 3: Virtual Spatial Map
              </h2>
            </div>

            <div className="bg-[#e5dede] border-2 border-gray-800 rounded-md p-6 min-h-[300px]">
              <div className="bg-white border border-gray-300 shadow-md w-32 p-4 text-center">
                <div className="bg-black text-white text-sm font-bold py-2 px-3 mb-2">
                  HANGAR
                </div>
                <div className="border-t-2 border-dashed border-gray-800 mt-6"></div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 max-w-md text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          {/* ===== Bottom Buttons ===== */}
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

/* ================= BRANCH DETAILS VIEW ================= */
const BranchDetailsView = ({ branch, onBack }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1e1b6b] mb-5 transition"
    >
      <span className="text-lg leading-none">←</span>
      <span>Back</span>
    </button>

    <h1 className="text-2xl font-bold text-gray-900 mb-6">Branch Details</h1>

    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">General Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
        <DetailRow label="Code" value={branch.code} />
        <DetailRow label="Type" value={branch.type} />
        <DetailRow label="Abbreviation" value={branch.abbreviation} />
        <DetailRow label="Name" value={branch.name} />
        <DetailRow label="State" value={branch.state} />
        <DetailRow label="Pincode" value={branch.pincode} />
        <DetailRow label="District" value={branch.district || "-"} />
        <DetailRow label="Taluka" value={branch.taluka || "-"} />
        <DetailRow label="GST Number" value={branch.gstNumber || "-"} />
        <DetailRow label="Full Address" value={branch.fullAddress || "-"} />
        <DetailRow label="Primary Contact" value={branch.primaryContact || "-"} />
        <DetailRow label="Secondary Contact" value={branch.secondaryContact || "-"} />
        <DetailRow label="Email" value={branch.email || "-"} />
        <DetailRow label="Secondary Email" value={branch.secondaryEmail || "-"} />
        <DetailRow
          label="Status"
          value={
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${branch.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {branch.status ? "Active" : "Inactive"}
            </span>
          }
        />
      </div>

      {branch.lastEditReason && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Reason for last edit</p>
          <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
            {branch.lastEditReason}
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

export default Branches;