import React from 'react';

const Button = ({
    type = 'button',
    label = 'Click Me',
    color = 'primary',
    className = '',
    onClick,
    ...rest
}) => {
    // Define base styles for the button
    const baseClass =
        'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Define color variations
    const colorClasses = {
        primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
        danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
        success: 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
    };

    // Combine base styles with color-specific styles
    const combinedClass = `${baseClass} ${colorClasses[color] || colorClasses.primary} ${className}`;

    return (
        <button
            type={type}
            className={combinedClass}
            onClick={onClick}
            {...rest}
        >
            {label}
        </button>
    );
};

export default Button;
