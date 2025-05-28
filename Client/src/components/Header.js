import React, { useEffect, useState } from 'react';
import { Container, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { BiCart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import './Header.css';

const Header = ({ isAuthenticated, onLogout, onSearch }) => {
    const { isEmpty, totalItems } = useCart();
    const [searchTerm, setSearchTerm] = useState('');

    // Show an alert when authentication state changes
    useEffect(() => {
        if (isAuthenticated) {
            alert('User logged in');
        } else {
            alert('User not yet logged in');
        }
    }, [isAuthenticated]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch && searchTerm.trim()) {
            onSearch(searchTerm);
            setSearchTerm(''); // Clear the input field after search
        }
    };

    return (
        <div className="header-section">
            <Navbar collapseOnSelect expand="md" className="bg-light border-bottom">
                <Container className="header-content">
                    <Link to="/" className="navbar-brand">
                        <b>PESUFOODS</b>
                    </Link>

                    <Form className="search-form" onSubmit={handleSearch} inline>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit" className="search-button">Search</Button>
                    </Form>

                    <div className="account-section">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/signin" className="nav-link">Sign In</Link>
                                <Link to="/register" className="nav-link">Sign Up</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/myaccount" className="nav-link">My Account</Link>
                                <Button variant="link" onClick={onLogout} className="nav-link">Logout</Button>
                            </>
                        )}
                        <Link to="/cart" className="nav-link cart-icon">
                            <BiCart size="1.8rem" />
                            {!isEmpty && <span className="cart-count">{totalItems}</span>}
                            <span>&nbsp;Cart</span>
                        </Link>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
