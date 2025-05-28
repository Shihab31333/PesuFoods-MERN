import React from 'react';
import { useCart } from 'react-use-cart';
import './SearchResults.css';

const SearchResults = ({ searchResults, loading }) => {
  const { addItem } = useCart(); // Use the addItem function from useCart

  return (
    <div className="search-results">
      {loading && <p>Loading results...</p>}
      {!loading && searchResults.length === 0 && <p>No results found.</p>}
      <div className="menu-items">
        {searchResults.map(item => (
          <div key={item.id} className="menu-item">
            <div className="menu-card">
              <img src={item.img} alt={item.name} className="meal-img" />
              <h3>{item.name}</h3>
              <p>{item.canteenName}</p> {/* Display canteen name */}
              <p>₹{item.price}</p>
              <button 
                className="add-to-cart-button" 
                onClick={() => addItem(item)} // Handle adding item to cart
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;