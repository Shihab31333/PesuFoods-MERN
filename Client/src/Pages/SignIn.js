import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { api } from '../api';

const SignIn = ({ onLogin }) => {
    const [usermail, setUsermail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); setError('');
        try {
            const data = await api.login({ usermail, password });
            localStorage.setItem('token', data.token);
            onLogin();
            navigate('/');
        } catch (err) { setError(err.message); } finally { setLoading(false); }
    };
    return <div className="form-background"><div className="form-container">
        <h2>Food Order Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group"><label htmlFor="usermail">User ID</label><input type="email" id="usermail" value={usermail} onChange={(e) => setUsermail(e.target.value)} required /></div>
            <div className="form-group"><label htmlFor="password">Password</label><input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <button type="submit" className="submit-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            {error && <p className="error">{error}</p>}
        </form>
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
    </div></div>;
};

export default SignIn;
