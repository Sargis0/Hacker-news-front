import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from "../../store/authSlice";
import "./Header.css";

export const Header = () => {
    const {isAuthenticated, username, status} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate('/news');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-left">
                    <NavLink to="/news" className="nav-item">Hacker News</NavLink>
                    <NavLink to="/newest" className="nav-item">new</NavLink>
                    <NavLink to="/submit" className="nav-item">submit</NavLink>
                    {isAuthenticated && (
                        <NavLink to="/submit" className="nav-item">submit</NavLink>
                    )}
                </div>

                <div className="nav-right">
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/account" className="nav-item">
                                {username || 'Account'}
                            </NavLink>
                            <button
                                className="nav-button"
                                onClick={handleLogout}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Logging out...' : 'Logout'}
                            </button>
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