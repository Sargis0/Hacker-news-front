import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import './Header.css';
import {logout} from "../../store/authSlice.js";

export const Header = () => {
    const {isAuthenticated, username} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-left">
                    <NavLink to="/news" className="nav-item">Hacker news</NavLink>
                    <NavLink to="/newest" className="nav-item">new</NavLink>
                    <NavLink to="/past" className="nav-item">past</NavLink>
                    <NavLink to="/ask" className="nav-item">ask</NavLink>
                    <NavLink to="/jobs" className="nav-item">jobs</NavLink>
                    <NavLink to="/comments" className="nav-item">comments</NavLink>
                    <NavLink to="/submit" className="nav-item">submit</NavLink>
                </div>

                <div className="nav-right">
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/account" className="nav-item">
                                {username ? ` ${username}` : ''}
                            </NavLink>
                            <button className="nav-button" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav-item">Login</NavLink>
                            <NavLink to="/register" className="nav-item">Register</NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};
