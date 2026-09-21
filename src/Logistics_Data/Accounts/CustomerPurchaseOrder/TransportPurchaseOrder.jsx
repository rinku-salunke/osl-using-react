import React, { useState, useMemo } from "react";
import MasterData from "../../../Components/MasterData";
import {
  FaFileInvoice, FaRoute, FaBan, FaSearch, FaPlus, FaFileExport,
  FaColumns, FaCopy, FaFileExcel, FaFileCsv, FaFilePdf, FaPrint,
  FaEye, FaHistory, FaEdit, FaChevronDown,
} from "react-icons/fa";
import { MdOutlineQrCode2 } from "react-icons/md";

const TransportPurchaseOrder = () => {
  const [filters, setFilters] = useState({
    location: "", poNo: "", customerName: "", dateFrom: "", dateTo: "",
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showColumns, setShowColumns] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true, poNo: true, endDate: true,
    customerName: true, status: true, qrCode: true, actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "SR No" },
    { key: "poNo", label: "PO No & Status" },
    { key: "endDate", label: "End Date" },
    { key: "customerName", label: "Customer Name" },
    { key: "status", label: "Status" },
    { key: "qrCode", label: "QR Code" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) =>
    setVisibleColumns((p) => ({ ...p, [key]: !p[key] }));

  const [orders, setOrders] = useState([
    { id: 1, srNo: 1, poNo: "PO-2608-0008", badges: ["Final","Draft"], endDate: "17-07-2030", customerName: "Emitec Technologies India Private Limited Talegaon Pune", status: true },
    { id: 2, srNo: 2, poNo: "PO-2608-0007", badges: ["Final","Draft"], endDate: "20-11-2026", customerName: "Bajaj Auto Limited Aurangabad", status: true },
    { id: 3, srNo: 3, poNo: "PO-2607-0006", badges: ["Final","Draft"], endDate: "04-10-2026", customerName: "Fiat India Automobile Private", status: true },
    { id: 4, srNo: 4, poNo: "PO-2607-0005", badges: ["Final"], endDate: "12-09-2026", customerName: "Tata Motors Limited Pune", status: false },
    { id: 5, srNo: 5, poNo: "PO-2607-0004", badges: ["Draft"], endDate: "30-08-2026", customerName: "Mahindra & Mahindra Ltd", status: true },
  ]);

  const toggleStatus = (id) =>
    setOrders((p) => p.map((o) => (o.id === id ? { ...o, status: !o.status } : o)));

  const handleView = (o) => console.log("View:", o.poNo);
  const handleHistory = (o) => console.log("History:", o.poNo);
  const handleEdit = (o) => console.log("Edit:", o.poNo);
  const handleAdd = () => console.log("Create New PO");
  const handleExport = () => console.log("Export Detailed POs");

  // Filtered
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.poNo.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase());
      const matchLoc = filters.location ? true : true; // extend as needed
      const matchPo = filters.poNo ? o.poNo === filters.poNo : true;
      const matchCust = filters.customerName
        ? o.customerName.toLowerCase().includes(filters.customerName.toLowerCase())
        : true;
      return matchSearch && matchLoc && matchPo && matchCust;
    });
  }, [orders, search, filters]);

  // Stats
  const statsData = useMemo(() => {
    const total = orders.length;
    const active = orders.filter((o) => o.status).length;
    const inactive = total - active;
    return [
      { label: "Total Agreements", value: total, subtitle: "Currently fulfilling orders",
        icon: <div className="w-6 h-6 text-cyan-100"><FaFileInvoice size={20}/></div>,
        iconBg: "bg-cyan-500", footer: "Active Now", footerIcon: "↗", footerColor: "text-green-200" },
      { label: "Active Routes configured", value: active, subtitle: "Across all matrices",
        icon: <div className="w-6 h-6 text-green-100"><FaRoute size={20}/></div>,
        iconBg: "bg-green-500", footer: "Across all matrices", footerIcon: "•", footerColor: "text-green-200" },
      { label: "Inactive / On Hold", value: inactive, subtitle: "Expired or suspended",
        icon: <div className="w-6 h-6 text-pink-100"><FaBan size={20}/></div>,
        iconBg: "bg-pink-500", footer: "Expired or suspended", footerIcon: "•", footerColor: "text-pink-200" },
    ];
  }, [orders]);

  // Pagination
  const totalEntries = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedOrders = filteredOrders.slice(startIdx, startIdx + entriesPerPage);
  const handlePageChange = (p) => { if (p >= 1 && p <= totalPages) setCurrentPage(p); };
  const handleEntriesPerPageChange = (v) => { setEntriesPerPage(v); setCurrentPage(1); };

  // Filters config for MasterData
  const filtersData = [
    { label: "Location", value: filters.location,
      onChange: (v) => { setFilters((p) => ({...p, location: v})); setCurrentPage(1); },
      options: [
        { label: "All Locations", value: "" },
        { label: "Gurgaon", value: "gurgaon" },
        { label: "Pune", value: "pune" },
      ]},
    { label: "PO No", value: filters.poNo,
      onChange: (v) => { setFilters((p) => ({...p, poNo: v})); setCurrentPage(1); },
      options: [
        { label: "Select PO Number", value: "" },
        { label: "PO-2608-0008", value: "PO-2608-0008" },
        { label: "PO-2608-0007", value: "PO-2608-0007" },
      ]},
    { label: "Customer Name", value: filters.customerName,
      onChange: (v) => { setFilters((p) => ({...p, customerName: v})); setCurrentPage(1); },
      options: [
        { label: "Select Customer", value: "" },
        { label: "Emitec Technologies", value: "emitec" },
        { label: "Bajaj Auto Limited", value: "bajaj" },
      ]},
    { label: "Date From", value: filters.dateFrom, type: "date",
      onChange: (v) => setFilters((p) => ({...p, dateFrom: v})) },
    { label: "Date To", value: filters.dateTo, type: "date",
      onChange: (v) => setFilters((p) => ({...p, dateTo: v})) },
  ];

  return (
    <MasterData
      title="Purchase Order Management"
      subtitle="Manage all customer agreements and routing matrices"
      onAdd={handleAdd}
      addButtonLabel="Create New PO"
      secondaryButton={{
        label: "Export Detailed POs",
        icon: <FaFileExport />,
        onClick: handleExport,
      }}
      stats={statsData}
      filters={filtersData}
      onSearch={() => console.log("search", filters)}
      onReset={() => { setFilters({location:"",poNo:"",customerName:"",dateFrom:"",dateTo:""}); setSearch(""); }}
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
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-white border border-gray-200 rounded-t-md border-b-0">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowColumns((s) => !s)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <FaColumns /> Columns <FaChevronDown size={10} />
            </button>
            {showColumns && (
              <div className="absolute z-20 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg p-2">
                {columnsList.map((c) => (
                  <label key={c.key} className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-50 rounded cursor-pointer">
                    <input type="checkbox" checked={visibleColumns[c.key]} onChange={() => toggleColumn(c.key)} />
                    {c.label}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"><FaCopy className="inline mr-1"/> Copy</button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"><FaFileExcel className="inline mr-1 text-green-600"/> Excel</button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"><FaFileCsv className="inline mr-1 text-blue-600"/> CSV</button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"><FaFilePdf className="inline mr-1 text-red-600"/> PDF</button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"><FaPrint className="inline mr-1"/> Print</button>
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
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="w-10 px-2 py-2 border-b border-gray-200"><input type="checkbox"/></th>
              {visibleColumns.srNo && <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-16">SR No</th>}
              {visibleColumns.poNo && <th className="text-left font-medium px-2 py-2 border-b border-gray-200">PO No & Status</th>}
              {visibleColumns.endDate && <th className="text-left font-medium px-2 py-2 border-b border-gray-200">End Date</th>}
              {visibleColumns.customerName && <th className="text-left font-medium px-2 py-2 border-b border-gray-200">Customer Name</th>}
              {visibleColumns.status && <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-24">Status</th>}
              {visibleColumns.qrCode && <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-24">QR Code</th>}
              {visibleColumns.actions && <th className="text-left font-medium px-2 py-2 border-b border-gray-200 w-32">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr><td colSpan={8} className="text-center text-gray-400 py-6 border-b border-gray-200">No data available</td></tr>
            ) : paginatedOrders.map((order, idx) => (
              <tr key={order.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-2 py-3 border-b border-gray-200"><input type="checkbox"/></td>
                {visibleColumns.srNo && <td className="px-2 py-3 border-b border-gray-200 text-gray-700">{order.srNo}</td>}
                {visibleColumns.poNo && (
                  <td className="px-2 py-3 border-b border-gray-200">
                    <div className="text-gray-800 font-medium">{order.poNo}</div>
                    <div className="flex gap-1 mt-1">
                      {order.badges.map((b, i) => (
                        <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${b === "Final" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}>{b}</span>
                      ))}
                    </div>
                  </td>
                )}
                {visibleColumns.endDate && <td className="px-2 py-3 border-b border-gray-200 text-gray-700">{order.endDate}</td>}
                {visibleColumns.customerName && <td className="px-2 py-3 border-b border-gray-200 text-gray-800 max-w-xs">{order.customerName}</td>}
                {visibleColumns.status && (
                  <td className="px-2 py-3 border-b border-gray-200">
                    <ToggleSwitch checked={order.status} onChange={() => toggleStatus(order.id)} />
                  </td>
                )}
                {visibleColumns.qrCode && (
                  <td className="px-2 py-3 border-b border-gray-200">
                    <div className="w-12 h-12 border border-gray-300 rounded flex items-center justify-center text-gray-700">
                      <MdOutlineQrCode2 size={32} />
                    </div>
                  </td>
                )}
                {visibleColumns.actions && (
                  <td className="px-2 py-3 border-b border-gray-200">
                    <div className="flex gap-2">
                      <button onClick={() => handleView(order)} className="w-8 h-8 flex items-center justify-center rounded-full border border-cyan-300 text-cyan-500 hover:bg-cyan-50" title="View"><FaEye size={14}/></button>
                      <button onClick={() => handleHistory(order)} className="w-8 h-8 flex items-center justify-center rounded-full border border-yellow-300 text-yellow-500 hover:bg-yellow-50" title="History"><FaHistory size={14}/></button>
                      <button onClick={() => handleEdit(order)} className="w-8 h-8 flex items-center justify-center rounded-full border border-green-300 text-green-600 hover:bg-green-50" title="Edit"><FaEdit size={14}/></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MasterData>
  );
};

const ToggleSwitch = ({ checked, onChange }) => (
  <button type="button" onClick={onChange}
    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ${checked ? "bg-[#1e1b6b]" : "bg-gray-300"}`}>
    <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${checked ? "translate-x-[22px]" : "translate-x-[2px]"}`}/>
  </button>
);

export default TransportPurchaseOrder;