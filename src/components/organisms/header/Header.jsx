import {Menu} from "../../molecules/menu/Menu.jsx";
import {Logo} from "../../atoms/logo/Logo.jsx";

import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={styles.header}>
            <Logo/>
            <Menu/>
        </header>
    );
};
