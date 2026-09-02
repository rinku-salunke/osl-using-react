import React, { useState } from 'react'
import { IoMicOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsBell } from "react-icons/bs";
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from '../../ThemeContext';

function Header() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <header className="w-full h-15 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors duration-300">

            {/* Left Section - Logo */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-dark-navy-blue dark:bg-blue-900 rounded-md flex items-center justify-center">
                    <CiDeliveryTruck className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-blue-950 dark:text-white leading-tight">OSL</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Management System</span>
                </div>
            </div>

            {/* Search Section */}
            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h5 text-gray-400 dark:text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>

                    <input
                        type="text"
                        placeholder="Search orders, clients, vehicles..."
                        className="w-full h-8 bg-white dark:bg-gray-700 rounded-md pl-12 pr-12 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[var(--color-halaki-rakhadi)] dark:focus:border-gray-500 border border-[var(--color-halaki-rakhadi)] dark:border-gray-600 transition-colors"
                    />

                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <IoMicOutline className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">

                {/* Theme Toggle (Moon/Sun) */}
                <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full cursor-pointer transition-colors"
                    title="Toggle Theme"
                >
                    {isDarkMode ? (
                        <MdOutlineWbSunny className="w-6 h-6 text-yellow-400" />
                    ) : (
                        <FaMoon className="w-6 h-6" />
                    )}
                </button>

                {/* Bell */}
                <button className="relative p-2 text-[var(--color-muted-icons)] dark:text-gray-400 hover:text-blue-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full cursor-pointer transition-colors">
                    <BsBell className="w-6 h-6" />
                </button>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* User Profile */}
                <button className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-gray-600 overflow-hidden border border-gray-200 dark:border-gray-600">
                        <img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-sm text-gray-900 dark:text-white">Rinku Salunke</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Operations</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-500 dark:text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
        </header>
    )
}
export default Header;