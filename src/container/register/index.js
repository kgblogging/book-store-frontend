import React, { useState } from 'react';
import { actionNotifier } from '../../components/ui/toast';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { onRegister } from '../../store/auth/actions';
import Input from '../../components/ui/input';
import Button from '../../components/ui/button';

const RegisterContainer = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dob: '',
        showPassword: false,
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setState((prev) => ({
            ...prev,
            showPassword: !prev.showPassword,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.password !== state.confirmPassword) {
            actionNotifier.error('Passwords do not match!');
            return;
        }
        props.onRegister(state, navigate);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side with Form */}
            <div className="flex flex-col items-center justify-center w-1/2 px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-white">
                <div className="w-full max-w-sm space-y-8">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                        <p className="mt-2 text-lg text-gray-600">Sign Up for BookStore</p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <Input
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                        <Input
                            type="email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            required
                        />
                        <div className="relative">
                            <Input
                                type={state.showPassword ? 'text' : 'password'}
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                {state.showPassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                    </svg>
                                }
                            </button>
                        </div>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={state.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                        />
                        <div className="flex items-center space-x-5">
                            <label className="flex items-center">
                                <Input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={state.gender === 'male'}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="flex items-center">
                                <Input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={state.gender === 'female'}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                        <Input
                            type="date"
                            name="dob"
                            max={new Date().toISOString().split('T')[0]}
                            value={state.dob}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            type="submit"
                            label='Register'
                            size='full'
                        />
                    </form>
                    <div className="flex items-center justify-between mt-4">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-2 text-gray-500">OR</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>
                    <div className="text-center mt-4">
                        Already have a account?&nbsp;
                        <Link
                            to="/"
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Login Here
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
                        src="https://media3.giphy.com/media/UQaF3dHg79e9ujC8E6/giphy.gif?cid=6c09b952ywdu04w877vzsejznxh5l5lijfad3v0kqaancw21&ep=v1_stickers_search&rid=giphy.gif&ct=s"
                        alt="Bookstore GIF"
                        className="object-contain max-w-xs"
                    />
                </div>
            </div>
        </div>
    );
};

export default connect(null, { onRegister })(RegisterContainer);