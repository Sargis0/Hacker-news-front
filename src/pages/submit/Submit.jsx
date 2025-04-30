import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitNews } from "../../store/newsSlice.js";
import "./Submit.css";

export const Submit = () => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const newsStatus = useSelector((state) => state.news.status);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            setError('You need to login to submit news');
            return;
        }

        if (!title.trim()) {
            setError('Title is required.');
            return;
        }

        if (!url.trim() && !text.trim()) {
            setError('Either URL or Text must be provided.');
            return;
        }

        setError(null);

        try {
            await dispatch(submitNews({ title, url, text })).unwrap();
            navigate('/news');
        } catch (err) {
            setError(err.message || 'Submission failed.');
        }
    };

    return (
        <div className="submit-container">
            <h2>Submit a new story</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="url"
                    placeholder="URL (optional)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <textarea
                    placeholder="Text (optional)"
                    rows="6"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" disabled={newsStatus === 'loading'}>
                    {newsStatus === 'loading' ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};
