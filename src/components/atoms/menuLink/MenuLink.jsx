import {Link} from "react-router-dom";

import styles from "./MenuLink.module.scss";

export const MenuLink = ({path, label}) => {
    return (
        <Link to={path} className={styles.menuLink}>
            {label}
        </Link>
    );
};
