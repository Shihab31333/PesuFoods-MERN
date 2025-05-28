import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import Home from './Pages/Home';
import CanteenDetails from './Pages/CanteenDetails';
import Cart from './components/Cart';
import Header from './components/Header';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import MyAccount from './Pages/MyAccount';
import SearchResults from './components/SearchResults';

import canteenData from './Data/Canteen1items';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    setLoading(true);

    const results = [];
    canteenData.canteens.forEach(canteen => {
      const filteredItems = canteen.menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filteredItems.forEach(item => {
          results.push({ ...item, canteenName: canteen.name });
        });
      }
    });

    setSearchResults(results);
    setLoading(false);
    navigate('/search');
  };

  return (
    <CartProvider>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canteen/:canteenId" element={<CanteenDetails data={canteenData} />} />
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
