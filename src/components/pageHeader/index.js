import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PageHeader = ({
    heading,
    showButton,
    onView,
    onBack,
    viewText,
    breadcrumbShow = true,
    showRightText,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathArray = location.pathname.split("/");
    const breadcrumb = pathArray
        .slice(1, -1)
        .filter((item) => item.trim() !== "");
    const breadcrumbActive = pathArray[pathArray.length - 1];

    const handleBreadcrumbClick = (index) => {
        const parentPath = "/" + pathArray.slice(1, index + 1).join("/");
        navigate(parentPath);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            {/* Breadcrumb */}
            {breadcrumbShow && (
                <div className="text-sm text-gray-600 mb-2 flex items-center space-x-2">
                    {breadcrumb.map((item, index) => (
                        <span key={index} className="flex items-center">
                            <span
                                className="cursor-pointer hover:text-blue-500"
                                onClick={() => handleBreadcrumbClick(index)}
                            >
                                {item
                                    .split("-")
                                    .map((word) =>
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                    )
                                    .join(" ")}
                            </span>
                            <span className="mx-1">/</span>
                        </span>
                    ))}
                    {!/\d/.test(breadcrumbActive) && breadcrumbActive && (
                        <span className="text-gray-800 font-medium">
                            {breadcrumbActive
                                .split("-")
                                .map((word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                        </span>
                    )}

                </div>

            )}

            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800">{heading}</h1>
                {showRightText && <b className="text-gray-500">{showRightText}</b>}
                <div className="flex justify-end space-x-2">
                    {showButton && (
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                            onClick={onView}
                        >
                            {viewText === "View" ? "View" : "Add"}
                        </button>
                    )}
                    {onBack && (
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                            onClick={onBack}
                        >
                            Back
                        </button>
                    )}
                </div>
            </div>


        </div>
    );
};

export default PageHeader;
