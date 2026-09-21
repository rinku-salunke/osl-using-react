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

import { toast } from "react-toastify";

const Places = () => {
  // ===== Page mode: "list" | "add" | "edit" | "view" =====
  const [mode, setMode] = useState("list");
  const [editingPlace, setEditingPlace] = useState(null);
  const [viewingPlace, setViewingPlace] = useState(null);

  // ===== Reason for Edit Modal state =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditPlace, setPendingEditPlace] = useState(null);

  // ===== Status Toggle Confirmation state =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    place: null,
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
    place: null,
  });

  // ===== Filters =====
  const [placeFilter, setPlaceFilter] = useState("");
  const [placeTypeFilter, setPlaceTypeFilter] = useState("");
  const [status, setStatus] = useState("");

  // ===== Search =====
  const [search, setSearch] = useState("");

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // ===== Column Visibility =====
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    placeName: true,
    placeTypeName: true,
    pincode: true,
    state: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "placeName", label: "Place Name" },
    { key: "placeTypeName", label: "Place Type" },
    { key: "pincode", label: "Pincode" },
    { key: "state", label: "State" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [places, setPlaces] = useState([
    {
      id: 1,
      srNo: 1,
      placeName: "Hinjewadi",
      placeTypeName: "Bonded Warehouses",
      pincode: "411057",
      state: "Maharashtra",
      district: "Pune",
      taluka: "Mulshi",
      officeName: "Hinjewadi Office",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      placeName: "Wakad",
      placeTypeName: "Container Freight Station",
      pincode: "411057",
      state: "Maharashtra",
      district: "Pune",
      taluka: "Mulshi",
      officeName: "Wakad Office",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      placeName: "Baner",
      placeTypeName: "Bonded Warehouses",
      pincode: "411045",
      state: "Maharashtra",
      district: "Pune",
      taluka: "Haveli",
      officeName: "Baner Office",
      status: false,
    },
    {
      id: 4,
      srNo: 4,
      placeName: "Kharadi",
      placeTypeName: "Port",
      pincode: "411014",
      state: "Maharashtra",
      district: "Pune",
      taluka: "Haveli",
      officeName: "Kharadi Office",
      status: true,
    },
  ]);

  // ===== Toggle Status — opens confirmation dialog (SAME AS VehicleType) =====
  const toggleStatus = (place) => {
    setStatusConfirm({
      isOpen: true,
      place,
      action: place.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { place, action } = statusConfirm;
    if (!place) return;

    setPlaces((prev) =>
      prev.map((p) => (p.id === place.id ? { ...p, status: !p.status } : p))
    );

    setStatusConfirm({ isOpen: false, place: null, action: "" });
    setSuccessPopup({
      isOpen: true,
      title: action === "deactivate" ? "Deactivated" : "Activated",
      message: `Record ${
        action === "deactivate" ? "Deactivated" : "Activated"
      } Successfully!`,
    });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, place: null, action: "" });
  };

  // ===== Edit Flow — Step 1: Click edit → open Reason modal =====
  const handleEdit = (place) => {
    setPendingEditPlace(place);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  // ===== Edit Flow — Step 2: Continue → open Edit Form =====
  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingPlace(pendingEditPlace);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditPlace(null);
  };

  // ===== View =====
  const handleView = (place) => {
    setViewingPlace(place);
    setMode("view");
  };

  // ===== Delete — opens confirmation dialog =====
  const handleDelete = (id) => {
    const placeToDelete = places.find((p) => p.id === id);
    if (!placeToDelete) return;
    setDeleteConfirm({ isOpen: true, place: placeToDelete });
  };

  const confirmDelete = () => {
    const place = deleteConfirm.place;
    if (!place) return;
    setPlaces((prev) => prev.filter((p) => p.id !== place.id));
    setDeleteConfirm({ isOpen: false, place: null });
    toast.success("Place deleted!");
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, place: null });
  };

  // ===== FILTERED DATA =====
  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchPlace = placeFilter
        ? p.placeName.toLowerCase().includes(placeFilter.toLowerCase())
        : true;
      const matchType = placeTypeFilter
        ? p.placeTypeName
            .toLowerCase()
            .includes(placeTypeFilter.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? p.status === true
          : p.status === false;
      const matchSearch = p.placeName
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchPlace && matchType && matchStatus && matchSearch;
    });
  }, [places, placeFilter, placeTypeFilter, status, search]);

  // ===== Cards Data =====
  const statsData = useMemo(() => {
    const total = places.length;
    const active = places.filter((p) => p.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Places",
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
        label: "Active Places",
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
        label: "InActive Places",
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
  }, [places]);

  // ===== Pagination =====
  const totalEntries = filteredPlaces.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedPlaces = filteredPlaces.slice(
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
      label: "Third Party Places",
      value: placeFilter,
      onChange: (v) => {
        setPlaceFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Place", value: "" },
        { label: "Hinjewadi", value: "hinjewadi" },
        { label: "Wakad", value: "wakad" },
        { label: "Baner", value: "baner" },
        { label: "Kharadi", value: "kharadi" },
      ],
    },
    {
      label: "Place Type",
      value: placeTypeFilter,
      onChange: (v) => {
        setPlaceTypeFilter(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Place Type", value: "" },
        { label: "Bonded Warehouses", value: "bonded warehouses" },
        { label: "Container Freight Station", value: "container freight station" },
        { label: "Port", value: "port" },
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
    setEditingPlace(null);
    setMode("add");
  };

  // ===== Save (Add or Update) =====
  const handleSavePlace = (formData) => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      if (editingPlace) {
        // UPDATE
        setPlaces((prev) =>
          prev.map((p) =>
            p.id === editingPlace.id
              ? {
                  ...p,
                  ...formData,
                  lastEditReason: editReason.trim(),
                }
              : p
          )
        );
        setSuccessPopup({
          isOpen: true,
          title: "Places Details Updated Successfully",
          message: "",
        });
      } else {
        // ADD
        const nextId =
          places.length > 0 ? Math.max(...places.map((p) => p.id)) + 1 : 1;
        setPlaces((prev) => [
          ...prev,
          {
            id: nextId,
            srNo: prev.length + 1,
            ...formData,
            status: true,
          },
        ]);
        setSuccessPopup({
          isOpen: true,
          title: "Places Details Added Successfully",
          message: "",
        });
      }

      setEditingPlace(null);
      setEditReason("");
      setPendingEditPlace(null);
      setMode("list");
    }, 1200);
  };

  const handleCancelForm = () => {
    setEditingPlace(null);
    setEditReason("");
    setPendingEditPlace(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingPlace(null);
    setMode("list");
  };

  // ================= EDIT / ADD FORM VIEW =================
  if (mode === "edit" || mode === "add") {
    return (
      <AddPlacesForm
        initialData={editingPlace}
        isEdit={Boolean(editingPlace)}
        onSave={handleSavePlace}
        onCancel={handleCancelForm}
      />
    );
  }

  // ================= VIEW DETAILS =================
  if (mode === "view" && viewingPlace) {
    return (
      <PlaceDetailsView place={viewingPlace} onBack={handleBackFromView} />
    );
  }

  // ================= LIST VIEW =================
  return (
    <>
      <MasterData
        title="Third Party Places"
        onAdd={handleAdd}
        addButtonLabel="Add Third Party Places"
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
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[100px]">
                    <div className="flex items-center gap-1">
                      <SortIcon />
                      <span>Sr No.</span>
                    </div>
                  </th>
                )}
                {visibleColumns.placeName && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Place Name</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.placeTypeName && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Place Type</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.pincode && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Pincode</span>
                      <SortIcon />
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
              {paginatedPlaces.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-gray-400 py-6 border-b border-gray-200"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedPlaces.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {visibleColumns.srNo && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {p.srNo}
                      </td>
                    )}
                    {visibleColumns.placeName && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-800 font-medium">
                        {p.placeName}
                      </td>
                    )}
                    {visibleColumns.placeTypeName && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {p.placeTypeName}
                      </td>
                    )}
                    {visibleColumns.pincode && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {p.pincode}
                      </td>
                    )}
                    {visibleColumns.state && (
                      <td className="px-2 py-3 border-b border-r border-gray-200 text-gray-700">
                        {p.state}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-2 py-3 border-b border-r border-gray-200">
                        <ToggleSwitch
                          checked={p.status}
                          onChange={() => toggleStatus(p)}
                        />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-2 py-3 border-b border-gray-200">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleView(p)}
                            className="w-7 h-7 border border-gray-400 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-50 transition"
                            title="View"
                          >
                            <GrView size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(p)}
                            className="w-7 h-7 border border-blue-500 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition"
                            title="Edit"
                          >
                            <MdOutlineModeEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
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
              <b>{deleteConfirm.place?.placeName}</b>?
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

/* ================= ADD / EDIT FORM COMPONENT (matches screenshot) ================= */
const AddPlacesForm = ({ initialData = null, isEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    placeName: initialData?.placeName || "",
    placeTypeName: initialData?.placeTypeName || "",
    pincode: initialData?.pincode || "",
    state: initialData?.state || "",
    district: initialData?.district || "",
    taluka: initialData?.taluka || "",
    officeName: initialData?.officeName || "",
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

    if (!formData.placeName.trim()) return setError("Place Name is required.");
    if (!formData.placeTypeName.trim())
      return setError("Place Type is required.");
    if (!formData.pincode.trim()) return setError("Pincode is required.");
    if (!formData.state.trim()) return setError("State is required.");
    if (!formData.district.trim()) return setError("District is required.");
    if (!formData.taluka.trim()) return setError("Taluka is required.");

    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="flex items-center justify-between mb-4 border-b text-2xl font-bold text-gray-900 border-gray-200 -mx-6 px-6 pb-5">
        {isEdit ? "Update Places" : "Add Places"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <FormInput
            label="Place Name"
            required
            placeholder="Place Name"
            value={formData.placeName}
            onChange={handleChange("placeName")}
          />
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Place Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.placeTypeName}
              onChange={handleChange("placeTypeName")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select place type</option>
              <option value="Bonded Warehouses">Bonded Warehouses</option>
              <option value="Container Freight Station">
                Container Freight Station
              </option>
              <option value="Port">Port</option>
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
            required
            placeholder="State"
            value={formData.state}
            onChange={handleChange("state")}
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <FormInput
            label="District"
            required
            placeholder="District"
            value={formData.district}
            onChange={handleChange("district")}
          />
          <FormInput
            label="Taluka"
            required
            placeholder="Taluka"
            value={formData.taluka}
            onChange={handleChange("taluka")}
          />
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Office Name
            </label>
            <select
              value={formData.officeName}
              onChange={handleChange("officeName")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Office Name</option>
              <option value="Hinjewadi Office">Hinjewadi Office</option>
              <option value="Wakad Office">Wakad Office</option>
              <option value="Baner Office">Baner Office</option>
              <option value="Kharadi Office">Kharadi Office</option>
            </select>
          </div>
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

/* ================= PLACE DETAILS VIEW ================= */
const PlaceDetailsView = ({ place, onBack }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1e1b6b] mb-5 transition"
    >
      <span className="text-lg leading-none">←</span>
      <span>Back</span>
    </button>

    <h1 className="text-2xl font-bold text-gray-900 mb-6">Places Details</h1>

    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        General Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
        <DetailRow label="Place Name" value={place.placeName} />
        <DetailRow label="Place Type" value={place.placeTypeName} />
        <DetailRow label="Pincode" value={place.pincode} />
        <DetailRow label="State" value={place.state} />
        <DetailRow label="District" value={place.district} />
        <DetailRow label="Taluka" value={place.taluka} />
        <DetailRow label="Office Name" value={place.officeName || "-"} />
        <DetailRow
          label="Status"
          value={
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                place.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {place.status ? "Active" : "Inactive"}
            </span>
          }
        />
      </div>

      {place.lastEditReason && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Reason for last edit
          </p>
          <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
            {place.lastEditReason}
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

export default Places;