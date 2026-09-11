import React, { useState, useMemo } from 'react';
import { MdOutlineClear, MdFormatListBulleted, MdOutlineArrowDropDown } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoPersonAddSharp, IoTrendingDownSharp, IoLocation, IoTodaySharp } from "react-icons/io5";
import { RiAlertFill, RiArrowDropDownLine, RiExpandUpDownFill, RiRestartLine } from "react-icons/ri";
import { LuChevronRight } from "react-icons/lu";
import { GrView } from "react-icons/gr";
import { BsBoxes, BsCheckCircleFill, BsExclamationTriangleFill, BsCircleFill, BsSliders } from "react-icons/bs";
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
  FaMapMarkerAlt
} from 'react-icons/fa';
import { ImDownload3 } from "react-icons/im";
import { FaCopy, FaFilter } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";

function Orders() {
  const allOrders = [
    { id: '#LG-2024-001247', client: 'Acme Corporation', date: 'Jan 15, 2024 09:30 AM', route: 'Mumbai → Delhi 850 km', priority: 'High', status: 'Pending' },
    { id: '#LG-2024-001246', client: 'Global Industries', date: 'Jan 15, 2024 08:15 AM', route: 'Chennai → Bangalore 350 km', priority: 'Medium', status: 'Assigned' },
    { id: '#LG-2024-001245', client: 'StarTech Solutions', date: 'Jan 14, 2024 03:45 PM', route: 'Pune → Hyderabad 560 km', priority: 'Low', status: 'Issue' },
    { id: '#LG-2024-001244', client: 'TechFlow Enterprises', date: 'Jan 14, 2024 11:20 AM', route: 'Kolkata → Bhubaneswar 440 km', priority: 'High', status: 'In Transit' },
    { id: '#LG-2024-001243', client: 'Acme Corporation', date: 'Jan 14, 2024 10:05 AM', route: 'Delhi → Jaipur 280 km', priority: 'Medium', status: 'Delivered' },
    { id: '#LG-2024-001242', client: 'Global Industries', date: 'Jan 14, 2024 09:40 AM', route: 'Mumbai → Pune 150 km', priority: 'Low', status: 'In Transit' },
    { id: '#LG-2024-001241', client: 'StarTech Solutions', date: 'Jan 13, 2024 06:30 PM', route: 'Bangalore → Chennai 350 km', priority: 'High', status: 'Pending' },
    { id: '#LG-2024-001240', client: 'TechFlow Enterprises', date: 'Jan 13, 2024 04:15 PM', route: 'Hyderabad → Pune 560 km', priority: 'Medium', status: 'Assigned' },
    { id: '#LG-2024-001239', client: 'Acme Corporation', date: 'Jan 13, 2024 02:00 PM', route: 'Delhi → Agra 230 km', priority: 'Low', status: 'Delivered' },
    { id: '#LG-2024-001238', client: 'Global Industries', date: 'Jan 13, 2024 11:30 AM', route: 'Ahmedabad → Surat 270 km', priority: 'High', status: 'In Transit' },
    { id: '#LG-2024-001237', client: 'StarTech Solutions', date: 'Jan 12, 2024 05:45 PM', route: 'Kolkata → Patna 580 km', priority: 'Medium', status: 'Issue' },
    { id: '#LG-2024-001236', client: 'TechFlow Enterprises', date: 'Jan 12, 2024 03:20 PM', route: 'Lucknow → Kanpur 80 km', priority: 'Low', status: 'Pending' },
    { id: '#LG-2024-001235', client: 'Acme Corporation', date: 'Jan 12, 2024 01:10 PM', route: 'Goa → Mangalore 320 km', priority: 'High', status: 'Assigned' },
    { id: '#LG-2024-001234', client: 'Global Industries', date: 'Jan 12, 2024 09:55 AM', route: 'Coimbatore → Kochi 190 km', priority: 'Medium', status: 'In Transit' },
    { id: '#LG-2024-001233', client: 'StarTech Solutions', date: 'Jan 11, 2024 07:25 PM', route: 'Nagpur → Indore 420 km', priority: 'Low', status: 'Delivered' },
    { id: '#LG-2024-001232', client: 'TechFlow Enterprises', date: 'Jan 11, 2024 04:40 PM', route: 'Vizag → Chennai 780 km', priority: 'High', status: 'Pending' },
    { id: '#LG-2024-001231', client: 'Acme Corporation', date: 'Jan 11, 2024 02:15 PM', route: 'Bhopal → Nagpur 350 km', priority: 'Medium', status: 'Assigned' },
    { id: '#LG-2024-001230', client: 'Global Industries', date: 'Jan 11, 2024 11:00 AM', route: 'Vadodara → Rajkot 240 km', priority: 'Low', status: 'In Transit' },
    { id: '#LG-2024-001229', client: 'StarTech Solutions', date: 'Jan 10, 2024 06:20 PM', route: 'Delhi → Chandigarh 250 km', priority: 'High', status: 'Issue' },
    { id: '#LG-2024-001228', client: 'TechFlow Enterprises', date: 'Jan 10, 2024 03:50 PM', route: 'Jaipur → Udaipur 400 km', priority: 'Medium', status: 'Delivered' },
    { id: '#LG-2024-001227', client: 'Acme Corporation', date: 'Jan 10, 2024 01:30 PM', route: 'Mumbai → Nashik 170 km', priority: 'Low', status: 'Pending' },
    { id: '#LG-2024-001226', client: 'Global Industries', date: 'Jan 10, 2024 10:10 AM', route: 'Chennai → Pondicherry 160 km', priority: 'High', status: 'Assigned' },
    { id: '#LG-2024-001225', client: 'StarTech Solutions', date: 'Jan 09, 2024 05:55 PM', route: 'Bangalore → Mysore 145 km', priority: 'Medium', status: 'In Transit' },
    { id: '#LG-2024-001224', client: 'TechFlow Enterprises', date: 'Jan 09, 2024 03:25 PM', route: 'Kolkata → Durgapur 170 km', priority: 'Low', status: 'Delivered' },
    { id: '#LG-2024-001223', client: 'Acme Corporation', date: 'Jan 09, 2024 12:45 PM', route: 'Delhi → Noida 30 km', priority: 'High', status: 'Pending' },
    { id: '#LG-2024-001222', client: 'Global Industries', date: 'Jan 09, 2024 09:30 AM', route: 'Mumbai → Thane 25 km', priority: 'Medium', status: 'Assigned' },
    { id: '#LG-2024-001221', client: 'StarTech Solutions', date: 'Jan 08, 2024 06:40 PM', route: 'Pune → Solapur 250 km', priority: 'Low', status: 'Issue' },
    { id: '#LG-2024-001220', client: 'TechFlow Enterprises', date: 'Jan 08, 2024 04:05 PM', route: 'Hyderabad → Warangal 145 km', priority: 'High', status: 'In Transit' },
    { id: '#LG-2024-001219', client: 'Acme Corporation', date: 'Jan 08, 2024 01:20 PM', route: 'Kochi → Trivandrum 200 km', priority: 'Medium', status: 'Delivered' },
    { id: '#LG-2024-001218', client: 'Global Industries', date: 'Jan 08, 2024 10:00 AM', route: 'Surat → Vadodara 150 km', priority: 'Low', status: 'Pending' },
    { id: '#LG-2024-001217', client: 'StarTech Solutions', date: 'Jan 07, 2024 07:10 PM', route: 'Indore → Bhopal 195 km', priority: 'High', status: 'Assigned' },
    { id: '#LG-2024-001216', client: 'TechFlow Enterprises', date: 'Jan 07, 2024 04:35 PM', route: 'Kanpur → Lucknow 80 km', priority: 'Medium', status: 'In Transit' },
    { id: '#LG-2024-001215', client: 'Acme Corporation', date: 'Jan 07, 2024 02:00 PM', route: 'Agra → Gwalior 120 km', priority: 'Low', status: 'Issue' },
    { id: '#LG-2024-001214', client: 'Global Industries', date: 'Jan 07, 2024 11:15 AM', route: 'Mangalore → Udupi 60 km', priority: 'High', status: 'Delivered' },
    { id: '#LG-2024-001213', client: 'StarTech Solutions', date: 'Jan 06, 2024 06:50 PM', route: 'Patna → Gaya 100 km', priority: 'Medium', status: 'Pending' },
    { id: '#LG-2024-001212', client: 'TechFlow Enterprises', date: 'Jan 06, 2024 04:20 PM', route: 'Rajkot → Jamnagar 90 km', priority: 'Low', status: 'Assigned' },
    { id: '#LG-2024-001211', client: 'Acme Corporation', date: 'Jan 06, 2024 01:45 PM', route: 'Chandigarh → Ludhiana 100 km', priority: 'High', status: 'In Transit' },
    { id: '#LG-2024-001210', client: 'Global Industries', date: 'Jan 06, 2024 10:30 AM', route: 'Nashik → Aurangabad 210 km', priority: 'Medium', status: 'Delivered' },
    { id: '#LG-2024-001209', client: 'StarTech Solutions', date: 'Jan 05, 2024 07:00 PM', route: 'Udaipur → Jodhpur 250 km', priority: 'Low', status: 'Issue' },
    { id: '#LG-2024-001208', client: 'TechFlow Enterprises', date: 'Jan 05, 2024 04:30 PM', route: 'Pondicherry → Chennai 160 km', priority: 'High', status: 'Pending' },
    { id: '#LG-2024-001207', client: 'Acme Corporation', date: 'Jan 05, 2024 02:10 PM', route: 'Mysore → Bangalore 145 km', priority: 'Medium', status: 'Assigned' },
    { id: '#LG-2024-001206', client: 'Global Industries', date: 'Jan 05, 2024 11:00 AM', route: 'Durgapur → Kolkata 170 km', priority: 'Low', status: 'In Transit' },
    { id: '#LG-2024-001205', client: 'StarTech Solutions', date: 'Jan 04, 2024 06:15 PM', route: 'Noida → Delhi 30 km', priority: 'High', status: 'Delivered' },
    { id: '#LG-2024-001204', client: 'TechFlow Enterprises', date: 'Jan 04, 2024 03:40 PM', route: 'Thane → Mumbai 25 km', priority: 'Medium', status: 'Issue' },
    { id: '#LG-2024-001203', client: 'Acme Corporation', date: 'Jan 04, 2024 01:05 PM', route: 'Solapur → Pune 250 km', priority: 'Low', status: 'Pending' },
    { id: '#LG-2024-001202', client: 'Global Industries', date: 'Jan 04, 2024 10:20 AM', route: 'Warangal → Hyderabad 145 km', priority: 'High', status: 'Assigned' },
    { id: '#LG-2024-001201', client: 'StarTech Solutions', date: 'Jan 03, 2024 06:50 PM', route: 'Trivandrum → Kochi 200 km', priority: 'Medium', status: 'In Transit' },
    { id: '#LG-2024-001200', client: 'TechFlow Enterprises', date: 'Jan 03, 2024 03:30 PM', route: 'Gwalior → Agra 120 km', priority: 'Low', status: 'Delivered' }
  ];

  // ============================================================
  // ALL ACTIVITIES DATASET (for View All modal)
  // ============================================================
  const allActivities = [
    { id: 1, type: 'delivered', title: 'Order #LG-2024-001247 delivered successfully', description: 'Vehicle TRK-001 completed delivery to Acme Corporation', time: '2 minutes ago', icon: 'check' },
    { id: 2, type: 'assigned', title: 'Vehicle VAN-045 assigned to new order', description: 'Order #LG-2024-001248 assigned to Mike Wilson', time: '15 minutes ago', icon: 'truck' },
    { id: 3, type: 'alert', title: 'Delay reported for Order #LG-2024-001245', description: 'Traffic congestion causing 2-hour delay', time: '1 hour ago', icon: 'alert' },
    { id: 4, type: 'client', title: 'New client registered', description: 'TechFlow Enterprises added to client database', time: '3 hours ago', icon: 'person' },
    { id: 5, type: 'delivered', title: 'Order #LG-2024-001246 delivered successfully', description: 'Vehicle TRK-002 completed delivery to Global Industries', time: '4 hours ago', icon: 'check' },
    { id: 6, type: 'assigned', title: 'Vehicle TRK-028 assigned to new order', description: 'Order #LG-2024-001249 assigned to Sarah Johnson', time: '5 hours ago', icon: 'truck' },
    { id: 7, type: 'alert', title: 'Delay reported for Order #LG-2024-001244', description: 'Heavy traffic on NH-16, expected 3-hour delay', time: '6 hours ago', icon: 'alert' },
    { id: 8, type: 'client', title: 'StarTech Solutions upgraded to Enterprise plan', description: 'Account tier upgraded with added benefits', time: '8 hours ago', icon: 'person' },
    { id: 9, type: 'delivered', title: 'Order #LG-2024-001243 delivered successfully', description: 'Vehicle VAN-045 completed delivery to Acme Corporation', time: '10 hours ago', icon: 'check' },
    { id: 10, type: 'assigned', title: 'Vehicle TRK-015 assigned to new order', description: 'Order #LG-2024-001250 assigned to John Doe', time: '12 hours ago', icon: 'truck' },
    { id: 11, type: 'alert', title: 'Vehicle TRK-022 reported engine issue', description: 'Vehicle moved to maintenance, ETA to fix: 4 hours', time: '1 day ago', icon: 'alert' },
    { id: 12, type: 'client', title: 'Acme Corporation placed bulk order', description: '25 packages, priority: High', time: '1 day ago', icon: 'person' },
    { id: 13, type: 'delivered', title: 'Order #LG-2024-001240 delivered successfully', description: 'Vehicle TRK-007 completed delivery to Global Industries', time: '1 day ago', icon: 'check' },
    { id: 14, type: 'assigned', title: 'Vehicle VAN-012 assigned to new order', description: 'Order #LG-2024-001251 assigned to Mike Wilson', time: '2 days ago', icon: 'truck' },
    { id: 15, type: 'alert', title: 'Weather alert on Mumbai-Delhi route', description: 'Heavy rainfall expected, possible delays', time: '2 days ago', icon: 'alert' },
    { id: 16, type: 'client', title: 'Global Industries added 3 new locations', description: 'Warehouse network expanded in South India', time: '3 days ago', icon: 'person' },
    { id: 17, type: 'delivered', title: 'Order #LG-2024-001238 delivered successfully', description: 'Vehicle TRK-033 completed delivery to StarTech Solutions', time: '3 days ago', icon: 'check' },
    { id: 18, type: 'assigned', title: 'Vehicle TRK-019 assigned to new order', description: 'Order #LG-2024-001252 assigned to Sarah Johnson', time: '4 days ago', icon: 'truck' },
  ];

  // Icon renderer for activities
  const renderActivityIcon = (type) => {
    const baseClasses = "rounded-full p-1.5 mt-0.5 flex-shrink-0";
    switch (type) {
      case 'delivered':
        return <div className={`${baseClasses} bg-green-100 text-green-700`}><FaCheck className="w-4 h-4" /></div>;
      case 'assigned':
        return <div className={`${baseClasses} bg-blue-100 text-blue-700`}><FaTruck className="w-4 h-4" /></div>;
      case 'alert':
        return <div className={`${baseClasses} bg-orange-100 text-orange-700`}><RiAlertFill className="w-4 h-4" /></div>;
      case 'client':
        return <div className={`${baseClasses} bg-purple-100 text-purple-700`}><IoPersonAddSharp className="w-4 h-4" /></div>;
      default:
        return <div className={`${baseClasses} bg-gray-100 text-gray-700`}><FaCheck className="w-4 h-4" /></div>;
    }
  };

  const [dateFilter, setDateFilter] = useState('Last 30 days');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const [orderTypeFilter, setOrderTypeFilter] = useState('All Types');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('All Vehicles');
  const [clientCategoryFilter, setClientCategoryFilter] = useState('All Clients');

  const [weightFilter, setWeightFilter] = useState('All Weights');
  const [volumeFilter, setVolumeFilter] = useState('All Volumes');
  const [packagesFilter, setPackagesFilter] = useState('Any');
  const [temperatureFilter, setTemperatureFilter] = useState('Any');
  const [vehicleDriverFilter, setVehicleDriverFilter] = useState('');
  const [routeSearchFilter, setRouteSearchFilter] = useState('');

  // View All Activities modal + search state
  const [showAllActivitiesModal, setShowAllActivitiesModal] = useState(false);
  const [activitySearchQuery, setActivitySearchQuery] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');

  // Filter activities based on search + type
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

  const handleResetAdvancedFilters = () => {
    setOrderTypeFilter('All Types');
    setPriorityFilter('All Priorities');
    setVehicleTypeFilter('All Vehicles');
    setClientCategoryFilter('All Clients');
    setWeightFilter('All Weights');
    setVolumeFilter('All Volumes');
    setPackagesFilter('Any');
    setTemperatureFilter('Any');
    setVehicleDriverFilter('');
    setRouteSearchFilter('');
  };

  const hasActiveAdvancedFilters =
    orderTypeFilter !== 'All Types' ||
    priorityFilter !== 'All Priorities' ||
    vehicleTypeFilter !== 'All Vehicles' ||
    clientCategoryFilter !== 'All Clients' ||
    weightFilter !== 'All Weights' ||
    volumeFilter !== 'All Volumes' ||
    packagesFilter !== 'Any' ||
    temperatureFilter !== 'Any' ||
    vehicleDriverFilter.trim() !== '' ||
    routeSearchFilter.trim() !== '';

  const parseOrderDate = (dateStr) => {
    try { return new Date(dateStr); } catch { return new Date(0); }
  };

  const filteredOrders = useMemo(() => {
    let result = [...allOrders];

    if (dateFilter !== 'All Time') {
      const now = new Date('Jan 15, 2024');
      const daysMap = { 'Last 7 days': 7, 'Last 14 days': 14, 'Last 30 days': 30, 'Last 90 days': 90 };
      const days = daysMap[dateFilter] || 30;
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      result = result.filter(order => parseOrderDate(order.date) >= cutoff);
    }

    if (locationFilter !== 'All Locations') {
      const loc = locationFilter.toLowerCase();
      result = result.filter(order => order.route.toLowerCase().includes(loc));
    }

    if (statusFilter !== 'All Status') {
      result = result.filter(order => order.status === statusFilter);
    }

    if (priorityFilter !== 'All Priorities') {
      result = result.filter(order => order.priority === priorityFilter);
    }

    if (orderTypeFilter !== 'All Types') {
      const typeMap = { 'Express': 'High', 'Standard': 'Medium', 'Bulk': 'Low' };
      const matchPriority = typeMap[orderTypeFilter];
      if (matchPriority) result = result.filter(order => order.priority === matchPriority);
    }

    if (vehicleTypeFilter !== 'All Vehicles') {
      const vehicleMap = {
        'Truck': ['Acme Corporation', 'StarTech Solutions'],
        'Van': ['Global Industries'],
        'Trailer': ['TechFlow Enterprises'],
      };
      const matchClients = vehicleMap[vehicleTypeFilter] || [];
      result = result.filter(order => matchClients.includes(order.client));
    }

    if (clientCategoryFilter !== 'All Clients') {
      const categoryMap = {
        'Retail': ['Acme Corporation'],
        'Wholesale': ['Global Industries'],
        'Enterprise': ['StarTech Solutions', 'TechFlow Enterprises'],
      };
      const matchClients = categoryMap[clientCategoryFilter] || [];
      result = result.filter(order => matchClients.includes(order.client));
    }

    if (weightFilter !== 'All Weights') {
      result = result.filter(order => {
        const match = order.route.match(/(\d+)\s*km/);
        const km = match ? parseInt(match[1]) : 0;
        switch (weightFilter) {
          case '0 - 1 Ton': return km < 100;
          case '1 - 5 Tons': return km >= 100 && km < 300;
          case '5 - 10 Tons': return km >= 300 && km < 600;
          case '10+ Tons': return km >= 600;
          default: return true;
        }
      });
    }

    if (volumeFilter !== 'All Volumes') {
      result = result.filter(order => {
        const match = order.route.match(/(\d+)\s*km/);
        const km = match ? parseInt(match[1]) : 0;
        switch (volumeFilter) {
          case '0 - 100 cu.ft': return km < 100;
          case '100 - 500 cu.ft': return km >= 100 && km < 400;
          case '500 - 1000 cu.ft': return km >= 400 && km < 800;
          case '1000+ cu.ft': return km >= 800;
          default: return true;
        }
      });
    }

    if (packagesFilter !== 'Any') {
      result = result.filter(order => {
        const match = order.route.match(/(\d+)\s*km/);
        const km = match ? parseInt(match[1]) : 0;
        switch (packagesFilter) {
          case '1 - 10 Boxes': return km < 150;
          case '10 - 50 Boxes': return km >= 150 && km < 350;
          case '50 - 100 Boxes': return km >= 350 && km < 600;
          case '100+ Boxes': return km >= 600;
          default: return true;
        }
      });
    }

    if (temperatureFilter !== 'Any') {
      const tempMap = { 'Ambient (Normal)': 0, 'Cold Chain (2-8°C)': 1, 'Frozen (-20°C)': 2 };
      const targetIdx = tempMap[temperatureFilter];
      result = result.filter((_, idx) => idx % 3 === targetIdx);
    }

    if (vehicleDriverFilter.trim()) {
      const search = vehicleDriverFilter.toLowerCase();
      const driverMap = {
        'Acme Corporation': 'John Doe',
        'Global Industries': 'Mike Wilson',
        'StarTech Solutions': 'Sarah Johnson',
        'TechFlow Enterprises': 'Robert Smith',
      };
      result = result.filter(order => {
        const driver = driverMap[order.client] || '';
        return driver.toLowerCase().includes(search) || order.client.toLowerCase().includes(search);
      });
    }

    if (routeSearchFilter.trim()) {
      const search = routeSearchFilter.toLowerCase();
      result = result.filter(order => order.route.toLowerCase().includes(search));
    }

    return result;
  }, [
    dateFilter, locationFilter, statusFilter,
    priorityFilter, orderTypeFilter, vehicleTypeFilter, clientCategoryFilter,
    weightFilter, volumeFilter, packagesFilter, temperatureFilter,
    vehicleDriverFilter, routeSearchFilter
  ]);

  const ITEMS_PER_PAGE = 10;
  const MAX_VISIBLE_PAGES = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ITEMS_PER_PAGE));

  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    dateFilter, locationFilter, statusFilter,
    priorityFilter, orderTypeFilter, vehicleTypeFilter, clientCategoryFilter,
    weightFilter, volumeFilter, packagesFilter, temperatureFilter,
    vehicleDriverFilter, routeSearchFilter
  ]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const orderData = filteredOrders.slice(startIndex, endIndex);

  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    client: '', email: '', origin: '', destination: '', distance: '',
    priority: 'Medium', vehicleType: 'Truck', weight: '', packages: '',
    temperature: 'Any', notes: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleFormChange = (field, value) => {
    setNewOrderForm(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newOrderForm.client.trim()) errors.client = 'Client name is required';
    if (!newOrderForm.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newOrderForm.email)) errors.email = 'Email is invalid';
    if (!newOrderForm.origin.trim()) errors.origin = 'Origin is required';
    if (!newOrderForm.destination.trim()) errors.destination = 'Destination is required';
    if (!newOrderForm.distance.trim()) errors.distance = 'Distance is required';
    if (!newOrderForm.weight.trim()) errors.weight = 'Weight is required';
    if (!newOrderForm.packages.trim()) errors.packages = 'Packages count is required';
    return errors;
  };

  const handleSubmitNewOrder = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    console.log('New Order Created:', newOrderForm);
    setShowNewOrderModal(false);
    setNewOrderForm({ client: '', email: '', origin: '', destination: '', distance: '', priority: 'Medium', vehicleType: 'Truck', weight: '', packages: '', temperature: 'Any', notes: '' });
    setFormErrors({});
  };

  const handleCloseModal = () => { setShowNewOrderModal(false); setFormErrors({}); };

  // Close activities modal + reset its filters
  const handleCloseActivitiesModal = () => {
    setShowAllActivitiesModal(false);
    setActivitySearchQuery('');
    setActivityTypeFilter('all');
  };

  const handleClearAll = () => {
    setDateFilter('Last 30 days');
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

  const splitRoute = (route) => {
    const match = route.match(/^(.*?)(\d+\s*km)$/);
    if (match) return { city: match[1].trim(), distance: match[2] };
    return { city: route, distance: '' };
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Assigned': return 'bg-green-100 text-green-700';
      case 'In Transit': return 'bg-blue-100 text-blue-700';
      case 'Issue': return 'bg-yellow-100 text-yellow-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-300 flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-black text-2xl">Order Management</h1>
          <span className="text-sm text-gray-500 mt-1">Manage and track all logistic orders</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-gray-600 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium cursor-pointer inline-flex items-center gap-2 hover:bg-gray-50">
            <ImDownload3 size={14} />
            Export
          </span>
          <button
            onClick={() => setShowNewOrderModal(true)}
            className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:opacity-90"
          >
            + New Order
          </button>
        </div>
      </header>

      <div className="border-b border-gray-200 py-3 px-6 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-40 hover:border-gray-300">
            <IoTodaySharp size={16} className="text-gray-500 flex-shrink-0" />
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 text-sm w-full pr-6">
              <option>Last 7 days</option>
              <option>Last 14 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
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
              <option>Pending</option>
              <option>Assigned</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Issue</option>
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

      <div className="flex-1 px-6 py-8 bg-gray-50 space-y-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Total Orders</div>
              <div className="text-2xl font-bold text-gray-800 my-1">{filteredOrders.length}</div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <FaArrowUp size={10} className="mr-1" />
                12% from last month
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-blue-900">
              <FaClipboardList size={20} />
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Pending Assignment</div>
              <div className="text-2xl font-bold text-gray-800 my-1">
                {filteredOrders.filter(o => o.status === 'Pending').length}
              </div>
              <div className="flex items-center text-xs text-red-600 font-medium">
                <FaArrowDown size={10} className="mr-1" />
                3% from yesterday
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg text-orange-500">
              <FaClock size={20} />
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">In Transit</div>
              <div className="text-2xl font-bold text-gray-800 my-1">
                {filteredOrders.filter(o => o.status === 'In Transit').length}
              </div>
              <div className="flex items-center text-xs text-blue-600 font-medium">
                <FaArrowUp size={10} className="mr-1" />
                8% from last week
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-blue-900">
              <FaTruck size={20} />
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-gray-500 font-medium">Delivered Today</div>
              <div className="text-2xl font-bold text-gray-800 my-1">
                {filteredOrders.filter(o => o.status === 'Delivered').length}
              </div>
              <div className="flex items-center text-xs text-green-600 font-medium">
                <FaArrowUp size={10} className="mr-1" />
                15% from yesterday
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <FaCheckCircle size={20} />
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
              <label className="text-xs font-medium text-gray-600">Order Type</label>
              <div className="relative">
                <select
                  value={orderTypeFilter}
                  onChange={(e) => setOrderTypeFilter(e.target.value)}
                  className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                >
                  <option>All Types</option>
                  <option>Standard</option>
                  <option>Express</option>
                  <option>Bulk</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[140px] flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Priority Level</label>
              <div className="relative">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                >
                  <option>All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[140px] flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Vehicle Type</label>
              <div className="relative">
                <select
                  value={vehicleTypeFilter}
                  onChange={(e) => setVehicleTypeFilter(e.target.value)}
                  className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                >
                  <option>All Vehicles</option>
                  <option>Truck</option>
                  <option>Van</option>
                  <option>Trailer</option>
                </select>
                <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                  <RiArrowDropDownLine size={20} />
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[140px] flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Client Category</label>
              <div className="relative">
                <select
                  value={clientCategoryFilter}
                  onChange={(e) => setClientCategoryFilter(e.target.value)}
                  className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                >
                  <option>All Clients</option>
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

          {showMoreOptions && (
            <div className="mt-5 pt-5 border-t border-gray-200">
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex-1 min-w-[160px] flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600">Weight Range</label>
                  <div className="relative">
                    <select
                      value={weightFilter}
                      onChange={(e) => setWeightFilter(e.target.value)}
                      className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                    >
                      <option>All Weights</option>
                      <option>0 - 1 Ton</option>
                      <option>1 - 5 Tons</option>
                      <option>5 - 10 Tons</option>
                      <option>10+ Tons</option>
                    </select>
                    <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                      <RiArrowDropDownLine size={20} />
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-[160px] flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600">Volume / Dimensions</label>
                  <div className="relative">
                    <select
                      value={volumeFilter}
                      onChange={(e) => setVolumeFilter(e.target.value)}
                      className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                    >
                      <option>All Volumes</option>
                      <option>0 - 100 cu.ft</option>
                      <option>100 - 500 cu.ft</option>
                      <option>500 - 1000 cu.ft</option>
                      <option>1000+ cu.ft</option>
                    </select>
                    <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                      <RiArrowDropDownLine size={20} />
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-[160px] flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600">Number of Packages</label>
                  <div className="relative">
                    <select
                      value={packagesFilter}
                      onChange={(e) => setPackagesFilter(e.target.value)}
                      className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                    >
                      <option>Any</option>
                      <option>1 - 10 Boxes</option>
                      <option>10 - 50 Boxes</option>
                      <option>50 - 100 Boxes</option>
                      <option>100+ Boxes</option>
                    </select>
                    <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                      <RiArrowDropDownLine size={20} />
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-[160px] flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600">Temperature Control</label>
                  <div className="relative">
                    <select
                      value={temperatureFilter}
                      onChange={(e) => setTemperatureFilter(e.target.value)}
                      className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none bg-white cursor-pointer"
                    >
                      <option>Any</option>
                      <option>Ambient (Normal)</option>
                      <option>Cold Chain (2-8°C)</option>
                      <option>Frozen (-20°C)</option>
                    </select>
                    <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                      <RiArrowDropDownLine size={20} />
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-[160px] flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600">Vehicle No. / Driver Name</label>
                  <input
                    type="text"
                    value={vehicleDriverFilter}
                    onChange={(e) => setVehicleDriverFilter(e.target.value)}
                    placeholder="e.g. TRK-001 or John Doe"
                    className="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none bg-white"
                  />
                </div>

                <div className="flex-1 min-w-[160px] flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600">Route (Origin → Destination)</label>
                  <input
                    type="text"
                    value={routeSearchFilter}
                    onChange={(e) => setRouteSearchFilter(e.target.value)}
                    placeholder="e.g. Mumbai to Delhi"
                    className="w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="border border-gray-300 rounded-md bg-white shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-end gap-5 flex-wrap">
            <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600">
              <FaTruck size={14} />
              Bulk Assign
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
                <th scope="col" className="w-[18%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Order ID <RiExpandUpDownFill size={12} /></div>
                </th>
                <th scope="col" className="w-[22%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Client <RiExpandUpDownFill size={12} /></div>
                </th>
                <th scope="col" className="w-[16%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Date Created <MdOutlineArrowDropDown size={16} /></div>
                </th>
                <th scope="col" className="w-[18%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">Route</th>
                <th scope="col" className="w-[10%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Priority</div>
                </th>
                <th scope="col" className="w-[10%] px-3 py-4 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <div className="flex items-center gap-1.5">Status <RiExpandUpDownFill size={12} /></div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-3 py-12 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <FaFilter size={24} className="text-gray-300" />
                      <span className="font-medium text-gray-600">No orders match your filters</span>
                      <span className="text-xs text-gray-400">Try adjusting or clearing filters</span>
                      <button onClick={handleClearAll} className="mt-2 text-xs text-blue-900 hover:underline font-medium">
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                orderData.map((order, index) => {
                  const { city, distance } = splitRoute(order.route);
                  const initials = order.client.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  const avatarColors = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-gray-100 text-gray-600'];
                  const avatarColor = avatarColors[index % avatarColors.length];

                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="w-[6%] px-3 py-5 whitespace-nowrap text-left text-sm text-gray-500">{startIndex + index + 1}</td>
                      <td className="w-[18%] px-3 py-5 whitespace-nowrap text-sm font-medium text-blue-900">
                        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigator.clipboard.writeText(order.id)}>
                          <span className="truncate">{order.id}</span>
                          <FaCopy className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" size={12} />
                        </div>
                      </td>
                      <td className="w-[22%] px-3 py-5 text-sm text-gray-700">
                        <div className="flex items-center gap-2.5">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${order.client === 'TechFlow Enterprises' ? 'bg-gray-100' : avatarColor}`}>
                            {order.client === 'TechFlow Enterprises' ? (
                              <img src="https://picsum.photos/seed/tech/30/30" alt="TechFlow" className="h-8 w-8 rounded-full object-cover" />
                            ) : (initials)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-gray-900 text-sm font-medium truncate">{order.client}</div>
                            <div className="text-xs text-gray-500 mt-0.5 truncate">
                              {order.client === 'Acme Corporation' ? 'contact@acme.com' :
                                order.client === 'Global Industries' ? 'orders@global.com' :
                                  order.client === 'StarTech Solutions' ? 'logistics@startech.com' : 'shipping@techflow.com'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="w-[16%] px-3 py-5 whitespace-nowrap text-sm text-gray-500">
                        <div>{order.date.split(' ').slice(0, 3).join(' ')}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{order.date.split(' ').slice(3).join(' ')}</div>
                      </td>
                      <td className="w-[18%] px-3 py-5 text-sm text-gray-500">
                        <div className="truncate">{city}</div>
                        {distance && <div className="text-xs text-gray-400 mt-0.5">{distance}</div>}
                      </td>
                      <td className="w-[10%] px-3 py-5 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-3 font-semibold rounded-full ${priorityColor(order.priority)}`}>
                          {order.priority === 'High' ? <BsExclamationTriangleFill size={10} /> :
                            order.priority === 'Medium' ? <BsExclamationTriangleFill size={10} /> :
                              <BsCircleFill size={10} />}
                          {order.priority}
                        </span>
                      </td>
                      <td className="w-[10%] px-3 py-5 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex items-center text-xs leading-3 font-semibold rounded-full ${statusColor(order.status)}`}>
                          {order.status}
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
              {filteredOrders.length === 0
                ? 'No results'
                : `Showing ${startIndex + 1} to ${Math.min(endIndex, filteredOrders.length)} of ${filteredOrders.length} results`
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

        {/* Available Vehicles */}
        <div className="bg-white p-6 border border-gray-300 rounded-md">
          <div className='flex justify-between items-center mb-5'>
            <h3 className="text-base font-bold text-black">Available Vehicles</h3>
            <button className='flex items-center gap-1.5 text-blue-900 text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity' type="button">
              <GoPlus size={20} />
              Add Vehicle
            </button>
          </div>

          <div className="flex flex-wrap gap-5">
            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <FaTruck className="text-green-700" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">TRK-001</div>
                    <div className="text-xs text-gray-500 mt-0.5">Heavy Truck</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Available</span>
              </div>
              <div className="mt-4 space-y-2.5 text-sm pt-4 border-t border-gray-100">
                <div className="flex justify-between"><span className="text-gray-500">Driver:</span> <span className="text-gray-900 font-medium">John Doe</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Capacity:</span> <span className="text-gray-900 font-medium">10 tons</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Location:</span> <span className="text-gray-900 font-medium">Mumbai Hub</span></div>
              </div>
              <button className="mt-5 w-full bg-blue-900 text-white text-sm font-medium py-2 rounded-lg transition-colors shadow-sm hover:shadow">
                Assign to Order
              </button>
            </div>

            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <FaTruck className="text-blue-500" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">VAN-045</div>
                    <div className="text-xs text-gray-500 mt-0.5">Delivery Van</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">In Use</span>
              </div>
              <div className="mt-4 space-y-2.5 text-sm pt-4 border-t border-gray-100">
                <div className="flex justify-between"><span className="text-gray-500">Driver:</span><span className="text-gray-900 font-medium">Mike Wilson</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Capacity:</span><span className="text-gray-900 font-medium">2 tons</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Location:</span><span className="text-gray-900 font-medium">En Route</span></div>
              </div>
              <button className="mt-5 w-full bg-gray-300 text-gray-500 text-sm font-medium py-2 rounded-lg cursor-not-allowed shadow-sm" disabled>
                Currently Assigned
              </button>
            </div>

            <div className="flex-1 min-w-[240px] bg-white border border-gray-200 rounded-md p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                    <FaTruck className="text-red-500" size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">TRK-028</div>
                    <div className="text-xs text-gray-500 mt-0.5">Container Truck</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Maintenance</span>
              </div>
              <div className="mt-4 space-y-2.5 text-sm pt-4 border-t border-gray-100">
                <div className="flex justify-between"><span className="text-gray-500">Driver:</span><span className="text-gray-900 font-medium">Sarah Johnson</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Capacity:</span><span className="text-gray-900 font-medium">20 tons</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Location:</span><span className="text-gray-900 font-medium">Service Center</span></div>
              </div>
              <button className="mt-5 w-full bg-gray-300 text-gray-500 text-sm font-medium py-2 rounded-lg cursor-not-allowed shadow-sm" disabled>
                Under Maintenance
              </button>
            </div>
          </div>
        </div>

        {/* Live Tracking Dashboard */}
        <div className="bg-white p-6 border border-gray-300 rounded-md shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-800">Live Tracking Dashboard</h3>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Live Updates
              </span>
              <button className="text-sm text-dark-navy-blue hover:underline flex items-center gap-1.5 font-medium">
                <FaMapMarkedAlt size={14} />
                Full Map
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-6 h-64 flex flex-col items-center justify-center relative border border-none">
              <div className="absolute top-10 left-12 w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
              <div className="absolute bottom-16 left-28 w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
              <div className="absolute top-16 right-20 w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>

              <FaMapMarkerAlt size={40} className="text-gray-400 mb-3" />
              <div className="font-semibold text-gray-700 text-sm">Interactive Map View</div>
              <div className="text-sm text-gray-500 mt-1">Real-time vehicle positions</div>
            </div>

            <div className="space-y-5">
              <h4 className="text-base font-bold text-gray-800">Active Shipments</h4>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">TRK-001</div>
                      <div className="text-xs text-gray-500 mt-0.5">Mumbai → Delhi</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">On Time</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">VAN-045</div>
                      <div className="text-xs text-gray-500 mt-0.5">Chennai → Bangalore</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">In Transit</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>Progress</span>
                    <span>30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">TRK-028</div>
                      <div className="text-xs text-gray-500 mt-0.5">Kolkata → Bhubaneswar</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">Delayed</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>Progress</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="bg-white border border-gray-300 rounded-md p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-base text-gray-800">Performance Analytics</h2>
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
              <div className="text-2xl font-bold text-blue-900">94.5%</div>
              <div className="text-sm font-medium text-gray-700 mt-1.5">On-Time Delivery</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-semibold flex justify-center">
                <FaArrowUp size={12} />
                <span>+2.3%</span>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-5 border border-green-100 text-center">
              <div className="text-2xl font-bold text-green-700">87%</div>
              <div className="text-sm font-medium text-gray-700 mt-1.5">Vehicle Utilization</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-semibold flex justify-center">
                <FaArrowUp size={12} />
                <span>+5.1%</span>
              </div>
            </div>
            <div className="bg-orange-100 rounded-lg p-5 border border-orange-100 text-center">
              <div className="text-2xl font-bold text-orange-600">2.1%</div>
              <div className="text-sm font-medium text-gray-700 mt-1.5">Damage Rate</div>
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm font-semibold flex justify-center">
                <FaArrowDown size={12} />
                <span>-0.8%</span>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-5 border border-purple-100 text-center">
              <div className="text-2xl font-bold text-purple-700">4.8</div>
              <div className="text-sm font-medium text-gray-700 mt-1.5">Avg Rating</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-semibold flex justify-center">
                <FaArrowUp size={12} />
                <span>+0.2</span>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-gray-50 border border-none rounded-lg h-48 flex flex-col items-center justify-center gap-1.5">
            <IoTrendingDownSharp className="text-gray-400 w-6 h-6" />
            <span className="text-sm font-medium text-gray-500">Performance Trends Chart</span>
            <span className="text-xs text-gray-400">weekly delivery performance metrics</span>
          </div>
        </div>

        {/* Recent Activities — View all button now functional */}
        <div className="bg-white border border-gray-300 rounded-md p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-base text-gray-800">Recent Activities</h2>
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
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">All Recent Activities</h2>
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

            {/* Modal Body — search + filters + list */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Search bar */}
              <div className="relative mb-4">
                <input
                  type="text"
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                  placeholder="Search activities..."
                  className="w-full text-sm text-gray-700 border border-gray-300 rounded-md pl-4 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>

              {/* Type filter chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700 border-gray-200' },
                  { key: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-700 border-green-200' },
                  { key: 'assigned', label: 'Assigned', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                  { key: 'alert', label: 'Alerts', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                  { key: 'client', label: 'Clients', color: 'bg-purple-100 text-purple-700 border-purple-200' },
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

              {/* Activity list */}
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

            {/* Modal Footer */}
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

      {/* NEW ORDER MODAL */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Create New Order</h2>
                <p className="text-sm text-gray-500 mt-0.5">Fill in the details to create a new logistic order</p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100">
                <IoClose size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmitNewOrder} className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-900 rounded-full"></span>
                  Client Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newOrderForm.client}
                      onChange={(e) => handleFormChange('client', e.target.value)}
                      placeholder="e.g. Acme Corporation"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.client ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.client && <span className="text-xs text-red-500">{formErrors.client}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={newOrderForm.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="e.g. contact@acme.com"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.email ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.email && <span className="text-xs text-red-500">{formErrors.email}</span>}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-900 rounded-full"></span>
                  Route Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Origin <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newOrderForm.origin}
                      onChange={(e) => handleFormChange('origin', e.target.value)}
                      placeholder="e.g. Mumbai"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.origin ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.origin && <span className="text-xs text-red-500">{formErrors.origin}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Destination <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newOrderForm.destination}
                      onChange={(e) => handleFormChange('destination', e.target.value)}
                      placeholder="e.g. Delhi"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.destination ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.destination && <span className="text-xs text-red-500">{formErrors.destination}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Distance (km) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={newOrderForm.distance}
                      onChange={(e) => handleFormChange('distance', e.target.value)}
                      placeholder="e.g. 850"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.distance ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.distance && <span className="text-xs text-red-500">{formErrors.distance}</span>}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-blue-900 rounded-full"></span>
                  Order Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">Priority</label>
                    <div className="relative">
                      <select
                        value={newOrderForm.priority}
                        onChange={(e) => handleFormChange('priority', e.target.value)}
                        className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-900 bg-white cursor-pointer"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                      <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                        <RiArrowDropDownLine size={20} />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">Vehicle Type</label>
                    <div className="relative">
                      <select
                        value={newOrderForm.vehicleType}
                        onChange={(e) => handleFormChange('vehicleType', e.target.value)}
                        className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-900 bg-white cursor-pointer"
                      >
                        <option>Truck</option>
                        <option>Van</option>
                        <option>Trailer</option>
                        <option>Container Truck</option>
                      </select>
                      <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                        <RiArrowDropDownLine size={20} />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">Temperature Control</label>
                    <div className="relative">
                      <select
                        value={newOrderForm.temperature}
                        onChange={(e) => handleFormChange('temperature', e.target.value)}
                        className="appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-900 bg-white cursor-pointer"
                      >
                        <option>Any</option>
                        <option>Ambient (Normal)</option>
                        <option>Cold Chain (2-8°C)</option>
                        <option>Frozen (-20°C)</option>
                      </select>
                      <span className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2">
                        <RiArrowDropDownLine size={20} />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Weight (tons) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={newOrderForm.weight}
                      onChange={(e) => handleFormChange('weight', e.target.value)}
                      placeholder="e.g. 5"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.weight ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.weight && <span className="text-xs text-red-500">{formErrors.weight}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-600">
                      Packages <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={newOrderForm.packages}
                      onChange={(e) => handleFormChange('packages', e.target.value)}
                      placeholder="e.g. 25"
                      className={`w-full text-sm text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 ${formErrors.packages ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    {formErrors.packages && <span className="text-xs text-red-500">{formErrors.packages}</span>}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">Additional Notes</label>
                <textarea
                  rows={3}
                  value={newOrderForm.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  placeholder="Any special instructions for this order..."
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
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;