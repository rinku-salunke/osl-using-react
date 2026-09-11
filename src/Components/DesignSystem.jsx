// ============================================================
// DESIGN SYSTEM — Single Source of Truth
// All typography, spacing, colors, borders for the entire app
// ============================================================

// ============================================================
// 1. TYPOGRAPHY
// ============================================================
export const typography = {
    // Page-level
    pageTitle: 'font-bold text-black text-2xl',
    pageSubtitle: 'text-sm text-gray-500 mt-1',

    // Section-level
    sectionTitle: 'font-bold text-base text-gray-800',
    sectionSubtitle: 'text-sm text-gray-500 mt-1',

    // Card-level
    cardTitle: 'text-sm font-medium text-gray-900',
    cardSubtitle: 'text-xs text-gray-500 mt-0.5',

    // Values
    metricValue: 'text-2xl font-bold text-gray-800',
    metricLabel: 'text-sm text-gray-500 font-medium',
    metricChange: 'text-xs font-medium',

    // Body
    body: 'text-sm text-gray-700',
    bodySmall: 'text-xs text-gray-600',
    bodyMuted: 'text-xs text-gray-500',
    bodySubtle: 'text-xs text-gray-400',

    // Labels
    formLabel: 'text-xs font-medium text-gray-600',
    formValue: 'text-gray-900 font-medium',
    tableHeader: 'text-xs font-medium text-gray-500 tracking-wider',
    tableCell: 'text-sm text-gray-500',

    // Badges
    badgeText: 'text-xs font-medium',

    // Buttons
    buttonText: 'text-sm font-medium',
    buttonTextSmall: 'text-xs font-medium',
};

// ============================================================
// 2. SPACING — padding / margin / gap
// ============================================================
export const spacing = {
    // Layout
    mainPadding: 'px-6 py-8',
    mainSectionGap: 'space-y-8',
    headerPadding: 'px-6 py-4',
    filterBarPadding: 'py-3 px-6',

    // Sections
    sectionPadding: 'p-6',
    sectionHeaderGap: 'mb-5',
    sectionHeaderSmallGap: 'mb-4',

    // Cards
    cardPadding: 'p-5',
    cardPaddingLarge: 'p-6',
    innerCardPadding: 'p-4',

    // Grids
    gridGap: 'gap-5',
    gridGapSmall: 'gap-4',
    gridGapLarge: 'gap-6',

    // Between elements
    listGap: 'space-y-4',
    listGapSmall: 'space-y-3',
    listGapLarge: 'space-y-5',

    // Form
    formFieldGap: 'gap-2',
    formFieldContainerGap: 'gap-4',
    formSectionGap: 'space-y-6',

    // Table
    tableHeaderPadding: 'px-3 py-4',
    tableCellPadding: 'px-3 py-5',
    tableToolbarPadding: 'px-5 py-4',

    // Filter bar items
    filterItemGap: 'gap-3',

    // Icon + text
    iconTextGap: 'gap-2',
    iconTextGapSmall: 'gap-1.5',
    iconTextGapLarge: 'gap-2.5',
};

// ============================================================
// 3. COLORS
// ============================================================
export const colors = {
    // Primary brand
    primary: 'bg-blue-900',
    primaryText: 'text-blue-900',
    primaryHover: 'hover:opacity-90',

    // Text hierarchy
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-800',
    textBody: 'text-gray-700',
    textMuted: 'text-gray-500',
    textSubtle: 'text-gray-400',

    // Backgrounds
    bgPage: 'bg-gray-50',
    bgCard: 'bg-white',
    bgSubtle: 'bg-gray-50',
    bgHover: 'hover:bg-gray-50',

    // Borders
    border: 'border border-gray-300',
    borderLight: 'border border-gray-200',
    borderSubtle: 'border border-gray-100',

    // Status colors
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    neutral: 'bg-gray-100 text-gray-700',
    yellow: 'bg-yellow-100 text-yellow-700',

    // Icon backgrounds
    iconBlue: 'bg-blue-100 text-blue-900',
    iconGreen: 'bg-green-100 text-green-700',
    iconOrange: 'bg-orange-100 text-orange-500',
    iconRed: 'bg-red-100 text-red-500',
    iconPurple: 'bg-purple-100 text-purple-700',
};

// ============================================================
// 4. BORDERS & RADIUS
// ============================================================
export const borders = {
    card: 'border border-gray-300 rounded-md',
    cardLight: 'border border-gray-200 rounded-md',
    roundedSm: 'rounded',
    roundedMd: 'rounded-md',
    roundedLg: 'rounded-lg',
    roundedFull: 'rounded-full',
    roundedCard: 'rounded-md',
};

// ============================================================
// 5. SHADOWS
// ============================================================
export const shadows = {
    card: 'shadow-sm',
    cardHover: 'hover:shadow',
    dropdown: 'shadow-xl',
};

// ============================================================
// 6. BUTTON STYLES
// ============================================================
export const buttons = {
    // Primary — blue filled
    primary: 'bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:opacity-90 inline-flex items-center gap-2',

    // Secondary — outline
    secondary: 'text-gray-600 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-50 inline-flex items-center gap-2',

    // Small primary
    primarySm: 'bg-blue-900 text-white px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer hover:opacity-90 inline-flex items-center gap-1',

    // Text-only
    text: 'flex items-center gap-1.5 text-sm font-medium cursor-pointer',
    textBlue: 'text-blue-900 hover:text-blue-700',
    textGray: 'text-gray-700 hover:text-blue-600',
    textRed: 'text-red-600 hover:text-red-700',

    // Icon button
    icon: 'w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer',

    // Pagination
    page: 'px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed',
    pageActive: 'px-3 py-1.5 border rounded text-sm bg-blue-900 text-white border-blue-900',

    // Disabled
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
};

// ============================================================
// 7. INPUT / FORM STYLES
// ============================================================
export const inputs = {
    base: 'w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900',
    select: 'appearance-none w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-900 bg-white cursor-pointer',
    filterSelect: 'appearance-none bg-transparent border-none focus:outline-none cursor-pointer text-gray-700 text-sm w-full pr-6',
    filterWrapper: 'relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-40 hover:border-gray-300',
    textarea: 'w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-900 resize-none',
    error: 'border-red-400',
};

// ============================================================
// 8. BADGE STYLES
// ============================================================
export const badges = {
    base: 'text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    purple: 'bg-purple-100 text-purple-700',
    gray: 'bg-gray-100 text-gray-700',
};

// ============================================================
// 9. HELPER — combine multiple classes
// ============================================================
export const cx = (...classes) => classes.filter(Boolean).join(' ');

// ============================================================
// 10. PRE-BUILT COMBINATIONS — for common patterns
// ============================================================
export const patterns = {
    // Section card
    sectionCard: 'bg-white border border-gray-300 rounded-md p-6',

    // Inner card
    innerCard: 'bg-white border border-gray-300 rounded-md p-5',

    // List row (activities, inventory)
    listRow: 'flex gap-4 items-start p-5 bg-gray-50 rounded-md',

    // Metric card
    metricCard: 'bg-white p-5 border border-gray-300 rounded-md flex items-center justify-between',

    // Filter bar
    filterBar: 'border-b border-gray-200 py-3 px-6 flex flex-wrap items-center justify-between gap-3 bg-white',

    // Table toolbar
    tableToolbar: 'px-5 py-4 border-b border-gray-200 flex items-center justify-end gap-5 flex-wrap',

    // Table footer
    tableFooter: 'px-5 py-4 border-t border-gray-300 flex items-center justify-between flex-wrap gap-3',

    // Modal backdrop
    modalBackdrop: 'fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4',

    // Modal container
    modalContainer: 'bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto',

    // Modal header
    modalHeader: 'sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between z-10',

    // Modal footer
    modalFooter: 'flex items-center justify-end gap-3 pt-5 border-t border-gray-200',

    // Empty state
    emptyState: 'px-3 py-12 text-center text-sm text-gray-500',

    // Progress bar
    progressTrack: 'w-full bg-gray-200 rounded-full h-1.5',
    progressFill: 'h-1.5 rounded-full',
};