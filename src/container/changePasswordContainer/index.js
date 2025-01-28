import React, { useState } from 'react'
import Input from '../../components/ui/input';
import Button from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { actionNotifier } from '../../components/ui/toast';
import { onChangePassword } from '../../store/auth/actions';
import { connect } from 'react-redux';

const ChangePasswordContainer = (props) => {
    const [state, setState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(state)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.newPassword == '' || state.oldPassword == '' || state.confirmPassword == '') {
            actionNotifier.error("All Fields are required")
            return
        }
        if (state.newPassword !== state.confirmPassword) {
            actionNotifier.error('Passwords do not match!');
            return;
        }
        props.onChangePassword(state, navigate);
    };

    return (
        <>
            <div className="p-4 bg-white shadow-md rounded-md mt-2">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <Input
                                type="text"
                                name="oldPassword"
                                value={state.oldPassword}
                                onChange={handleChange}
                                placeholder="Enter Old Password"
                                label="Old Password"
                                className="border-blue-500"
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Input
                                type="text"
                                name="newPassword"
                                value={state.newPassword}
                                onChange={handleChange}
                                placeholder="Enter New Password"
                                label="New Password"
                                className="border-blue-500"
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Input
                                type="text"
                                name="confirmPassword"
                                value={state.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-Confirm New Password"
                                label="Confirm Password"
                                className="border-blue-500"
                            />
                        </div>

                    </div>
                    <div className='flex justify-end mt-2'>
                        <Button color="primary" type='submit' size="medium" label={"Change Password"} className='mr-2' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default connect(null, { onChangePassword })(ChangePasswordContainer);
