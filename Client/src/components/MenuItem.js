import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import './MenuItem.css';

const MenuItem = ({ item }) => {
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false); // State to track if item is added to cart

    const handleAddToCart = () => {
        addItem(item);
        setIsAdded(true); // Show feedback when the item is added to cart

        // Optionally, reset the added state after 2 seconds
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <div className="menu-item">
            <img
                src={item.img || '/default-image.jpg'} // Fallback to default image if img is missing
                alt={item.name || 'Menu item'} // Fallback for accessibility
                className="menu-item-image"
            />
            <h5 className="menu-item-name">{item.name}</h5>
            <p className="menu-item-price">₹{item.price}</p>
            <div className="add-to-cart-container">
                <button onClick={handleAddToCart} className="add-to-cart-button">
                    {isAdded ? 'Added!' : 'Add to Cart'} {/* Change button text when added */}
                </button>
                {isAdded && (
                    <p className="success-message">Item added to cart!</p> // Show success message
                )}
            </div>
        </div>
    );
};

export default MenuItem;
