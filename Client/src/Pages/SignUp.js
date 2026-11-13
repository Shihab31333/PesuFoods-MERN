import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { api } from '../api';

const SignUp = () => {
    const [form, setForm] = useState({ name: '', usermail: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault(); setLoading(true); setError('');
        try { await api.signup(form); navigate('/signin'); } catch (err) { setError(err.message); } finally { setLoading(false); }
    };
    return <div className="form-container"><h2>Sign Up</h2><form onSubmit={handleSubmit}>
        <div className="form-group"><label htmlFor="name">Name</label><input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
        <div className="form-group"><label htmlFor="usermail">User ID</label><input type="email" id="usermail" value={form.usermail} onChange={(e) => setForm({ ...form, usermail: e.target.value })} required /></div>
        <div className="form-group"><label htmlFor="password">Password</label><input type="password" id="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
        <button type="submit" className="submit-btn" disabled={loading}>{loading ? 'Creating account...' : 'Sign Up'}</button>{error && <p className="error">{error}</p>}
    </form><p>Already have an account? <Link to="/signin">Sign In</Link></p></div>;
};

export default SignUp;
