import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../store/authSlice.js';
import {useNavigate} from 'react-router-dom';
import "../Auth.css";

export const Login = () => {
    const [formData, setFormData] = useState({username: '', password: ''});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setError('Both fields are required');
            return;
        }

        try {
            await dispatch(loginUser(formData)).unwrap();
            navigate('/news');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

