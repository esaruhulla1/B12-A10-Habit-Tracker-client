import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import Header_logo_2 from '../assets/Header-log.png';
import { AuthContext } from '../Context/AuthContext';
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const { user, singOutUser, loading } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await singOutUser();
            setDropdownOpen(false);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const links = (
        <>
            <li className='underline-offset-3 text-[15px]'><NavLink to="/">Home</NavLink></li>
            <li className='underline-offset-3 text-[15px]'><NavLink to="/habits">Habits</NavLink></li>
            <li className='underline-offset-3 text-[15px]'><NavLink to="/add-habit">Add Habit</NavLink></li>
            <li className='underline-offset-3 text-[15px]'><NavLink to="/my-habit">My Habits</NavLink></li>
        </>
    );

    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar max-w-[1820px] mx-auto">
                {/* LEFT */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Link to="/" className="btn btn-ghost  -ml-2 text-xl">
                            {/* <img className='max-w-[60px] -ml-4' src={Header_logo_2} alt="logo" /> */}
                            <img className='max-w-[50px] -ml-8' src={Header_logo_2} alt="logo" />
                            <span className='-ml-2 -mb-2'>Habit Tracker</span></Link>
                    </div>
                </div>

                {/* CENTER */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-3">{links}</ul>
                </div>

                {/* RIGHT */}
                <div className="navbar-end relative">
                    {loading ? (
                        <span className="loading loading-spinner text-[#096e6a]"></span>
                    ) : !user ? (
                        <div className="flex gap-5">
                            <Link
                                to="/login"
                                className="text-[#096e6a] font-semibold text-[14px] hover:text-[#5bdba8] relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#5bdba8] hover:after:w-full after:transition-all after:duration-300"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="text-[#096e6a] font-semibold text-[14px] hover:text-[#5bdba8] relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#5bdba8] hover:after:w-full after:transition-all after:duration-300"
                            >
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Profile Button */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center focus:outline-none"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="User"
                                        className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-[#096e6a] transition-all"
                                    />
                                ) : (
                                    <FaUserCircle className="text-3xl text-gray-600" />
                                )}
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-[999]">
                                    <p className="font-semibold text-gray-800">{user.displayName || "User"}</p>
                                    <p className="text-sm text-gray-600 mb-3">{user.email}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 bg-[#096e6a] text-white rounded-lg hover:bg-[#32a09c] transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
