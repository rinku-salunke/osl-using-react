import React, { useState, useMemo } from 'react';
import { MdOutlineClear, MdFormatListBulleted, MdOutlineArrowDropDown } from "react-icons/md";
import { IoPersonAddSharp, IoTrendingDownSharp, IoLocation, IoTodaySharp } from "react-icons/io5";
import { RiAlertFill, RiArrowDropDownLine, RiExpandUpDownFill, RiRestartLine } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { BsBoxes, BsExclamationTriangleFill, BsCircleFill, BsSliders } from "react-icons/bs";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import {
  FaClipboardList,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaUserPlus,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaStar,
  FaEye
} from 'react-icons/fa';
import { ImDownload3 } from "react-icons/im";
import { FaCopy, FaFilter } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";

function Clients() {
  const allClients = [
    { id: 'CL-001', name: 'Acme Corporation', email: 'contact@acme.com', phone: '+91 98765 43210', category: 'Retail', city: 'Mumbai', orders: 342, revenue: '₹24.5L', status: 'Active', joined: 'Jan 15, 2022', rating: 4.8 },
    { id: 'CL-002', name: 'Global Industries', email: 'orders@global.com', phone: '+91 98765 43211', category: 'Wholesale', city: 'Delhi', orders: 256, revenue: '₹18.2L', status: 'Active', joined: 'Mar 22, 2022', rating: 4.6 },
    { id: 'CL-003', name: 'StarTech Solutions', email: 'logistics@startech.com', phone: '+91 98765 43212', category: 'Enterprise', city: 'Bangalore', orders: 189, revenue: '₹12.8L', status: 'Active', joined: 'Jun 10, 2022', rating: 4.9 },
    { id: 'CL-004', name: 'TechFlow Enterprises', email: 'shipping@techflow.com', phone: '+91 98765 43213', category: 'Enterprise', city: 'Chennai', orders: 167, revenue: '₹10.4L', status: 'Active', joined: 'Aug 05, 2022', rating: 4.7 },
    { id: 'CL-005', name: 'Prime Logistics', email: 'info@primelogistics.com', phone: '+91 98765 43214', category: 'Retail', city: 'Pune', orders: 145, revenue: '₹8.9L', status: 'Active', joined: 'Sep 18, 2022', rating: 4.5 },
    { id: 'CL-006', name: 'Swift Transport', email: 'contact@swifttransport.com', phone: '+91 98765 43215', category: 'Wholesale', city: 'Hyderabad', orders: 132, revenue: '₹7.6L', status: 'Inactive', joined: 'Nov 02, 2022', rating: 4.3 },
    { id: 'CL-007', name: 'Apex Distributors', email: 'sales@apexdist.com', phone: '+91 98765 43216', category: 'Wholesale', city: 'Kolkata', orders: 98, revenue: '₹6.2L', status: 'Active', joined: 'Jan 20, 2023', rating: 4.4 },
    { id: 'CL-008', name: 'Vertex Trading Co.', email: 'orders@vertex.com', phone: '+91 98765 43217', category: 'Retail', city: 'Ahmedabad', orders: 87, revenue: '₹5.4L', status: 'Active', joined: 'Feb 14, 2023', rating: 4.6 },
    { id: 'CL-009', name: 'Nexus Corp', email: 'hello@nexuscorp.com', phone: '+91 98765 43218', category: 'Enterprise', city: 'Jaipur', orders: 76, revenue: '₹4.8L', status: 'Inactive', joined: 'Apr 08, 2023', rating: 4.2 },
    { id: 'CL-010', name: 'Unity Retail', email: 'support@unityretail.com', phone: '+91 98765 43219', category: 'Retail', city: 'Surat', orders: 65, revenue: '₹3.9L', status: 'Active', joined: 'May 25, 2023', rating: 4.7 },
    { id: 'CL-011', name: 'Pioneer Imports', email: 'imports@pioneer.com', phone: '+91 98765 43220', category: 'Wholesale', city: 'Kochi', orders: 54, revenue: '₹3.2L', status: 'Active', joined: 'Jul 12, 2023', rating: 4.5 },
    { id: 'CL-012', name: 'Summit Wholesale', email: 'sales@summit.com', phone: '+91 98765 43221', category: 'Wholesale', city: 'Lucknow', orders: 43, revenue: '₹2.6L', status: 'Inactive', joined: 'Sep 03, 2023', rating: 4.1 },
  ];

  // ============================================================
  // ALL ACTIVITIES DATASET (for View All modal)
  // ============================================================
  const allActivities = [
    { id: 1, type: 'client', title: 'New client registered', description: 'TechFlow Enterprises added to client database', time: '2 minutes ago' },
    { id: 2, type: 'updated', title: 'Client profile updated', description: 'Acme Corporation contact details revised', time: '15 minutes ago' },
    { id: 3, type: 'order', title: 'Bulk order placed', description: 'StarTech Solutions placed order of 25 packages', time: '1 hour ago' },
    { id: 4, type: 'alert', title: 'Payment overdue', description: 'Swift Transport has pending payment of ₹45,000', time: '3 hours ago' },
    { id: 5, type: 'client', title: 'Enterprise upgrade', description: 'Global Industries upgraded to Enterprise plan', time: '5 hours ago' },
    { id: 6, type: 'updated', title: 'Contact information updated', description: 'Prime Logistics changed primary contact', time: '8 hours ago' },
    { id: 7, type: 'order', title: 'Recurring order scheduled', description: 'Apex Distributors set up weekly orders', time: '1 day ago' },
    { id: 8, type: 'alert', title: 'Account inactive', description: 'Nexus Corp not active since 3 months', time: '1 day ago' },
    { id: 9, type: 'client', title: 'New client onboarded', description: 'Unity Retail completed KYC verification', time: '2 days ago' },
    { id: 10, type: 'updated', title: 'Contract renewed', description: 'Vertex Trading renewed annual contract', time: '3 days ago' },
  ];

  // Icon renderer for activities
  const renderActivityIcon = (type) => {
    const baseClasses = "rounded-full p-1.5 mt-0.5 flex-shrink-0";
    switch (type) {
      case 'client':
        return <div className={`${baseClasses} bg-green-100 text-green-700`}><FaUserPlus className="w-4 h-4" /></div>;
      case 'updated':
        return <div className={`${baseClasses} bg-blue-100 text-blue-700`}><FaCheck className="w-4 h-4" /></div>;
      case 'order':
        return <div className={`${baseClasses} bg-purple-100 text-purple-700`}><FaClipboardList className="w-4 h-4" /></div>;
      case 'alert':
        return <div className={`${baseClasses} bg-orange-100 text-orange-700`}><RiAlertFill className="w-4 h-4" /></div>;
      default:
        return <div className={`${baseClasses} bg-gray-100 text-gray-700`}><FaCheck className="w-4 h-4" /></div>;
    }
  };

  // ============================================================
  // FILTER STATES
  // ============================================================
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const [orderRangeFilter, setOrderRangeFilter] = useState('All Ranges');
  const [revenueFilter, setRevenueFilter] = useState('All Revenue');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [clientSearch, setClientSearch] = useState('');

  // View All Activities modal state
  const [showAllActivitiesModal, setShowAllActivitiesModal] = useState(false);
  const [activitySearchQuery, setActivitySearchQuery] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');

  // Filter activities
  const filteredActivities = useMemo(() => {
    let result = [...allActivities];
    if (activityTypeFilter !== 'all') {
      result = result.filter(a => a.type === activityTypeFilter);
    }
    if (activitySearchQuery.trim()) {
      const q = activitySearchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activitySearchQuery, activityTypeFilter]);

  // ============================================================
  // RESET ADVANCED FILTERS
  // ============================================================
  const handleResetAdvancedFilters = () => {
    setOrderRangeFilter('All Ranges');
    setRevenueFilter('All Revenue');
    setRatingFilter('All Ratings');
    setClientSearch('');
  };

  const hasActiveAdvancedFilters =
    orderRangeFilter !== 'All Ranges' ||
    revenueFilter !== 'All Revenue' ||
    ratingFilter !== 'All Ratings' ||
    clientSearch.trim() !== '';

  // ============================================================
  // FILTERED CLIENTS
  // ============================================================
  const filteredClients = useMemo(() => {
    let result = [...allClients];

    if (categoryFilter !== 'All Categories') {
      result = result.filter(c => c.category === categoryFilter);
    }

    if (locationFilter !== 'All Locations') {
      result = result.filter(c => c.city === locationFilter);
    }

    if (statusFilter !== 'All Status') {
      result = result.filter(c => c.status === statusFilter);
    }

    if (orderRangeFilter !== 'All Ranges') {
      result = result.filter(c => {
        switch (orderRangeFilter) {
          case '0 - 50 orders': return c.orders < 50;
          case '50 - 150 orders': return c.orders >= 50 && c.orders < 150;
          case '150 - 250 orders': return c.orders >= 150 && c.orders < 250;
          case '250+ orders': return c.orders >= 250;
          default: return true;
        }
      });
    }

    if (revenueFilter !== 'All Revenue') {
      result = result.filter(c => {
        const rev = parseFloat(c.revenue.replace(/[₹L]/g, ''));
        switch (revenueFilter) {
          case '0 - 5L': return rev < 5;
          case '5 - 10L': return rev >= 5 && rev < 10;
          case '10 - 20L': return rev >= 10 && rev < 20;
          case '20L+': return rev >= 20;
          default: return true;
        }
      });
    }

    if (ratingFilter !== 'All Ratings') {
      result = result.filter(c => {
        switch (ratingFilter) {
          case '4.5+ stars': return c.rating >= 4.5;
          case '4.0 - 4.5 stars': return c.rating >= 4.0 && c.rating < 4.5;
          case 'Below 4.0': return c.rating < 4.0;
          default: return true;
        }
      });
    }

    if (clientSearch.trim()) {
      const q = clientSearch.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }

    return result;
  }, [
    categoryFilter, locationFilter, statusFilter,
    orderRangeFilter, revenueFilter, ratingFilter, clientSearch
  ]);

  // ============================================================
  // PAGINATION
  // ============================================================
  const ITEMS_PER_PAGE = 10;
  const MAX_VISIBLE_PAGES = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredClients.length / ITEMS_PER_PAGE));

  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    categoryFilter, locationFilter, statusFilter,
    orderRangeFilter, revenueFilter, ratingFilter, clientSearch
  ]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const clientData = filteredClients.slice(startIndex, endIndex);

  // ============================================================
  // NEW CLIENT MODAL STATE
  // ============================================================
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    name: '', email: '', phone: '', category: 'Retail',
    city: '', address: '', gst: '', notes: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleFormChange = (field, value) => {
    setNewClientForm(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newClientForm.name.trim()) errors.name = 'Client name is required';
    if (!newClientForm.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newClientForm.email)) errors.email = 'Email is invalid';
    if (!newClientForm.phone.trim()) errors.phone = 'Phone is required';
    if (!newClientForm.city.trim()) errors.city = 'City is required';
    return errors;
  };

  const handleSubmitNewClient = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    console.log('New Client Created:', newClientForm);
    setShowNewClientModal(false);
    setNewClientForm({ name: '', email: '', phone: '', category: 'Retail', city: '', address: '', gst: '', notes: '' });
    setFormErrors({});
  };

  const handleCloseModal = () => { setShowNewClientModal(false); setFormErrors({}); };

  // Close activities modal + reset filters
  const handleCloseActivitiesModal = () => {
    setShowAllActivitiesModal(false);
    setActivitySearchQuery('');
    setActivityTypeFilter('all');
  };

  const handleClearAll = () => {
    setCategoryFilter('All Categories');
    setLocationFilter('All Locations');
    setStatusFilter('All Status');
    handleResetAdvancedFilters();
    setCurrentPage(1);
  };

  const goToPage = (page) => { if (page < 1 || page > totalPages) return; setCurrentPage(page); };
  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  const getPageWindow = () => {
    let start = currentPage - Math.floor(MAX_VISIBLE_PAGES / 2);
    if (start < 1) start = 1;
    let end = start + MAX_VISIBLE_PAGES - 1;
    if (end > totalPages) { end = totalPages; start = Math.max(1, end - MAX_VISIBLE_PAGES + 1); }
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const categoryColor = (category) => {
    switch (category) {
      case 'Retail': return 'bg-blue-100 text-blue-700';
      case 'Wholesale': return 'bg-purple-100 text-purple-700';
      case 'Enterprise': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const avatarColors = [
    'bg-blue-100 text-blue-600',
    'bg-green-100 text-green-600',
    'bg-purple-100 text-purple-600',
    'bg-orange-100 text-orange-600',
    'bg-pink-100 text-pink-600',
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-300 flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-black text-2xl">Client Management</h1>
          <span className="text-sm text-gray-500 mt-1">Manage and track all your clients and their orders</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium cursor-pointer inline-flex items-center gap-2 hover:bg-gray-50">
            <ImDownload3 size={14} />
            Export
          </span>
          <button
            onClick={() => setShowNewClientModal(true)}
            className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:opacity-90"
          >
            + New Client
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="border-b border-gray-200 py-3 px-6 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-40 hover:border-gray-300">
            <FaBuilding size={14} className="text-gray-500 flex-shrink-0" />
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 text-sm w-full pr-6">
              <option>All Categories</option>
              <option>Retail</option>
              <option>Wholesale</option>
              <option>Enterprise</option>
            </select>
            <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
              <RiArrowDropDownLine size={20} />
            </span>
          </div>

          <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-40 hover:border-gray-300">
            <IoLocation size={16} className="text-gray-500 flex-shrink-0" />
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 text-sm w-full pr-6">
              <option>All Locations</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Pune</option>
              <option>Kolkata</option>
              <option>Hyderabad</option>
            </select>
            <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
              <RiArrowDropDownLine size={20} />
            </span>
          </div>

          <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-40 hover:border-gray-300">
            <FaFilter size={14} className="text-gray-500 flex-shrink-0" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 text-sm w-full pr-6">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
              <RiArrowDropDownLine size={20} />
            </span>
          </div>
          <button onClick={handleClearAll} className="text-gray-600 hover:text-gray-900 flex items-center gap-1.5 text-sm ml-1 cursor-pointer">
            Clear all <MdOutlineClear size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <div className="p-2 bg-white shadow-sm rounded-md text-blue-700">
              <MdFormatListBulleted size={14} />
            </div>
            <div className="p-2 text-gray-500 rounded-md">
              <BsBoxes size={14} />
            </div>
          </div>
          <div className="p-2 text-gray-500">
            <HiOutlineRefresh size={14} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 bg-gray-50 space-y-8">

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Total Clients</div>
              <div className="text-2xl font-bold text-gray-800 my-1">{filteredClients.length}</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <FaArrowUp size={10} className="mr-1" />
                12% from last month
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-blue-900">
              <FaUsers size={20} />
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Active Clients</div>
              <div className="text-2xl font-bold text-gray-800 my-1">
                {filteredClients.filter(c => c.status === 'Active').length}
              </div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <FaArrowUp size={10} className="mr-1" />
                5% from last month
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <FaCheckCircle size={20} />
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">New This Month</div>
              <div className="text-2xl font-bold text-gray-800 my-1">8</div>
              <div className="flex items-center text-xs text-blue-600 font-medium">
                <FaArrowUp size={10} className="mr-1" />
                15% from last month
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg text-orange-500">
              <FaUserPlus size={20} />
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Avg Rating</div>
              <div className="text-2xl font-bold text-gray-800 my-1">4.6</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <FaArrowUp size={10} className="mr-1" />
                0.2 from last month
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
              <FaStar size={20} />
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-300">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-800">Advanced Filters</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetAdvancedFilters}
                disabled={!hasActiveAdvancedFilters}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${hasActiveAdvancedFilters
                  ? 'text-red-600 hover:text-red-700 cursor-pointer'
                  : 'text-gray-300 cursor-not-allowed'
                  }`}
                title={hasActiveAdvancedFilters ? 'Reset advanced filters' : 'No active filters'}
              >
                <RiRestartLine size={14} />
                Reset
              </button>
              <button
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                className="flex items-center gap-1.5 text-xs font-medium text-dark-navy-blue"
              >
                <BsSliders size={16} className="text-dark-navy-blue" />
                More Options
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-4">
            <div className="flex-1 min-w-[140px] flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Order Range</label>
              <div className="relative">
                <select
                  value={orderRangeFilter}
                  onChange={(e) => setOrderRangeFilter(e.target.value)}
                  className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                >
                  <option>All Ranges</option>
                  <option>0 - 50 orders</option>
                  <option>50 - 150 orders</option>
                  <option>150 - 250 orders</option>
                  <option>250+ orders</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[140px] flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Revenue</label>
              <div className="relative">
                <select
                  value={revenueFilter}
                  onChange={(e) => setRevenueFilter(e.target.value)}
                  className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                >
                  <option>All Revenue</option>
                  <option>0 - 5L</option>
                  <option>5 - 10L</option>
                  <option>10 - 20L</option>
                  <option>20L+</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[140px] flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Rating</label>
              <div className="relative">
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                >
                  <option>All Ratings</option>
                  <option>4.5+ stars</option>
                  <option>4.0 - 4.5 stars</option>
                  <option>Below 4.0</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[140px] flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Search Client</label>
              <input
                type="text"
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                placeholder="Name, email, city..."
                className="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none bg-white"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-300 rounded-md bg-white shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-end gap-5 flex-wrap">
            <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600">
              <FaUserPlus size={14} />
              Bulk Invite
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600">
              <ImDownload3 size={14} />
              Export Selected
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={handlePrev} disabled={currentPage === 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed">
                <FaChevronLeft size={12} />
              </button>
              <button onClick={handleNext} disabled={currentPage === totalPages} className="text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed">
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>

          <table className="w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-[6%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">Sr.No</th>
                <th scope="col" className="w-[22%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Client <RiExpandUpDownFill size={12} /></div>
                </th>
                <th scope="col" className="w-[14%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Category <RiExpandUpDownFill size={12} /></div>
                </th>
                <th scope="col" className="w-[14%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Location <MdOutlineArrowDropDown size={16} /></div>
                </th>
                <th scope="col" className="w-[10%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Orders <RiExpandUpDownFill size={12} /></div>
                </th>
                <th scope="col" className="w-[12%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">Revenue</th>
                <th scope="col" className="w-[12%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Rating</div>
                </th>
                <th scope="col" className="w-[10%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Status <RiExpandUpDownFill size={12} /></div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-3 py-12 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <FaFilter size={24} className="text-gray-300" />
                      <span className="font-medium text-gray-600">No clients match your filters</span>
                      <span className="text-xs text-gray-400">Try adjusting or clearing filters</span>
                      <button onClick={handleClearAll} className="mt-2 text-xs text-blue-900 hover:underline font-medium">
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                clientData.map((client, index) => {
                  const initials = getInitials(client.name);
                  const avatarColor = avatarColors[index % avatarColors.length];

                  return (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="w-[6%] px-3 py-5 whitespace-nowrap text-left text-sm text-gray-500">{startIndex + index + 1}</td>
                      <td className="w-[22%] px-3 py-5 text-sm text-gray-700">
                        <div className="flex items-center gap-2.5">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarColor}`}>
                            {initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-gray-900 text-sm font-medium truncate">{client.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5 truncate">{client.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="w-[14%] px-3 py-5 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex items-center text-xs leading-3 font-semibold rounded-full ${categoryColor(client.category)}`}>
                          {client.category}
                        </span>
                      </td>
                      <td className="w-[14%] px-3 py-5 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <IoLocation size={12} className="text-gray-400 flex-shrink-0" />
                          <span className="truncate">{client.city}</span>
                        </div>
                      </td>
                      <td className="w-[10%] px-3 py-5 whitespace-nowrap text-sm text-gray-800 font-medium">
                        {client.orders}
                      </td>
                      <td className="w-[12%] px-3 py-5 whitespace-nowrap text-sm text-gray-800 font-medium">
                        {client.revenue}
                      </td>
                      <td className="w-[12%] px-3 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" size={12} />
                          <span className="text-sm font-medium text-gray-800">{client.rating}</span>
                        </div>
                      </td>
                      <td className="w-[10%] px-3 py-5 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex items-center text-xs leading-3 font-semibold rounded-full ${statusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <div className="px-5 py-4 border-t border-gray-300 flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm text-gray-500">
              {filteredClients.length === 0
                ? 'No results'
                : `Showing ${startIndex + 1} to ${Math.min(endIndex, filteredClients.length)} of ${filteredClients.length} results`
              }
            </div>
            {totalPages > 1 && (
              <div className="flex gap-1.5 flex-wrap items-center">
                <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50">
                  Previous
                </button>
                {getPageWindow().map((page) => (
                  <button key={page} onClick={() => goToPage(page)} className={`px-3 py-1.5 border rounded text-sm transition-colors ${currentPage === page ? 'bg-blue-900 text-white border-blue-900' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                    {page}
                  </button>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-white p-6 border border-gray-300 rounded-md">
          <div className='flex justify-between items-center mb-5'>
            <h3 className="text-base font-bold text-black">Top Clients</h3>
            <button className='flex items-center gap-1.5 text-blue-900 text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity' type="button">
              <FaEye size={16} />
              View All
            </button>
          </div>

          <div className="flex flex-wrap gap-5">
            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <FaUsers className="text-blue-700" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">Acme Corporation</div>
                    <div className="text-xs text-gray-500 mt-0.5">Retail</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Top 1</span>
              </div>
              <div className="mt-4 space-y-2.5 text-sm pt-4 border-t border-gray-100">
                <div className="flex justify-between"><span className="text-gray-500">Orders:</span> <span className="text-gray-900 font-medium">342</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Revenue:</span> <span className="text-gray-900 font-medium">₹24.5L</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Rating:</span> <span className="text-gray-900 font-medium flex items-center gap-1">4.8 <FaStar className="text-yellow-400" size={10} /></span></div>
              </div>
              <button className="mt-5 w-full bg-blue-900 text-white text-sm font-medium py-2 rounded-lg transition-colors shadow-sm hover:shadow">
                View Client
              </button>
            </div>

            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                    <FaUsers className="text-purple-700" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">Global Industries</div>
                    <div className="text-xs text-gray-500 mt-0.5">Wholesale</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">Top 2</span>
              </div>
              <div className="mt-4 space-y-2.5 text-sm pt-4 border-t border-gray-100">
                <div className="flex justify-between"><span className="text-gray-500">Orders:</span> <span className="text-gray-900 font-medium">256</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Revenue:</span> <span className="text-gray-900 font-medium">₹18.2L</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Rating:</span> <span className="text-gray-900 font-medium flex items-center gap-1">4.6 <FaStar className="text-yellow-400" size={10} /></span></div>
              </div>
              <button className="mt-5 w-full bg-blue-900 text-white text-sm font-medium py-2 rounded-lg transition-colors shadow-sm hover:shadow">
                View Client
              </button>
            </div>

            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <FaUsers className="text-green-700" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">StarTech Solutions</div>
                    <div className="text-xs text-gray-500 mt-0.5">Enterprise</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">Top 3</span>
              </div>
              <div className="mt-4 space-y-2.5 text-sm pt-4 border-t border-gray-100">
                <div className="flex justify-between"><span className="text-gray-500">Orders:</span> <span className="text-gray-900 font-medium">189</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Revenue:</span> <span className="text-gray-900 font-medium">₹12.8L</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Rating:</span> <span className="text-gray-900 font-medium flex items-center gap-1">4.9 <FaStar className="text-yellow-400" size={10} /></span></div>
              </div>
              <button className="mt-5 w-full bg-blue-900 text-white text-sm font-medium py-2 rounded-lg transition-colors shadow-sm hover:shadow">
                View Client
              </button>
            </div>
          </div>
        </div>

        {/* Client Distribution */}
        <div className="bg-white p-6 border border-gray-300 rounded-md shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-800">Client Distribution</h3>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Live Data
              </span>
              <button className="text-sm text-dark-navy-blue hover:underline flex items-center gap-1.5 font-medium">
                <FaMapMarkedAlt size={14} />
                Full View
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-6 h-64 flex flex-col items-center justify-center relative border border-none">
              <div className="absolute top-10 left-12 w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
              <div className="absolute bottom-16 left-28 w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
              <div className="absolute top-16 right-20 w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>

              <FaMapMarkerAlt size={40} className="text-gray-400 mb-3" />
              <div className="font-semibold text-gray-700 text-sm">Client Map View</div>
              <div className="text-sm text-gray-500 mt-1">Geographic distribution</div>
            </div>

            <div className="space-y-5">
              <h4 className="text-base font-bold text-gray-800">By Category</h4>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">Retail Clients</div>
                      <div className="text-xs text-gray-500 mt-0.5">4 clients</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">33%</span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">Wholesale Clients</div>
                      <div className="text-xs text-gray-500 mt-0.5">4 clients</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">33%</span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">Enterprise Clients</div>
                      <div className="text-xs text-gray-500 mt-0.5">4 clients</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">34%</span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '34%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="bg-white border border-gray-300 rounded-md p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-base text-gray-800">Client Analytics</h2>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center gap-1.5 bg-gray-50 border border-gray-300 rounded-md px-2.5 py-1 hover:border-gray-400 transition-colors">
                <select className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer pr-4 text-gray-700 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 14 days</option>
                  <option>Last 30 days</option>
                </select>
                <span className="pointer-events-none text-gray-400 text-[9px] absolute right-1.5">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
              <button className="text-blue-900 text-sm flex items-center gap-1.5">
                <ImDownload3 size={14} />
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-blue-100 rounded-lg p-5 border border-blue-100 text-center">
              <div className="text-2xl font-bold text-blue-900">92.4%</div>
              <div className="text-sm font-medium text-gray-700 mt-1.5">Retention Rate</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-semibold flex justify-center">
                <FaArrowUp size={12} />
                <span>+3.1%</span>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-5 border border-green-100 text-center">
              <div className="text-2xl font-bold text-green-700">4.6</div>
              <div className="text-sm font-medium text-gray-700 mt-1.5">Avg Rating</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-semibold flex justify-center">
                <FaArrowUp size={12} />
                <span>+0.2</span>
              </div>
            </div>
            <div className="bg-orange-100 rounded-lg p-5 border border-orange-100 text-center">
              <div className="text-2xl font-bold text-orange-600">3.2%</div>
              <div className="text-sm font-medium text-gray-700 mt-1.5">Churn Rate</div>
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm font-semibold flex justify-center">
                <FaArrowDown size={12} />
                <span>-0.5%</span>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-5 border border-purple-100 text-center">
              <div className="text-2xl font-bold text-purple-700">₹1.2Cr</div>
              <div className="text-sm font-medium text-gray-700 mt-1.5">Total Revenue</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-semibold flex justify-center">
                <FaArrowUp size={12} />
                <span>+18%</span>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-gray-50 border border-none rounded-lg h-48 flex flex-col items-center justify-center gap-1.5">
            <IoTrendingDownSharp className="text-gray-400 w-6 h-6" />
            <span className="text-sm font-medium text-gray-500">Client Trends Chart</span>
            <span className="text-xs text-gray-400">monthly client acquisition metrics</span>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-gray-300 rounded-md p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-base text-gray-800">Recent Client Activities</h2>
            <button
              onClick={() => setShowAllActivitiesModal(true)}
              className="flex items-center gap-1.5 text-blue-900 hover:text-purple-800 text-sm font-medium cursor-pointer"
            >
              <GrView className="w-4 h-4" />
              View all
            </button>
          </div>

          <div className="space-y-4">
            {allActivities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start p-5 bg-gray-50 rounded-md">
                {renderActivityIcon(activity.type)}
                <div>
                  <div className="font-semibold text-sm text-gray-800">{activity.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{activity.description}</div>
                  <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* ALL ACTIVITIES MODAL (View All) */}
      {/* ============================================ */}
      {showAllActivitiesModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          onClick={handleCloseActivitiesModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">All Client Activities</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Showing {filteredActivities.length} of {allActivities.length} activities
                </p>
              </div>
              <button
                onClick={handleCloseActivitiesModal}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
              >
                <IoClose size={22} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="relative mb-4">
                <input
                  type="text"
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                  placeholder="Search activities..."
                  className="w-full text-sm text-gray-700 border border-gray-300 rounded-md pl-4 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700 border-gray-200' },
                  { key: 'client', label: 'New Clients', color: 'bg-green-100 text-green-700 border-green-200' },
                  { key: 'updated', label: 'Updates', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                  { key: 'order', label: 'Orders', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                  { key: 'alert', label: 'Alerts', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                ].map((chip) => (
                  <button
                    key={chip.key}
                    onClick={() => setActivityTypeFilter(chip.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${activityTypeFilter === chip.key
                      ? `${chip.color} ring-2 ring-offset-1 ring-blue-300`
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {filteredActivities.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <GrView size={32} className="text-gray-300" />
                    <span className="font-medium text-gray-600 text-sm">No activities found</span>
                    <span className="text-xs text-gray-400">Try a different search or filter</span>
                    <button
                      onClick={() => { setActivitySearchQuery(''); setActivityTypeFilter('all'); }}
                      className="mt-2 text-xs text-blue-900 hover:underline font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 items-start p-5 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      {renderActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-800">{activity.title}</div>
                        <div className="text-xs text-gray-600 mt-1">{activity.description}</div>
                        <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between flex-wrap gap-3 bg-gray-50">
              <div className="text-sm text-gray-500">
                Showing {filteredActivities.length} activities
              </div>
              <button
                onClick={handleCloseActivitiesModal}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW CLIENT MODAL */}
      {showNewClientModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add New Client</h2>
                <p className="text-sm text-gray-500 mt-0.5">Fill in the details to add a new client</p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100">
                <IoClose size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmitNewClient} className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-900 rounded-full"></span>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newClientForm.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      placeholder="e.g. Acme Corporation"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.name ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.name && <span className="text-xs text-red-500">{formErrors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={newClientForm.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="e.g. contact@acme.com"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.email ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.email && <span className="text-xs text-red-500">{formErrors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={newClientForm.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.phone ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.phone && <span className="text-xs text-red-500">{formErrors.phone}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">Category</label>
                    <div className="relative">
                      <select
                        value={newClientForm.category}
                        onChange={(e) => handleFormChange('category', e.target.value)}
                        className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-900 bg-white cursor-pointer"
                      >
                        <option>Retail</option>
                        <option>Wholesale</option>
                        <option>Enterprise</option>
                      </select>
                      <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                        <RiArrowDropDownLine size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-900 rounded-full"></span>
                  Address Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newClientForm.city}
                      onChange={(e) => handleFormChange('city', e.target.value)}
                      placeholder="e.g. Mumbai"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.city ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.city && <span className="text-xs text-red-500">{formErrors.city}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">GST Number</label>
                    <input
                      type="text"
                      value={newClientForm.gst}
                      onChange={(e) => handleFormChange('gst', e.target.value)}
                      placeholder="e.g. 27ABCDE1234F1Z5"
                      className="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-medium text-gray-600">Full Address</label>
                    <input
                      type="text"
                      value={newClientForm.address}
                      onChange={(e) => handleFormChange('address', e.target.value)}
                      placeholder="e.g. 123 Main Street, Andheri West"
                      className="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">Additional Notes</label>
                <textarea
                  rows={3}
                  value={newClientForm.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  placeholder="Any special notes about this client..."
                  className="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:opacity-90 transition-opacity"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;