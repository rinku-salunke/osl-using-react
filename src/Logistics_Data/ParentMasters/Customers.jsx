import React, { useState, useMemo, useEffect } from "react";
import MasterData from "../../Components/MasterData";
import { FaClock, FaListCheck } from "react-icons/fa6";
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FaBoxes, FaWarehouse, FaPlus, FaTrashAlt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

import { toast } from "react-toastify";

const Customers = () => {
  // ===== Page mode =====
  const [mode, setMode] = useState("list");
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);

  // ===== Reason for Edit =====
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [editReason, setEditReason] = useState("");
  const [pendingEditCustomer, setPendingEditCustomer] = useState(null);

  // ===== Status Confirm =====
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    customer: null,
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
    customer: null,
  });

  // ===== Filters =====
  const [branchType, setBranchType] = useState("");
  const [branchName, setBranchName] = useState("");
  const [customerName, setCustomerName] = useState("");
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
    email: true,
    address: true,
    vendorCode: true,
    city: true,
    contactPerson: true,
    status: true,
    actions: true,
  });

  const columnsList = [
    { key: "srNo", label: "Sr No." },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "vendorCode", label: "Vendor Code" },
    { key: "city", label: "City" },
    { key: "contactPerson", label: "Contact Person" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== Table Data =====
  const [customers, setCustomers] = useState([
    {
      id: 1,
      srNo: 1,
      name: "TEST",
      email: "fartadepratap@gmail.com",
      address: "Plot No. Av35, Sanand, Phase 2 Indl Estate",
      vendorCode: "VND0005",
      city: "Pune",
      contactPerson: "8459879654",
      status: true,
    },
    {
      id: 2,
      srNo: 2,
      name: "ABC Corp",
      email: "abc@corp.com",
      address: "123 Main St, Mumbai",
      vendorCode: "VND0006",
      city: "Mumbai",
      contactPerson: "9876543210",
      status: true,
    },
    {
      id: 3,
      srNo: 3,
      name: "XYZ Ltd",
      email: "xyz@ltd.com",
      address: "45 Industrial Area, Delhi",
      vendorCode: "VND0007",
      city: "Delhi",
      contactPerson: "9988776655",
      status: false,
    },
  ]);

  // ===== Toggle Status =====
  const toggleStatus = (customer) => {
    setStatusConfirm({
      isOpen: true,
      customer,
      action: customer.status ? "deactivate" : "activate",
    });
  };

  const confirmStatusChange = () => {
    const { customer, action } = statusConfirm;
    if (!customer) return;
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customer.id ? { ...c, status: !c.status } : c
      )
    );
    setStatusConfirm({ isOpen: false, customer: null, action: "" });
    setSuccessPopup({
      isOpen: true,
      title: action === "deactivate" ? "Deactivated" : "Activated",
      message: `Record ${action === "deactivate" ? "Deactivated" : "Activated"} Successfully!`,
    });
  };

  const cancelStatusChange = () => {
    setStatusConfirm({ isOpen: false, customer: null, action: "" });
  };

  // ===== Edit =====
  const handleEdit = (customer) => {
    setPendingEditCustomer(customer);
    setEditReason("");
    setIsReasonModalOpen(true);
  };

  const handleContinueEdit = () => {
    if (!editReason.trim()) return;
    setEditingCustomer(pendingEditCustomer);
    setIsReasonModalOpen(false);
    setMode("edit");
  };

  const handleCancelReason = () => {
    setIsReasonModalOpen(false);
    setEditReason("");
    setPendingEditCustomer(null);
  };

  // ===== View =====
  const handleView = (customer) => {
    setViewingCustomer(customer);
    setMode("view");
  };

  // ===== Delete =====
  const handleDelete = (id) => {
    const c = customers.find((x) => x.id === id);
    if (!c) return;
    setDeleteConfirm({ isOpen: true, customer: c });
  };

  const confirmDelete = () => {
    const c = deleteConfirm.customer;
    if (!c) return;
    setCustomers((prev) => prev.filter((x) => x.id !== c.id));
    setDeleteConfirm({ isOpen: false, customer: null });
    toast.success("Customer deleted!");
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, customer: null });
  };

  // ===== FILTERED =====
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchBranchType = branchType ? c.branchType === branchType : true;
      const matchBranchName = branchName ? c.branchName === branchName : true;
      const matchCustomerName = customerName
        ? c.name.toLowerCase().includes(customerName.toLowerCase())
        : true;
      const matchStatus =
        status === ""
          ? true
          : status === "active"
          ? c.status === true
          : c.status === false;
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return (
        matchBranchType &&
        matchBranchName &&
        matchCustomerName &&
        matchStatus &&
        matchSearch
      );
    });
  }, [customers, branchType, branchName, customerName, status, search]);

  // ===== Stats =====
  const statsData = useMemo(() => {
    const total = customers.length;
    const active = customers.filter((c) => c.status).length;
    const inactive = total - active;

    return [
      {
        label: "Total Customers",
        value: total,
        icon: <div className="w-6 h-6 text-blue-600"><FaBoxes size={20} /></div>,
        iconBg: "bg-blue-100",
        footer: "5% from last week",
        footerIcon: <IoIosArrowRoundUp size={18} />,
        footerColor: "text-green-600",
      },
      {
        label: "Active Customers",
        value: active,
        icon: <div className="w-6 h-6 text-orange-500"><FaListCheck size={20} /></div>,
        iconBg: "bg-orange-100",
        footer: "Recent additions",
        footerIcon: <FaClock size={15} />,
        footerColor: "text-red-600",
      },
      {
        label: "InActive Customers",
        value: inactive,
        icon: <div className="w-6 h-6 text-green-600"><FaWarehouse size={15} /></div>,
        iconBg: "bg-green-100",
        footer: "currently away",
        footerIcon: <IoIosArrowRoundUp size={18} />,
        footerColor: "text-blue-600",
      },
    ];
  }, [customers]);

  // ===== Pagination =====
  const totalEntries = filteredCustomers.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIdx = (currentPage - 1) * entriesPerPage;
  const paginatedCustomers = filteredCustomers.slice(
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
      label: "Branch Type",
      value: branchType,
      onChange: (v) => { setBranchType(v); setCurrentPage(1); },
      options: [
        { label: "Select Branch Type", value: "" },
        { label: "Head Office", value: "head" },
        { label: "Warehouse", value: "warehouse" },
      ],
    },
    {
      label: "Branch Name",
      value: branchName,
      onChange: (v) => { setBranchName(v); setCurrentPage(1); },
      options: [
        { label: "Select Branch Name", value: "" },
        { label: "Mumbai", value: "mumbai" },
        { label: "Pune", value: "pune" },
      ],
    },
    {
      label: "Customer Name",
      value: customerName,
      onChange: (v) => { setCustomerName(v); setCurrentPage(1); },
      options: [
        { label: "Select Customer Name", value: "" },
        { label: "TEST", value: "test" },
        { label: "ABC Corp", value: "abc corp" },
      ],
    },
    {
      label: "Status",
      value: status,
      onChange: (v) => { setStatus(v); setCurrentPage(1); },
      options: [
        { label: "Select Status", value: "" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];

  const handleReset = () => {
    setBranchType("");
    setBranchName("");
    setCustomerName("");
    setStatus("");
    setCurrentPage(1);
  };

  // ===== Add =====
  const handleAdd = () => {
    setEditingCustomer(null);
    setMode("add");
  };

  // ===== Save =====
  const handleSaveCustomer = (formData) => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      if (editingCustomer) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === editingCustomer.id
              ? {
                  ...c,
                  ...formData,
                  name: formData.name,
                  email: formData.email,
                  address: formData.address,
                  vendorCode: formData.vendorCode,
                  city: formData.state || c.city,
                  contactPerson: formData.contactPersonMobile || c.contactPerson,
                  lastEditReason: editReason.trim(),
                }
              : c
          )
        );
        setSuccessPopup({
          isOpen: true,
          title: "Customer Details Updated Successfully",
          message: "",
        });
      } else {
        const nextId =
          customers.length > 0
            ? Math.max(...customers.map((c) => c.id)) + 1
            : 1;
        setCustomers((prev) => [
          ...prev,
          {
            id: nextId,
            srNo: prev.length + 1,
            name: formData.name,
            email: formData.email,
            address: formData.address,
            vendorCode: formData.vendorCode,
            city: formData.state || "",
            contactPerson: formData.contactPersonMobile || "",
            status: true,
            ...formData,
          },
        ]);
        setSuccessPopup({
          isOpen: true,
          title: "Customer Details Added Successfully",
          message: "",
        });
      }

      setEditingCustomer(null);
      setEditReason("");
      setPendingEditCustomer(null);
      setMode("list");
    }, 1200);
  };

  const handleCancelForm = () => {
    setEditingCustomer(null);
    setEditReason("");
    setPendingEditCustomer(null);
    setMode("list");
  };

  const handleBackFromView = () => {
    setViewingCustomer(null);
    setMode("list");
  };

  // ============ FORM VIEW ============
  if (mode === "edit" || mode === "add") {
    return (
      <AddCustomerForm
        initialData={editingCustomer}
        isEdit={Boolean(editingCustomer)}
        onSave={handleSaveCustomer}
        onCancel={handleCancelForm}
      />
    );
  }

  // ============ VIEW ============
  if (mode === "view" && viewingCustomer) {
    return (
      <CustomerDetailsView
        customer={viewingCustomer}
        onBack={handleBackFromView}
      />
    );
  }

  // ============ LIST VIEW ============
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <>
      <MasterData
        title="Customer"
        onAdd={handleAdd}
        addButtonLabel="Add Customer"
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
                {visibleColumns.srNo && (
                  <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[60px] whitespace-nowrap">
                    <div className="flex items-center gap-1"><SortIcon /><span>Sr No.</span></div>
                  </th>
                )}
                {visibleColumns.name && (
                  <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[130px] whitespace-nowrap">
                    <div className="flex items-center justify-between"><span>Name</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.email && (
                  <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[200px] whitespace-nowrap">
                    <div className="flex items-center justify-between"><span>Email</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.address && (
                  <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[250px] whitespace-nowrap">
                    <div className="flex items-center justify-between"><span>Address</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.vendorCode && (
                  <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[110px] whitespace-nowrap">
                    <div className="flex items-center justify-between"><span>Vendor Code</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.city && (
                  <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[100px] whitespace-nowrap">
                    <div className="flex items-center justify-between"><span>City</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.contactPerson && (
                  <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[140px] whitespace-nowrap">
                    <div className="flex items-center justify-between"><span>Contact Person</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="text-left font-medium px-3 py-2.5 border-b border-r border-gray-200 w-[90px] whitespace-nowrap">
                    <div className="flex items-center justify-between"><span>Status</span><SortIcon /></div>
                  </th>
                )}
                {visibleColumns.actions && (
                  <th className="text-left font-medium px-3 py-2.5 border-b border-gray-200 w-[130px] whitespace-nowrap">
                    <span>Actions</span>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumnCount} className="text-center text-gray-400 py-6 border-b border-gray-200">
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((c, idx) => (
                  <tr key={c.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}>
                    {visibleColumns.srNo && (
                      <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">{c.srNo}</td>
                    )}
                    {visibleColumns.name && (
                      <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-800 font-medium align-middle truncate" title={c.name}>{c.name}</td>
                    )}
                    {visibleColumns.email && (
                      <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle truncate" title={c.email}>{c.email}</td>
                    )}
                    {visibleColumns.address && (
                      <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle truncate" title={c.address}>{c.address}</td>
                    )}
                    {visibleColumns.vendorCode && (
                      <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">{c.vendorCode}</td>
                    )}
                    {visibleColumns.city && (
                      <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">{c.city}</td>
                    )}
                    {visibleColumns.contactPerson && (
                      <td className="px-3 py-2.5 border-b border-r border-gray-200 text-gray-700 align-middle whitespace-nowrap">{c.contactPerson}</td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-3 py-2.5 border-b border-r border-gray-200 align-middle">
                        <ToggleSwitch checked={c.status} onChange={() => toggleStatus(c)} />
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-3 py-2.5 border-b border-gray-200 align-middle">
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(c)} className="w-7 h-7 flex items-center justify-center text-blue-600 hover:text-blue-800 transition" title="Edit">
                            <MdOutlineModeEdit size={18} />
                          </button>
                          <button onClick={() => handleDelete(c.id)} className="w-7 h-7 flex items-center justify-center text-red-500 hover:text-red-700 transition" title="Delete">
                            <RiDeleteBin6Line size={18} />
                          </button>
                          <button onClick={() => handleView(c)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-800 transition" title="View">
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
              Are you sure you want to delete <b>{deleteConfirm.customer?.name}</b>?
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
            <p className="text-sm text-gray-600 text-center mb-6">Why are you editing this customer?</p>
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
const AddCustomerForm = ({ initialData = null, isEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    branchType: initialData?.branchType || "",
    branchName: initialData?.branchName || "",
    name: initialData?.name || "",
    address: initialData?.address || "",
    pincode: initialData?.pincode || "",
    state: initialData?.state || "",
    district: initialData?.district || "",
    taluka: initialData?.taluka || "",
    officeName: initialData?.officeName || "",
    gstDate: initialData?.gstDate || "",
    gstNo: initialData?.gstNo || "",
    gstState: initialData?.gstState || "",
    panNo: initialData?.panNo || "",
    cinNo: initialData?.cinNo || "",
    vendorCode: initialData?.vendorCode || "",
    telephone: initialData?.telephone || "",
    email: initialData?.email || "",
    contactPersonName: initialData?.contactPersonName || "",
    contactPersonMobile: initialData?.contactPersonMobile || "",
    contactPersonEmail: initialData?.contactPersonEmail || "",
    contactPersonDesignation: initialData?.contactPersonDesignation || "",
  });

  // ===== Address Heads =====
  const [addresses, setAddresses] = useState([
    {
      id: Date.now(),
      addressHeadName: "",
      reportingBranchLocation: "",
      pincode: "",
      state: "",
      district: "",
      taluka: "",
      officeName: "",
      address: "",
      apob: false,
      considerBillable: false,
      sameAsMain: false,
      gstNumber: "",
      gstState: "",
      gstDate: "",
      panNumber: "",
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

  const updateAddress = (id, field, value) =>
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );

  const addAddress = () =>
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        addressHeadName: "",
        reportingBranchLocation: "",
        pincode: "",
        state: "",
        district: "",
        taluka: "",
        officeName: "",
        address: "",
        apob: false,
        considerBillable: false,
        sameAsMain: false,
        gstNumber: "",
        gstState: "",
        gstDate: "",
        panNumber: "",
      },
    ]);

  const removeAddress = (id) => {
    if (addresses.length === 1) return;
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.branchType) return setError("Branch Type is required.");
    if (!formData.branchName) return setError("Branch Name is required.");
    if (!formData.name.trim()) return setError("Name is required.");
    if (!formData.address.trim()) return setError("Address is required.");
    if (!formData.pincode.trim()) return setError("Pincode is required.");
    if (!formData.officeName) return setError("Office Name is required.");
    if (!formData.gstDate) return setError("GST Date is required.");
    if (!formData.gstNo.trim()) return setError("GST No is required.");
    if (!formData.gstState) return setError("GST State is required.");
    if (!formData.panNo.trim()) return setError("Pan No is required.");
    if (!formData.vendorCode.trim()) return setError("Vendor Code is required.");
    if (!formData.telephone.trim()) return setError("Telephone is required.");
    if (!formData.email.trim()) return setError("Email is required.");

    onSave({ ...formData, addresses });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Update Customer" : "Add Customer"}
        </h1>
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#1e1b6b] hover:bg-[#2a2690] text-white text-sm font-medium px-6 py-2 rounded-md transition"
        >
          Back
        </button>
      </div>

      {/* FORM CONTENT */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          {/* ===== Customer Details Section ===== */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
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
                  <option value="Head Office">Head Office</option>
                  <option value="Warehouse">Warehouse</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Branch Name <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.branchName}
                  onChange={handleChange("branchName")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Branch Name</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
              <FormInput
                label="Name"
                required
                placeholder="name"
                value={formData.name}
                onChange={handleChange("name")}
              />
              <FormInput
                label="Address"
                required
                placeholder="Address"
                value={formData.address}
                onChange={handleChange("address")}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
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
              <FormInput
                label="Taluka"
                placeholder="Taluka"
                value={formData.taluka}
                onChange={handleChange("taluka")}
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Office Name <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.officeName}
                  onChange={handleChange("officeName")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Office Name</option>
                  <option value="Main Office">Main Office</option>
                  <option value="Branch Office">Branch Office</option>
                </select>
              </div>
              <FormInput
                label="GST Date"
                required
                type="date"
                value={formData.gstDate}
                onChange={handleChange("gstDate")}
              />
              <FormInput
                label="GST No"
                required
                placeholder="GST No"
                value={formData.gstNo}
                onChange={handleChange("gstNo")}
              />
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Gst State <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gstState}
                  onChange={handleChange("gstState")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select GST State</option>
                  <option value="Andaman & Nicobar Islands (State)">Andaman & Nicobar Islands (State)</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              <FormInput
                label="Pan No"
                required
                placeholder="Pan No"
                value={formData.panNo}
                onChange={handleChange("panNo")}
              />
              <FormInput
                label="CIN No"
                placeholder="CIN No"
                value={formData.cinNo}
                onChange={handleChange("cinNo")}
              />
              <FormInput
                label="Vendor Code"
                required
                placeholder="Vendor Code"
                value={formData.vendorCode}
                onChange={handleChange("vendorCode")}
              />
              <FormInput
                label="Telephone"
                required
                placeholder="Telephone"
                value={formData.telephone}
                onChange={handleChange("telephone")}
              />
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              <FormInput
                label="Email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange("email")}
              />
              <FormInput
                label="Contact Person Name"
                placeholder="Contact Person Name"
                value={formData.contactPersonName}
                onChange={handleChange("contactPersonName")}
              />
              <FormInput
                label="Contact Person Mobile Number"
                placeholder="Contact Person Mobile Number"
                value={formData.contactPersonMobile}
                onChange={handleChange("contactPersonMobile")}
              />
              <FormInput
                label="Contact Person Email"
                placeholder="Contact Person Email"
                value={formData.contactPersonEmail}
                onChange={handleChange("contactPersonEmail")}
              />
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <FormInput
                label="Contact Person Designation"
                placeholder="Contact Person Designation"
                value={formData.contactPersonDesignation}
                onChange={handleChange("contactPersonDesignation")}
              />
            </div>
          </div>

          {/* ===== Address Head button ===== */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={addAddress}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-5 py-2 rounded-md transition flex items-center gap-2"
            >
              + Address Head
            </button>
          </div>

          {/* ===== Address Heads ===== */}
          {addresses.map((addr, index) => (
            <div
              key={addr.id}
              className="bg-white border-2 border-[#2563eb] rounded-lg p-6 mb-6"
            >
              {/* Address header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-semibold text-[#2563eb]">Address</h3>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm font-medium text-gray-700">
                      Same as Main Address
                    </span>
                    <ToggleSwitch
                      checked={addr.sameAsMain}
                      onChange={() =>
                        updateAddress(addr.id, "sameAsMain", !addr.sameAsMain)
                      }
                    />
                  </label>
                  {addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAddress(addr.id)}
                      className="w-9 h-9 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                      title="Remove Address"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                <FormInput
                  label="Address Head Name"
                  required
                  placeholder="e.g. Corporate Office"
                  value={addr.addressHeadName}
                  onChange={(e) =>
                    updateAddress(addr.id, "addressHeadName", e.target.value)
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Reporting Branch location <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={addr.reportingBranchLocation}
                    onChange={(e) =>
                      updateAddress(addr.id, "reportingBranchLocation", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Branch</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
                <FormInput
                  label="Pincode"
                  required
                  placeholder="pincode"
                  value={addr.pincode}
                  onChange={(e) => updateAddress(addr.id, "pincode", e.target.value)}
                />
                <FormInput
                  label="State"
                  placeholder="State"
                  value={addr.state}
                  onChange={(e) => updateAddress(addr.id, "state", e.target.value)}
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                <FormInput
                  label="District"
                  placeholder=""
                  value={addr.district}
                  onChange={(e) => updateAddress(addr.id, "district", e.target.value)}
                />
                <FormInput
                  label="Taluka"
                  placeholder=""
                  value={addr.taluka}
                  onChange={(e) => updateAddress(addr.id, "taluka", e.target.value)}
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Office Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={addr.officeName}
                    onChange={(e) => updateAddress(addr.id, "officeName", e.target.value)}
                    className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select Office</option>
                    <option value="Main Office">Main Office</option>
                    <option value="Branch Office">Branch Office</option>
                  </select>
                </div>
              </div>

              {/* Address text */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Address"
                  value={addr.address}
                  onChange={(e) => updateAddress(addr.id, "address", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap items-center gap-8 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addr.apob}
                    onChange={(e) => updateAddress(addr.id, "apob", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Additional Place of Business (APOB) - Bill to Ship
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addr.considerBillable}
                    onChange={(e) =>
                      updateAddress(addr.id, "considerBillable", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Consider For Billable
                  </span>
                </label>
              </div>

              {/* GST Section */}
              <div className="border-t border-gray-200 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <FormInput
                    label="GST Number"
                    required
                    placeholder="GST Number"
                    value={addr.gstNumber}
                    onChange={(e) =>
                      updateAddress(addr.id, "gstNumber", e.target.value)
                    }
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      GST State <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={addr.gstState}
                      onChange={(e) =>
                        updateAddress(addr.id, "gstState", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">Select State</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                  </div>
                  <FormInput
                    label="GST Date"
                    required
                    type="date"
                    value={addr.gstDate}
                    onChange={(e) => updateAddress(addr.id, "gstDate", e.target.value)}
                  />
                  <FormInput
                    label="PAN Number"
                    required
                    placeholder="PAN Number"
                    value={addr.panNumber}
                    onChange={(e) =>
                      updateAddress(addr.id, "panNumber", e.target.value)
                    }
                  />
                </div>
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

/* ================= CUSTOMER DETAILS VIEW ================= */
const CustomerDetailsView = ({ customer, onBack }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1e1b6b] mb-5 transition"
    >
      <span className="text-lg leading-none">←</span>
      <span>Back</span>
    </button>

    <h1 className="text-2xl font-bold text-gray-900 mb-6">Customer Details</h1>

    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">General Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
        <DetailRow label="Name" value={customer.name} />
        <DetailRow label="Email" value={customer.email} />
        <DetailRow label="Address" value={customer.address} />
        <DetailRow label="Vendor Code" value={customer.vendorCode} />
        <DetailRow label="City" value={customer.city} />
        <DetailRow label="Contact Person" value={customer.contactPerson} />
        <DetailRow
          label="Status"
          value={
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${customer.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {customer.status ? "Active" : "Inactive"}
            </span>
          }
        />
      </div>

      {customer.lastEditReason && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Reason for last edit</p>
          <p className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
            {customer.lastEditReason}
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

export default Customers;