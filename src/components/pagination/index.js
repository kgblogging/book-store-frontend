import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Pagination = ({ count, itemsPerPage, pageNo, handlePage, handleCount }) => {
  const [currentPage, setCurrentPage] = useState(pageNo);

  useEffect(() => {
    setCurrentPage(pageNo);
  }, [pageNo]);

  useEffect(() => {
    handlePage(currentPage);
  }, [currentPage, handlePage]);

  const totalPages = Math.ceil(count / itemsPerPage);

  const handlePageDecrease = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageIncrease = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded-md shadow-md">
      <div className="flex items-center space-x-2">
        <select
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={itemsPerPage}
          onChange={(e) => handleCount(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <span className="text-gray-600">
          {count > 0 &&
            `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
              currentPage * itemsPerPage,
              count
            )} of ${count} items`}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className={`p-2 border rounded-md ${
            currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={handlePageDecrease}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <select
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <button
          className={`p-2 border rounded-md ${
            currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={handlePageIncrease}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
