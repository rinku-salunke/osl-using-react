import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import { PiVanDuotone } from "react-icons/pi";

import {
    FiHome, FiPackage, FiBox, FiTruck, FiUsers,
    FiSettings, FiShield, FiClipboard, FiMap,
    FiFileText, FiCheckSquare, FiGrid, FiPieChart,
    FiUserCheck, FiCalendar, FiClock, FiAlertCircle,
    FiBookOpen, FiCreditCard, FiLock, FiBarChart2,
    FiUser, FiLogOut
} from 'react-icons/fi';

function Sidebar() {
    const { isDarkMode } = useTheme();

    // Base classes for nav links
    const baseLinkClasses = `
    flex items-center gap-3 px-3 py-2.5 rounded-lg
    transition-all duration-200 ease-in-out
    text-sm font-medium
  `;

    // Dark/light mode styles
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

    // Heading styles
    const headingClasses = `
    text-xs font-semibold tracking-wider uppercase px-3 mb-2
    ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
    border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} pb-2
  `;

    return (
        <aside
            className={`
        w-64 h-screen flex flex-col p-4 border-r border-b
        transition-colors duration-300
        ${isDarkMode
                    ? 'bg-dark-navy-blue border-slate-700'
                    : 'bg-white border-slate-200'
                }
      `}
        >

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto space-y-6">
                {/* Main Menu */}
                <div>
                    <h3 className={headingClasses}>Main Menu</h3>
                    <ul className="space-y-1">
                        <li><NavLink to="/dashboard" className={linkClasses}><FiHome /> Dashboard</NavLink></li>
                        <li><NavLink to="/orders" className={linkClasses}><FiPackage /> Orders</NavLink></li>
                        <li><NavLink to="/warehouse" className={linkClasses}><FiBox /> Warehouse</NavLink></li>
                        <li><NavLink to="/shipments" className={linkClasses}><FiTruck /> Shipments</NavLink></li>
                        <li><NavLink to="/clients" className={linkClasses}><FiUsers /> Clients</NavLink></li>
                        <li><NavLink to={"/vehicles"} className={linkClasses}><PiVanDuotone />
                            Vehicles</NavLink></li>
                    </ul>
                </div>

                {/* Management */}
                <div>
                    <h3 className={headingClasses}>Management</h3>
                    <ul className="space-y-1">
                        <li><NavLink to="/administration" className={linkClasses}><FiSettings /> Administration</NavLink></li>
                        <li><NavLink to="/gate-pass" className={linkClasses}><FiShield /> Vehicle &amp; Gate Pass</NavLink></li>
                        <li><NavLink to="/compliance" className={linkClasses}><FiClipboard /> Compliance</NavLink></li>
                    </ul>
                </div>

                {/* Order Management */}
                <div>
                    <h3 className={headingClasses}>Order Management</h3>
                    <ul className="space-y-1">
                        <li><NavLink to="/order-overview" className={linkClasses}><FiGrid /> Order Overview</NavLink></li>
                        <li><NavLink to="/loading-receipts" className={linkClasses}><FiFileText /> Loading Receipts</NavLink></li>
                        <li><NavLink to="/consignment-tracking" className={linkClasses}><FiMap /> Consignment Tracking</NavLink></li>
                        <li><NavLink to="/route-planning" className={linkClasses}><FiCalendar /> Route Planning</NavLink></li>
                    </ul>
                </div>

                {/* Documentation */}
                <div>
                    <h3 className={headingClasses}>Documentation</h3>
                    <ul className="space-y-1">
                        <li><NavLink to="/invoice-management" className={linkClasses}><FiFileText /> Invoice Management</NavLink></li>
                        <li><NavLink to="/delivery-receipts" className={linkClasses}><FiCheckSquare /> Delivery Receipts</NavLink></li>
                        <li><NavLink to="/gate-pass-management" className={linkClasses}><FiShield /> Gate Pass Management</NavLink></li>
                        <li><NavLink to="/compliance-documents" className={linkClasses}><FiBookOpen /> Compliance Documents</NavLink></li>
                    </ul>
                </div>

                {/* Operations */}
                <div>
                    <h3 className={headingClasses}>Operations</h3>
                    <ul className="space-y-1">
                        <li><NavLink to="/client-management" className={linkClasses}><FiUsers /> Client Management</NavLink></li>
                        <li><NavLink to="/analytics-reports" className={linkClasses}><FiPieChart /> Analytics &amp; Reports</NavLink></li>
                        <li><NavLink to="/system-settings" className={linkClasses}><FiSettings /> System Settings</NavLink></li>
                        <li><NavLink to="/settings" className={linkClasses}><FiLock /> Settings</NavLink></li>
                    </ul>
                </div>

                {/* Vehicle Management */}
                <div>
                    <h3 className={headingClasses}>Vehicle Management</h3>
                    <ul className="space-y-1">
                        <li><NavLink to="/fleet-overview" className={linkClasses}><FiTruck /> Fleet Overview</NavLink></li>
                        <li><NavLink to="/driver-management" className={linkClasses}><FiUser /> Driver Management</NavLink></li>
                        <li><NavLink to="/route-assignment" className={linkClasses}><FiMap /> Route Assignment</NavLink></li>
                        <li><NavLink to="/maintenance-schedule" className={linkClasses}><FiClock /> Maintenance Schedule</NavLink></li>
                    </ul>
                </div>

                {/* Gate Pass System */}
                <div>
                    <h3 className={headingClasses}>Gate Pass System</h3>
                    <ul className="space-y-1">
                        <li><NavLink to="/entry-passes" className={linkClasses}><FiLogOut /> Entry Passes</NavLink></li>
                        <li><NavLink to="/exit-management" className={linkClasses}><FiLogOut /> Exit Management</NavLink></li>
                        <li><NavLink to="/security-checks" className={linkClasses}><FiAlertCircle /> Security Checks</NavLink></li>
                        <li><NavLink to="/access-history" className={linkClasses}><FiClock /> Access History</NavLink></li>
                    </ul>
                </div>

                {/* Compliance */}
                <div>
                    <h3 className={headingClasses}>Compliance</h3>
                    <ul className="space-y-1">
                        <li><NavLink to="/license-management" className={linkClasses}><FiCreditCard /> License Management</NavLink></li>
                        <li><NavLink to="/insurance-tracking" className={linkClasses}><FiShield /> Insurance Tracking</NavLink></li>
                        <li><NavLink to="/reports-analytics" className={linkClasses}><FiBarChart2 /> Reports &amp; Analytics</NavLink></li>
                    </ul>
                </div>
            </nav>


        </aside>
    );
}

export default Sidebar;