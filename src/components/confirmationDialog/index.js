// components/ui/ConfirmationDialog.js
import React from 'react';

const ConfirmationDialog = ({ open, handleClose, handleConfirmation, title, content, confirmText }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                <div className="border-b p-4">
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                </div>
                <div className="p-4">
                    <p className="text-gray-600">{content}</p>
                </div>
                <div className="flex justify-end space-x-2 border-t p-4">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmation}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        {confirmText ? confirmText : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
