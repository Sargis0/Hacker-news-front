import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../../store/authSlice';
import "../Auth.css";

export const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status} = useSelector(state => state.auth);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.username || !formData.password) {
            setError('Both fields are required');
            return;
        }

        try {
            await dispatch(loginUser(formData)).unwrap();
            navigate('/news');
        } catch (err) {
            setError(err || 'Invalid username or password');
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
                    autoComplete="username"
                    disabled={status === 'loading'}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};