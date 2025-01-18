import { React, useState } from "react";
import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/sidebar";
import { useNavigate } from "react-router-dom";
import { getDataFromStore } from "../../store/getStore";

const Layout = ({ children }) => {
    let auth = getDataFromStore("Auth");
    const navigate = useNavigate()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [profilePicture] = useState("https://i.pravatar.cc/300");

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const logoutHandler = () => {
        navigate('/logout')
    };


    return (
        <div className="flex h-screen">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col">
                <Header onLogout={logoutHandler} profilePicture={profilePicture} />
                <div className="flex-1 bg-gray-100 p-4 overflow-auto">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout