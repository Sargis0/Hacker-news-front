import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {submitNews} from "../../store/newsSlice";
import "./Submit.css";

export const Submit = () => {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        text: ''
    });
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector(state => state.auth);
    const {status} = useSelector(state => state.news);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isAuthenticated) {
            navigate('/login', {state: {from: '/submit'}});
            return;
        }

        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        if (!formData.url.trim() && !formData.text.trim()) {
            setError('Please provide either URL or text');
            return;
        }

        try {
            await dispatch(submitNews(formData)).unwrap();
            navigate('/news');
        } catch (err) {
            setError(err || 'Failed to submit news');
        }
    };

    return (
        <div className="submit-container">
            <h2>Submit</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                />
                <input
                    type="url"
                    name="url"
                    placeholder="URL (optional)"
                    value={formData.url}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                />
                <textarea
                    name="text"
                    placeholder="Text (optional)"
                    rows="6"
                    value={formData.text}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};