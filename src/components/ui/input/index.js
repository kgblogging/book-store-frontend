// components/ui/Input.js
import React from 'react';

const Input = ({ type = 'text', name, value, onChange, placeholder, className = '', ...rest }) => {

    const baseClass =
        type === 'radio'
            ? 'form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out'
            : 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm';


    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseClass} ${className}`}
            {...rest}
        />
    );
};

export default Input;
