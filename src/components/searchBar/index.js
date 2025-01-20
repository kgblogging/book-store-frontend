import React from "react";
import {
  MagnifyingGlassIcon,
  DocumentReportIcon,
  FilterIcon,
  PlusIcon,
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/outline";

const SearchBar = ({
  onSearch,
  onBack,
  onFilter,
  onReport,
  onCreate,
  text,
  icon,
  onDownload,
  onExcelDownload,
  onUpload,
  onPending,
  onAllocated,
  hasPermission,
  onManualRequest
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center bg-gray-100 rounded-md mt-2">
      {/* Search Input */}
      {onSearch && (
        <div className="w-full sm:w-auto flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            onChange={onSearch}
          />
        </div>
      )}

      {/* Buttons */}
      {onPending && (
        <button
          className="border border-gray-300 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
          onClick={onPending}
        >
          Pending
        </button>
      )}
      {onAllocated && (
        <button
          className="border border-gray-300 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
          onClick={onAllocated}
        >
          Allocated
        </button>
      )}
      {onDownload && (
        <button
          className="text-gray-700 hover:text-blue-500"
          onClick={onDownload}
        >
          {/* <ArrowDownTrayIcon className="w-6 h-6" /> */}
          Download
        </button>
      )}
      {onExcelDownload && (
        <button
          className="border border-gray-300 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
          onClick={onExcelDownload}
        >
          <i className="fa fa-file-excel text-xl"></i>
        </button>
      )}
      {onReport && (
        <button
          className="border border-gray-300 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded flex items-center"
          onClick={onReport}
        >
          <DocumentReportIcon className="w-5 h-5 mr-2" /> Report
        </button>
      )}
      {onFilter && (
        <button
          className="border border-gray-300 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded flex items-center"
          onClick={onFilter}
        >
          <FilterIcon className="w-5 h-5 mr-2" /> Filter
        </button>
      )}
      {onCreate && hasPermission && (
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded flex items-center"
          onClick={onCreate}
        >
          <PlusIcon className="w-5 h-5 mr-2" /> {text || "Create"}
        </button>
      )}
      {onManualRequest && hasPermission && (
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded flex items-center"
          onClick={onManualRequest}
        >
          <QuestionMarkCircleIcon className="w-5 h-5 mr-2" /> {text || "Request"}
        </button>
      )}
      {onUpload && (
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={onUpload}
        >
          {/* <ArrowUpTrayIcon className="w-6 h-6" /> */}
          upload
        </button>
      )}
      {onBack && hasPermission && (
        <button
          className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded flex items-center"
          onClick={onBack}
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" /> {text || "Back"}
        </button>
      )}
    </div>
  );
};

export default SearchBar;
