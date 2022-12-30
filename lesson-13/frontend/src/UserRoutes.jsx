import { lazy, Suspense } from "react";
import {Routes, Route} from "react-router-dom";

import PrivateRoute from "./modules/PrivateRoute/PrivateRoute";
import PublicRoute from "./modules/PublicRoute/PublicRoute";

const RegisterPage = lazy(()=> import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(()=> import('./pages/LoginPage/LoginPage'));
const MyBooksPage = lazy(()=> import('./pages/MyBooksPage/MyBooksPage'));

const UserRoutes = () => {
    return (
        <Suspense fallback={<p>....Load page</p>}>
            <Routes> 
                <Route element={<PublicRoute />}>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/my-books" element={<MyBooksPage />} />
                </Route>
        </Routes>
      </Suspense>
    )
};

export default UserRoutes;