import React, { useState, useRef, useEffect } from "react";

const MasterData = ({
  title = "Master Data",
  onAdd,
  addButtonLabel = "Add New",
  stats = [],
  filters = [],
  onReset,
  // ===== Pagination Props =====
  currentPage = 1,
  totalPages = 1,
  totalEntries = 0,
  entriesPerPage = 25,
  onPageChange,
  onEntriesPerPageChange,
  // ===== Column Visibility Props =====
  columns = [],
  visibleColumns = {},
  onToggleColumn,
  children,
}) => {
  const [showColumns, setShowColumns] = useState(false);
  const dropdownRef = useRef(null);

  // Normalize to arrays so .map/.length never crash
  const safeStats = Array.isArray(stats) ? stats : [];
  const safeFilters = Array.isArray(filters) ? filters : [];
  const safeColumns = Array.isArray(columns) ? columns : [];
  const safeVisibleColumns =
    visibleColumns && typeof visibleColumns === "object" ? visibleColumns : {};

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowColumns(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ================= 1. HEADER ================= */}
      <div className="flex items-center justify-between mb-1 border-b border-gray-200 -mx-6 px-6 pb-4 sticky top-0 bg-gray-50 z-10">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-[#1e1b6b] hover:bg-[#2a2690] text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {addButtonLabel}
          </button>
        )}
      </div>

      {/* ================= 2. STATS CARDS ================= */}
      {safeStats.length > 0 && (
        <div className="flex flex-wrap gap-4 my-6">
          {safeStats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-md border border-gray-200 px-4 py-3 flex justify-between items-center gap-3 w-60"
            >
              <div className="flex flex-col">
                <span className="text-[15px] text-gray-600">{stat.label}</span>
                <h4 className="m-0 text-[32px] leading-tight font-bold text-gray-900">
                  {stat.value}
                </h4>
                {stat.footer && (
                  <p
                    className={`text-[13px] flex items-center gap-1 ${
                      stat.footerColor || "text-gray-500"
                    }`}
                  >
                    {stat.footerIcon && (
                      <span className="text-[13px]">{stat.footerIcon}</span>
                    )}
                    {stat.footer}
                  </p>
                )}
              </div>

              <div
                className={`w-[52px] h-[52px] rounded-md flex items-center justify-center ${stat.iconBg}`}
              >
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= 3. FILTERS (FIXED - ONE LINE) ================= */}
      {safeFilters.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-nowrap items-end gap-3 overflow-x-auto pb-2">
            {safeFilters.map((filter, i) => (
              <div key={i} className="flex flex-col shrink-0">
                <label className="block text-[13px] font-semibold text-gray-800 mb-1.5 whitespace-nowrap">
                  {filter.label}
                </label>
                <div className="relative">
                  <select
                    value={filter.value ?? ""}
                    onChange={(e) => filter.onChange?.(e.target.value)}
                    className={`appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                      filter.width || "w-[180px]"
                    }`}
                  >
                    {(filter.options || []).map((opt, j) => (
                      <option key={j} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            ))}

            {/* ⭐ Reset Button */}
            <div className="flex flex-col justify-end shrink-0">
              <button
                onClick={
                  onReset || (() => safeFilters.forEach((f) => f.onChange?.("")))
                }
                className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition bg-white whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. TABLE SECTION ================= */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        {/* ===== Toolbar: Column Visibility dropdown ===== */}
        {safeColumns.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowColumns((s) => !s)}
                className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 text-sm rounded-md hover:bg-gray-50"
              >
                Column Visibility ▾
              </button>

              {showColumns && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[180px] py-1">
                  {safeColumns.map((col) => (
                    <label
                      key={col.key}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={safeVisibleColumns[col.key] !== false}
                        onChange={() => onToggleColumn?.(col.key)}
                        className="accent-indigo-600"
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {children}

        {/* ================= 5. PAGINATION ================= */}
        {totalEntries > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 text-black-700">
            <div className="flex items-center gap-2 text-sm text-black-600">
              <span className="text-black-700">
                showing{" "}
                <span className="">
                  {(currentPage - 1) * entriesPerPage + 1}to
                  {Math.min(currentPage * entriesPerPage, totalEntries)}
                </span>{" "}
                of <span className="font-medium">{totalEntries} entries</span>
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {getPageNumbers(currentPage, totalPages).map((page, idx) =>
                page === "..." ? (
                  <span key={idx} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={idx}
                    onClick={() => onPageChange?.(page)}
                    className={`px-3 py-1.5 text-sm border rounded-md transition ${
                      page === currentPage
                        ? "bg-[#1e1b6b] text-white border-[#1e1b6b]"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= Helper: Page Numbers with Ellipsis ================= */
const getPageNumbers = (current, total) => {
  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }
  return pages;
};

export default MasterData;