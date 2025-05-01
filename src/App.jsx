import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from "./components/header/Header.jsx";
import { News } from "./pages/news/News.jsx";
import { NewPosts } from "./pages/new/NewPosts.jsx";
import { Ask } from "./pages/ask/Ask.jsx";
import { Jobs } from "./pages/jobs/Jobs.jsx";
import { Submit } from "./pages/submit/Submit.jsx";
import { Login } from "./pages/auth/login/Login.jsx";
import { Register } from "./pages/auth/register/Register.jsx";
import { ResetPassword } from "./pages/reset-password/ResetPassword.jsx";
import { Past } from "./pages/past/Past.jsx";
import { setCredentials, logout, refreshToken } from './store/authSlice.js';
import {Account} from "./pages/account/Account.jsx";
import {ItemPage} from "./pages/item/ItemPage.jsx";

export const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, token } = useSelector(state => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');

        if (token && !isAuthenticated) {
            dispatch(setCredentials({
                accessToken: token,
                username: username
            }));
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        const checkTokenExpiration = async () => {
            if (token && isAuthenticated) {
                try {
                    await dispatch(refreshToken()).unwrap();
                } catch (err) {
                    dispatch(logout());
                    navigate('/login');
                }
            }
        };

        const interval = setInterval(checkTokenExpiration, 300000);
        return () => clearInterval(interval);
    }, [dispatch, token, isAuthenticated, navigate]);

    return (
        <>

            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/news"/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/newest" element={<NewPosts/>}/>
                <Route path="/past" element={<Past/>}/>
                <Route path="/ask" element={<Ask/>}/>
                <Route path="/jobs" element={<Jobs/>}/>
                <Route path="/submit" element={<Submit/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/item/:id" element={<ItemPage />} />
                <Route path="*" element={<div>Page Not Found</div>}/>
            </Routes>
        </>
    );
};