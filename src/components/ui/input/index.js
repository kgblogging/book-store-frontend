// components/ui/Input.js
import React from 'react';

const Input = ({
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    className = '',
    label,
    labelClassName = '',
    ...rest
}) => {
    const baseClass =
        type === 'radio'
            ? 'form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out'
            : 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm';

    return (
        <div className="flex flex-col space-y-1">
            {label && (
                <label htmlFor={name} className={`text-sm font-medium text-gray-700 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${baseClass} ${className}`}
                {...rest}
            />
        </div>
    );
};

export default Input;
