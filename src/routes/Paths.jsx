import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageLayout from "../layouts/PageLayout";
import AuthLayout from "../layouts/AuthLayout";

const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/dashboard" element={''}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Paths;