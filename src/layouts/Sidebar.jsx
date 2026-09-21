import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';

// Phosphor Icons (duotone)
import {
    PiTruckDuotone,
    PiMapPinDuotone,
    PiPackageDuotone,
    PiReceiptDuotone,
    PiUsersDuotone,
    PiBuildingsDuotone,
    PiUserCircleDuotone,
    PiUserListDuotone,
    PiHashDuotone,
    PiCalendarDuotone,
    PiWarehouseDuotone,
} from "react-icons/pi";

// Feather Icons
import {
    FiBox, FiTruck, FiSettings, FiShield, FiClipboard,
    FiMap, FiFileText, FiCheckSquare, FiGrid, FiPieChart,
    FiClock, FiBookOpen, FiLock, FiUser, FiMapPin,
    FiChevronDown, FiChevronRight
} from 'react-icons/fi';

// Font Awesome Icons
import {
    FaBoxOpen,
    FaFileInvoiceDollar,
    FaFileSignature,
    FaMoneyBillWave,
    FaTruckLoading,
    FaChartBar,
    FaFileAlt
} from "react-icons/fa";

// Bootstrap Icons
import { BsFileEarmarkText, BsClipboardData } from "react-icons/bs";

function Sidebar() {
    const { isDarkMode } = useTheme();
    const location = useLocation();

    // ⭐ Expand/Collapse state for sub-menus
    const [expandedMenus, setExpandedMenus] = useState({
        customerPO: false,
        invoice: false,
        bills: false,
    });

    const toggleMenu = (key) => {
        setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Auto-expand if route matches a sub-item
    React.useEffect(() => {
        if (location.pathname.includes('/accounts/customer-purchase-order/')) {
            setExpandedMenus((prev) => ({ ...prev, customerPO: true }));
        }
        if (location.pathname.includes('/accounts/invoice/')) {
            setExpandedMenus((prev) => ({ ...prev, invoice: true }));
        }
        if (location.pathname.includes('/accounts/bills/')) {
            setExpandedMenus((prev) => ({ ...prev, bills: true }));
        }
    }, [location.pathname]);

    const baseLinkClasses = `
        flex items-center gap-2.5 px-3 py-2 rounded-lg
        transition-all duration-200 ease-in-out
        text-[13px] font-medium leading-tight
    `;

    const linkClasses = ({ isActive }) => `
        ${baseLinkClasses}
        ${isActive
            ? isDarkMode
                ? 'bg-slate-700 text-white shadow-md'
                : 'bg-dark-navy-blue text-white shadow-md'
            : isDarkMode
                ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
        }
    `;

    // ⭐ Sub-link classes (indented)
    const subLinkClasses = ({ isActive }) => `
        flex items-center gap-2 pl-9 pr-3 py-1.5 rounded-lg
        transition-all duration-200 ease-in-out
        text-[12px] font-medium leading-tight
        ${isActive
            ? isDarkMode
                ? 'bg-slate-700 text-white'
                : 'bg-blue-50 text-[#1e1b6b] border-l-2 border-[#1e1b6b]'
            : isDarkMode
                ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }
    `;

    const headingClasses = `
        text-[11px] font-semibold tracking-wider uppercase px-3 mb-2
        ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
        border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} pb-2
    `;

    const iconSize = 16;

    return (
        <aside
            className={`
                w-64 h-screen flex flex-col border-r
                transition-colors duration-300
                ${isDarkMode
                    ? 'bg-dark-navy-blue border-slate-700'
                    : 'bg-white border-slate-200'
                }
            `}
        >
            <nav className="flex-1 overflow-y-auto sidebar-nav py-4 pl-4 pr-2 space-y-5">
                {/* MASTERS */}
                <div>
                    <h3 className={headingClasses}>Masters</h3>
                    <ul className="space-y-0.5">
                        <li>
                            <NavLink to="/masters/articles" className={linkClasses}>
                                <FaBoxOpen size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Articles</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/masters/vehicle-type" className={linkClasses}>
                                <PiTruckDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Vehicle Type</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/masters/billing-vehicle-type" className={linkClasses}>
                                <FaFileInvoiceDollar size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Billing Vehicle Type</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/masters/sac-code" className={linkClasses}>
                                <PiHashDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">SAC Code</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/masters/gst-master" className={linkClasses}>
                                <BsFileEarmarkText size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">GST Master</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/masters/tds-master" className={linkClasses}>
                                <FaMoneyBillWave size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">TDS Master</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/masters/places" className={linkClasses}>
                                <PiMapPinDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Places</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* PARENT MASTERS */}
                <div>
                    <h3 className={headingClasses}>Parent Masters</h3>
                    <ul className="space-y-0.5">
                        <li>
                            <NavLink to="/parent-masters/branches" className={linkClasses}>
                                <PiBuildingsDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Branches</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/parent-masters/employees" className={linkClasses}>
                                <PiUserListDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Employees</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/parent-masters/customers" className={linkClasses}>
                                <PiUsersDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Customers</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/parent-masters/part-number" className={linkClasses}>
                                <PiHashDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Part Number</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/parent-masters/vehicle" className={linkClasses}>
                                <FiTruck size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Vehicle</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/parent-masters/transporter" className={linkClasses}>
                                <FaTruckLoading size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Transporter</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/parent-masters/drivers" className={linkClasses}>
                                <PiUserCircleDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Drivers</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/parent-masters/location-distance" className={linkClasses}>
                                <FiMapPin size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Location Distance</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* ACCOUNTS */}
                <div>
                    <h3 className={headingClasses}>Accounts</h3>
                    <ul className="space-y-0.5">
                        {/* ⭐ Customer Purchase Order with Sub-Menu */}
                        <li>
                            <button
                                onClick={() => toggleMenu("customerPO")}
                                className={`${baseLinkClasses} w-full justify-between ${
                                    isDarkMode
                                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <FiClipboard size={iconSize} className="flex-shrink-0" />
                                    <span className="truncate">Customer Purchase Order</span>
                                </div>
                                {expandedMenus.customerPO ? (
                                    <FiChevronDown size={14} className="flex-shrink-0" />
                                ) : (
                                    <FiChevronRight size={14} className="flex-shrink-0" />
                                )}
                            </button>

                            {expandedMenus.customerPO && (
                                <ul className="mt-1 space-y-0.5">
                                    <li>
                                        <NavLink
                                            to="/accounts/customer-purchase-order/transport"
                                            className={subLinkClasses}
                                        >
                                            <span className="truncate">Transport Purchase Order</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/accounts/customer-purchase-order/warehouse"
                                            className={subLinkClasses}
                                        >
                                            <span className="truncate">WH Purchase Order</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* ⭐ Invoice with Sub-Menu */}
                        <li>
                            <button
                                onClick={() => toggleMenu("invoice")}
                                className={`${baseLinkClasses} w-full justify-between ${
                                    isDarkMode
                                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <FaFileInvoiceDollar size={iconSize} className="flex-shrink-0" />
                                    <span className="truncate">Invoice</span>
                                </div>
                                {expandedMenus.invoice ? (
                                    <FiChevronDown size={14} className="flex-shrink-0" />
                                ) : (
                                    <FiChevronRight size={14} className="flex-shrink-0" />
                                )}
                            </button>

                            {expandedMenus.invoice && (
                                <ul className="mt-1 space-y-0.5">
                                    <li>
                                        <NavLink
                                            to="/accounts/invoice/transportinvoice"
                                            className={subLinkClasses}
                                        >
                                            <span className="truncate">Transport Invoice</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/accounts/invoice/warehouseinvoice"
                                            className={subLinkClasses}
                                        >
                                            <span className="truncate">Warehouse Invoice</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* ⭐ Bills with Sub-Menu */}
                        <li>
                            <button
                                onClick={() => toggleMenu("bills")}
                                className={`${baseLinkClasses} w-full justify-between ${
                                    isDarkMode
                                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <FaMoneyBillWave size={iconSize} className="flex-shrink-0" />
                                    <span className="truncate">Bills</span>
                                </div>
                                {expandedMenus.bills ? (
                                    <FiChevronDown size={14} className="flex-shrink-0" />
                                ) : (
                                    <FiChevronRight size={14} className="flex-shrink-0" />
                                )}
                            </button>

                            {expandedMenus.bills && (
                                <ul className="mt-1 space-y-0.5">
                                    <li>
                                        <NavLink
                                            to="/accounts/bills/transport-bill"
                                            className={subLinkClasses}
                                        >
                                            <span className="truncate">Transport Bill</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>

                {/* TRANSACTIONS & LOGISTICS */}
                <div>
                    <h3 className={headingClasses}>Transactions & Logistics</h3>
                    <ul className="space-y-0.5">
                        <li>
                            <NavLink to="/transactions/transport-pickup-order" className={linkClasses}>
                                <FaTruckLoading size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Transport Pickup Order</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/transactions/lorry-receipt" className={linkClasses}>
                                <PiReceiptDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Lorry Receipt (LR)</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/transactions/freight-memo" className={linkClasses}>
                                <FaFileSignature size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Freight Memo</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/transactions/pod-upload" className={linkClasses}>
                                <FaFileAlt size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">POD Upload</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* WAREHOUSE WMS */}
                <div>
                    <h3 className={headingClasses}>Warehouse WMS</h3>
                    <ul className="space-y-0.5">
                        <li>
                            <NavLink to="/warehouse-wms/gate-operations" className={linkClasses}>
                                <PiWarehouseDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Gate Operations</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/warehouse-wms/dashboard" className={linkClasses}>
                                <FiPieChart size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">WMS Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/warehouse-wms/directed-putaway" className={linkClasses}>
                                <FiGrid size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Directed Putaway</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/warehouse-wms/outward-planning" className={linkClasses}>
                                <PiCalendarDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Outward Planning</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/warehouse-wms/repack-split" className={linkClasses}>
                                <PiPackageDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Repack & Split</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/warehouse-wms/stock-audit" className={linkClasses}>
                                <BsClipboardData size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Stock Audit</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* REPORTS */}
                <div>
                    <h3 className={headingClasses}>Reports</h3>
                    <ul className="space-y-0.5">
                        <li>
                            <NavLink to="/reports/audit-report" className={linkClasses}>
                                <FiShield size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Audit Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports/gate-pass-report" className={linkClasses}>
                                <FiUser size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Gate Pass Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports/mis-report" className={linkClasses}>
                                <FaChartBar size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">MIS Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports/stock-report" className={linkClasses}>
                                <FiBox size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Stock Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports/lr-report" className={linkClasses}>
                                <PiReceiptDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">LR Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports/dc-report" className={linkClasses}>
                                <FiCheckSquare size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">DC Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports/memo-report" className={linkClasses}>
                                <FaFileSignature size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Memo Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports/transport-bill-report" className={linkClasses}>
                                <FaMoneyBillWave size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Transport Bill Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports/pod-receipt-report" className={linkClasses}>
                                <PiReceiptDuotone size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">POD Receipt Report</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reports/purchase-order-report" className={linkClasses}>
                                <FiClipboard size={iconSize} className="flex-shrink-0" />
                                <span className="truncate">Purchase Order Report</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <style>{`
                .sidebar-nav {
                    scrollbar-width: thin;
                    scrollbar-color: ${isDarkMode ? '#334155' : '#cbd5e1'} transparent;
                }
                .sidebar-nav::-webkit-scrollbar {
                    width: 4px;
                }
                .sidebar-nav::-webkit-scrollbar-track {
                    background: transparent;
                }
                .sidebar-nav::-webkit-scrollbar-thumb {
                    background: ${isDarkMode ? '#334155' : '#cbd5e1'};
                    border-radius: 4px;
                }
                .sidebar-nav::-webkit-scrollbar-thumb:hover {
                    background: ${isDarkMode ? '#475569' : '#94a3b8'};
                }
            `}</style>
        </aside>
    );
}

export default Sidebar;