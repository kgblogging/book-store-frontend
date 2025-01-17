import Loader from "../loader"
import React from "react";

const MyLoader = ({ active, children }) => {
    return (
        <div>
            {active && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <Loader />
                </div>
            )}
            {children}
        </div>
    )
}

export default MyLoader;