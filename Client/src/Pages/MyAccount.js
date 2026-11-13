import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import { api } from '../api';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    useEffect(() => { api.account().then(({ user: account }) => setUser(account)).catch((err) => setError(err.message)); }, []);
    if (error) return <p className="error">{error}</p>;
    if (!user) return <p>Loading user account details...</p>;
    return <div className="account-details"><h2>My Account</h2><p><strong>Name:</strong> {user.name}</p><p><strong>Email:</strong> {user.usermail}</p></div>;
};

export default MyAccount;
