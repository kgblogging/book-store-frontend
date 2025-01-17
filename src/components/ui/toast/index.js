import { ToastContainer, toast } from "react-toastify";
import React from "react";
export default () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
        />
    );
};

export const actionNotifier =  {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    warning: (message) => toast.warn(message),
    info: (message) => toast.info(message),
};

