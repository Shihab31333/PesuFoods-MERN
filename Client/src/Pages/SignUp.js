import React, { useState } from 'react';
import './SignUp.css'; // Add this line at the top

const SignUp = () => {
    const [name, setName] = useState('');
    const [usermail, setUsermail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/signup', { // Use absolute URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, usermail, password }),
            });
            if (!response.ok) {
                const { error: errMsg } = await response.json();
                throw new Error(errMsg || 'User already exists or another error');
            }
            // Handle successful signup, e.g., redirect to login
            window.location.href = '/login';
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
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
                <button type="submit" className="submit-btn">Sign Up</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p>Already have an account? <a href='/signin'>Sign In</a></p>
        </div>
    );
};

export default SignUp;
