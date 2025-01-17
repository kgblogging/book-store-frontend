import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { onLogout } from "../../store/auth/actions";

const Logout = (props) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        props.onLogout(navigate)
    }, [])

    return (
        <>
            Loading...
        </>
    );
};

const mapDispatchToProps = { onLogout }
export default connect(null, mapDispatchToProps)(Logout);

