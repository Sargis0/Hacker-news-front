import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MainLayout} from "../../components/templates/MainLayout.jsx";
import {routes} from "./Routes.jsx";
import {PrivateRoute} from "./PrivateRoute.jsx";
import {useSelector} from "react-redux";

export const AppRouter = () => {
    const token = useSelector(state => state.auth.accessToken);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    {routes.map(({path, element, isPrivate}, index) => {
                        if (isPrivate) {
                            return (
                                <Route
                                    key={index}
                                    path={path}
                                    element={
                                        <PrivateRoute isAllowed={!!token} redirectPath="/login">
                                            {element}
                                        </PrivateRoute>
                                    }
                                />
                            );
                        }
                        return <Route key={index} path={path} element={element}/>;
                    })}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
