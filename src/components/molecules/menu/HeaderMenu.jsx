import {MenuLink} from "../../atoms/menuLink/MenuLink.jsx";

import styles from "./Menu.module.scss";

export const HeaderMenu = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.menuLeft}>
                <MenuLink path="/news" label="Hacker News"/>
                <MenuLink path="/welcome" label="welcome"/>
                <MenuLink path="/newest" label="new"/>
                <MenuLink path="/threads" label="threads"/>
                <MenuLink path="/past" label="past"/>
                <MenuLink path="/comments" label="comments"/>
                <MenuLink path="/ask" label="ask"/>
                <MenuLink path="/show" label="show"/>
                <MenuLink path="/jobs" label="jobs"/>
                <MenuLink path="/submit" label="submit"/>
            </div>
            <div className={styles.menuRight}>
                <MenuLink path="/login" label="login"/>
                <MenuLink path="/register" label="register"/>
            </div>
        </nav>
    );
};
