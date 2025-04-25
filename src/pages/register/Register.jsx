import {Link} from "react-router-dom";

import {Form} from "../../components/molecules/form/Form.jsx";

import styles from "./Register.module.scss";

export const Register = () => {
    return (
        <div className={styles.register}>
            <Form />
            <Link to="/reset">Forgot your password?</Link>
        </div>
    );
};
