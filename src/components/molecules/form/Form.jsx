import {useDispatch, useSelector} from "react-redux";

import {Input} from "../../atoms/input/Input.jsx";
import {Button} from "../../atoms/button/Button.jsx";

import{setField, resetForm, submitForm} from "../../../app/store/auth/authSlice.js";

import styles from  "./Form.module.css";

export const Form = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.auth);

    const handleChange = (event) => {
        const {name, value} = event.target;
        dispatch(setField({name, value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(submitForm({data, endpoint: "register"}));
        dispatch(resetForm());
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                type="text"
                placeholder="surname"
                name="username"
                value={data.username}
                onChange={handleChange}
            />

            <Input
                type="password"
                placeholder="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />

            <Button>login</Button>
        </form>
    );
};
