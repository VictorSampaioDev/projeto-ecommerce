import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageLayout from "../layouts/PageLayout";

const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Paths;