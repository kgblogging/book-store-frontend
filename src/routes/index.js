import React, { lazy} from 'react';
import AppRoute from './route';

const Login = lazy(() => import("../pages/login"));
const Register = lazy(() => import("../pages/register"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Layout = lazy(() => import('../container/layout/'));
const Logout = lazy(() => import('../pages/logout/'));

const openRoutes = [
    { path: "/", exact: true, component: Login },
    { path: "/register", exact: true, component: Register },
];

const authRoutes = [
    { path: "/", exact: true, component: Dashboard },
    { path: "/dashboard", exact: true, component: Dashboard },
    { path: "/logout", exact: true, component: Logout },
];

const PageRoute = (props) => {
    return (
        <div>
            {/* If token is available, render the Layout and authenticated routes */}
            {props.token ? (
                <Layout>
                    {authRoutes.map((route, idx) => (
                        <AppRoute
                            path={route.path}
                            component={route.component}
                            key={idx}
                            isAuthProtected={true}
                        />
                    ))}
                </Layout>
            ) : (
                // If no token, render only the open routes (without Layout)
                openRoutes.map((route, idx) => (
                    <AppRoute
                        path={route.path}
                        component={route.component}
                        key={idx}
                        isAuthProtected={false}  // No auth protection needed for open routes
                    />
                ))
            )}
        </div>
    );
};

export default PageRoute;
