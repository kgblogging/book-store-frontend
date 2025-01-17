import { LogoutIcon } from '@heroicons/react/solid';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div className="bg-teal-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl">Book Store</div>
        <div className="relative">
          {/* Profile Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 bg-teal-700 text-white px-4 py-2 rounded-full"
          >
            {/* <img src={profilePicture} alt="Profile" className="w-8 h-8 rounded-full" /> */}
            <span>Account</span>
          </button>
  
          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg text-gray-800">
              <ul>
                <li>
                  <Link to="/account" className="block p-2 hover:bg-gray-200">My Account</Link>
                </li>
                <li>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left p-2 hover:bg-gray-200"
                  >
                    <LogoutIcon className="h-5 w-5 inline-block mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
}

export default Header
