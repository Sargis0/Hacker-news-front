import {Header} from "../organisms/header/Header.jsx";
import {Outlet} from "react-router-dom";

import styles from "./Mainlayout.module.scss";

export const MainLayout = () => {
    return (
        <div className={styles.layout}>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};
