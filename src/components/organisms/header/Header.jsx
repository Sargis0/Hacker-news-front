import {HeaderMenu} from "../../molecules/menu/HeaderMenu.jsx";
import {Logo} from "../../atoms/logo/Logo.jsx";

import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={styles.header}>
            <Logo/>
            <HeaderMenu/>
        </header>
    );
};
