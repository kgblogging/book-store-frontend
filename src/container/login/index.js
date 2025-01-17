import React, { useState } from 'react';
import { connect } from 'react-redux';
import { onLogin } from "../../store/auth/actions";
import { Link, useNavigate } from 'react-router-dom';

const LoginContainer = (props) => {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onLogin(state,navigate);
    };

    const handleChange = (e) => {
        let _state = { ...state };
        _state[e.target.name] = e.target.value;
        setState(_state);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side with Form */}
            <div className="flex flex-col items-center justify-center w-1/2 px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-white">
                <div className="w-full max-w-sm space-y-8">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Start your journey</h2>
                        <p className="mt-2 text-lg text-gray-600">Sign In to BookStore</p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                            value={state.email}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                            value={state.password}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="flex items-center justify-between mt-4">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-2 text-gray-500">OR</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>
                    <div className="text-center mt-4">
                        New To BookStore?&nbsp;
                        <Link
                            to="/register"
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Register Here
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side with Animated Ripple and GIF */}
            <div className="relative w-1/2 bg-gray-100">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-light-blue to-light-cyan animate-smoothRipple"></div>
                </div>
                <div className="flex justify-center items-center h-full">
                    <img
                        src="https://media3.giphy.com/media/UQaF3dHg79e9ujC8E6/giphy.gif?cid=6c09b952ywdu04w877vzsejznxh5l5lijfad3v0kqaancw21&ep=v1_stickers_search&rid=giphy.gif&ct=s" // Replace with your own GIF URL
                        alt="Bookstore GIF"
                        className="object-contain max-w-xs"
                    />
                </div>
            </div>
        </div>
    );
};

export default connect(null, { onLogin })(LoginContainer);
