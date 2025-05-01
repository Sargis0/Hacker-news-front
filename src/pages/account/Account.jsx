import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Account.css';
// import { updateEmail } from "../../store/authSlice.js";

export const Account = () => {
    const username = useSelector((state) => state.auth.username);
    const email = useSelector((state) => state.auth.email);
    // const created = useSelector((state) => state.auth.created);
    const dispatch = useDispatch();

    const [newEmail, setNewEmail] = useState(email || '');

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleSaveEmail = () => {
        // dispatch(updateEmail(newEmail));
    };

    return (
        <div className="account-container">
            <h2>User Account</h2>
            <div className="account-info">
                <div className="info-item">
                    <strong>User:</strong> {username}
                </div>
                <div className="info-item">
                    <strong>Account Created:</strong> {created}
                </div>
                <div className="info-item">
                    <strong>Email:</strong>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={handleEmailChange}
                        placeholder="Enter new email"
                    />
                    <button onClick={handleSaveEmail}>Save</button>
                </div>
                <div className="info-item">
                    <button>Change Password</button>
                </div>
            </div>
        </div>
    );
};
