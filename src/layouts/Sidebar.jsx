import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import { MdDashboard } from "react-icons/md";

function Sidebar() {
    const { isDarkMode } = useTheme();


    const linkClasses = `block px-3 py-2.5 rounded-lg transition-colors ${isDarkMode
        ? 'hover:bg-slate-800 hover:text-white'
        : 'hover:bg-dark-navy-blue hover:text-white'
        }`;

    return (
        <aside className={`w-64 h-screen flex flex-col p-4 border-r border-b transition-colors duration-300 ${isDarkMode
            ? 'bg-slate-900 border-slate-700 text-slate-300'
            : 'bg-white-fresh border-[var(--color-halaki-rakhadi)] text-black'
            }`}>
            <nav className="flex-1 overflow-y-auto space-y-8">
                {/* Main Menu ग्रुप */}
                <div>
                    <h3 className={`text-xs  tracking-wider px-3 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Main Menu</h3>
                    <ul>
                        <li><Link to="/dashboard" className={linkClasses}>Dashboard</Link></li>
                        <li><Link to="/orders" className={linkClasses}>Orders</Link></li>
                        <li><Link to="/warehouse" className={linkClasses}>Warehouse</Link></li>
                        <li><Link to="/shipments" className={linkClasses}>Shipments</Link></li>
                        <li><Link to="/clients" className={linkClasses}>Clients</Link></li>
                        <li><Link to="/vehicles" className={linkClasses}>Vehicles</Link></li>
                    </ul>
                </div>

                {/* Management ग्रुप */}
                <div>
                    <h3 className={`text-xs  tracking-wider px-3 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Management</h3>
                    <ul>
                        <li><Link to="/administration" className={linkClasses}>Administration</Link></li>
                        <li><Link to="/gate-pass" className={linkClasses}>Gate Pass</Link></li>
                        <li><Link to="/compliance" className={linkClasses}>Compliance</Link></li>
                        <li><Link to="/settings" className={linkClasses}>Settings</Link></li>
                    </ul>
                </div>

                {/* Order Management ग्रुप */}
                <div>
                    <h3 className={`text-xs  tracking-wider px-3 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Order Management</h3>
                    <ul>
                        <li><Link to="/order-overview" className={linkClasses}>Order Overview</Link></li>
                        <li><Link to="/loading-receipts" className={linkClasses}>Loading Receipts</Link></li>
                        <li><Link to="/consignment-tracking" className={linkClasses}>Consignment Tracking</Link></li>
                        <li><Link to="/route-planning" className={linkClasses}>Route Planning</Link></li>
                    </ul>
                </div>

                {/* Documentation ग्रुप */}
                <div>
                    <h3 className={`text-xs  tracking-wider px-3 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Documentation</h3>
                    <ul >
                        <li><Link to="/invoice-management" className={linkClasses}>Invoice Management</Link></li>
                        <li><Link to="/delivery-receipts" className={linkClasses}>Delivery Receipts</Link></li>
                        <li><Link to="/gate-pass-management" className={linkClasses}>Gate Pass Management</Link></li>
                        <li><Link to="/compliance-documents" className={linkClasses}>Compliance Documents</Link></li>
                    </ul>
                </div>

                {/* Operations ग्रुप */}
                <div>
                    <h3 className={`text-xs  tracking-wider px-3 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Operations</h3>
                    <ul>
                        <li><Link to="/client-management" className={linkClasses}>Client Management</Link></li>
                        <li><Link to="/analytics-reports" className={linkClasses}>Analytics & Reports</Link></li>
                        <li><Link to="/system-settings" className={linkClasses}>System Settings</Link></li>
                        <li><Link to="/settings" className={linkClasses}>Settings</Link></li>
                    </ul>
                </div>

                {/* Vehicle Management ग्रुप */}
                <div>
                    <h3 className={`text-xs  tracking-wider px-3 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Vehicle Management</h3>
                    <ul>
                        <li><Link to="/fleet-overview" className={linkClasses}>Fleet Overview</Link></li>
                        <li><Link to="/driver-management" className={linkClasses}>Driver Management</Link></li>
                        <li><Link to="/route-assignment" className={linkClasses}>Route Assignment</Link></li>
                        <li><Link to="/maintenance-schedule" className={linkClasses}>Maintenance Schedule</Link></li>
                    </ul>
                </div>

                {/* Gate Pass System ग्रुप */}
                <div>
                    <h3 className={`text-xs  tracking-wider px-3 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Gate Pass System</h3>
                    <ul>
                        <li><Link to="/entry-passes" className={linkClasses}>Entry Passes</Link></li>
                        <li><Link to="/exit-management" className={linkClasses}>Exit Management</Link></li>
                        <li><Link to="/security-checks" className={linkClasses}>Security Checks</Link></li>
                        <li><Link to="/access-history" className={linkClasses}>Access History</Link></li>
                    </ul>
                </div>

                {/* Compliance ग्रुप */}
                <div>
                    <h3 className={`text-xs  tracking-wider px-3 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Compliance</h3>
                    <ul>
                        <li><Link to="/license-management" className={linkClasses}>License Management</Link></li>
                        <li><Link to="/insurance-tracking" className={linkClasses}>Insurance Tracking</Link></li>
                        <li><Link to="/reports-analytics" className={linkClasses}>Reports & Analytics</Link></li>
                    </ul>
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;