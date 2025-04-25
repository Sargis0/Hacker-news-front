import {HackerNews} from "../../pages/hackerNews/HackerNews.jsx";
import {Comments} from "../../pages/comments/Comments.jsx";
import {Register} from "../../pages/register/Register.jsx";
import {Welcome} from "../../pages/welcome/Welcome.jsx";
import {Threads} from "../../pages/threads/Threads.jsx";
import {Submit} from "../../pages/submit/Submit.jsx";
import {Newest} from "../../pages/newest/Newest.jsx";
import {Login} from "../../pages/login/Login.jsx";
import {Past} from "../../pages/past/Past.jsx";
import {Show} from "../../pages/show/Show.jsx";
import {Jobs} from "../../pages/jobs/Jobs.jsx";
import {Ask} from "../../pages/ask/Ask.jsx";
import {ResetPassword} from "../../pages/reset-password/ResetPassword.jsx";

export const routes = [
    {path: "/news", element: <HackerNews/>},
    {path: "/welcome", element: <Welcome/>},
    {path: "/newest", element: <Newest/>},
    {path: "/threads", element: <Threads/>},
    {path: "/past", element: <Past/>},
    {path: "/comments", element: <Comments/>},
    {path: "/ask", element: <Ask/>},
    {path: "/show", element: <Show/>},
    {path: "/jobs", element: <Jobs/>},
    {path: "/submit", element: <Submit/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
    {path: "/reset", element: <ResetPassword/>},
];
