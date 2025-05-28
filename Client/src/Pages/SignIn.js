import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ onLogin }) => {
    const [usermail, setUsermail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usermail, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Invalid credentials');
            }

            // Save token to localStorage
            localStorage.setItem('token', data.token);
            onLogin(); // Update parent component state to indicate authentication
            navigate('/'); // Redirect to home
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-background">
            <div className="form-container">
                <h2>Food Order Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="usermail">User ID</label>
                        <input
                            type="email"
                            id="usermail"
                            value={usermail}
                            onChange={(e) => setUsermail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
            </div>
        </div>
    );
};

export default SignIn;
