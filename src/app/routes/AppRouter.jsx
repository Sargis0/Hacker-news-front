import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {MainLayout} from "../../components/templates/MainLayout.jsx";
import {Welcome} from "../../pages/welcome/Welcome.jsx";
import {routes} from "./Routes.jsx";

const LayoutRoutes = () => {
    const location = useLocation();
    if (location.pathname === "/welcome") return <Welcome/>

    return (
        <MainLayout>
            <Routes>
                {routes.map(({path, element}, index) => (
                    <Route key={index} path={path} element={element}/>
                ))}
            </Routes>
        </MainLayout>
    );
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <LayoutRoutes/>
        </BrowserRouter>
    );
};
