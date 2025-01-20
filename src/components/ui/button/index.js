import React from 'react';

const Button = ({
    type = 'button',
    label,
    icon: Icon,
    color = 'primary',
    size = 'medium', // Default size
    className = '',
    onClick,
    outlined = false,
    ...rest
}) => {
    // Define base styles for the button
    const baseClass =
        'flex justify-center items-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Define color variations
    const colorClasses = {
        primary: outlined
            ? 'text-blue-600 border-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500'
            : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        secondary: outlined
            ? 'text-gray-600 border-gray-600 bg-transparent hover:bg-gray-50 focus:ring-gray-500'
            : 'text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
        danger: outlined
            ? 'text-red-600 border-red-600 bg-transparent hover:bg-red-50 focus:ring-red-500'
            : 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
        success: outlined
            ? 'text-green-600 border-green-600 bg-transparent hover:bg-green-50 focus:ring-green-500'
            : 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
    };

    // Define size variations
    const sizeClasses = {
        small: 'w-24', // Small width
        medium: 'w-40', // Default width
        large: 'w-64', // Large width
        full: 'w-full', // Full width
    };

    // Combine base styles with color and size-specific styles
    const combinedClass = `${baseClass} ${colorClasses[color] || colorClasses.primary} ${sizeClasses[size] || ''} ${className}`;

    return (
        <button
            type={type}
            className={combinedClass}
            onClick={onClick}
            {...rest}
        >
            {Icon && <Icon className="h-4" />} {/* Icon with spacing */}
            {label}
        </button>
    );
};

export default Button;
