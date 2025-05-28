import React, { useEffect, useState } from 'react';
import './MyAccount.css';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('User not logged in');
                }

                const response = await fetch('http://localhost:5000/account', {
                    headers: {
                        Authorization: token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Loading user account details...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="account-details">
            <h2>My Account</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.usermail}</p>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default MyAccount;
