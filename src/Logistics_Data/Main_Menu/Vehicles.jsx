import React, { useState, useMemo } from 'react';
import { 
  MdOutlineClear, 
  MdOutlineArrowDropDown,
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdVisibilityOff
} from "react-icons/md";
import { 
  IoLocation, 
  IoTodaySharp,
  IoClose
} from "react-icons/io5";
import { 
  RiArrowDropDownLine, 
  RiExpandUpDownFill,
  RiRestartLine,
  RiTruckLine
} from "react-icons/ri";
import { 
  BsBoxes, 
  BsTruck,
  BsCheckCircle,
  BsXCircle,
  BsCircleFill,
  BsSliders,
  BsThreeDotsVertical
} from "react-icons/bs";
import { 
  FaTruck, 
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaPrint,
  FaCopy,
  FaColumns,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch
} from 'react-icons/fa';
import { ImDownload3 } from "react-icons/im";
import { FaFilter } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";

function Vehicles() {
  const allVehicleTypes = [
    { id: 1, vehicleType: 'Heavy Truck', capacity: '20 Tons', dimensions: '32 x 8 x 10 ft', wheels: '10 Wheels / 2 Axle', status: 'Active' },
    { id: 2, vehicleType: 'Medium Truck', capacity: '10 Tons', dimensions: '24 x 7 x 9 ft', wheels: '6 Wheels / 2 Axle', status: 'Active' },
    { id: 3, vehicleType: 'Light Truck', capacity: '5 Tons', dimensions: '18 x 6 x 8 ft', wheels: '4 Wheels / 2 Axle', status: 'Active' },
    { id: 4, vehicleType: 'Delivery Van', capacity: '2 Tons', dimensions: '12 x 5 x 6 ft', wheels: '4 Wheels / 1 Axle', status: 'Active' },
    { id: 5, vehicleType: 'Container Truck', capacity: '25 Tons', dimensions: '40 x 8 x 10 ft', wheels: '12 Wheels / 3 Axle', status: 'Active' },
    { id: 6, vehicleType: 'Mini Truck', capacity: '1 Ton', dimensions: '10 x 4 x 5 ft', wheels: '4 Wheels / 1 Axle', status: 'Active' },
    { id: 7, vehicleType: 'Refrigerated Truck', capacity: '15 Tons', dimensions: '28 x 8 x 9 ft', wheels: '8 Wheels / 2 Axle', status: 'Active' },
    { id: 8, vehicleType: 'Flatbed Truck', capacity: '18 Tons', dimensions: '30 x 8 x 3 ft', wheels: '10 Wheels / 2 Axle', status: 'Active' },
    { id: 9, vehicleType: 'Tanker Truck', capacity: '22 Tons', dimensions: '34 x 8 x 9 ft', wheels: '10 Wheels / 3 Axle', status: 'Active' },
    { id: 10, vehicleType: 'Trailer', capacity: '30 Tons', dimensions: '45 x 8 x 10 ft', wheels: '14 Wheels / 4 Axle', status: 'Active' },
    { id: 11, vehicleType: 'Pickup Truck', capacity: '1.5 Tons', dimensions: '14 x 5 x 4 ft', wheels: '4 Wheels / 1 Axle', status: 'Active' },
    { id: 12, vehicleType: 'Box Truck', capacity: '8 Tons', dimensions: '20 x 7 x 8 ft', wheels: '6 Wheels / 2 Axle', status: 'Active' },
    { id: 13, vehicleType: 'Cargo Van', capacity: '1 Ton', dimensions: '11 x 5 x 6 ft', wheels: '4 Wheels / 1 Axle', status: 'Active' },
    { id: 14, vehicleType: 'Semi-Trailer', capacity: '28 Tons', dimensions: '48 x 8 x 10 ft', wheels: '16 Wheels / 5 Axle', status: 'Active' },
    { id: 15, vehicleType: 'Mini Van', capacity: '0.5 Ton', dimensions: '8 x 4 x 5 ft', wheels: '4 Wheels / 1 Axle', status: 'Inactive' },
    { id: 16, vehicleType: 'Electric Van', capacity: '1.5 Tons', dimensions: '12 x 5 x 6 ft', wheels: '4 Wheels / 1 Axle', status: 'Inactive' },
    { id: 17, vehicleType: 'Dump Truck', capacity: '24 Tons', dimensions: '30 x 8 x 9 ft', wheels: '10 Wheels / 3 Axle', status: 'Active' },
    { id: 18, vehicleType: 'Cement Mixer', capacity: '22 Tons', dimensions: '32 x 8 x 10 ft', wheels: '10 Wheels / 3 Axle', status: 'Active' },
    { id: 19, vehicleType: 'Car Carrier', capacity: '20 Tons', dimensions: '40 x 8 x 12 ft', wheels: '12 Wheels / 3 Axle', status: 'Active' },
    { id: 20, vehicleType: 'LPG Tanker', capacity: '26 Tons', dimensions: '38 x 8 x 9 ft', wheels: '12 Wheels / 3 Axle', status: 'Active' },
    { id: 21, vehicleType: 'Cattle Truck', capacity: '12 Tons', dimensions: '26 x 7 x 8 ft', wheels: '6 Wheels / 2 Axle', status: 'Active' },
    { id: 22, vehicleType: 'Water Tanker', capacity: '18 Tons', dimensions: '28 x 8 x 8 ft', wheels: '8 Wheels / 2 Axle', status: 'Active' },
    { id: 23, vehicleType: 'Mobile Shop', capacity: '6 Tons', dimensions: '20 x 7 x 8 ft', wheels: '6 Wheels / 2 Axle', status: 'Inactive' },
    { id: 24, vehicleType: 'Fire Truck', capacity: '16 Tons', dimensions: '30 x 8 x 9 ft', wheels: '8 Wheels / 2 Axle', status: 'Active' },
    { id: 25, vehicleType: 'Ambulance', capacity: '3 Tons', dimensions: '18 x 6 x 7 ft', wheels: '4 Wheels / 2 Axle', status: 'Active' },
    { id: 26, vehicleType: 'Tow Truck', capacity: '10 Tons', dimensions: '24 x 8 x 8 ft', wheels: '6 Wheels / 2 Axle', status: 'Active' },
    { id: 27, vehicleType: 'Bus', capacity: '15 Tons', dimensions: '40 x 8 x 10 ft', wheels: '6 Wheels / 2 Axle', status: 'Active' },
    { id: 28, vehicleType: 'Mini Bus', capacity: '8 Tons', dimensions: '24 x 7 x 8 ft', wheels: '4 Wheels / 2 Axle', status: 'Active' },
    { id: 29, vehicleType: 'Tempo', capacity: '3 Tons', dimensions: '14 x 5 x 6 ft', wheels: '4 Wheels / 1 Axle', status: 'Active' },
    { id: 30, vehicleType: 'Auto Rickshaw', capacity: '0.5 Ton', dimensions: '6 x 3 x 4 ft', wheels: '3 Wheels / 1 Axle', status: 'Inactive' },
  ];

  // ============================================================
  // FILTER STATES
  // ============================================================
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('Select Vehicle Type');
  const [statusFilter, setStatusFilter] = useState('Select Status');
  const [searchQuery, setSearchQuery] = useState('');
  
  // ✅ FIXED: 20 entries per page (removed dropdown state)
  const ENTRIES_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // ============================================================
  // COLUMN VISIBILITY
  // ============================================================
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    vehicleType: true,
    capacity: true,
    dimensions: true,
    wheels: true,
    status: true,
    actions: true,
  });

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  // ============================================================
  // MODAL STATES
  // ============================================================
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const [formData, setFormData] = useState({
    vehicleType: '',
    capacity: '',
    dimensions: '',
    wheels: '',
    status: 'Active'
  });
  const [formErrors, setFormErrors] = useState({});

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.vehicleType.trim()) errors.vehicleType = 'Vehicle Type is required';
    if (!formData.capacity.trim()) errors.capacity = 'Capacity is required';
    if (!formData.dimensions.trim()) errors.dimensions = 'Dimensions are required';
    if (!formData.wheels.trim()) errors.wheels = 'Wheels & Axle is required';
    return errors;
  };

  const resetForm = () => {
    setFormData({ vehicleType: '', capacity: '', dimensions: '', wheels: '', status: 'Active' });
    setFormErrors({});
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    console.log('Vehicle Type Added:', formData);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    console.log('Vehicle Type Updated:', { id: editingItem.id, ...formData });
    setShowEditModal(false);
    setEditingItem(null);
    resetForm();
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      vehicleType: item.vehicleType,
      capacity: item.capacity,
      dimensions: item.dimensions,
      wheels: item.wheels,
      status: item.status
    });
    setShowEditModal(true);
  };

  const handleDelete = () => {
    console.log('Vehicle Type Deleted:', deletingItem);
    setShowDeleteModal(false);
    setDeletingItem(null);
  };

  // ============================================================
  // FILTERED DATA
  // ============================================================
  const filteredData = useMemo(() => {
    let result = [...allVehicleTypes];

    if (vehicleTypeFilter !== 'Select Vehicle Type') {
      result = result.filter(v => v.vehicleType === vehicleTypeFilter);
    }

    if (statusFilter !== 'Select Status') {
      result = result.filter(v => v.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.vehicleType.toLowerCase().includes(q) ||
        v.capacity.toLowerCase().includes(q) ||
        v.dimensions.toLowerCase().includes(q) ||
        v.wheels.toLowerCase().includes(q)
      );
    }

    return result;
  }, [vehicleTypeFilter, statusFilter, searchQuery]);

  // ============================================================
  // PAGINATION — 20 per page
  // ============================================================
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ENTRIES_PER_PAGE));
  const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
  const endIndex = startIndex + ENTRIES_PER_PAGE;
  const pageData = filteredData.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [vehicleTypeFilter, statusFilter, searchQuery]);

  const handleReset = () => {
    setVehicleTypeFilter('Select Vehicle Type');
    setStatusFilter('Select Status');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const goToPage = (page) => { if (page < 1 || page > totalPages) return; setCurrentPage(page); };
  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  // ============================================================
  // PAGINATION WINDOW — Sliding window of 3 pages
  // ============================================================
  const MAX_VISIBLE_PAGES = 3;
  const getPageWindow = () => {
    let start = currentPage - Math.floor(MAX_VISIBLE_PAGES / 2);
    if (start < 1) start = 1;
    let end = start + MAX_VISIBLE_PAGES - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Metrics
  const totalCount = allVehicleTypes.length;
  const activeCount = allVehicleTypes.filter(v => v.status === 'Active').length;
  const inactiveCount = allVehicleTypes.filter(v => v.status === 'Inactive').length;

  const vehicleTypeOptions = ['Select Vehicle Type', ...new Set(allVehicleTypes.map(v => v.vehicleType))];
  const statusOptions = ['Select Status', 'Active', 'Inactive'];

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-300 flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-black text-2xl">Vehicle Type Master</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { resetForm(); setShowAddModal(true); }}
            className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:opacity-90 inline-flex items-center gap-2"
          >
            <MdAdd size={18} />
            Add Vehicle Type
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 bg-gray-50 space-y-8">

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Total Vehicle Type */}
          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Total Vehicle Type</div>
              <div className="text-3xl font-bold text-gray-800 my-2">{totalCount}</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <FaArrowUpFallback /> 5% from last week
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-blue-900">
              <BsBoxes size={24} />
            </div>
          </div>

          {/* Active Vehicle Type */}
          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Active Vehicle Type</div>
              <div className="text-3xl font-bold text-gray-800 my-2">{activeCount}</div>
              <div className="flex items-center text-xs text-red-500 font-medium">
                <BsCircleFill size={8} className="mr-1.5" />
                Recent additions
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg text-orange-500">
              <FaClipboardList size={24} />
            </div>
          </div>

          {/* InActive Vehicle Type */}
          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">InActive Vehicle Type</div>
              <div className="text-3xl font-bold text-gray-800 my-2">{inactiveCount}</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <FaArrowUpFallback /> Open positions
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <FaTruck size={24} />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-300">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[220px] flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Vehicle Type</label>
              <div className="relative">
                <select
                  value={vehicleTypeFilter}
                  onChange={(e) => setVehicleTypeFilter(e.target.value)}
                  className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                >
                  {vehicleTypeOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-[220px] flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Status</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                >
                  {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <RiRestartLine size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="border border-gray-300 rounded-md bg-white shadow-sm">

          {/* Toolbar — Export Buttons */}
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap relative">
              {/* Column Visibility */}
              <div className="relative">
                <button
                  onClick={() => setShowColumnMenu(!showColumnMenu)}
                  className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <FaColumns size={14} />
                  Column Visibility
                  <RiArrowDropDownLine size={16} />
                </button>
                {showColumnMenu && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 w-56 py-2">
                    {[
                      { key: 'srNo', label: 'Sr. No' },
                      { key: 'vehicleType', label: 'Vehicle Type' },
                      { key: 'capacity', label: 'Capacity' },
                      { key: 'dimensions', label: 'Dimensions' },
                      { key: 'wheels', label: 'Wheels & Axle' },
                      { key: 'status', label: 'Status' },
                      { key: 'actions', label: 'Actions' },
                    ].map(col => (
                      <label key={col.key} className="flex items-center gap-2 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleColumns[col.key]}
                          onChange={() => toggleColumn(col.key)}
                          className="rounded border-gray-300"
                        />
                        {col.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Copy */}
              <button className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <FaCopy size={12} />
                Copy
              </button>

              {/* Excel */}
              <button className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <FaFileExcel size={12} />
                Excel
              </button>

              {/* CSV */}
              <button className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <FaFileCsv size={12} />
                CSV
              </button>

              {/* PDF */}
              <button className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <FaFilePdf size={12} />
                PDF
              </button>

              {/* Print */}
              <button className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <FaPrint size={12} />
                Print
              </button>
            </div>
          </div>

          {/* ✅ Entries Info + Search — Fixed 20 per page */}
          <div className="px-5 py-3 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="font-medium">20</span>
              <span>entries per page</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Search:</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 w-52"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {visibleColumns.srNo && (
                    <th className="w-12 px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">↕</span>
                        Sr.
                      </div>
                    </th>
                  )}
                  {visibleColumns.vehicleType && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">↕</span>
                        Vehicle Type
                      </div>
                    </th>
                  )}
                  {visibleColumns.capacity && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">↕</span>
                        Capacity
                      </div>
                    </th>
                  )}
                  {visibleColumns.dimensions && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">↕</span>
                        Dimensions (L x W x H)
                      </div>
                    </th>
                  )}
                  {visibleColumns.wheels && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">↕</span>
                        Wheels & Axle
                      </div>
                    </th>
                  )}
                  {visibleColumns.status && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">↕</span>
                        Status
                      </div>
                    </th>
                  )}
                  {visibleColumns.actions && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pageData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-12 text-center text-sm text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <FaFilter size={24} className="text-gray-300" />
                        <span className="font-medium text-gray-600">No vehicle types found</span>
                        <span className="text-xs text-gray-400">Try adjusting your filters</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pageData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      {visibleColumns.srNo && (
                        <td className="px-4 py-4 text-sm text-gray-500">{startIndex + index + 1}</td>
                      )}
                      {visibleColumns.vehicleType && (
                        <td className="px-4 py-4 text-sm font-medium text-gray-800">{item.vehicleType}</td>
                      )}
                      {visibleColumns.capacity && (
                        <td className="px-4 py-4 text-sm text-gray-600">{item.capacity}</td>
                      )}
                      {visibleColumns.dimensions && (
                        <td className="px-4 py-4 text-sm text-gray-600">{item.dimensions}</td>
                      )}
                      {visibleColumns.wheels && (
                        <td className="px-4 py-4 text-sm text-gray-600">{item.wheels}</td>
                      )}
                      {visibleColumns.status && (
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 inline-flex items-center text-xs font-semibold rounded-md ${statusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      )}
                      {visibleColumns.actions && (
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(item)}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer"
                              title="Edit"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => { setDeletingItem(item); setShowDeleteModal(true); }}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              title="Delete"
                            >
                              <FaTrash size={14} />
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

          {/* ✅ Footer — Pagination with sliding window */}
          <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm text-gray-500">
              Showing {filteredData.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
            </div>
            {totalPages > 1 && (
              <div className="flex gap-1.5 flex-wrap items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                >
                  Previous
                </button>
                {getPageWindow().map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1.5 border rounded text-sm cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* ADD MODAL */}
      {/* ============================================ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add Vehicle Type</h2>
                <p className="text-sm text-gray-500 mt-0.5">Fill in the details to add a new vehicle type</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100">
                <IoClose size={22} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.vehicleType}
                  onChange={(e) => handleFormChange('vehicleType', e.target.value)}
                  placeholder="e.g. Heavy Truck"
                  className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.vehicleType ? 'border-red-400' : 'border-gray-300'}`}
                />
                {formErrors.vehicleType && <span className="text-xs text-red-500">{formErrors.vehicleType}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.capacity}
                  onChange={(e) => handleFormChange('capacity', e.target.value)}
                  placeholder="e.g. 20 Tons"
                  className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.capacity ? 'border-red-400' : 'border-gray-300'}`}
                />
                {formErrors.capacity && <span className="text-xs text-red-500">{formErrors.capacity}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Dimensions (L x W x H) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => handleFormChange('dimensions', e.target.value)}
                  placeholder="e.g. 32 x 8 x 10 ft"
                  className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.dimensions ? 'border-red-400' : 'border-gray-300'}`}
                />
                {formErrors.dimensions && <span className="text-xs text-red-500">{formErrors.dimensions}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Wheels & Axle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.wheels}
                  onChange={(e) => handleFormChange('wheels', e.target.value)}
                  placeholder="e.g. 10 Wheels / 2 Axle"
                  className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.wheels ? 'border-red-400' : 'border-gray-300'}`}
                />
                {formErrors.wheels && <span className="text-xs text-red-500">{formErrors.wheels}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">Status</label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                    className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                    <RiArrowDropDownLine size={20} />
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Add Vehicle Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* EDIT MODAL */}
      {/* ============================================ */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={() => { setShowEditModal(false); setEditingItem(null); resetForm(); }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Edit Vehicle Type</h2>
                <p className="text-sm text-gray-500 mt-0.5">Update the vehicle type details</p>
              </div>
              <button onClick={() => { setShowEditModal(false); setEditingItem(null); resetForm(); }} className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100">
                <IoClose size={22} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.vehicleType}
                  onChange={(e) => handleFormChange('vehicleType', e.target.value)}
                  className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.vehicleType ? 'border-red-400' : 'border-gray-300'}`}
                />
                {formErrors.vehicleType && <span className="text-xs text-red-500">{formErrors.vehicleType}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.capacity}
                  onChange={(e) => handleFormChange('capacity', e.target.value)}
                  className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.capacity ? 'border-red-400' : 'border-gray-300'}`}
                />
                {formErrors.capacity && <span className="text-xs text-red-500">{formErrors.capacity}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Dimensions (L x W x H) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => handleFormChange('dimensions', e.target.value)}
                  className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.dimensions ? 'border-red-400' : 'border-gray-300'}`}
                />
                {formErrors.dimensions && <span className="text-xs text-red-500">{formErrors.dimensions}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Wheels & Axle <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.wheels}
                  onChange={(e) => handleFormChange('wheels', e.target.value)}
                  className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.wheels ? 'border-red-400' : 'border-gray-300'}`}
                />
                {formErrors.wheels && <span className="text-xs text-red-500">{formErrors.wheels}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">Status</label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                    className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                    <RiArrowDropDownLine size={20} />
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setEditingItem(null); resetForm(); }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ============================================ */}
      {showDeleteModal && deletingItem && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={() => { setShowDeleteModal(false); setDeletingItem(null); }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <FaTrash className="text-red-600" size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-900 text-center">Delete Vehicle Type?</h2>
              <p className="text-sm text-gray-500 text-center mt-2">
                Are you sure you want to delete <strong>{deletingItem.vehicleType}</strong>? This action cannot be undone.
              </p>

              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => { setShowDeleteModal(false); setDeletingItem(null); }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for arrow up
function FaArrowUpFallback() {
  return <span className="mr-1">↑</span>;
}

export default Vehicles;