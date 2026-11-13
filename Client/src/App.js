import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CartProvider from './components/CartProvider';
import Home from './Pages/Home';
import CanteenDetails from './Pages/CanteenDetails';
import Cart from './components/Cart';
import Header from './components/Header';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import MyAccount from './Pages/MyAccount';
import SearchResults from './components/SearchResults';
import { api } from './api';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('token')));
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setLoading(true);

    api.search(searchTerm)
      .then(({ items }) => { setSearchResults(items); navigate('/search'); })
      .catch(() => setSearchResults([]))
      .finally(() => setLoading(false));
  };

  return (
    <CartProvider>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canteen/:canteenId" element={<CanteenDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/search" element={<SearchResults searchResults={searchResults} loading={loading} />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
