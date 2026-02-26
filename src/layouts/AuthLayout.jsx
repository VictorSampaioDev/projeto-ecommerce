import { Outlet } from "react-router";
import Footer from "../components/Footer";

const AuthLayout = () => {
    return (
        <div>
            <HeaderAuth />
            <Outlet />
          
            <Footer />
        </div>
    );
}

export default AuthLayout;