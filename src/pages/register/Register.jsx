import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Button} from "../../components/atoms/button/Button.jsx";
import {Input} from "../../components/atoms/input/Input.jsx";
import {register} from "../../features/auth/authSlice.js";

import styles from "./Register.module.scss";

export const Register = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ username, password }));
    };

    return (
        <div className={styles.register}>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />

                <Input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <Button type="submit" disabled={loading}>Login</Button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
