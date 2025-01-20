import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon, BookOpenIcon } from '@heroicons/react/solid';
import { getDataFromStore } from '../../../store/getStore';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  let auth = getDataFromStore('Auth')

  console.log()
  return (
    <div
      className={`bg-gray-800 text-white p-5 h-full relative ${isCollapsed ? 'w-20' : 'w-55'
        } transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="flex items-center justify-between mb-5">
        {!isCollapsed && (
          <div className="text-lg font-semibold text-white">👋 - {auth?.auth?.user?.name}</div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white bg-gray-700 rounded-full p-2"
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      <ul className="flex-grow">
        {/* Dashboard Link */}
        <li className="mb-4 flex items-center group relative">
          <Link
            to="/"
            className={`flex items-center w-full ${activeLink === '/' ? 'bg-white text-gray-800 rounded-md p-2' : ''
              }`}
            onClick={() => handleLinkClick('/')}
          >
            <HomeIcon
              className={`h-6 w-6 ${isCollapsed ? 'mx-auto' : 'mr-3'
                } transition-all duration-300`}
            />
            {!isCollapsed && <span className="text-lg">Dashboard</span>}
          </Link>
          {isCollapsed && (
            <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Dashboard
            </span>
          )}
        </li>

        {/* Profile Link */}
        <li className="mb-4 flex items-center group relative">
          <Link
            to="/profile"
            className={`flex items-center w-full ${activeLink === '/profile'
              ? 'bg-white text-gray-800 rounded-md p-2'
              : ''
              }`}
            onClick={() => handleLinkClick('/profile')}
          >
            <UserIcon
              className={`h-6 w-6 ${isCollapsed ? 'mx-auto' : 'mr-3'
                } transition-all duration-300`}
            />
            {!isCollapsed && <span className="text-lg">Profile</span>}
          </Link>
          {isCollapsed && (
            <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Profile
            </span>
          )}
        </li>

        {/* book link */}
        <li className="mb-4 flex items-center group relative">
          <Link
            to="/book"
            className={`flex items-center w-full ${activeLink === '/book'
              ? 'bg-white text-gray-800 rounded-md p-2'
              : ''
              }`}
            onClick={() => handleLinkClick('/book')}
          >
            <BookOpenIcon
              className={`h-6 w-6 ${isCollapsed ? 'mx-auto' : 'mr-3'
                } transition-all duration-300`}
            />
            {!isCollapsed && <span className="text-lg">My Book</span>}
          </Link>
          {isCollapsed && (
            <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              My Book
            </span>
          )}
        </li>
      </ul>

      {/* Settings Link with Submenu */}
      <div className="mt-auto relative">
        <div
          className="flex items-center group cursor-pointer relative"
          onClick={handleSettingsToggle}
        >
          <CogIcon
            className={`h-6 w-6 transition-all duration-300 ${isCollapsed ? 'mx-auto' : 'mr-3'
              }`}
          />
          {!isCollapsed && <span className="text-lg">Settings</span>}
          {isCollapsed && (
            <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Settings
            </span>
          )}
        </div>
        {isSettingsOpen && (
          <ul
            className={`${isCollapsed ? 'absolute left-full' : ''
              } bg-gray-700 rounded-md mt-2`}
          >
            <li className="p-1 hover:bg-gray-600 rounded">
              <Link to="/system-settings" className="text-white">
                System Settings
              </Link>
            </li>
            <li className="p-1 hover:bg-gray-600 rounded">
              <Link to="/logout" className="text-white">
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
