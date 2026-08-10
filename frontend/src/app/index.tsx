import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout/index.js';
import { routes } from '../utils/routes/index.js';
import { ProtectedRoute, AdminRoute } from '../utils/routes/guards.js';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <DefaultLayout>
                <Routes>
                    {routes.map((route) => {
                        let element = route.element;

                        if (route.isAdminOnly) {
                            element = <AdminRoute>{element}</AdminRoute>;
                        } else if (route.isProtected) {
                            element = <ProtectedRoute>{element}</ProtectedRoute>;
                        }

                        return <Route key={route.path} path={route.path} element={element} />;
                    })}
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
};

export default App;