import {menuItems} from "../../../app/routes/MenuConfig.jsx";
import {MenuLink} from "../../atoms/menuLink/MenuLink.jsx";
import styles from "./Menu.module.scss";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../../features/auth/authSlice.js";
import {useNavigate} from "react-router-dom";

export const HeaderMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.menuLeft}>
                {menuItems
                    .filter(item => isLoggedIn || !item.authRequired)
                    .map(({path, label}) => (
                        <MenuLink key={path} path={path} label={label}/>
                    ))
                }
            </div>

            <div className={styles.menuRight}>
                {!isLoggedIn ? (
                    <>
                        <MenuLink path="/login" label="login"/>
                        <MenuLink path="/register" label="register"/>
                    </>
                ): (
                    <>
                        <MenuLink path="/account" label="account"/>
                        <button onClick={handleLogout}>
                            logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};
