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

const Articles = () => {
  // ===== Page mode: "list" | "edit" | "view" =====
  const [mode, setMode] = useState("list");
  const [editingArticle, setEditingArticle] = useState(null);
  const [viewingArticle, setViewingArticle] = useState(null);

  // ===== Reason for Edit Modal state =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditArticle, setPendingEditArticle] = useState(null);

  // ===== Status Toggle Confirmation state =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    article: null,
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
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "name", label: "Article Name" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [articles, setArticles] = useState([
    { id: 1, srNo: 1, name: "Abc", type: "blog", status: true },
    { id: 2, srNo: 2, name: "Abc Bcd S", type: "news", status: true },
    { id: 3, srNo: 3, name: "Abcc", type: "tutorial", status: false },
    { id: 4, srNo: 4, name: "Bin", type: "blog", status: true },
    { id: 5, srNo: 5, name: "Bin B", type: "news", status: false },
    { id: 6, srNo: 6, name: "Bin Pallet S", type: "tutorial", status: true },
    { id: 7, srNo: 7, name: "Box", type: "blog", status: true },
    { id: 8, srNo: 8, name: "Box AAd", type: "news", status: true },
    { id: 9, srNo: 9, name: "Cart A", type: "tutorial", status: true },
    { id: 10, srNo: 10, name: "Cart B", type: "blog", status: false },
    { id: 11, srNo: 11, name: "Drum X", type: "news", status: true },
    { id: 12, srNo: 12, name: "Drum Y", type: "tutorial", status: true },
  ]);

  // ===== Toggle Status — opens confirmation dialog =====
  const toggleStatus = (article) => {
    setStatusConfirm({
      isOpen: true,
      article,
      action: article.status ? "deactivate" : "activate",
    });
  };

  // Confirm the status change
  const confirmStatusChange = () => {
    const { article, action } = statusConfirm;
    if (!article) return;

    setArticles((prev) =>
      prev.map((a) =>
        a.id === article.id ? { ...a, status: !a.status } : a
      )
    );

    setStatusConfirm({ isOpen: false, article: null, action: "" });
    setSuccessPopup({ isOpen: true, action });
  };

  // Cancel status change
  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, article: null, action: "" });
  };

  // ===== Edit Flow — Step 1: Click edit → open Reason modal =====
  const handleEdit = (article) => {
    setPendingEditArticle(article);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  // ===== Edit Flow — Step 2: Continue → open Edit Form =====
  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingArticle(pendingEditArticle);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  // ===== Edit Flow — Cancel modal =====
  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditArticle(null);
  };

  // ===== View =====
  const handleView = (article) => {
    setViewingArticle(article);
    setMode("view");
  };

  // ===== Delete with Toastify =====
  const handleDelete = (id) => {
    const articleToDelete = articles.find((a) => a.id === id);
    if (!articleToDelete) return;

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
            Delete <b>{articleToDelete.name}</b>?
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
                setArticles((prev) => prev.filter((a) => a.id !== id));
                toast.success("Article deleted!");
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
        toastId: `delete-${id}`,
        style: { width: "340px", padding: "16px" },
      }
    );
  };

  // ===== Add New =====
  const handleAddNew = () => {
    setEditingArticle(null);
    setMode("edit");
  };

  // ===== Save (Add or Update) =====
  const handleSaveArticle = (name) => {
    if (!name.trim()) {
      toast.error("Please enter article name");
      return;
    }

    if (editingArticle) {
      setArticles((prev) =>
        prev.map((a) =>
          a.id === editingArticle.id
            ? {
                ...a,
                name: name.trim(),
                lastEditReason: editReason.trim(),
                lastEditedAt: new Date().toISOString(),
              }
            : a
        )
      );
      toast.success("Article updated!");
    } else {
      const nextId =
        articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;
      setArticles((prev) => [
        ...prev,
        {
          id: nextId,
          srNo: prev.length + 1,
          name: name.trim(),
          type: "blog",
          status: true,
          createdAt: new Date().toISOString(),
        },
      ]);
      toast.success("Article added successfully!");
    }

    setEditingArticle(null);
    setEditReason("");
    setPendingEditArticle(null);
    setMode("list");
  };

  const handleCancelForm = () => {
    setEditingArticle(null);
    setEditReason("");
    setPendingEditArticle(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingArticle(null);
    setMode("list");
  };

  // ===== FILTERED DATA =====
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchType = articleType ? a.type === articleType : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? a.status === true
          : a.status === false;
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
      return matchType && matchStatus && matchSearch;
    });
  }, [articles, articleType, status, search]);

  // ===== Cards =====
  const statsData = useMemo(() => {
    const total = articles.length;
    const active = articles.filter((a) => a.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Articles",
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
        label: "Active Articles",
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
        label: "InActive Articles",
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
  }, [articles]);

  // ===== Pagination =====
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

  // ===== Filters Data =====
  const filtersData = [
    {
      label: "Article Type",
      value: articleType,
      onChange: (v) => {
        setArticleType(v);
        setCurrentPage(1);
      },
      options: [
        { label: "Select Article Type", value: "" },
        { label: "Blog", value: "blog" },
        { label: "News", value: "news" },
        { label: "Tutorial", value: "tutorial" },
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
      <AddArticleForm
        initialName={editingArticle?.name || ""}
        isEdit={Boolean(editingArticle)}
        onSave={handleSaveArticle}
        onCancel={handleCancelForm}
      />
    );
  }

  // ================= VIEW DETAILS =================
  if (mode === "view" && viewingArticle) {
    return (
      <ArticleDetailsView
        article={viewingArticle}
        onBack={handleBackFromView}
      />
    );
  }

  // ================= LIST VIEW =================
  return (
    <>
      <MasterData
        title="Article"
        onAdd={handleAddNew}
        addButtonLabel="Add Article"
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
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[210px]">
                    <div className="flex items-center gap-1">
                      <SortIcon />
                      <span>Sr No.</span>
                    </div>
                  </th>
                )}
                {visibleColumns.name && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200">
                    <div className="flex items-center justify-between">
                      <span>Article Name</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="text-left font-medium px-2 py-2 border-b border-r border-gray-200 w-[210px]">
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                      <SortIcon />
                    </div>
                  </th>
                )}
                {visibleColumns.actions && (
                  <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-[210px]">
                    <span>Actions</span>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedArticles.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-gray-400 py-6 border-b border-gray-200"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedArticles.map((article, idx) => (
                  <tr
                    key={article.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {visibleColumns.srNo && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-700">
                        {article.srNo}
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td className="px-2 py-2 border-b border-r border-gray-200 text-gray-800 font-medium truncate">
                        {article.name}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-2 py-2 border-b border-r border-gray-200">
                        <ToggleSwitch
                          checked={article.status}
                          onChange={() => toggleStatus(article)}
                        />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-2 py-2 border-b border-gray-200">
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

            {/* ⭐ OK button काढला — 1.5s नंतर auto-close होईल */}
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
              Why are you editing this article?
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

/* ================= EDIT / ADD FORM COMPONENT ================= */
const AddArticleForm = ({ initialName = "", isEdit, onSave, onCancel }) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Article Name is required.");
      return;
    }

    onSave(name);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
              <h1 className="flex items-center justify-between mb-4 border-b text-2xl font-bold text-gray-900 border-gray-200 -mx-6 px-6 pb-5">
        {isEdit ? "Edit Article" : "Add Article"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6 w-265 "
      >
        <div className="mb-5 max-w-md">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Article Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Article Name"
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
            className="bg-[#1e1b6b] hover:bg-[#2a2690] text-white text-sm font-medium px-5 py-2 rounded-md transition"
          >
            {isEdit ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-[#1e1b6b] hover:bg-[#2a2690] text-white text-sm font-medium px-5 py-2 rounded-md transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

/* ================= ARTICLE DETAILS VIEW ================= */
const ArticleDetailsView = ({ article, onBack }) => {
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
        Article Details
      </h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
          <DetailRow label="Sr No." value={article.srNo} />
          <DetailRow label="Article Name" value={article.name} />
          <DetailRow
            label="Article Type"
            value={<span className="capitalize">{article.type || "-"}</span>}
          />
          <DetailRow
            label="Status"
            value={
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  article.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {article.status ? "Active" : "Inactive"}
              </span>
            }
          />
          {article.createdAt && (
            <DetailRow
              label="Created At"
              value={new Date(article.createdAt).toLocaleString()}
            />
          )}
          {article.lastEditedAt && (
            <DetailRow
              label="Last Edited At"
              value={new Date(article.lastEditedAt).toLocaleString()}
            />
          )}
        </div>

        {article.lastEditReason && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Reason for last edit
            </p>
            <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
              {article.lastEditReason}
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

/* SORT ICON */
const SortIcon = () => (
  <span className="inline-flex flex-col leading-none text-[10px] text-gray-400 select-none">
    <span className="leading-none">▲</span>
    <span className="leading-none -mt-[2px]">▼</span>
  </span>
);

/* TOGGLE SWITCH */
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

export default Articles;