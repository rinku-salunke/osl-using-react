// ============================================================
// CARDS DESIGN SYSTEM
// Reusable card components for Orders, Warehouse, Shipments
// ============================================================

import React from 'react';

// ============================================================
// 1. SECTION CARD — Major sections with title + optional actions
// Use: Advanced Filters, Available Vehicles, Performance Analytics, etc.
// ============================================================
export const SectionCard = ({ title, actions, children, className = '' }) => (
    <div className={`bg-white border border-gray-300 rounded-md p-6 ${className}`}>
        {(title || actions) && (
            <div className="flex items-center justify-between mb-5">
                {title && <h2 className="font-bold text-base text-gray-800">{title}</h2>}
                {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
        )}
        {children}
    </div>
);

// ============================================================
// 2. CARD — Generic inner card (metric cards, task cards, etc.)
// ============================================================
export const Card = ({ children, className = '' }) => (
    <div className={`bg-white border border-gray-300 rounded-md p-5 ${className}`}>
        {children}
    </div>
);

// ============================================================
// 3. METRIC CARD — For stats with icon + value + change
// Use: Total Orders, In Transit, Pending, etc.
// ============================================================
export const MetricCard = ({
    label,
    value,
    change,
    changeColor = 'text-green-600',
    changeIcon = 'up', // 'up' | 'down' | 'dot'
    icon: Icon,
    iconBg = 'bg-blue-100',
    iconColor = 'text-blue-900',
}) => (
    <div className="bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between">
        <div className="flex flex-col">
            <div className="text-sm text-gray-500 font-medium">{label}</div>
            <div className="text-2xl font-bold text-gray-800 my-1">{value}</div>
            {change && (
                <div className={`flex items-center text-xs font-medium ${changeColor}`}>
                    {changeIcon === 'up' && <span className="mr-1">↑</span>}
                    {changeIcon === 'down' && <span className="mr-1">↓</span>}
                    {changeIcon === 'dot' && <span className="mr-1">•</span>}
                    {change}
                </div>
            )}
        </div>
        {Icon && (
            <div className={`${iconBg} p-3 rounded-lg ${iconColor}`}>
                <Icon size={20} />
            </div>
        )}
    </div>
);

// ============================================================
// 4. VEHICLE CARD — Available Vehicles card with details + button
// Use: TRK-001, VAN-045, TRK-028, etc.
// ============================================================
export const VehicleCard = ({
    icon: Icon,
    iconBg,
    iconColor,
    vehicleId,
    vehicleType,
    status,
    statusVariant = 'green', // green | orange | red | blue
    details = [],
    buttonLabel,
    buttonVariant = 'primary', // 'primary' | 'disabled'
    onButtonClick,
}) => {
    const statusClasses = {
        green: 'text-green-700 bg-green-100',
        orange: 'text-orange-700 bg-orange-100',
        red: 'text-red-700 bg-red-100',
        blue: 'text-blue-700 bg-blue-100',
    };

    return (
        <div className="bg-white border border-gray-200 rounded-md p-5 flex-1 min-w-[240px]">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 ${iconBg} rounded-md flex items-center justify-center`}>
                        <Icon className={iconColor} size={16} />
                    </div>
                    <div>
                        <div className="font-bold text-sm text-gray-800">{vehicleId}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{vehicleType}</div>
                    </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusClasses[statusVariant]}`}>
                    {status}
                </span>
            </div>

            {/* Details */}
            <div className="mt-4 space-y-2.5 text-sm pt-4 border-t border-gray-100">
                {details.map((detail, i) => (
                    <div key={i} className="flex justify-between">
                        <span className="text-gray-500">{detail.label}:</span>
                        <span className="text-gray-900 font-medium">{detail.value}</span>
                    </div>
                ))}
            </div>

            {/* Button */}
            <button
                onClick={onButtonClick}
                disabled={buttonVariant === 'disabled'}
                className={`mt-5 w-full text-sm font-medium py-2 rounded-lg transition-colors shadow-sm ${buttonVariant === 'primary'
                        ? 'bg-blue-900 text-white hover:shadow'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
            >
                {buttonLabel}
            </button>
        </div>
    );
};

// ============================================================
// 5. TASK CARD — Warehouse tasks with progress bar + action button
// Use: Pick Order #LG-001247, Receive Shipment, Stock Audit
// ============================================================
export const TaskCard = ({
    icon: Icon,
    iconBg,
    iconColor,
    title,
    priority,
    status,
    statusVariant = 'blue',
    rows = [],
    progress,
    progressTotal,
    progressColor = 'bg-green-500',
    actionLabel,
    actionBtnColor = 'bg-blue-900',
    actionIcon: ActionIcon,
    onActionClick,
    onExpandClick,
}) => {
    const statusClasses = {
        green: 'bg-green-100 text-green-700',
        orange: 'bg-orange-100 text-orange-700',
        blue: 'bg-blue-100 text-blue-700',
        purple: 'bg-purple-100 text-purple-700',
    };

    const progressPercent = progressTotal ? Math.round((progress / progressTotal) * 100) : 0;
    const isComplete = progress === progressTotal;

    return (
        <div className="border border-gray-300 rounded-md p-5 bg-white shadow-sm h-full flex flex-col justify-between">
            <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                            <Icon className={iconColor} size={18} />
                        </div>
                        <div>
                            <div className="font-semibold text-sm text-gray-800">{title}</div>
                            <div className="text-xs text-gray-500 mt-0.5">Priority: {priority}</div>
                        </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusClasses[statusVariant]}`}>
                        {status}
                    </span>
                </div>

                {/* Rows */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                    {rows.map((row, i) => (
                        <React.Fragment key={i}>
                            <span className="text-gray-500">{row.label}:</span>
                            <span className={`font-medium text-right ${row.highlight ? 'text-orange-500' : 'text-gray-900'}`}>
                                {row.value}
                            </span>
                        </React.Fragment>
                    ))}
                </div>

                {/* Progress */}
                {progress !== undefined && progressTotal !== undefined && (
                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                            <span>Progress</span>
                            <span>{isComplete ? 'Ready' : `${progress}/${progressTotal} items`}</span>
                        </div>
                        <div className="bg-gray-200 h-2 rounded-full w-full">
                            <div
                                className={`h-2 rounded-full ${progressColor}`}
                                style={{ width: `${Math.min(progressPercent, 100)}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Action button */}
            <div className="mt-5 flex items-center gap-2">
                <button
                    onClick={onActionClick}
                    className={`flex-1 text-white py-2 rounded-lg ${actionBtnColor} hover:opacity-90 transition flex items-center justify-center gap-2 text-sm font-medium`}
                >
                    {ActionIcon && <ActionIcon size={14} />}
                    <span>{actionLabel}</span>
                </button>

                <div
                    onClick={onExpandClick}
                    className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer flex-shrink-0 hover:bg-gray-200 transition-colors"
                >
                    <span className="text-gray-700 text-sm">⤢</span>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// 6. ACTIVITY CARD — Recent activities row
// Use: Recent Activities list
// ============================================================
export const ActivityCard = ({
    icon: Icon,
    iconBg = 'bg-green-100',
    iconColor = 'text-green-700',
    title,
    description,
    time,
}) => (
    <div className="flex gap-4 items-start p-5 bg-gray-50 rounded-md">
        <div className={`rounded-full p-1.5 mt-0.5 flex-shrink-0 ${iconBg} ${iconColor}`}>
            <Icon className="w-4 h-4" />
        </div>
        <div>
            <div className="font-semibold text-sm text-gray-800">{title}</div>
            <div className="text-xs text-gray-600 mt-1">{description}</div>
            <div className="text-xs text-gray-400 mt-1">{time}</div>
        </div>
    </div>
);

// ============================================================
// 7. PERFORMANCE METRIC CARD — Analytics metric tile
// Use: Performance Analytics (94.5%, 87%, 2.1%, 4.8)
// ============================================================
export const PerformanceMetricCard = ({
    value,
    label,
    change,
    changeIcon = 'up', // 'up' | 'down'
    bg = 'bg-blue-100',
    textColor = 'text-blue-900',
    changeColor = 'text-green-600',
}) => (
    <div className={`${bg} rounded-lg p-5 border border-transparent text-center`}>
        <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
        <div className="text-sm font-medium text-gray-700 mt-1.5">{label}</div>
        {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-semibold justify-center ${changeColor}`}>
                {changeIcon === 'up' && <span>↑</span>}
                {changeIcon === 'down' && <span>↓</span>}
                <span>{change}</span>
            </div>
        )}
    </div>
);

// ============================================================
// 8. SHIPMENT CARD — Active shipment card with progress
// Use: Active Shipments list, Live Tracking
// ============================================================
export const ShipmentCard = ({
    dotColor = 'bg-green-500',
    shipmentId,
    route,
    status,
    statusVariant = 'green',
    progress,
    progressColor = 'bg-green-500',
}) => {
    const statusClasses = {
        green: 'text-green-700 bg-green-100',
        blue: 'text-blue-700 bg-blue-100',
        orange: 'text-orange-700 bg-orange-100',
        red: 'text-red-700 bg-red-100',
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
                    <div>
                        <div className="text-sm font-bold text-gray-800">{shipmentId}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{route}</div>
                    </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusClasses[statusVariant]}`}>
                    {status}
                </span>
            </div>

            {progress !== undefined && (
                <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className={`${progressColor} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================
// 9. INVENTORY LEVEL CARD — Inventory Levels row
// Use: Optimal Stock, Low Stock, Out of Stock
// ============================================================
export const InventoryLevelCard = ({
    icon: Icon,
    iconBg,
    iconColor,
    label,
    value,
    percentage,
    percentageColor = 'text-green-600',
}) => (
    <div className="bg-gray-50 p-5 rounded-md flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center ${iconBg}`}>
                <Icon className={`text-xl ${iconColor}`} />
            </div>
            <div>
                <div className="text-gray-900 font-medium text-sm">{label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{value}</div>
            </div>
        </div>
        <span className={`font-bold text-lg ${percentageColor}`}>{percentage}%</span>
    </div>
);

// ============================================================
// 10. ZONE CARD — Warehouse zone tile
// Use: Zone A, Zone B, etc.
// ============================================================
export const ZoneCard = ({
    name,
    category,
    capacity,
    bg = 'bg-blue-100',
    textColor = 'text-blue-500',
}) => (
    <div className={`${bg} rounded-md p-4 text-center`}>
        <div className={`font-bold text-sm ${textColor}`}>{name}</div>
        <div className="text-xs text-gray-700 mt-1">{category}</div>
        <div className="text-xs text-gray-500 mt-0.5">{capacity}</div>
    </div>
);

// ============================================================
// 11. QUICK ACTION CARD — Quick action button (Warehouse)
// Use: Receive Items, Pick Items, QR Scan, etc.
// ============================================================
export const QuickActionCard = ({
    icon: Icon,
    label,
    bg = 'bg-blue-100',
    iconColor = 'text-blue-900',
    onClick,
}) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 h-24 min-w-[120px] flex-1 hover:shadow-md transition"
        aria-label={label}
    >
        <div className={`flex items-center justify-center w-12 h-12 ${bg} rounded-lg mb-2`}>
            <Icon className={`text-2xl ${iconColor}`} />
        </div>
        <span className="text-sm font-medium text-gray-800 text-center">{label}</span>
    </button>
);