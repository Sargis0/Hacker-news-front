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
    import {Account} from "../../pages/accoutn/Account.jsx";

    export const routes = [
        {path: "/", element: <HackerNews/>, isPrivate: false},
        {path: "/news", element: <HackerNews/>, isPrivate: false},
        {path: "/welcome", element: <Welcome/>, isPrivate: true},
        {path: "/newest", element: <Newest/>, isPrivate: false},
        {path: "/threads", element: <Threads/>, isPrivate: true},
        {path: "/past", element: <Past/>, isPrivate: false},
        {path: "/comments", element: <Comments/>, isPrivate: false},
        {path: "/ask", element: <Ask/>, isPrivate: false},
        {path: "/show", element: <Show/>, isPrivate: false},
        {path: "/jobs", element: <Jobs/>, isPrivate: false},
        {path: "/submit", element: <Submit/>, isPrivate: true},
        {path: "/login", element: <Login/>, isPrivate: false},
        {path: "/register", element: <Register/>, isPrivate: false},
        {path: "/reset", element: <ResetPassword/>, isPrivate: false},
        {path: "/account", element: <Account/>, isPrivate: true},
    ];
