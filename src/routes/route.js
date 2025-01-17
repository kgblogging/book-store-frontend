import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AppRoute = ({
    component: Component,
    path,
    exact,
    ...rest
}) => {
    return (
        <Routes>
            <Route
                path={path}
                exact={exact}
                element={
                    <Suspense fallback={<></>}>
                        <Component />
                    </Suspense>
                }
            />
        </Routes>

    )
};

export default AppRoute;

