import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {MainLayout} from "../../components/templates/MainLayout.jsx";
import {Welcome} from "../../pages/welcome/Welcome.jsx";
import {routes} from "./Routes.jsx";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route element={<MainLayout />}>
                    {routes
                        .filter((r) => r.path !== "/welcome")
                        .map(({path, element}, index) => (
                            <Route key={index} path={path} element={element} />
                        ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
